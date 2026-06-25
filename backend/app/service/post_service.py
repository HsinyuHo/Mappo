from typing import List, Dict, Any, Optional
from backend.app.repository.post_repository import PostRepository

class PostService:
    def __init__(self):
        self.post_repo = PostRepository()

    def get_posts(self, current_username: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        獲取所有貼文，若有登入使用者，會回傳 isLiked 狀態
        """
        return self.post_repo.get_all(current_username)

    def create_post(self, post_data: Dict[str, Any], username: str) -> Dict[str, Any]:
        """
        建立新的旅行貼紙 (貼文)
        """
        # NOTE: 可以在此進行業務邏輯驗證，例如檢查地區 Region 是否合法
        valid_regions = {'north', 'central', 'south', 'east', 'islands', 'overseas'}
        if post_data.get("region") not in valid_regions:
            raise ValueError("無效的台灣區域！")
            
        return self.post_repo.create(post_data, username)

    def toggle_like(self, post_id: str, username: str) -> Dict[str, Any]:
        """
        切換點讚狀態
        """
        return self.post_repo.toggle_like(post_id, username)
