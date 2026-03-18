from sqlalchemy.orm import Session
from app.database_models.project import Project
from app.database_models.embeddings import ProjectEmbedding


def fetch_projects(db: Session):
    projects = db.query(Project).order_by(Project.id).all()

    return [
        {
            "id": p.id,
            "title": p.title,
            "abstract": p.abstract
        }
        for p in projects
    ]



def fetch_embeddings(db: Session):
    embeddings = db.query(ProjectEmbedding).order_by(ProjectEmbedding.project_id).all()

    return [e.embedding for e in embeddings]



def save_embeddings(db: Session, projects, embeddings):
    for i, emb in enumerate(embeddings):
        project_id = projects[i]["id"]

        existing = db.query(ProjectEmbedding).filter_by(project_id=project_id).first()

        if existing:
            existing.embedding = emb.tolist()
        else:
            new_embedding = ProjectEmbedding(
                project_id=project_id,
                embedding=emb.tolist()
            )
            db.add(new_embedding)

    db.commit()