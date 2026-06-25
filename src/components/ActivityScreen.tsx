import React, { useState } from 'react';
import { Post } from '../types';
import { MessageSquare, MapPin, MoreHorizontal, Heart, Map, Smile } from 'lucide-react';

interface ActivityScreenProps {
  posts: Post[];
  onViewComments: () => void;
  onGoToExplore: () => void;
  onToggleLike: (postId: string) => void;
}

export default function ActivityScreen({
  posts,
  onViewComments,
  onGoToExplore,
  onToggleLike,
}: ActivityScreenProps) {
  // 依據 id 降序排序，確保最新發表貼文在最上方
  const sortedPosts = [...posts].sort((a, b) => b.id.localeCompare(a.id));

  const toggleLike = (postId: string) => {
    onToggleLike(postId);
  };

  return (
    <div className="page-fade-in flex flex-col h-full w-full max-w-2xl mx-auto px-4 pt-4 pb-28 space-y-6 overflow-y-auto no-scrollbar">
      
      {/* Official Post (Mappo Announcement Card) */}
      <article className="bg-white rounded-2xl overflow-hidden border-2 border-brand-surface-highest relative shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-primary-container flex items-center justify-center border border-brand-primary/10">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoKdY8AbKnVFyLcOm-h0oElmQX0jqiY1iyFG63OAySAme6u7yefNsMFTilTQCZAamQHcjQFlMbMNlKjlL3ukElG1wSzj8jZcw3soklfAkHuahMEaE9SwuLgBVPnxXWgyze_xHOEVHym6fLHlpW5NBhVNkVlLzQ5ruk4PlLnjGH74z-KkmZT4KmH8EqJskNrkR9kYQe1hBYzsE1lvDJRDJtfcaA88UUgpxINc0Kqw4a_53-ncgLYlPshEEfwsIdsZn6n4j4IMkYkA"
              alt="Mappo Official Logo"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xs text-brand-primary">Mappo 官方</span>
            <span className="font-body text-[10px] text-gray-400 flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
              • 台灣
            </span>
          </div>
          <button className="ml-auto text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Content Image with Polaroid Style Frame */}
        <div className="px-4">
          <div className="relative bg-brand-surface-low/30 p-2.5 rounded-lg border border-brand-surface-highest rotate-[-0.5deg]">
            {/* Washi Tape Pinning top border */}
            <div className="washi-tape-sticker absolute -top-1.5 -left-3 w-16 h-5 rotate-[-12deg] z-10" />
            
            <div className="w-full aspect-[4/3] rounded-sm overflow-hidden bg-gray-50 border border-brand-surface-highest">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHBDd49koknv3FJGuKWc5GsK_Yi3FEIEu036ET4pkGnWA0_-AwO7J4ML3asRn3cJfFcwsN31gg4hJxkMEGZFAY1e9-xwji3V5IMS4Ah3UmhA3Z36Cc0nJ7u8d0kBRa8sqnBAmTl-NJgCdqZi5e8Xrb5_FSAXvbOtrqtCX4Oc3NiYcv0kJBsr4bc0XYXRo0_7LORxpB_5z46n4vtItbC-80m7A1AZYvZcBqudxyRghZpWKeqAtfJ1EQCLHlTpYK_DrLoKrBlY4aKQ"
                alt="Taiwan lush green valley"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="p-4 pt-3 space-y-3">
          <p className="font-body text-xs text-gray-700 leading-relaxed">
            <span className="font-display font-black text-brand-primary mr-1">Mappo</span>
            感謝各位試用測試版 Mappo，這個頁面將會顯示追蹤對象的貼文。追蹤功能尚未開放，敬請期待！現在可以在留言區聊聊，或到探索頁地圖分享景色，也可以發表意見壯大區域勢力聲量 xD
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={onViewComments}
              className="bubble-btn-primary px-4 py-2 rounded-full font-display font-extrabold text-xs flex items-center justify-center gap-1 shrink-0 shadow-sm"
            >
              <MessageSquare size={14} />
              <span>留言</span>
            </button>
            
            <button
              onClick={onGoToExplore}
              className="inline-flex items-center justify-center text-xs text-brand-primary font-display font-bold hover:underline transition-all gap-1 py-1"
            >
              <Map size={14} className="animate-pulse" />
              <span>前往探索地圖</span>
            </button>
          </div>
        </div>
      </article>

      {/* User Posts Timeline Feed */}
      <div className="space-y-6 pt-2">
        <h3 className="font-display font-extrabold text-sm text-brand-tertiary flex items-center gap-1.5 px-1">
          <Smile size={16} />
          <span>最新旅人動態</span>
        </h3>

        {sortedPosts.map((post) => {
          const isLiked = !!post.isLiked;
          const postLikes = post.likesCount || 0;

          return (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border-2 border-brand-surface-highest relative shadow-sm transition-transform hover:scale-[1.005] duration-200"
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4">
                <img
                  className="w-10 h-10 rounded-full border border-brand-primary-container object-cover"
                  src={post.author.avatar}
                  alt={post.author.name}
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-xs text-brand-primary">
                    {post.author.name}
                  </span>
                  <span className="font-body text-[10px] text-gray-400 flex items-center gap-0.5">
                    <MapPin size={10} className="text-brand-tertiary" />
                    {post.date}
                  </span>
                </div>
                <button className="ml-auto text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Photo Area */}
              <div className="px-4">
                <div className="relative bg-brand-surface-low/35 p-2 rounded-lg border border-brand-surface-highest">
                  <div className="w-full aspect-square rounded-sm overflow-hidden bg-gray-50 border border-brand-surface-highest">
                    <img
                      className="w-full h-full object-cover"
                      src={post.imageUrl}
                      alt={post.alt}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Small stamp tape overlay */}
                  <div
                    className="washi-tape-sticker absolute top-3 right-3 px-2 py-0.5 text-[8px] font-display font-extrabold text-brand-primary rounded-xs rotate-6"
                    style={{ backgroundColor: post.washiTapeColor || 'rgba(165, 201, 255, 0.45)' }}
                  >
                    #{post.tags[0]}
                  </div>
                </div>
              </div>

              {/* Caption & Actions */}
              <div className="p-4 pt-3">
                <p className="font-body text-xs text-gray-700 leading-relaxed">
                  <span className="font-display font-bold text-brand-primary mr-1">
                    {post.author.name}
                  </span>
                  {post.caption}
                </p>

                {/* Likes / Comments Counters */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-brand-surface-highest text-gray-400 text-xs">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1 font-display font-extrabold transition-all hover:scale-105 active:scale-90 ${
                      isLiked ? 'text-rose-500' : 'hover:text-rose-500'
                    }`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    <span>{postLikes}</span>
                  </button>

                  <button
                    onClick={onViewComments}
                    className="flex items-center gap-1 font-display font-extrabold hover:text-brand-primary transition-all"
                  >
                    <MessageSquare size={16} />
                    <span>留言</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer message */}
      <footer className="pt-6 pb-4 text-center">
        <a
          href="https://ai.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-xs text-gray-400 hover:text-brand-primary transition-colors inline-flex items-center gap-1"
        >
          <span>意見回饋 Mappo v1.0.0</span>
          <Smile size={12} />
        </a>
      </footer>
    </div>
  );
}
