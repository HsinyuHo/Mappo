import React from 'react';
import { Region } from '../types';
import { Compass, Plane, Sun, Cloud, Sparkles, Leaf } from 'lucide-react';

interface MapScreenProps {
  onSelectRegion: (region: Region) => void;
}

export default function MapScreen({ onSelectRegion }: MapScreenProps) {
  return (
    <div className="page-fade-in relative flex flex-col items-center justify-center pt-4 pb-12 overflow-hidden w-full">
      {/* Decorative Scrapbook Background Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-15 select-none z-0">
        <div className="absolute top-12 left-12 animate-pulse" style={{ animationDuration: '4s' }}>
          <Cloud size={96} className="text-brand-primary" />
        </div>
        <div className="absolute bottom-24 right-4 animate-bounce" style={{ animationDuration: '8s' }}>
          <Sun size={120} className="text-brand-tertiary" />
        </div>
        <div className="absolute top-1/2 left-[-16px] -rotate-12">
          <Sparkles size={64} className="text-brand-secondary" />
        </div>
      </div>

      {/* Title Header */}
      <div className="text-center z-10 mb-6 px-4">
        <h1 className="font-display text-2xl md:text-3xl font-extrabold text-brand-primary mb-1">
          想要去哪裡？
        </h1>
        <p className="font-body text-sm md:text-base text-gray-500">
          點擊地圖區塊開始你的旅行記錄
        </p>
      </div>

      {/* SVG Interactive Map Container */}
      <div className="relative w-full max-w-[420px] aspect-[1/1.3] mx-auto px-4 z-10">
        
        {/* Overseas Shortcut Sticker (頂部左側) */}
        <div className="absolute top-12 left-4 z-20">
          <button
            onClick={() => onSelectRegion('overseas')}
            className="bubble-btn-tertiary flex flex-col items-center justify-center w-20 h-20 rounded-full shadow-md hover:scale-105 active:scale-95 duration-150 border-2 border-white"
          >
            <Plane size={28} className="text-brand-on-tertiary-container animate-bounce" />
            <span className="font-display font-bold text-xs mt-1">國外</span>
          </button>
        </div>

        {/* SVG Map of Taiwan */}
        <svg 
          className="w-full h-full drop-shadow-lg" 
          viewBox="0 0 400 600" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* North Region (北部) */}
          <g 
            className="cursor-pointer group"
            onClick={() => onSelectRegion('north')}
          >
            <path 
              className="fill-[#a5c9ff]/90 stroke-white stroke-[3px] transition-all duration-300 group-hover:fill-[#a5c9ff] group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(59,96,143,0.4)] group-hover:scale-[1.015] origin-[235px_80px]"
              d="M180,20 Q220,10 260,30 L290,60 Q320,100 280,140 L220,130 Q180,110 170,80 Z"
            />
            <text 
              className="font-display font-bold text-lg fill-brand-on-primary-container pointer-events-none select-none filter drop-shadow-[0_2px_0px_white]"
              textAnchor="middle" 
              x="235" 
              y="80"
            >
              北部
            </text>
          </g>

          {/* Central Region (中部) */}
          <g 
            className="cursor-pointer group"
            onClick={() => onSelectRegion('central')}
          >
            <path 
              className="fill-[#d9b5ff]/90 stroke-white stroke-[3px] transition-all duration-300 group-hover:fill-[#d9b5ff] group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(111,80,146,0.4)] group-hover:scale-[1.015] origin-[175px_180px]"
              d="M170,80 Q180,110 220,130 L250,220 Q200,280 150,250 L120,180 Q110,130 140,100 Z"
            />
            <text 
              className="font-display font-bold text-lg fill-brand-on-secondary-container pointer-events-none select-none filter drop-shadow-[0_2px_0px_white]"
              textAnchor="middle" 
              x="175" 
              y="180"
            >
              中部
            </text>
          </g>

          {/* Southern Region (南部) */}
          <g 
            className="cursor-pointer group"
            onClick={() => onSelectRegion('south')}
          >
            <path 
              className="fill-[#ffdcc3]/90 stroke-white stroke-[3px] transition-all duration-300 group-hover:fill-[#ffdcc3] group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(124,86,55,0.4)] group-hover:scale-[1.015] origin-[155px_380px]"
              d="M150,250 Q200,280 230,350 L200,480 Q150,520 100,450 L80,350 Q90,280 130,260 Z"
            />
            <text 
              className="font-display font-bold text-lg fill-[#6f4b2d] pointer-events-none select-none filter drop-shadow-[0_2px_0px_white]"
              textAnchor="middle" 
              x="155" 
              y="380"
            >
              南部
            </text>
          </g>

          {/* Eastern Region (東部) */}
          <g 
            className="cursor-pointer group"
            onClick={() => onSelectRegion('east')}
          >
            <path 
              className="fill-[#d4e3ff]/95 stroke-white stroke-[3px] transition-all duration-300 group-hover:fill-[#d4e3ff] group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(59,96,143,0.3)] group-hover:scale-[1.015] origin-[275px_280px]"
              d="M280,140 Q320,250 280,400 L230,350 Q200,280 250,220 L220,130 Z"
            />
            <text 
              className="font-display font-bold text-lg fill-brand-primary pointer-events-none select-none filter drop-shadow-[0_2px_0px_white]"
              textAnchor="middle" 
              x="275" 
              y="280"
            >
              東部
            </text>
          </g>

          {/* Islands Region (離島 - Abstract Circles) */}
          <g 
            className="cursor-pointer group"
            onClick={() => onSelectRegion('islands')}
          >
            {/* Penghu (澎湖) */}
            <circle 
              className="fill-brand-secondary-container stroke-white stroke-[2px] transition-all duration-300 group-hover:fill-brand-secondary group-hover:scale-110 origin-[60px_150px]" 
              cx="60" 
              cy="150" 
              r="15" 
            />
            {/* Kinmen/Matsu/Xiaoliuqiu (金門) */}
            <circle 
              className="fill-brand-secondary-container stroke-white stroke-[2px] transition-all duration-300 group-hover:fill-brand-secondary group-hover:scale-110 origin-[50px_400px]" 
              cx="50" 
              cy="400" 
              r="12" 
            />
            {/* Green Island/Orchid Island (綠島蘭嶼) */}
            <circle 
              className="fill-brand-secondary-container stroke-white stroke-[2px] transition-all duration-300 group-hover:fill-brand-secondary group-hover:scale-110 origin-[350px_350px]" 
              cx="350" 
              cy="350" 
              r="14" 
            />
            
            <text 
              className="font-display font-bold text-sm fill-brand-secondary pointer-events-none select-none filter drop-shadow-[0_2px_0px_white]"
              textAnchor="middle" 
              x="50" 
              y="435"
            >
              離島
            </text>
          </g>
        </svg>

        {/* Hand-drawn Leaf Accent at the bottom-left */}
        <div className="absolute bottom-6 left-6 opacity-30 select-none pointer-events-none">
          <Leaf size={48} className="text-green-600 rotate-45 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
