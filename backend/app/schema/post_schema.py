from pydantic import BaseModel, Field
from typing import List, Optional

class PostPosition(BaseModel):
    top: str
    left: str

class PostAuthor(BaseModel):
    name: str
    avatar: str
    tag: Optional[str] = ""

class PostCreate(BaseModel):
    id: str
    imageUrl: str
    caption: str
    alt: Optional[str] = ""
    date: str
    region: str
    tags: List[str] = []
    style: str  # polaroid, circle, organic, large
    tilt: float
    position: PostPosition
    washiTapeColor: Optional[str] = ""

class PostResponse(BaseModel):
    id: str
    imageUrl: str
    caption: str
    alt: Optional[str] = ""
    date: str
    region: str
    author: PostAuthor
    tags: List[str]
    style: str
    tilt: float
    position: PostPosition
    washiTapeColor: Optional[str] = ""
    likesCount: int = 0
    isLiked: bool = False
