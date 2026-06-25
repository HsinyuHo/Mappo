import sys
import os

# 確保專案根目錄在 sys.path 中
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api import auth, posts, comments

app = FastAPI(
    title="Mappo API Server",
    description="旅行手帳 Mappo 後端 API 伺服器，結合 Supabase 儲存數據。",
    version="1.0.0"
)

# 設定 CORS 跨網域存取權限
# 允許前端來源 (例如本地開發的 http://localhost:3000 或 0.0.0.0:3000)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",  # 某些 Vite 預設 port
    "http://127.0.0.1:5173",
    "*",                      # 允許所有來源 (便於測試環境)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 註冊 API 路由
app.include_router(auth.router, prefix="/api")
app.include_router(posts.router, prefix="/api")
app.include_router(comments.router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "Mappo API Server",
        "message": "Welcome to Mappo! 歡迎來到 Mappo 旅行手帳 API 伺服器！🚀"
    }

if __name__ == "__main__":
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
