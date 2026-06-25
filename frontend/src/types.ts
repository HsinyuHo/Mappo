export type Region = 'north' | 'central' | 'south' | 'east' | 'islands' | 'overseas';

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  tag: string;
}

export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  alt: string;
  date: string;
  region: Region;
  author: {
    name: string;
    avatar: string;
    tag?: string;
  };
  tags: string[];
  style: 'polaroid' | 'circle' | 'organic' | 'large';
  tilt: number; // degrees of rotation
  position: {
    top: string; // e.g., '15%'
    left: string; // e.g., '10%'
  };
  washiTapeColor?: string;
  likesCount?: number;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  tags?: string[];
  rotation: number;
  washiTapeColor?: string;
}
