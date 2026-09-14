import React from "react";

interface AnnouncementBarProps {
  items?: string[];
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = () => {
  return (
    <div className="relative bg-[#07203b] py-2 sm:py-2.5 px-4 text-center select-none overflow-x-auto scrollbar-none z-40 text-white">
      <div className="max-w-[1350px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-4 whitespace-nowrap">
        {/* Category Label */}
        <span className="text-[10px] sm:text-xs font-bold text-[#25A8E8] sm:text-slate-300 uppercase sm:normal-case tracking-widest sm:tracking-normal">
          Northern Ontario routes
        </span>

        {/* Desktop Separator */}
        <span className="hidden sm:inline text-[#25A8E8]/80 font-bold select-none">•</span>

        {/* Route Details */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-white">
          <span className="font-extrabold tracking-tight text-white">
            North Bay <span className="text-[#25A8E8] font-black mx-1">→</span> Hearst
          </span>

          {/* Mobile Dot Separator */}
          <span className="sm:hidden text-slate-500 select-none">•</span>

          {/* Mobile Service Text */}
          <span className="sm:hidden text-slate-300 font-normal">
            Twice-weekly service
          </span>
        </div>

        {/* Desktop Separator */}
        <span className="hidden sm:inline text-[#25A8E8]/80 font-bold select-none">•</span>

        {/* Desktop Service Text */}
        <span className="hidden sm:inline text-slate-300 font-normal text-xs">
          Twice-weekly scheduled service
        </span>
      </div>
    </div>
  );
};









