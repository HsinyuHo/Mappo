from typing import List, Dict, Any
from backend.app.repository.comment_repository import CommentRepository

class CommentService:
    def __init__(self):
        self.comment_repo = CommentRepository()

    def get_comments(self) -> List[Dict[str, Any]]:
        """
        獲取留言牆所有留言
        """
        return self.comment_repo.get_all()

    def create_comment(self, comment_data: Dict[str, Any], username: str) -> Dict[str, Any]:
        """
        新增留言
        """
        if not comment_data.get("content", "").strip():
            raise ValueError("留言內容不能為空！")
        return self.comment_repo.create(comment_data, username)
