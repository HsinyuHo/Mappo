import React, { useState } from 'react';
import { UserProfile } from '../types';
import { presetAvatars } from '../data';
import { ArrowLeft, Sparkles, Edit, BookOpen, Check, Camera, Image, X } from 'lucide-react';

interface ProfileScreenProps {
  profile: UserProfile;
  onBack: () => void;
  onSave: (updated: UserProfile) => void;
}

export default function ProfileScreen({ profile, onBack, onSave }: ProfileScreenProps) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [tag, setTag] = useState(profile.tag);
  
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showAvatarCarousel, setShowAvatarCarousel] = useState(false);
  const [customAvatarUrl, setCustomImgUrl] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleSave = () => {
    onSave({
      username: profile.username,
      displayName: displayName.trim(),
      bio: bio.trim(),
      avatarUrl: avatarUrl,
      tag: tag.trim(),
    });

    setToastMessage('手帳個人設定已成功儲存！✨');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const selectAvatar = (url: string) => {
    setAvatarUrl(url);
    setShowBottomSheet(false);
    setShowAvatarCarousel(false);
  };

  const handleCustomAvatarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAvatarUrl.trim()) {
      setAvatarUrl(customAvatarUrl.trim());
      setCustomImgUrl('');
      setShowBottomSheet(false);
      setShowAvatarCarousel(false);
    }
  };

  return (
    <div className="page-fade-in flex flex-col h-full w-full bg-[#fbf9f1] pb-12 overflow-y-auto no-scrollbar">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 bg-brand-primary text-white text-xs font-display font-bold py-3 px-4 rounded-xl shadow-xl z-50 flex items-center justify-center gap-1.5 animate-bounce">
          <Check size={14} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top AppBar */}
      <div className="bg-[#fbf9f1] border-b-2 border-brand-surface-highest py-3 flex justify-between items-center px-4 w-full sticky top-0 z-40 backdrop-blur-md">
        <button
          onClick={onBack}
          className="bubble-fab-neutral p-2 rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-brand-primary" />
        </button>
        <h1 className="font-display font-extrabold text-lg text-brand-primary bg-brand-primary-fixed rounded-full px-5 py-1">
          個人資料
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Main Form Area */}
      <main className="flex-1 px-4 py-6 space-y-6 max-w-md mx-auto w-full">
        
        {/* Avatar Polaroid Frame section */}
        <section className="flex flex-col items-center space-y-3">
          <div 
            onClick={() => setShowBottomSheet(true)}
            className="relative cursor-pointer group select-none"
          >
            {/* Polaroid frame */}
            <div className="bg-white p-3 pb-6 shadow-md border border-brand-surface-highest rounded-sm rotate-[1.5deg] hover:rotate-0 hover:scale-105 duration-200 transition-all">
              <div className="w-32 h-32 overflow-hidden bg-brand-surface-container rounded-sm border-2 border-brand-primary-container relative">
                <img
                  className="w-full h-full object-cover"
                  src={avatarUrl}
                  alt={displayName}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera size={24} className="text-white animate-pulse" />
                </div>
              </div>
              <p className="text-center mt-2.5 font-display text-[10px] text-gray-400 italic">
                Tap to update
              </p>
            </div>

            {/* Sparkles doodle overlay */}
            <div className="absolute -top-3.5 -right-3 text-brand-primary opacity-45 pointer-events-none select-none">
              <Sparkles size={32} className="animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          <div className="text-center space-y-1">
            {/* Display Name input */}
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="輸入名稱..."
              className="text-center font-display font-extrabold text-lg text-gray-800 focus:outline-none border-b border-transparent focus:border-brand-primary bg-transparent px-2 py-0.5"
            />
            
            {/* Tag / Motto badge */}
            <div className="flex items-center justify-center">
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="#世界探索者"
                className="washi-tape-sticker bg-brand-secondary-container/45 text-brand-on-secondary-container text-[11px] font-display font-bold text-center px-4 py-1 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-secondary"
              />
            </div>
          </div>
        </section>

        {/* Biography Diary text block */}
        <section className="space-y-1.5">
          <label className="font-display font-extrabold text-xs text-brand-tertiary flex items-center gap-1 px-1">
            <Edit size={14} />
            <span>我的旅行宣言</span>
          </label>
          
          <div className="relative bg-white border-2 border-brand-surface-highest rounded-xl p-4 shadow-inner overflow-hidden">
            {/* Custom notebook line details */}
            <div className="lined-notebook absolute inset-0 pointer-events-none opacity-25 z-0" />
            
            <textarea
              maxLength={200}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="寫下你的旅行宣示，或者收藏的感動點滴..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[120px] relative z-10 font-body text-xs text-gray-700 placeholder:text-gray-300 leading-[28px] focus:outline-none"
            />
            
            <div className="absolute bottom-2.5 right-3 text-[10px] text-gray-400 font-display opacity-80 z-10">
              <span>{bio.length}</span>/200
            </div>
          </div>
        </section>

        {/* Action Button: Save settings */}
        <section className="pt-2">
          <button
            onClick={handleSave}
            disabled={!displayName.trim()}
            className="bubble-btn-primary bg-brand-primary text-white w-full py-3.5 rounded-xl font-display font-extrabold text-base shadow-md active:scale-95 disabled:opacity-50"
          >
            儲存變更
          </button>
        </section>
      </main>

      {/* --- AVATAR BOTTOM SHEET POPUP --- */}
      {showBottomSheet && (
        <>
          {/* Overlay mask */}
          <div
            onClick={() => {
              setShowBottomSheet(false);
              setShowAvatarCarousel(false);
            }}
            className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 backdrop-blur-xs"
          />

          {/* Bottom sheet dialog panel */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#fbf9f1] rounded-t-2xl z-55 p-5 space-y-4 border-t-4 border-brand-primary-container shadow-2xl max-w-md mx-auto animate-slide-up">
            <div className="w-12 h-1.5 bg-brand-surface-highest rounded-full mx-auto mb-2" />
            
            <h2 className="font-display font-extrabold text-base text-gray-800 text-center">
              更換手帳大頭貼
            </h2>

            {!showAvatarCarousel ? (
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => setShowAvatarCarousel(true)}
                  className="flex items-center gap-4 p-3.5 bg-white border border-brand-surface-highest rounded-xl hover:bg-brand-surface-low transition-colors group text-left"
                >
                  <div className="bg-brand-primary-container p-3 rounded-full text-brand-on-primary-container group-active:scale-90 transition-transform">
                    <Image size={18} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-xs text-gray-800">從手帳角色庫選擇</p>
                    <p className="text-[10px] text-gray-400 font-body">選一個可愛的塗鴉旅人當作你的化身</p>
                  </div>
                </button>

                <div className="p-3.5 bg-white border border-brand-surface-highest rounded-xl">
                  <p className="font-display font-bold text-xs text-gray-800 mb-2 flex items-center gap-1">
                    <Camera size={14} className="text-brand-secondary" />
                    <span>輸入自訂圖片網址</span>
                  </p>
                  <form onSubmit={handleCustomAvatarSubmit} className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={customAvatarUrl}
                      onChange={(e) => setCustomImgUrl(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="flex-1 text-xs p-2 bg-brand-surface-low rounded-lg border border-gray-100 focus:outline-none focus:border-brand-primary font-body"
                    />
                    <button
                      type="submit"
                      className="bg-brand-secondary text-white text-xs px-3.5 rounded-lg font-display font-bold hover:bg-brand-secondary/95 active:scale-95"
                    >
                      套用
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-xs text-brand-tertiary">選擇塗鴉角色：</span>
                  <button 
                    onClick={() => setShowAvatarCarousel(false)}
                    className="text-xs text-brand-primary font-display font-bold hover:underline"
                  >
                    返回
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {presetAvatars.map((av) => (
                    <button
                      key={av.name}
                      onClick={() => selectAvatar(av.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-white ${
                        avatarUrl === av.url ? 'border-brand-primary scale-95' : 'border-gray-200 hover:border-brand-primary-container'
                      }`}
                      title={av.name}
                    >
                      <img
                        src={av.url}
                        alt={av.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setShowBottomSheet(false);
                setShowAvatarCarousel(false);
              }}
              className="w-full py-2.5 text-center font-display font-bold text-xs text-gray-400 hover:text-gray-600 transition-colors pt-2 border-t border-gray-100 mt-2"
            >
              取消
            </button>
          </div>
        </>
      )}
    </div>
  );
}
