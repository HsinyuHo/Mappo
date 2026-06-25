import { UserProfile, Post, Comment } from '../types';

const BASE_URL = 'http://192.168.31.230:8000/api';

/**
 * 取得本地端儲存的 JWT Token
 */
function getToken(): string | null {
  return localStorage.getItem('mappo_token');
}

/**
 * 封裝 HTTP 請求
 */
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorDetail = '請求失敗';
    try {
      const errJson = await response.json();
      errorDetail = errJson.detail || errorDetail;
    } catch {
      // 忽略解析錯誤
    }
    throw new Error(errorDetail);
  }

  return response.json() as Promise<T>;
}

function normalizeUser(user: any): UserProfile {
  return {
    username: user.username,
    displayName: user.displayName ?? user.display_name ?? '',
    bio: user.bio ?? '',
    avatarUrl: user.avatarUrl ?? user.avatar_url ?? '',
    tag: user.tag ?? '',
  };
}

export const apiClient = {
  auth: {
    register: async (data: any) => {
      const user = await request<any>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return normalizeUser(user);
    },

    login: async (data: any) => {
      const res = await request<any>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      return {
        ...res,
        user: normalizeUser(res.user),
      };
    },

    getMe: async () => {
      const user = await request<any>('/auth/me', {
        method: 'GET',
      });

      return normalizeUser(user);
    },

    updateProfile: async (data: any) => {
      const user = await request<any>('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({
          display_name: data.displayName,
          bio: data.bio ?? '',
          avatar_url: data.avatarUrl ?? '',
          tag: data.tag ?? '',
        }),
      });

      return normalizeUser(user);
    },
  },

  posts: {
    getAll: () =>
      request<Post[]>('/posts', {
        method: 'GET',
      }),

    create: (data: Omit<Post, 'author' | 'likesCount' | 'isLiked'>) =>
      request<Post>('/posts', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    toggleLike: (postId: string) =>
      request<{ postId: string; likesCount: number; isLiked: boolean }>(`/posts/${postId}/like`, {
        method: 'POST',
      }),
  },

  comments: {
    getAll: () =>
      request<Comment[]>('/comments', {
        method: 'GET',
      }),

    create: (data: Omit<Comment, 'authorName' | 'authorAvatar'>) =>
      request<Comment>('/comments', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};

export default apiClient;
