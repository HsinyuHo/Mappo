from typing import Optional, Dict, Any
from backend.app.repository.supabase_client import get_supabase_client

class UserRepository:
    def __init__(self):
        self.db = get_supabase_client()

    def get_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        """
        根據使用者名稱獲取用戶資料
        """
        response = self.db.table("users").select("*").eq("username", username).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None

    def create(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        建立新用戶
        """
        response = self.db.table("users").insert(user_data).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        raise Exception("建立用戶失敗")

    def update(self, username: str, update_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        更新用戶資料
        """
        response = self.db.table("users").update(update_data).eq("username", username).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        raise Exception("更新用戶資料失敗")
