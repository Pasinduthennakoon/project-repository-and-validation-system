from typing import List, Optional
from pydantic import BaseModel

class IdeaRequest(BaseModel):
    role: str
    title: str
    name: str
    department: str
    batch: str
    abstract: str
    
class Abstract(BaseModel):
    text: str
    
class GapRequest(BaseModel):
    title: str
    tags: Optional[List[str]] = []
    batch: int