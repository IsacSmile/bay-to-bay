import React from "react";
import { Check } from "lucide-react";

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
    <div
      className={`group flex items-center justify-between py-4 sm:py-5 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl border-b border-slate-100/90 last:border-b-0 cursor-pointer transition-colors duration-200 ease-out hover:bg-sky-50/60 active:bg-sky-100/60 ${className}`.trim()}
    >
      <div className="flex items-center min-w-0 pr-3 sm:pr-4">
        {/* Light-blue Number Badge */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E5F3FA] border border-[#CDE6F5] text-brand-blue font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs transition-all duration-200 ease-out group-hover:scale-105 group-hover:shadow-sm motion-reduce:group-hover:scale-100 motion-reduce:group-hover:shadow-2xs select-none">
          {numberLabel}
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-8 sm:h-10 bg-slate-200/80 mx-3.5 sm:mx-4 shrink-0" aria-hidden="true" />

        {/* Title & Description */}
        <div className="min-w-0">
          <h4 className="text-base sm:text-lg font-black text-[#071A2E] tracking-tight leading-snug">
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Right-aligned Checkmark */}
      <div className="shrink-0 flex items-center justify-center text-brand-blue">
        <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
      </div>
    </div>
  );
};
