import React, { useState } from 'react';
import { Map, Camera, Sparkles } from 'lucide-react';

interface JourneyIntroProps {
    onFinish: () => void;
}

const pages = [
    {
        icon: <Map size={34} />,
        title: '歡迎來到 Mappo',
        body: '這裡是一份會長大的旅行手帳。你可以用照片收藏地點，也可以看見其他旅人留下的城市片段。',
    },
    {
        icon: <Camera size={34} />,
        title: '適合慢慢探索的人',
        body: '喜歡拍照、散步、探店、旅行，或只是想把日常風景好好保存下來的人，都可以在這裡留下自己的足跡。',
    },
    {
        icon: <Sparkles size={34} />,
        title: '從第一張照片開始吧',
        body: '從發布第一張照片開始吧！點擊地區圖塊進入分區照片牆，留下你在這個地方的第一個記憶。',
    },
];

export default function JourneyIntro({ onFinish }: JourneyIntroProps) {
    const [pageIndex, setPageIndex] = useState(0);
    const page = pages[pageIndex];
    const isLast = pageIndex === pages.length - 1;

    return (
        <div className="min-h-screen bg-[#fbf9f1] flex items-center justify-center px-6 py-10 text-[#1b1c17]">
            <div className="w-full max-w-sm bg-white border-2 border-[#e4e3db] rounded-3xl shadow-lg px-6 py-8 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#d4e3ff] rounded-full opacity-60" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#ffe1d6] rounded-full opacity-60" />

                <div className="relative z-10">
                    <div className="mx-auto w-20 h-20 rounded-full bg-brand-primary-container text-brand-on-primary-container flex items-center justify-center shadow-md mb-6">
                        {page.icon}
                    </div>

                    <h1 className="font-display font-extrabold text-xl text-brand-primary mb-4">
                        {page.title}
                    </h1>

                    <p className="font-body text-sm text-gray-600 leading-7 min-h-[112px]">
                        {page.body}
                    </p>

                    <div className="flex justify-center gap-2 mt-6">
                        {pages.map((_, index) => (
                            <span
                                key={index}
                                className={`w-2.5 h-2.5 rounded-full ${index === pageIndex ? 'bg-brand-primary' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-3 mt-8">
                        {pageIndex > 0 && (
                            <button
                                onClick={() => setPageIndex(pageIndex - 1)}
                                className="flex-1 py-3 rounded-xl bg-[#f0eee6] text-gray-600 font-display font-bold text-sm active:scale-95"
                            >
                                上一頁
                            </button>
                        )}

                        <button
                            onClick={() => {
                                if (isLast) onFinish();
                                else setPageIndex(pageIndex + 1);
                            }}
                            className="flex-1 py-3 rounded-xl bg-brand-primary text-white font-display font-extrabold text-sm shadow-md active:scale-95"
                        >
                            {isLast ? '開始旅程' : '下一頁'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}