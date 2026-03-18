from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Project(Base):
    __tablename__ = "projects"
    id = Column("project_id", Integer, primary_key=True)
    title = Column(String, nullable=False)
    abstract = Column(String, nullable=False)