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
    
class GapResponse(BaseModel):
    trending: List[str]
    underrepresented: List[str]
    suggestions: List[str]
    
class InsightResponse(BaseModel):
    totalIdeasAnalyzed: int
    trendingTopics: List[str]