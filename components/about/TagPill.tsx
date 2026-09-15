import React from "react";

export interface TagPillProps {
  label: string;
  className?: string;
}

export const TagPill: React.FC<TagPillProps> = ({ label, className = "" }) => {
  return (
    <div
      className={`inline-flex items-center px-4 py-1.5 rounded-full border border-slate-200/90 bg-white/80 hover:bg-white hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-xs select-none ${className}`.trim()}
    >
      <span>{label}</span>
    </div>
  );
};
