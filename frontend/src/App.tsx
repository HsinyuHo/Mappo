import React, { useState, useEffect } from 'react';
import { Region, Post, Comment, UserProfile } from './types';
import { initialUserProfile } from './data';
import MapScreen from './components/MapScreen';
import ScrapbookScreen from './components/ScrapbookScreen';
import ActivityScreen from './components/ActivityScreen';
import MessageBoardScreen from './components/MessageBoardScreen';
import ProfileScreen from './components/ProfileScreen';
import AuthScreen from './components/AuthScreen';
import { Compass, MessageSquare, User, LogOut } from 'lucide-react';
import { apiClient } from './api/client';
import JourneyIntro from './components/JourneyIntro';

type Tab = 'explore' | 'activity' | 'profile';

export default function App() {
  // 登入狀態與載入狀態
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [showJourneyIntro, setShowJourneyIntro] = useState<boolean>(false);

  // 貼文與留言狀態
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // 導覽狀態
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [viewingComments, setViewingComments] = useState<boolean>(false);

  // 初始載入與 Token 驗證
  useEffect(() => {
    const token = localStorage.getItem('mappo_token');
    const fetchInitialData = async () => {
      try {
        if (token) {
          const profile = await apiClient.auth.getMe();
          setUserProfile(profile);
          setIsLoggedIn(true);
        }

        // 載入貼文與留言
        const allPosts = await apiClient.posts.getAll();
        const allComments = await apiClient.comments.getAll();
        setPosts(allPosts);
        setComments(allComments);
      } catch (error) {
        console.error("初始化資料失敗", error);
        if (token) {
          localStorage.removeItem('mappo_token');
          setIsLoggedIn(false);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [isLoggedIn]);

  const saveProfileState = async (updated: UserProfile) => {
    try {
      const profile = await apiClient.auth.updateProfile({
        displayName: updated.displayName,
        bio: updated.bio,
        avatarUrl: updated.avatarUrl,
        tag: updated.tag,
      });
      setUserProfile(profile);
    } catch (error) {
      alert(error instanceof Error ? error.message : "更新個人檔案失敗");
    }
  };

  const handleAddPost = async (newPost: Post) => {
    try {
      const created = await apiClient.posts.create({
        id: newPost.id,
        imageUrl: newPost.imageUrl,
        caption: newPost.caption,
        alt: newPost.alt || "",
        date: newPost.date,
        region: newPost.region,
        tags: newPost.tags,
        style: newPost.style,
        tilt: newPost.tilt,
        position: newPost.position,
        washiTapeColor: newPost.washiTapeColor,
      });
      setPosts([created, ...posts]);
    } catch (error) {
      alert(error instanceof Error ? error.message : "發表貼文失敗");
    }
  };

  const handleAddComment = async (newComment: Comment) => {
    try {
      const created = await apiClient.comments.create({
        id: newComment.id,
        content: newComment.content,
        timestamp: newComment.timestamp,
        tags: newComment.tags,
        rotation: newComment.rotation,
        washiTapeColor: newComment.washiTapeColor,
      });
      setComments([...comments, created]);
    } catch (error) {
      alert(error instanceof Error ? error.message : "發表留言失敗");
    }
  };

  const handleToggleLike = async (postId: string) => {
    try {
      const res = await apiClient.posts.toggleLike(postId);
      setPosts(prevPosts => prevPosts.map(p => p.id === postId ? { ...p, likesCount: res.likesCount, isLiked: res.isLiked } : p));
    } catch (error) {
      alert(error instanceof Error ? error.message : "按讚失敗，請確認是否已登入！");
    }
  };

  const handleLogin = (token: string, profile: UserProfile, shouldShowJourneyIntro = false) => {
    localStorage.setItem('mappo_token', token);
    setUserProfile(profile);
    setIsLoggedIn(true);
    setActiveTab('explore');
    setShowJourneyIntro(shouldShowJourneyIntro);
  };

  const handleLogout = () => {
    localStorage.removeItem('mappo_token');
    setIsLoggedIn(false);
    setSelectedRegion(null);
    setViewingComments(false);
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbf9f1] text-brand-primary">
        <div className="w-12 h-12 rounded-full border-4 border-brand-primary-container border-t-brand-primary animate-spin"></div>
        <p className="mt-4 font-display font-bold text-sm text-gray-500">正在翻開手帳本...</p>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen flex flex-col bg-[#fbf9f1] text-[#1b1c17] select-none selection:bg-[#a5c9ff] relative overflow-hidden">

      {/* If the traveler is not logged in, render authentication screens */}
      {!isLoggedIn ? (
        <AuthScreen onLoginSuccess={handleLogin} />
      ) : showJourneyIntro ? (
        <JourneyIntro
          onFinish={() => {
            setShowJourneyIntro(false);
            setActiveTab('explore');
          }}
        />
      ) : (
        <div className="flex flex-col h-screen overflow-hidden">

          {/* Top Mappo Logo Brand Bar (Visible except when viewing details like scrapbook back buttons are overlayed) */}
          {!(activeTab === 'explore' && selectedRegion) && (
            <header className="bg-[#fbf9f1] border-b-2 border-[#e4e3db] docked sticky top-0 flex justify-between items-center px-5 py-2.5 w-full z-40 select-none shadow-xs">
              {/* Optional logout button to let the tester try the registration/login views! */}
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-rose-500 active:scale-95 duration-100 p-2 rounded-full hover:bg-rose-50"
                title="登出切換帳號"
              >
                <LogOut size={16} />
              </button>

              <div
                onClick={() => {
                  setSelectedRegion(null);
                  setViewingComments(false);
                  setActiveTab('explore');
                }}
                className="font-display font-extrabold text-[22px] text-brand-primary bg-[#d4e3ff] rounded-full px-5 py-0.5 shadow-sm border border-white cursor-pointer active:scale-95 duration-150"
              >
                Mappo
              </div>

              <div className="w-8"></div>
            </header>
          )}

          {/* Core App View switcher */}
          <div className="flex-1 overflow-hidden relative">

            {/* EXPLORE TAB: Interactive Map or Selected Region Scrapbook */}
            {activeTab === 'explore' && (
              <div className="h-full w-full overflow-y-auto no-scrollbar">
                {selectedRegion ? (
                  <ScrapbookScreen
                    region={selectedRegion}
                    posts={posts}
                    userAvatar={userProfile.avatarUrl}
                    onBack={() => setSelectedRegion(null)}
                    onAddPost={handleAddPost}
                    onViewComments={() => {
                      setSelectedRegion(null);
                      setViewingComments(true);
                      setActiveTab('activity');
                    }}
                  />
                ) : (
                  <MapScreen
                    onSelectRegion={(region) => {
                      setSelectedRegion(region);
                    }}
                  />
                )}
              </div>
            )}

            {/* ACTIVITY FEED TAB: Social feed or Comments Message Board */}
            {activeTab === 'activity' && (
              <div className="h-full w-full overflow-hidden">
                {viewingComments ? (
                  <div className="h-full flex flex-col">
                    {/* Top sub-header back button */}
                    <div className="bg-[#fbf9f1] border-b border-brand-surface-highest py-2 flex items-center px-4 w-full z-20 shrink-0">
                      <button
                        onClick={() => setViewingComments(false)}
                        className="p-1 bg-white rounded-full border border-brand-surface-highest hover:bg-brand-surface-low text-brand-primary active:scale-90 duration-100 flex items-center justify-center"
                      >
                        <ArrowLeftIcon />
                      </button>
                      <span className="font-display text-xs text-brand-primary bg-brand-primary-fixed rounded-full px-3 py-0.5 ml-3 font-bold">
                        回上一頁
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <MessageBoardScreen
                        comments={comments}
                        userDisplayName={userProfile.displayName}
                        userAvatar={userProfile.avatarUrl}
                        onAddComment={handleAddComment}
                      />
                    </div>
                  </div>
                ) : (
                  <ActivityScreen
                    posts={posts}
                    onViewComments={() => setViewingComments(true)}
                    onGoToExplore={() => setActiveTab('explore')}
                    onToggleLike={handleToggleLike}
                  />
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="h-full w-full overflow-hidden">
                <ProfileScreen
                  profile={userProfile}
                  onBack={() => setActiveTab('explore')}
                  onSave={saveProfileState}
                />
              </div>
            )}
          </div>

          {/* Floating Pill Bottom Navigation Bar Dock */}
          {/* Hidden when viewing deep sub-pages like comments board to ensure smooth keyboard layout spacing */}
          {!viewingComments && !(activeTab === 'explore' && selectedRegion) && (
            <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-6 pt-2 bg-[#f0eee6] border-t-4 border-brand-primary-container shadow-md">

              {/* Explore Tab button */}
              <button
                onClick={() => {
                  setSelectedRegion(null);
                  setActiveTab('explore');
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-[72px] ${activeTab === 'explore'
                  ? 'bg-brand-primary-container text-brand-on-primary-container translate-y-[-4px] shadow-[0_4px_0_0_rgba(59,96,143,1)] font-extrabold'
                  : 'text-gray-500 hover:bg-brand-surface-highest/40'
                  }`}
              >
                <Compass size={18} fill={activeTab === 'explore' ? 'currentColor' : 'none'} />
                <span className="font-display text-[10px] mt-1">探索</span>
              </button>

              {/* Activity Tab button */}
              <button
                onClick={() => {
                  setViewingComments(false);
                  setActiveTab('activity');
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-[72px] ${activeTab === 'activity'
                  ? 'bg-brand-primary-container text-brand-on-primary-container translate-y-[-4px] shadow-[0_4px_0_0_rgba(59,96,143,1)] font-extrabold'
                  : 'text-gray-500 hover:bg-brand-surface-highest/40'
                  }`}
              >
                <MessageSquare size={18} fill={activeTab === 'activity' ? 'currentColor' : 'none'} />
                <span className="font-display text-[10px] mt-1">動態</span>
              </button>

              {/* Profile Tab button */}
              <button
                onClick={() => {
                  setActiveTab('profile');
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-[72px] ${activeTab === 'profile'
                  ? 'bg-brand-primary-container text-brand-on-primary-container translate-y-[-4px] shadow-[0_4px_0_0_rgba(59,96,143,1)] font-extrabold'
                  : 'text-gray-500 hover:bg-brand-surface-highest/40'
                  }`}
              >
                <User size={18} fill={activeTab === 'profile' ? 'currentColor' : 'none'} />
                <span className="font-display text-[10px] mt-1">個人資料</span>
              </button>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

// Inline minimalist svg icon to avoid extra lucide exports if needed
function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );
}
