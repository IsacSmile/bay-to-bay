import React from "react";

export interface EyebrowLabelProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

export const EyebrowLabel: React.FC<EyebrowLabelProps> = ({
  children,
  text,
  className = "",
}) => {
  const content = text || children;
  return (
    <div className={`inline-flex items-center gap-2.5 mb-3.5 sm:mb-4 ${className}`.trim()}>
      <span
        className="w-6 h-[2px] bg-brand-blue rounded-full shrink-0"
        aria-hidden="true"
      />
      <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase">
        {content}
      </span>
    </div>
  );
};
