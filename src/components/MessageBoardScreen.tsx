import React, { useState, useRef, useEffect } from 'react';
import { Comment } from '../types';
import { Send, Smile, Calendar, BookOpen, Clock } from 'lucide-react';

interface MessageBoardScreenProps {
  comments: Comment[];
  userDisplayName: string;
  userAvatar: string;
  onAddComment: (newComment: Comment) => void;
}

export default function MessageBoardScreen({
  comments,
  userDisplayName,
  userAvatar,
  onAddComment,
}: MessageBoardScreenProps) {
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when a new comment is added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace('#', ''))
      .filter((t) => t.length > 0)
      .map((t) => `#${t}`);

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorName: userDisplayName,
      authorAvatar: userAvatar,
      content: content.trim(),
      timestamp: '剛剛',
      tags: parsedTags.length ? parsedTags : undefined,
      rotation: Math.random() * 3 - 1.5, // Random tilt between -1.5deg and 1.5deg
      washiTapeColor: `rgba(${Math.floor(Math.random() * 100) + 140}, ${
        Math.floor(Math.random() * 100) + 140
      }, 255, 0.55)`,
    };

    onAddComment(newComment);
    setContent('');
    setTagsInput('');
  };

  return (
    <div className="page-fade-in flex flex-col h-full w-full bg-[#fbf9f1] relative">
      
      {/* Sticky Section Title Header */}
      <div className="sticky top-0 z-10 bg-[#fbf9f1]/90 backdrop-blur-md px-4 py-4 border-b border-brand-surface-highest">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-brand-tertiary-container rounded-full flex items-center justify-center rotate-[-6deg] border-2 border-brand-tertiary shadow-sm">
            <BookOpen size={20} className="text-brand-on-tertiary-container animate-pulse" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-base text-gray-800 leading-none">留言牆</h2>
            <span className="text-[10px] text-gray-400 font-body">Share travel diaries & stationery notes</span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-brand-surface-container rounded-full mt-3 overflow-hidden">
          <div className="w-1/3 h-full bg-brand-primary rounded-full"></div>
        </div>
      </div>

      {/* Timeline Scroll Area */}
      <main className="flex-1 px-4 pt-4 pb-48 overflow-y-auto no-scrollbar relative">
        <div className="relative pl-6 space-y-8 max-w-lg mx-auto">
          {/* Central Connecting Timeline Dotted Thread */}
          <div className="absolute left-[7px] top-4 bottom-4 w-1 border-l-2 border-dashed border-brand-primary/30 z-0" />

          {comments.map((comment, idx) => {
            const isLatest = idx === comments.length - 1;
            
            return (
              <div key={comment.id} className="relative z-10">
                {/* Timeline circle marker */}
                <div 
                  className={`absolute -left-[23px] top-3.5 w-4.5 h-4.5 rounded-full z-20 border-2 transition-all ${
                    isLatest 
                      ? 'bg-brand-primary border-brand-primary shadow-sm ring-4 ring-brand-primary-container/40' 
                      : 'bg-brand-primary-container border-brand-primary'
                  }`} 
                />

                {/* Overlapping Sticky Note */}
                <div
                  className="bg-white p-4 rounded-xl border border-brand-surface-highest shadow-sm relative transition-all hover:scale-[1.01] hover:shadow-md"
                  style={{
                    transform: `rotate(${comment.rotation}deg)`,
                  }}
                >
                  {/* Visual Washi-tape on top */}
                  <div 
                    className="washi-tape-sticker absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-4.5 rotate-[-2deg] z-10"
                    style={{ backgroundColor: comment.washiTapeColor || 'rgba(165, 201, 255, 0.5)' }}
                  />

                  {/* Comment Author Header */}
                  <div className="flex items-center gap-3.5 mb-2.5 mt-1">
                    <img
                      className="w-9 h-9 rounded-full border border-brand-primary/10 object-cover shadow-xs"
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-display font-extrabold text-[12px] text-brand-primary leading-tight">
                        {comment.authorName}
                      </p>
                      <p className="text-[9px] text-gray-400 font-body flex items-center gap-0.5 mt-0.5">
                        <Clock size={8} />
                        {comment.timestamp}
                      </p>
                    </div>
                  </div>

                  {/* Comment body */}
                  <p className="font-body text-xs text-gray-700 leading-relaxed break-words whitespace-pre-line">
                    {comment.content}
                  </p>

                  {/* Tag chips */}
                  {comment.tags && comment.tags.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {comment.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-brand-surface-low text-brand-tertiary px-2 py-0.5 rounded text-[9px] font-display font-bold border border-brand-surface-highest/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Scrolling anchor */}
          <div ref={scrollRef} />
        </div>
      </main>

      {/* Lined-Notebook Floating Input Container */}
      <div className="absolute bottom-[96px] left-0 w-full px-4 z-20">
        <div className="max-w-md mx-auto bg-white border-2 border-brand-primary-container rounded-2xl p-3 shadow-lg">
          <form onSubmit={handleSend} className="space-y-2.5">
            {/* Handwriting lined text input */}
            <div className="relative rounded-lg overflow-hidden border border-gray-100 bg-brand-surface-low/20">
              <textarea
                required
                rows={1}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="寫下你的旅行點滴..."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 placeholder:text-gray-300 p-2.5 min-h-[44px] max-h-[120px] resize-none leading-[28px] font-body text-xs lined-notebook"
              />
            </div>

            {/* Optional extra tags tag-field */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="貼紙手帳, 咖啡日誌 (標籤選項，以逗號隔開)"
                className="flex-1 bg-brand-surface-low/40 rounded-lg border-none text-[10px] p-2 focus:outline-none focus:ring-1 focus:ring-brand-primary text-gray-500 font-body placeholder:text-gray-300"
              />
              <button
                type="submit"
                className="bubble-btn-primary w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                title="送出留言"
              >
                <Send size={16} className="text-brand-on-primary-container" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
