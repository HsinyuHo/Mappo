from typing import List, Dict, Any
from backend.app.repository.supabase_client import get_supabase_client

class CommentRepository:
    def __init__(self):
        self.db = get_supabase_client()

    def get_all(self) -> List[Dict[str, Any]]:
        """
        獲取所有留言牆留言，並結合作者資料
        """
        response = self.db.table("comments").select("*, author:users(display_name, avatar_url)").execute()
        comments = response.data or []

        formatted_comments = []
        for comment in comments:
            author_info = comment.get("author")
            author_name = "未知旅人"
            author_avatar = ""

            if isinstance(author_info, dict):
                author_name = author_info.get("display_name") or comment.get("author_username") or "未知旅人"
                author_avatar = author_info.get("avatar_url") or ""
            elif isinstance(author_info, list) and len(author_info) > 0:
                author_name = author_info[0].get("display_name") or comment.get("author_username") or "未知旅人"
                author_avatar = author_info[0].get("avatar_url") or ""

            formatted = {
                "id": comment.get("id"),
                "authorName": author_name,
                "authorAvatar": author_avatar,
                "content": comment.get("content"),
                "timestamp": comment.get("timestamp"),
                "tags": comment.get("tags") or [],
                "rotation": comment.get("rotation"),
                "washiTapeColor": comment.get("washi_tape_color")
            }
            formatted_comments.append(formatted)

        return formatted_comments

    def create(self, comment_data: Dict[str, Any], username: str) -> Dict[str, Any]:
        """
        新增留言
        """
        db_data = {
            "id": comment_data.get("id"),
            "author_username": username,
            "content": comment_data.get("content"),
            "timestamp": comment_data.get("timestamp"),
            "tags": comment_data.get("tags") or [],
            "rotation": comment_data.get("rotation"),
            "washi_tape_color": comment_data.get("washiTapeColor")
        }

        response = self.db.table("comments").insert(db_data).execute()
        if response.data and len(response.data) > 0:
            # 建立完成後重新獲取該留言以包含最新的作者資料
            all_comments = self.get_all()
            for c in all_comments:
                if c["id"] == comment_data.get("id"):
                    return c
            return comment_data
        raise Exception("新增留言失敗")
