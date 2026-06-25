import React, { useState } from 'react';
import { Region, Post } from '../types';
import { ArrowLeft, RefreshCw, Plus, X, Heart, MessageCircle, Calendar, Tag, Smile } from 'lucide-react';

interface ScrapbookScreenProps {
  region: Region;
  posts: Post[];
  userAvatar: string;
  onBack: () => void;
  onAddPost: (newPost: Post) => void;
  onViewComments: () => void;
}

const REGION_NAMES: Record<Region, string> = {
  north: '北部動態',
  central: '中部動態',
  south: '南部動態',
  east: '東部動態',
  islands: '離島動態',
  overseas: '海外動態',
};

// Preset images for adding new posts to keep it convenient and beautiful
const PRESET_POST_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', label: '深山絕壁' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', label: '黃金海岸' },
  { url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80', label: '綠野仙蹤' },
  { url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80', label: '森林樹影' },
  { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80', label: '陽光穿林' },
  { url: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80', label: '日式和風' },
];

export default function ScrapbookScreen({
  region,
  posts,
  userAvatar,
  onBack,
  onAddPost,
  onViewComments,
}: ScrapbookScreenProps) {
  const filteredPosts = posts.filter((p) => p.region === region);

  const [activePost, setActivePost] = useState<Post | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [shuffleTrigger, setShuffleTrigger] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Form states
  const [caption, setCaption] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [postStyle, setPostStyle] = useState<'polaroid' | 'circle' | 'organic'>('polaroid');
  const [selectedImgUrl, setSelectedImgUrl] = useState(PRESET_POST_IMAGES[0].url);
  const [customImgUrl, setCustomImgUrl] = useState('');

  // Squeeze/Refresh effect: shuffles placements slightly
  const handleRefresh = () => {
    setIsRotating(true);
    setShuffleTrigger((prev) => prev + 1);
    setTimeout(() => setIsRotating(false), 600);
  };

  const submitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    // Determine final image URL
    const finalUrl = customImgUrl.trim() || selectedImgUrl;

    // Random placement coordinate offsets to prevent overlap
    const topPos = Math.floor(Math.random() * 45) + 15; // 15% - 60%
    const leftPos = Math.floor(Math.random() * 50) + 10; // 10% - 60%

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace('#', ''))
      .filter((t) => t.length > 0);

    const newPost: Post = {
      id: `post-${Date.now()}`,
      imageUrl: finalUrl,
      caption: caption,
      alt: caption,
      date: new Date().toISOString().split('T')[0],
      region: region,
      author: {
        name: '旅人小明',
        avatar: userAvatar,
        tag: '#世界探索者',
      },
      tags: parsedTags.length ? parsedTags : ['旅途點滴'],
      style: postStyle,
      tilt: Math.random() * 6 - 3, // random rotation -3 to 3 degrees
      position: {
        top: `${topPos}%`,
        left: `${leftPos}%`,
      },
      washiTapeColor: `rgba(${Math.floor(Math.random() * 100) + 150}, ${
        Math.floor(Math.random() * 100) + 150
      }, 255, 0.5)`,
    };

    onAddPost(newPost);
    
    // Reset Form
    setCaption('');
    setTagsInput('');
    setPostStyle('polaroid');
    setSelectedImgUrl(PRESET_POST_IMAGES[0].url);
    setCustomImgUrl('');
    setShowAddModal(false);
  };

  return (
    <div className="page-fade-in flex flex-col h-full w-full">
      {/* Top Header Bar */}
      <div className="bg-[#fbf9f1] border-b-2 border-brand-primary-container/40 py-3 flex justify-between items-center px-4 w-full">
        <button
          onClick={onBack}
          className="bubble-fab-neutral p-2 rounded-full flex items-center justify-center border border-brand-primary/10 hover:opacity-80 active:scale-95 duration-100"
        >
          <ArrowLeft size={20} className="text-brand-primary" />
        </button>
        <h2 className="font-display font-extrabold text-xl text-brand-primary bg-brand-primary-fixed rounded-full px-5 py-1">
          {REGION_NAMES[region]}
        </h2>
        <div className="w-10"></div>
      </div>

      {/* Scrapbook Canvas Area */}
      <main className="relative flex-1 w-full bg-[#fbf9f1] overflow-hidden">
        {/* Layered Decorative Blobs/Stains to feel like an authentic scrapbook */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <div className="absolute top-[10%] right-[10%] w-60 h-60 bg-brand-secondary-container/15 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] left-[-10%] w-80 h-64 bg-brand-primary-container/20 rounded-[40%_60%_70%_30%] blur-2xl" />
          <div className="absolute top-[40%] left-[25%] w-48 h-48 bg-brand-tertiary-container/15 rounded-[60%_40%_30%_70%] blur-3xl" />
        </div>

        {/* Empty outline post box (Dashed spacer to encourage adding content) */}
        {filteredPosts.length === 0 && (
          <div className="absolute top-[35%] left-[25%] right-[25%] flex flex-col items-center justify-center p-6 border-2 border-dashed border-brand-primary/30 rounded-xl bg-brand-surface-low/30 rotate-1 select-none pointer-events-none text-center">
            <Smile size={32} className="text-brand-primary/40 mb-2 animate-bounce" />
            <p className="font-display text-sm text-brand-primary/60 font-semibold mb-1">
              這裡是空的喔！
            </p>
            <p className="font-body text-xs text-gray-400">
              點擊右下角的 + 按鈕，貼上你的第一張旅行貼紙吧！
            </p>
          </div>
        )}

        {/* Sticker List */}
        <div className="relative w-full h-full p-4 z-10 select-none">
          {filteredPosts.map((post, idx) => {
            // Apply slight random offset depending on the shuffleTrigger
            const randomOffsetTop = ((idx * 7 + shuffleTrigger * 13) % 15) - 7.5;
            const randomOffsetLeft = ((idx * 9 + shuffleTrigger * 11) % 15) - 7.5;
            
            const originalTop = parseFloat(post.position.top);
            const originalLeft = parseFloat(post.position.left);

            const dynamicTop = `${Math.min(Math.max(originalTop + randomOffsetTop, 5), 75)}%`;
            const dynamicLeft = `${Math.min(Math.max(originalLeft + randomOffsetLeft, 5), 75)}%`;

            // Style variations
            if (post.style === 'polaroid') {
              return (
                <div
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="absolute cursor-pointer active:scale-95 duration-150 transition-transform shadow-md hover:shadow-xl hover:-translate-y-1 bg-white p-2.5 pb-7 border border-brand-surface-highest rounded-sm max-w-[155px] md:max-w-[185px] z-20 group"
                  style={{
                    top: dynamicTop,
                    left: dynamicLeft,
                    transform: `rotate(${post.tilt + (shuffleTrigger % 2 === 0 ? 1.5 : -1.5)}deg)`,
                  }}
                >
                  <div className="relative w-full aspect-square bg-gray-50 overflow-hidden rounded-xs">
                    <img
                      src={post.imageUrl}
                      alt={post.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 duration-300"
                    />
                    {/* Tiny Washi Tape overlapping top border */}
                    <div
                      className="washi-tape-sticker absolute -top-2 -left-3 w-12 h-4 rotate-12"
                      style={{ backgroundColor: post.washiTapeColor || 'rgba(165, 201, 255, 0.45)' }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-gray-500 font-body font-medium truncate">
                    {post.caption}
                  </p>
                </div>
              );
            } else if (post.style === 'circle' || post.style === 'large') {
              const sizeClass = post.style === 'large' ? 'w-32 h-32 md:w-44 md:h-44' : 'w-24 h-24 md:w-36 md:h-36';
              return (
                <div
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="absolute cursor-pointer active:scale-95 duration-150 transition-transform group"
                  style={{
                    top: dynamicTop,
                    left: dynamicLeft,
                    transform: `rotate(${post.tilt + (shuffleTrigger % 2 === 0 ? -1 : 1)}deg)`,
                  }}
                >
                  <div className={`${sizeClass} rounded-full border-4 border-white overflow-hidden doodle-sticker-border transform group-hover:scale-105 transition-all bg-white relative z-20`}>
                    <img
                      src={post.imageUrl}
                      alt={post.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:rotate-2 duration-300"
                    />
                  </div>
                  {/* Washi tape hanging off to side of circular sticker */}
                  <div
                    className="washi-tape-sticker absolute -top-1 -right-3 w-10 h-3.5 z-30 rotate-45"
                    style={{ backgroundColor: post.washiTapeColor || 'rgba(165, 201, 255, 0.45)' }}
                  />
                </div>
              );
            } else {
              // 'organic' doodle hand-drawn style
              return (
                <div
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="absolute cursor-pointer active:scale-95 duration-150 transition-all group"
                  style={{
                    top: dynamicTop,
                    left: dynamicLeft,
                    transform: `rotate(${post.tilt}deg)`,
                  }}
                >
                  <div className="w-28 h-28 md:w-36 md:h-36 doodle-contour p-1.5 bg-white shadow-md relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Lavender Tag sticker on side */}
                    <div className="absolute -bottom-1 -right-1 bg-brand-secondary text-white text-[9px] font-display font-extrabold px-1.5 py-0.5 rounded-full rotate-6 shadow-sm">
                      #{post.tags[0] || '生活'}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Floating Bubble Actions in the bottom right */}
        <div className="absolute right-4 bottom-24 z-30 flex flex-col gap-4">
          <button
            onClick={handleRefresh}
            className="w-14 h-14 bg-[#f0eee6] rounded-full flex items-center justify-center bubble-fab-neutral text-brand-primary"
            title="搖一搖手帳"
          >
            <RefreshCw
              size={24}
              className={`transition-transform duration-500 ${isRotating ? 'rotate-180' : ''}`}
            />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center bubble-fab-primary"
            title="貼上新回憶"
          >
            <Plus size={28} className="text-white" />
          </button>
        </div>
      </main>

      {/* --- PHOTO DETAIL DIALOG MODAL --- */}
      {activePost && (
        <div className="fixed inset-0 bg-black/65 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#fbf9f1] rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative border-4 border-brand-primary-container/50 p-4 animate-scale-up">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-3 right-3 bg-white/85 p-1.5 rounded-full border border-gray-200 text-gray-500 hover:text-gray-800 active:scale-95 z-10"
            >
              <X size={18} />
            </button>

            {/* Polaroid visual layout inside Detail Modal */}
            <div className="bg-white p-3 rounded-lg border border-brand-surface-highest shadow-inner flex flex-col mt-4">
              <div className="w-full aspect-square bg-gray-100 overflow-hidden rounded-md relative">
                <img
                  src={activePost.imageUrl}
                  alt={activePost.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-black/40 text-white text-[10px] font-body px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                  <Calendar size={10} />
                  {activePost.date}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 pb-2 border-b border-gray-100">
                <img
                  src={activePost.author.avatar}
                  alt={activePost.author.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full border border-brand-primary/20 object-cover"
                />
                <div>
                  <p className="font-display font-extrabold text-[12px] text-brand-primary">
                    {activePost.author.name}
                  </p>
                  <p className="text-[9px] text-gray-400 font-body">
                    {activePost.author.tag || '探險者'}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm font-body text-gray-700 leading-relaxed">
                {activePost.caption}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {activePost.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-brand-primary-container/30 text-brand-on-primary-container px-2 py-0.5 rounded text-[10px] font-display font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions inside modal */}
            <div className="mt-4 flex gap-2 w-full">
              <button
                onClick={() => {
                  setActivePost(null);
                  onViewComments();
                }}
                className="flex-1 py-3 bg-brand-primary-container text-brand-on-primary-container rounded-xl font-display font-extrabold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
              >
                <MessageCircle size={16} />
                前往留言牆
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD NEW POST DIALOG MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/55 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#fbf9f1] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative border-4 border-brand-primary-container p-5 my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 bg-white/80 p-1.5 rounded-full border border-gray-200 text-gray-400 hover:text-gray-700 active:scale-95"
            >
              <X size={18} />
            </button>

            <h3 className="font-display font-extrabold text-lg text-brand-primary mb-4 flex items-center gap-1.5">
              <span>建立新旅程貼紙</span>
            </h3>

            <form onSubmit={submitPost} className="space-y-4">
              {/* Photo Style Picker */}
              <div>
                <label className="block text-xs font-display font-extrabold text-brand-tertiary mb-2">
                  貼紙視覺風格
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['polaroid', 'circle', 'organic'] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setPostStyle(style)}
                      className={`py-2 px-3 text-xs font-display font-bold rounded-xl border-2 transition-all ${
                        postStyle === style
                          ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-brand-primary-container'
                      }`}
                    >
                      {style === 'polaroid' ? '拍立得' : style === 'circle' ? '圓形貼' : '手繪塗鴉'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Select Slider */}
              <div>
                <label className="block text-xs font-display font-extrabold text-brand-tertiary mb-2">
                  選擇旅行回憶照片
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {PRESET_POST_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => {
                        setSelectedImgUrl(img.url);
                        setCustomImgUrl('');
                      }}
                      className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImgUrl === img.url && !customImgUrl
                          ? 'border-brand-primary scale-95 shadow-sm'
                          : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-2">
                  <span className="text-[10px] text-gray-400 font-body block mb-1">
                    或者，您也可以貼上自訂圖片網址：
                  </span>
                  <input
                    type="url"
                    value={customImgUrl}
                    onChange={(e) => setCustomImgUrl(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="w-full text-xs p-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-brand-primary text-gray-700 font-body"
                  />
                </div>
              </div>

              {/* Caption Description */}
              <div>
                <label className="block text-xs font-display font-extrabold text-brand-tertiary mb-1">
                  寫下你的旅行手帳記述
                </label>
                <textarea
                  required
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="這一刻在太魯閣吹著涼爽的山風，看著壯闊溪谷，真的太幸福了..."
                  className="w-full text-sm p-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-brand-primary text-gray-700 font-body placeholder:text-gray-300 leading-relaxed resize-none"
                />
              </div>

              {/* Hashtags Input */}
              <div>
                <label className="block text-xs font-display font-extrabold text-brand-tertiary mb-1">
                  旅行標籤 (以逗號隔開)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="看海, 花蓮旅遊, 暑假生活"
                  className="w-full text-xs p-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-brand-primary text-gray-700 font-body"
                />
              </div>

              {/* Submit Bubble Button */}
              <button
                type="submit"
                className="w-full py-3 bg-brand-primary text-white font-display font-extrabold rounded-xl active:scale-95 shadow-md flex items-center justify-center gap-1 duration-100 mt-2"
              >
                <span>將貼紙黏在手帳上</span>
                <Plus size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
