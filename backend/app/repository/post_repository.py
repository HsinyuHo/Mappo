from typing import List, Dict, Any, Optional
from backend.app.repository.supabase_client import get_supabase_client

class PostRepository:
    def __init__(self):
        self.db = get_supabase_client()

    def get_all(self, current_username: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        獲取所有貼文，並結合作者資料與點讚狀況
        """
        # 讀取貼文並 JOIN 作者資訊 (users)
        # 預期 author 會返回為一個 dictionary
        response = self.db.table("posts").select("*, author:users(display_name, avatar_url, tag)").execute()
        posts = response.data or []

        # 讀取點讚統計
        likes_response = self.db.table("post_likes").select("*").execute()
        likes_data = likes_response.data or []

        # 整理點讚數據
        # likes_map 的 key 是 post_id，value 是點讚該貼文的用戶列表
        likes_map = {}
        for like in likes_data:
            p_id = like.get("post_id")
            user = like.get("username")
            if p_id not in likes_map:
                likes_map[p_id] = []
            likes_map[p_id].append(user)

        # 格式化輸出以配合前端的欄位
        formatted_posts = []
        for post in posts:
            p_id = post.get("id")
            post_likes = likes_map.get(p_id, [])
            likes_count = len(post_likes)
            is_liked = current_username in post_likes if current_username else False

            # 解析 author 欄位
            # 若 author 為 list 或 None，需要進行安全處理
            author_info = post.get("author")
            author_dict = {"name": "未知旅人", "avatar": "", "tag": ""}
            if isinstance(author_info, dict):
                author_dict = {
                    "name": author_info.get("display_name") or post.get("author_username") or "未知旅人",
                    "avatar": author_info.get("avatar_url") or "",
                    "tag": author_info.get("tag") or ""
                }
            elif isinstance(author_info, list) and len(author_info) > 0:
                author_dict = {
                    "name": author_info[0].get("display_name") or post.get("author_username") or "未知旅人",
                    "avatar": author_info[0].get("avatar_url") or "",
                    "tag": author_info[0].get("tag") or ""
                }

            formatted = {
                "id": post.get("id"),
                "imageUrl": post.get("image_url"),
                "caption": post.get("caption"),
                "alt": post.get("alt") or "",
                "date": post.get("date"),
                "region": post.get("region"),
                "author": author_dict,
                "tags": post.get("tags") or [],
                "style": post.get("style"),
                "tilt": post.get("tilt"),
                "position": {
                    "top": post.get("position_top"),
                    "left": post.get("position_left")
                },
                "washiTapeColor": post.get("washi_tape_color"),
                "likesCount": likes_count,
                "isLiked": is_liked
            }
            formatted_posts.append(formatted)

        return formatted_posts

    def create(self, post_data: Dict[str, Any], username: str) -> Dict[str, Any]:
        """
        建立新貼文
        """
        # 將前端駝峰轉換成 Supabase 資料表底線欄位
        db_data = {
            "id": post_data.get("id"),
            "image_url": post_data.get("imageUrl"),
            "caption": post_data.get("caption"),
            "alt": post_data.get("alt") or "",
            "date": post_data.get("date"),
            "region": post_data.get("region"),
            "author_username": username,
            "tags": post_data.get("tags") or [],
            "style": post_data.get("style"),
            "tilt": post_data.get("tilt"),
            "position_top": post_data.get("position", {}).get("top"),
            "position_left": post_data.get("position", {}).get("left"),
            "washi_tape_color": post_data.get("washiTapeColor")
        }

        response = self.db.table("posts").insert(db_data).execute()
        if response.data and len(response.data) > 0:
            # 建立完成後重新獲取該貼文 (以包含 author 資料)
            all_posts = self.get_all(current_username=username)
            for p in all_posts:
                if p["id"] == post_data.get("id"):
                    return p
            return post_data
        raise Exception("建立貼文失敗")

    def toggle_like(self, post_id: str, username: str) -> Dict[str, Any]:
        """
        切換點讚狀態 (若已點讚則取消，若無則點讚)
        """
        # 檢查是否已點讚
        check = self.db.table("post_likes").select("*").eq("post_id", post_id).eq("username", username).execute()
        
        if check.data and len(check.data) > 0:
            # 取消點讚
            self.db.table("post_likes").delete().eq("post_id", post_id).eq("username", username).execute()
            is_liked = False
        else:
            # 新增點讚
            self.db.table("post_likes").insert({"post_id": post_id, "username": username}).execute()
            is_liked = True

        # 獲取新的點讚數
        likes = self.db.table("post_likes").select("*").eq("post_id", post_id).execute()
        likes_count = len(likes.data or [])

        return {
            "postId": post_id,
            "likesCount": likes_count,
            "isLiked": is_liked
        }
