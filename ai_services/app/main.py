from fastapi import FastAPI
from app.api.routes import router
from app.database_models import embeddings
from app.db.database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Idea Validation Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

embeddings.Base.metadata.create_all(bind=engine)

app.include_router(router)