import React from "react";

export interface StepItemProps {
  index: number;
  title: string;
  description: string;
  className?: string;
}

export const StepItem: React.FC<StepItemProps> = ({
  index,
  title,
  description,
  className = "",
}) => {
  const numberLabel = String(index + 1).padStart(2, "0");

  return (
    <div className={`flex flex-col ${className}`.trim()}>
      {/* Big Light-Blue Step Number */}
      <div className="text-3xl sm:text-4xl font-extrabold text-[#6BA3E8] tracking-tight leading-none mb-3.5 sm:mb-4 select-none">
        {numberLabel}
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-[#071A2E] tracking-tight leading-snug mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
};
