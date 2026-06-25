-- ==========================================
-- Mappo Supabase Database Schema
-- 請在 Supabase 控制台的 SQL Editor 中執行此腳本
-- ==========================================

-- 1. 建立 users 表
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    bio TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    tag VARCHAR(50) DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 建立 posts 表 (旅行貼紙)
CREATE TABLE IF NOT EXISTS public.posts (
    id VARCHAR(100) PRIMARY KEY,
    image_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    alt TEXT DEFAULT '',
    date VARCHAR(20) NOT NULL,
    region VARCHAR(20) NOT NULL,
    author_username VARCHAR(50) REFERENCES public.users(username) ON DELETE CASCADE,
    tags TEXT[] DEFAULT '{}',
    style VARCHAR(20) NOT NULL, -- polaroid, circle, organic, large
    tilt FLOAT NOT NULL,
    position_top VARCHAR(10) NOT NULL,
    position_left VARCHAR(10) NOT NULL,
    washi_tape_color VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 建立 comments 表 (留言牆)
CREATE TABLE IF NOT EXISTS public.comments (
    id VARCHAR(100) PRIMARY KEY,
    author_username VARCHAR(50) REFERENCES public.users(username) ON DELETE CASCADE,
    content TEXT NOT NULL,
    timestamp VARCHAR(50) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    rotation FLOAT NOT NULL,
    washi_tape_color VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 建立 post_likes 表 (點讚記錄)
CREATE TABLE IF NOT EXISTS public.post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id VARCHAR(100) REFERENCES public.posts(id) ON DELETE CASCADE,
    username VARCHAR(50) REFERENCES public.users(username) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(post_id, username)
);

-- 允許所有人讀取 users / posts / comments，只有驗證過的用戶可以寫入（或由後端 API 代理，後端可以使用 service key 以繞過 RLS，或者我們關閉 RLS 以便展示）
-- NOTE: 為方便測試展示，建議在 Supabase 的 Table 點擊 Disable RLS (Row Level Security)，或者在 Table Editor 手動關閉安全政策。
