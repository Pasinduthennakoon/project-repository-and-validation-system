from pydantic import BaseModel
from typing import List

class MatchResult(BaseModel):
    project_id: int
    title: str
    score: float


class AnalyzeResponse(BaseModel):
    status: str
    match_percentage: float
    top_matches: List[MatchResult]