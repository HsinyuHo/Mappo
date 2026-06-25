from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from backend.app.schema.comment_schema import CommentCreate, CommentResponse
from backend.app.service.comment_service import CommentService
from backend.app.api.auth import get_current_username

router = APIRouter(prefix="/comments", tags=["Comments"])
comment_service = CommentService()

@router.get("", response_model=List[CommentResponse])
def get_comments():
    """
    獲取留言牆上所有留言
    """
    try:
        return comment_service.get_comments()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("", response_model=CommentResponse)
def create_comment(comment_in: CommentCreate, username: str = Depends(get_current_username)):
    """
    在留言牆發表新留言 (需要登入)
    """
    try:
        new_comment = comment_service.create_comment(comment_in.model_dump(), username)
        return new_comment
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
