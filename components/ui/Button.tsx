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
    "bg-brand-blue hover:bg-brand-blue-hover text-white shadow-md hover:shadow-lg hover:shadow-brand-blue/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-transparent font-bold tracking-normal",
  secondary:
    "bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-bold tracking-normal",
  ghost:
    "bg-transparent text-brand-bright hover:text-white font-bold transition-colors p-0 hover:underline border-0",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs sm:text-sm min-h-[40px]",
  md: "px-6 py-2.5 text-sm sm:text-base min-h-[46px]",
  lg: "px-8 py-3.5 text-base sm:text-lg min-h-[52px]",
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
    "inline-flex items-center justify-center gap-2 rounded-full select-none focus:outline-none focus:ring-2 focus:ring-brand-bright/50 disabled:opacity-50 disabled:pointer-events-none";

  const sizeClass = variant === "ghost" ? "" : sizeStyles[size];
  const variantClass = variantStyles[variant];
  const widthClass = fullWidth ? "w-full" : "w-fit";

  const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={target}
        rel={rel}
        onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      {children && <span>{children}</span>}
      {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
    </button>
  );
};
