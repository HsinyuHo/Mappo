from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.app.schema.auth_schema import UserRegister, UserLogin, UserProfileResponse, TokenResponse, UserUpdate
from backend.app.service.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer()
auth_service = AuthService()

def get_current_username(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    依賴注入：獲取目前登入的旅人帳號
    """
    token = credentials.credentials
    try:
        return auth_service.verify_token(token)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.post("/register", response_model=UserProfileResponse)
def register(user_in: UserRegister):
    """
    註冊新帳號
    """
    try:
        new_user = auth_service.register(user_in)
        return {
            "username": new_user["username"],
            "display_name": new_user["display_name"],
            "bio": new_user["bio"] or "",
            "avatar_url": new_user["avatar_url"] or "",
            "tag": new_user["tag"] or ""
        }
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin):
    """
    登入帳號
    """
    try:
        result = auth_service.login(credentials)
        return result
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/me", response_model=UserProfileResponse)
def get_me(username: str = Depends(get_current_username)):
    """
    取得目前登入的用戶檔案
    """
    try:
        from backend.app.repository.user_repository import UserRepository
        user = UserRepository().get_by_username(username)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="找不到此用戶資訊")
        return {
            "username": user["username"],
            "display_name": user["display_name"],
            "bio": user["bio"] or "",
            "avatar_url": user["avatar_url"] or "",
            "tag": user["tag"] or ""
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.put("/profile", response_model=UserProfileResponse)
def update_profile(profile_in: UserUpdate, username: str = Depends(get_current_username)):
    """
    更新用戶檔案
    """
    try:
        updated = auth_service.update_profile(
            username=username,
            display_name=profile_in.display_name,
            bio=profile_in.bio or "",
            avatar_url=profile_in.avatar_url or "",
            tag=profile_in.tag or ""
        )
        return updated
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
