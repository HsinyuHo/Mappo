from fastapi import APIRouter, HTTPException, Depends, status, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List, Optional
from backend.app.schema.post_schema import PostCreate, PostResponse
from backend.app.service.post_service import PostService
from backend.app.api.auth import get_current_username, auth_service

router = APIRouter(prefix="/posts", tags=["Posts"])
post_service = PostService()
security_optional = HTTPBearer(auto_error=False)

def get_optional_username(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_optional)) -> Optional[str]:
    """
    可選的認證依賴注入：獲取目前登入的旅人帳號，若未帶 Token 則回傳 None
    """
    if not credentials:
        return None
    token = credentials.credentials
    try:
        return auth_service.verify_token(token)
    except Exception:
        return None

@router.get("", response_model=List[PostResponse])
def get_posts(username: Optional[str] = Depends(get_optional_username)):
    """
    獲取所有旅行貼紙 (貼文)
    """
    try:
        return post_service.get_posts(username)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("", response_model=PostResponse)
def create_post(post_in: PostCreate, username: str = Depends(get_current_username)):
    """
    建立新的旅行貼紙 (需要登入)
    """
    try:
        new_post = post_service.create_post(post_in.model_dump(), username)
        return new_post
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/{post_id}/like")
def toggle_like(post_id: str, username: str = Depends(get_current_username)):
    """
    切換點讚狀態 (需要登入)
    """
    try:
        result = post_service.toggle_like(post_id, username)
        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
