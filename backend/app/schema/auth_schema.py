from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserRegister(BaseModel):
    username: str = Field(..., min_length=3, max_length=20, pattern="^[a-zA-Z0-9]+$")
    password: str = Field(..., min_length=6)
    display_name: str = Field(..., min_length=1)
    bio: Optional[str] = ""
    avatar_url: Optional[str] = ""
    tag: Optional[str] = ""

class UserLogin(BaseModel):
    username: str
    password: str

class UserProfileResponse(BaseModel):
    username: str
    display_name: str
    bio: str
    avatar_url: str
    tag: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserProfileResponse

class UserUpdate(BaseModel):
    display_name: str = Field(..., min_length=1)
    bio: Optional[str] = ""
    avatar_url: Optional[str] = ""
    tag: Optional[str] = ""
