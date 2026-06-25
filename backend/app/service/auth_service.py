import os
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import jwt as pyjwt
from passlib.context import CryptContext
from app.repository.user_repository import UserRepository
from app.schema.auth_schema import UserRegister, UserLogin

# 密碼加密設定
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# 讀取 JWT 設定
SECRET_KEY = os.getenv("SECRET_KEY", "mappo-very-secret-key-change-it-in-production")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

class AuthService:
    def __init__(self):
        self.user_repo = UserRepository()

    def _verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """
        驗證密碼是否正確
        """
        return pwd_context.verify(plain_password, hashed_password)

    def _get_password_hash(self, password: str) -> str:
        """
        將密碼進行 Bcrypt 雜湊加密
        """
        return pwd_context.hash(password)

    def _create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """
        生成 JWT 存取權杖
        """
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        # 使用 pyjwt 簽發
        encoded_jwt = pyjwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    def register(self, user_in: UserRegister) -> Dict[str, Any]:
        """
        註冊新旅人帳號
        """
        # 1. 檢查使用者名稱是否重複
        existing_user = self.user_repo.get_by_username(user_in.username)
        if existing_user:
            raise ValueError("該使用者名稱已被註冊，請換一個！")

        # 2. 密碼加密與資料準備
        password_hash = self._get_password_hash(user_in.password)
        user_dict = {
            "username": user_in.username,
            "password_hash": password_hash,
            "display_name": user_in.display_name,
            "bio": user_in.bio or "",
            "avatar_url": user_in.avatar_url or "https://lh3.googleusercontent.com/aida-public/AB6AXuCWcFuLbYExlgRZEt4IdxbI4lsznFl_cuhrtG-AZLXk63xkQweYecb0Pn84zg-00muMlp5FM_276vXvGcbBa41DjiAK9vajYxYmzLCzJ4eoI66C25OVcVbVUsE31Bi1NyaHC2eEvAmQE8xHDgKg7X0uJLKRwGCwYmRMI9n7-qM5DGuHu5B8wH8McyhG3Kh5c_gLAdTYo_aItrxqE1URsx6s0VxM_oFwAuzHLTwAVxuFkQBvMv6Vg0RrS3r6qIRbP-6WwRq1KmN6VQ",
            "tag": user_in.tag or ""
        }

        # 3. 寫入資料庫
        new_user = self.user_repo.create(user_dict)
        return new_user

    def login(self, credentials: UserLogin) -> Dict[str, Any]:
        """
        用戶登入驗證並簽發 Token
        """
        # 1. 取得用戶資料
        user = self.user_repo.get_by_username(credentials.username)
        if not user:
            raise ValueError("使用者名稱不存在，請先註冊！")

        # 2. 驗證密碼
        if not self._verify_password(credentials.password, user["password_hash"]):
            raise ValueError("密碼不正確，請再試一次！")

        # 3. 簽發 Token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = self._create_access_token(
            data={"sub": user["username"]}, expires_delta=access_token_expires
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "username": user["username"],
                "display_name": user["display_name"],
                "bio": user["bio"] or "",
                "avatar_url": user["avatar_url"] or "",
                "tag": user["tag"] or ""
            }
        }

    def verify_token(self, token: str) -> str:
        """
        驗證 Token 並解析出 username
        """
        try:
            payload = pyjwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise ValueError("無效的 Token 內容")
            return username
        except Exception:
            raise ValueError("登入逾時或 Token 驗證失敗，請重新登入！")

    def update_profile(self, username: str, display_name: str, bio: str, avatar_url: str, tag: str) -> Dict[str, Any]:
        """
        更新旅人個人資料
        """
        update_data = {
            "display_name": display_name,
            "bio": bio,
            "avatar_url": avatar_url,
            "tag": tag
        }
        updated = self.user_repo.update(username, update_data)
        return {
            "username": updated["username"],
            "display_name": updated["display_name"],
            "bio": updated["bio"] or "",
            "avatar_url": updated["avatar_url"] or "",
            "tag": updated["tag"] or ""
        }
