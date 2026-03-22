from pydantic import BaseModel

class IdeaRequest(BaseModel):
    title: str
    name: str
    department: str
    batch: str
    abstract: str