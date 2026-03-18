from sqlalchemy import Column, Integer, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ProjectEmbedding(Base):
    __tablename__ = 'project_embeddings'

    project_id = Column(Integer, primary_key=True)
    embedding = Column(JSON)
    
