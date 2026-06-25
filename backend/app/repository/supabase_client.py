import os
import ssl

# HACK: Python 3.14 的 ssl.create_default_context 會在內部設定
# context.keylog_filename，若 SSLKEYLOGFILE 指向受限路徑會觸發 PermissionError。
# 透過清除環境變數並 patch create_default_context 來繞過此問題。
os.environ.pop("SSLKEYLOGFILE", None)

_original_create_default_context = ssl.create_default_context

def _patched_create_default_context(*args: object, **kwargs: object) -> ssl.SSLContext:
    """
    包裝 ssl.create_default_context 以攔截 keylog_filename 設定時的 PermissionError
    """
    try:
        return _original_create_default_context(*args, **kwargs)  # type: ignore
    except PermissionError:
        # 若因 keylog_filename 權限失敗，改用不設定 keylog 的方式建立 context
        ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
        ctx.load_default_certs()
        return ctx

ssl.create_default_context = _patched_create_default_context  # type: ignore

from dotenv import load_dotenv
from supabase import create_client, Client

# 載入環境變數（載入 backend/.env 與專案根目錄的 .env）
load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    # NOTE: 若未設定環境變數，此處拋出提示，但允許程式碼載入
    # 實際運作時，若呼叫到資料庫必須要有金鑰
    print("WARNING: SUPABASE_URL or SUPABASE_KEY is not set in environment variables.")

def get_supabase_client() -> Client:
    """
    獲取 Supabase 客戶端實例
    """
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError("Supabase URL 與 KEY 未設定。請確認 backend/.env 或專案根目錄的環境變數。")
    return create_client(SUPABASE_URL, SUPABASE_KEY)
