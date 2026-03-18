from pydantic import BaseModel

class IdeaRequest(BaseModel):
    title: str
    abstract: str