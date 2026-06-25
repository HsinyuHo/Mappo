from pydantic import BaseModel
from typing import List, Optional

class CommentCreate(BaseModel):
    id: str
    content: str
    timestamp: str
    tags: Optional[List[str]] = None
    rotation: float
    washiTapeColor: Optional[str] = None

class CommentResponse(BaseModel):
    id: str
    authorName: str
    authorAvatar: str
    content: str
    timestamp: str
    tags: Optional[List[str]] = None
    rotation: float
    washiTapeColor: Optional[str] = None
