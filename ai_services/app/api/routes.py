from typing import List

from fastapi import APIRouter, Depends
import httpx
from app.models.request_models import Abstract, GapRequest, IdeaRequest, TitlesRequest
from app.models.response_models import GapResponse, InsightResponse
from app.config import THRESHOLD, TOP_K
from app.services.embedding_service import encode
from app.services.similarity_service import compute_similarity
from app.services.tag_generation_service import generate_tags
from app.services.gap_insigt_services import analyze_projects
from app.services.ai_idea_analysis import get_trending_topics
from app.db.crud import fetch_projects, fetch_embeddings, save_embeddings
from app.utils.text_cleaner import clean_text
from sqlalchemy.orm import Session
from app.db.database import SessionLocal, get_db
import numpy as np

router = APIRouter()

# In-memory cache
projects = []
embeddings = None


def load_data(db: Session):
    global projects, embeddings

    projects = fetch_projects(db)

    corpus = [
        clean_text(p["title"] + " " + p["abstract"])
        for p in projects
    ]

    emb_data = fetch_embeddings(db)

    if len(emb_data) == len(projects):
        embeddings = np.array(emb_data)
    else:
        embeddings = encode(corpus)
        save_embeddings(db, projects, embeddings)


@router.on_event("startup")
def startup_event():
    db = SessionLocal()  # manually create session
    try:
        load_data(db)    # pass session
    finally:
        db.close()


@router.post("/analyze")
async def analyze(data: IdeaRequest):
    global projects, embeddings

    text = clean_text(data.title + " " + data.abstract)

    query_embedding = encode([text])
    sims = compute_similarity(query_embedding, embeddings)

    top_indices = sims.argsort()[-TOP_K:][::-1]

    results = []
    for idx in top_indices:
        results.append({
            "project_id": projects[idx]["id"],
            "title": projects[idx]["title"],
            "score": float(sims[idx])
        })

    best_score = sims[top_indices[0]]
    status = "duplicate" if best_score >= THRESHOLD else "unique"
    match_percentage = float(best_score * 100)
    
    if(data.role == "STUDENT"):
        spring_payload = {
            "title": data.title,
            "name": data.name,
            "department": data.department,
            "batch": data.batch,
            "matched": f"{match_percentage:.2f}%",
            "status": status
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post("http://localhost:8080/api/v1/idea/save", json=spring_payload)

    return {
        "status": status,
        "match_percentage": match_percentage,
        "top_matches": results
    }


@router.post("/reindex")
def reindex():
    db = SessionLocal()  # manually create session
    try:
        load_data(db)
    finally:
        db.close()
    return {"message": "Reindexed successfully"}


@router.get("/health")
def health():
    return {"status": "running"}

@router.post("/generate-tags")
def generate_tags(abstract: Abstract):
    return generate_tags(abstract)

@router.post("/gap-insights", response_model=GapResponse)
def gap_insights(data: List[GapRequest]):
    return analyze_projects(data)

@router.post("/ai_analyse_idea", response_model=InsightResponse)
def analyze_titles(req: TitlesRequest):
    titles = req.titles

    return {
        "totalIdeasAnalyzed": len(titles),
        "trendingTopics": get_trending_topics(titles)
    }