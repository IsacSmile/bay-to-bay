import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "group relative inline-flex items-center justify-center bg-gradient-to-r from-[#0088FF] via-[#0878D1] to-[#0066E0] hover:from-[#0090FF] hover:via-[#0080FF] hover:to-[#0055D0] text-white font-extrabold tracking-wide border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_25px_-5px_rgba(0,120,230,0.38)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_14px_32px_-4px_rgba(0,120,230,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]",
  secondary:
    "group relative inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] font-extrabold tracking-wide",
  ghost:
    "bg-transparent text-brand-bright hover:text-white font-bold transition-colors p-0 hover:underline border-0",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4.5 py-2 text-xs sm:text-sm min-h-[42px]",
  md: "px-6 py-2.5 text-sm sm:text-base min-h-[48px]",
  lg: "px-7 sm:px-8 py-3.5 text-base sm:text-[17px] min-h-[54px]",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  children,
  target,
  rel,
  disabled,
  ...props
}) => {
  const baseClasses =
    "font-display inline-flex items-center justify-center gap-2.5 rounded-full select-none focus:outline-none focus:ring-2 focus:ring-brand-bright/50 disabled:opacity-50 disabled:pointer-events-none";

  const sizeClass = variant === "ghost" ? "" : sizeStyles[size];
  const variantClass = variantStyles[variant];
  const widthClass = fullWidth ? "w-full" : "w-fit";

  const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim();

  const renderContent = () => (
    <>
      {leftIcon && (
        <span className="inline-flex shrink-0 items-center justify-center p-1 rounded-full bg-white/15 group-hover:bg-white/25 transition-all duration-300">
          {leftIcon}
        </span>
      )}
      {children && <span className="relative z-10">{children}</span>}
      {rightIcon && (
        <span className="inline-flex shrink-0 items-center justify-center p-1 rounded-full bg-white/15 group-hover:bg-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
          {rightIcon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={target}
        rel={rel}
        onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {renderContent()}
    </button>
  );
};
