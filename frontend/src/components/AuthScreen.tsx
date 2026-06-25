import React, { useState } from 'react';
import { UserPlus, LogIn, ArrowLeft, User, Lock, Map, Smile, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';
import { apiClient } from '../api/client';

interface AuthScreenProps {
  onLoginSuccess: (token: string, user: UserProfile, shouldShowJourneyIntro?: boolean) => void;
}

type AuthView = 'welcome' | 'login' | 'register';

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [currentView, setCurrentView] = useState<AuthView>('welcome');

  // Input states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 用於儲存註冊成功後的 token 與用戶資料，以便 popup 點擊後直接登入
  const [registeredToken, setRegisteredToken] = useState('');
  const [registeredUser, setRegisteredUser] = useState<UserProfile | null>(null);

  // Dialog popups
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Custom format validation for Username: 3-20 digits or letters
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setErrorMessage('使用者名稱不符！請輸入 3 至 20 位英文字母或數字。');
      setShowErrorPopup(true);
      return;
    }

    if (password.length < 6) {
      setErrorMessage('密碼太短！請輸入至少 6 位英文字母或數字。');
      setShowErrorPopup(true);
      return;
    }

    setIsSubmitting(true);
    // 註冊後自動登入
    apiClient.auth.register({
      username: username.trim(),
      password: password,
      display_name: username.trim(),
    })
      .then(() => {
        return apiClient.auth.login({ username: username.trim(), password });
      })
      .then((res) => {
        setRegisteredToken(res.access_token);
        setRegisteredUser(res.user);
        setShowSuccessPopup(true);
      })
      .catch((err) => {
        setErrorMessage(err.message || '註冊失敗！該帳號可能已被註冊。');
        setShowErrorPopup(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsSubmitting(true);
    apiClient.auth.login({ username: username.trim(), password })
      .then((res) => {
        onLoginSuccess(res.access_token, res.user);
      })
      .catch((err) => {
        setErrorMessage(err.message || '登入失敗，請確認帳號或密碼是否正確！');
        setShowErrorPopup(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="page-fade-in flex flex-col items-center justify-center min-h-screen bg-[#fbf9f1] px-4 py-8 relative">

      {/* Decorative Floating stroke background details */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden">
        <div className="absolute top-[8%] left-[5%] w-32 h-32 text-brand-primary">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M10,50 Q40,10 90,50" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute bottom-[18%] right-4 w-48 h-48 text-brand-secondary">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M20,20 C50,80 80,20 90,90" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* --- WELCOME LANDING SCREEN VIEW --- */}
      {currentView === 'welcome' && (
        <main className="relative z-10 w-full max-w-sm flex flex-col items-center text-center space-y-8 animate-scale-up">
          {/* Logo container */}
          <div className="px-8 py-3 bg-brand-primary-fixed rounded-full flex items-center justify-center shadow-[0_4px_0_0_#3b608f] border-4 border-white">
            <span className="text-brand-primary font-display font-extrabold text-2xl tracking-tight">Mappo</span>
          </div>

          {/* Central Illustrations collage */}
          <div className="relative w-full aspect-square max-w-[260px] flex items-center justify-center my-2">

            {/* Background Cute neighborhood map sticker */}
            <div className="absolute w-48 h-48 bg-white p-2 rounded-lg shadow-sm border border-brand-surface-highest rotate-[-1.5deg] flex flex-col items-center justify-center">
              <div
                className="w-full h-full rounded-md bg-brand-secondary-container bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNL93yEIB58ZNOppbQPu5GJXt5WjZUI2Sk6qiGxzu5gyCBwZV78yN5FOw1gEvB7_PJ6uenR3hjEQf5zhuX7FJ5WaoiKfOvLBef6fjA0NQrlGenuGVo78pqY-T-GPXmT0k4cBfoDX_a8Ao-x0r37haJj01uKljBbkXIp2TP8gzp6Vcf6_NqHjKMOrOB0YVqdCcE0ZcIQWFs-6oqPWD28ykPiJsMEy0qXeibmiIH5NPPai48GunK5cEKWdoU2j5ZtXdmsnqLhvmgzg')`
                }}
              />
              <div className="absolute -top-2 -right-2 w-9 h-9 bg-white rounded-full p-1 border border-brand-primary-fixed shadow flex items-center justify-center">
                <Map size={18} className="text-brand-primary" />
              </div>
            </div>

            {/* Overlapping Polaroid traveler sticker */}
            <div className="absolute top-1 left-2 w-28 aspect-[3/4] bg-white p-1.5 shadow-md rotate-[1deg] animate-scrapbook-float" style={{ '--tilt': '1deg' } as React.CSSProperties}>
              <div className="w-full aspect-square bg-brand-surface-highest overflow-hidden rounded-xs">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTndTkgxceN1UNPvPd_CAeBPxYYf_ALpJwIm6I22gQ-dBQWuoEsVbDAizw4v9ptkG-c6VEj3XpQbRb1g_rsa9bvi24nI6nVXqJIqxZ3PcNDqT-XpFQnoxWK9UIpboewbEiOJ7JvJXtzf6-S_hOV39Lib9-jVPzp3TCILgoGkdrJ8HRC_os58Qle7ZhuOmEJvIBx9fB1nn8i1OWPZEDtVBVilMFeh1GPIYIL3sj2i6HhC8rAtOqGaPW9nteFtz_Edn0GSDq8Q1Ayw"
                  alt="Traveler Polaroid sticker"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-1 h-3 w-12 bg-brand-surface-container rounded-full mx-auto" />
            </div>

            {/* Polaroid camera sticker */}
            <div className="absolute bottom-2 right-2 w-20 h-20 bg-brand-tertiary-fixed rounded-xl border-4 border-white shadow rotate-[-4deg] flex items-center justify-center">
              <span className="material-symbols-outlined text-brand-on-tertiary-container text-3xl font-bold">
                photo_camera
              </span>
              <div className="washi-tape-sticker absolute -top-1 -right-3 w-10 h-4 rotate-[15deg] z-10" />
            </div>
          </div>

          {/* Slogans */}
          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-xl text-gray-800">
              找尋附近景點
            </h1>
            <p className="font-body text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed">
              用美照在此地與未來過去的人交流吧！
            </p>
          </div>

          {/* Action buttons */}
          <div className="w-full flex flex-col gap-3.5 px-4 pt-2">
            <button
              onClick={() => {
                setUsername('');
                setPassword('');
                setCurrentView('register');
              }}
              className="bubble-btn-primary w-full py-3.5 font-display font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow"
            >
              <UserPlus size={16} />
              <span>立即註冊</span>
            </button>
            <button
              onClick={() => {
                setUsername('');
                setPassword('');
                setCurrentView('login');
              }}
              className="bubble-btn-secondary w-full py-3.5 font-display font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow"
            >
              <LogIn size={16} />
              <span>登入帳號</span>
            </button>
          </div>

          {/* Decorative bottom credits line */}
          <div className="flex items-center gap-2 pt-2 text-gray-300 select-none">
            <span className="w-6 h-[1.5px] bg-brand-surface-highest"></span>
            <span className="font-display text-[9px] font-bold tracking-widest text-gray-400">
              DIGITAL TRAVEL TECHO
            </span>
            <span className="w-6 h-[1.5px] bg-brand-surface-highest"></span>
          </div>
        </main>
      )}

      {/* --- REGISTER VIEW SCREEN --- */}
      {currentView === 'register' && (
        <main className="relative z-10 w-full max-w-sm flex flex-col items-center py-4 animate-scale-up">
          {/* Back button and page title */}
          <div className="flex items-center w-full mb-6 px-1">
            <button
              onClick={() => setCurrentView('welcome')}
              className="p-2 bg-white rounded-full border border-brand-surface-highest hover:bg-brand-surface-low text-brand-primary active:scale-90 duration-100"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="font-display text-xs text-brand-primary bg-brand-primary-fixed rounded-full px-3 py-0.5 ml-3 font-semibold">
              Mappo 註冊
            </span>
          </div>

          {/* Scrapbook page card */}
          <div className="w-full bg-[#f5f4ec] border-2 border-brand-surface-highest rounded-2xl p-6 shadow relative card-tilt">
            {/* Overlapping washi tape */}
            <div className="washi-tape-sticker absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rotate-1 z-20" />

            <div className="text-center mb-6 mt-2">
              <h2 className="font-display font-extrabold text-lg text-brand-primary">建立新旅程</h2>
              <p className="font-body text-xs text-gray-400">開始記錄你的第一張手帳貼紙</p>
            </div>

            {/* Forms */}
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-display font-extrabold text-brand-tertiary ml-1" htmlFor="reg-username">
                  使用者名稱
                </label>
                <div className="doodle-contour bg-white px-3 py-2 flex items-center shadow-inner">
                  <User size={16} className="text-gray-400 mr-2 shrink-0" />
                  <input
                    id="reg-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="3-20 位英文字母或數字"
                    className="bg-transparent border-none focus:ring-0 text-xs w-full text-gray-700 font-body placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-display font-extrabold text-brand-tertiary ml-1" htmlFor="reg-password">
                  密碼設定
                </label>
                <div className="doodle-contour bg-white px-3 py-2 flex items-center shadow-inner">
                  <Lock size={16} className="text-gray-400 mr-2 shrink-0" />
                  <input
                    id="reg-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="至少 6 位英文字母或數字"
                    className="bg-transparent border-none focus:ring-0 text-xs w-full text-gray-700 font-body placeholder:text-gray-300"
                  />
                </div>
              </div>

              <p className="text-[10px] text-gray-400 leading-normal px-1">
                點擊註冊即代表你同意我們的 <span className="underline text-brand-tertiary font-bold">服務條款</span> 與 <span className="underline text-brand-tertiary font-bold">隱私權政策</span>。
              </p>

              <button
                type="submit"
                className="bubble-btn-primary w-full py-3 bg-brand-primary text-white font-display font-extrabold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow mt-2"
              >
                <span>建立帳號</span>
                <Map size={16} />
              </button>
            </form>

            {/* Redirect link */}
            <div className="text-center mt-5">
              <button
                onClick={() => setCurrentView('login')}
                className="text-xs text-brand-primary font-display font-bold hover:underline"
              >
                已經有帳號了？點此登入
              </button>
            </div>
          </div>

          {/* Bottom decorative polaroid image */}
          <div className="mt-8 scrapbook-tilt-alt relative flex justify-center max-w-[240px]">
            <div className="bg-white p-2.5 border border-brand-surface-highest shadow-md">
              <div className="w-full aspect-[4/3] rounded-xs overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx-26iBXTJkcbHZhNGecvR9GdkyEZ3IdrGinWtxj-0kJ83rixsGOBTE6JvuwMSK3lbG64gBmT-SQBrDq5yCq_ia9vv53YD9llZz4GZvzdyvjux4pWkwxZ-IEUiwA3gLcgPmqSjVj0K7sq3ECWSpVg0efcXzYdvdWZ7QeeusxcxSTUZg6fsHYlHGrIxF4IV_oTkmCxsHClXeJeqFJTrnUKkrACsLDr_j57ariJwtzRhTfFEkPCLTSsO2QcOvyu5akPDx8DI0A5cHg"
                  alt="Cozy interior travel notes"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-1.5 text-center font-display text-[9px] text-brand-tertiary font-bold">
                我的旅程，從這裡開始...
              </p>
            </div>
          </div>
        </main>
      )}

      {/* --- LOGIN VIEW SCREEN --- */}
      {currentView === 'login' && (
        <main className="relative z-10 w-full max-w-sm flex flex-col items-center py-4 animate-scale-up">
          {/* Back button and page title */}
          <div className="flex items-center w-full mb-6 px-1">
            <button
              onClick={() => setCurrentView('welcome')}
              className="p-2 bg-white rounded-full border border-brand-surface-highest hover:bg-brand-surface-low text-brand-primary active:scale-90 duration-100"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="font-display text-xs text-brand-secondary bg-brand-secondary-container rounded-full px-3 py-0.5 ml-3 font-semibold">
              Mappo 登入
            </span>
          </div>

          {/* Scrapbook page card */}
          <div className="w-full bg-[#fbf9f1] border-2 border-brand-surface-highest rounded-2xl p-6 shadow relative card-tilt">
            {/* Overlapping washi tape */}
            <div className="washi-tape-sticker absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rotate-[-1deg] z-20" />

            <div className="text-center mb-6 mt-2">
              <h2 className="font-display font-extrabold text-lg text-gray-800">歡迎回來</h2>
              <p className="font-body text-xs text-gray-400 font-medium">繼續紀錄你的旅行手帳</p>
            </div>

            {/* Forms */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-display font-extrabold text-brand-tertiary ml-1" htmlFor="login-username">
                  用戶名稱
                </label>
                <div className="bg-brand-surface-low/50 rounded-lg p-2 flex items-center shadow-inner">
                  <input
                    id="login-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="請輸入帳號 (例如: xiaoming)"
                    className="bg-transparent border-none focus:ring-0 text-xs w-full text-gray-700 font-body placeholder:text-gray-300"
                  />
                  <User size={16} className="text-brand-primary opacity-50 mr-1 shrink-0" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-display font-extrabold text-brand-tertiary ml-1" htmlFor="login-password">
                  密碼
                </label>
                <div className="bg-brand-surface-low/50 rounded-lg p-2 flex items-center shadow-inner">
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="請輸入密碼"
                    className="bg-transparent border-none focus:ring-0 text-xs w-full text-gray-700 font-body placeholder:text-gray-300"
                  />
                  <Lock size={16} className="text-brand-primary opacity-50 mr-1 shrink-0" />
                </div>
              </div>

              <div className="flex justify-end pr-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage('忘記密碼功能模擬：預設密碼為任意文字皆可登入！');
                    setShowErrorPopup(true);
                  }}
                  className="font-display text-[10px] text-brand-primary hover:underline font-bold"
                >
                  忘記密碼？
                </button>
              </div>

              <button
                type="submit"
                className="bubble-btn-primary w-full py-3 bg-brand-primary text-white font-display font-extrabold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow mt-1"
              >
                <span>立即登入</span>
                <LogIn size={16} />
              </button>
            </form>

            {/* Redirect link */}
            <div className="text-center mt-5">
              <p className="font-body text-xs text-gray-400">
                還沒有帳號嗎？{' '}
                <button
                  onClick={() => setCurrentView('register')}
                  className="text-brand-secondary font-display font-black hover:underline"
                >
                  前往註冊
                </button>
              </p>
            </div>
          </div>

          {/* Bottom decorative polaroid image */}
          <div className="mt-8 photo-sticker bg-white p-2.5 border border-brand-surface-highest shadow-md rotate-[-2deg] flex flex-col items-center max-w-[200px]">
            <div className="w-full aspect-[4/3] rounded-xs overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvUGTvO_c9tcU3FNDkT-GMeXt6Vye82rZFcIFPZ9DhoomhEd7PgVMOzIyqaVhO1LoHZyMxLlEzux9q8E0lZXqgzbwyd022xYYlvtAMfcsZVo8agM_mFsHQ3KOwPb_opUsNX_yvH2HRJPsXtRLoG7BGY3oDlW2xYzsokUrQFdhSEP_L3pQXSwgO-UvsuSfKbZwxT60HvGwgG1WTXduxQz64E4uquyUZzDswZsXYBIwg3J2xqTys5oBlFwZVaw-OJgtX4h8xaMJJyQ"
                alt="Cozy diary notebook desk study"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 font-display text-[10px] font-black text-brand-primary">
              Start Your Journey!
            </span>
          </div>
        </main>
      )}

      {/* --- SUCCESS REGISTRATION DIALOG POPUP --- */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20 backdrop-blur-xs">
          <div className="bg-[#fbf9f1] p-6 rounded-2xl border-4 border-brand-primary-container shadow-2xl max-w-xs w-full text-center scrapbook-tilt">
            <div className="w-14 h-14 bg-brand-primary-container rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Sparkles size={28} className="text-brand-on-primary-container animate-bounce" />
            </div>
            <h3 className="font-display font-extrabold text-base text-gray-800 mb-1">歡迎加入 Mappo！</h3>
            <p className="font-body text-xs text-gray-500 mb-4 leading-normal">
              您的旅行手帳帳號已成功建立，準備好開始收集足跡貼紙了嗎？
            </p>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                if (registeredUser) {
                  onLoginSuccess(registeredToken, registeredUser, true);
                }
              }}
              className="bubble-btn-primary w-full py-2.5 rounded-lg font-display font-bold text-xs text-brand-on-primary-container shadow-xs"
            >
              立即出發 🚀
            </button>
          </div>
        </div>
      )}

      {/* --- ERROR DIALOG POPUP --- */}
      {showErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20 backdrop-blur-xs">
          <div className="bg-[#fbf9f1] p-6 rounded-2xl border-4 border-red-200 shadow-2xl max-w-xs w-full text-center scrapbook-tilt-alt">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Smile size={28} className="text-red-500 rotate-180 animate-pulse" />
            </div>
            <h3 className="font-display font-extrabold text-base text-red-600 mb-1">提示訊息</h3>
            <p className="font-body text-xs text-gray-500 mb-4 leading-normal">
              {errorMessage}
            </p>
            <button
              onClick={() => setShowErrorPopup(false)}
              className="w-full bg-brand-surface-highest py-2 rounded-lg font-display font-bold text-xs hover:bg-brand-surface-container active:scale-95 duration-100 text-gray-700"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
