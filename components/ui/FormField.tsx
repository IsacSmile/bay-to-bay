import React from "react";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  optional = false,
  error,
  className = "",
  children,
}) => {
  return (
    <div className={`w-full ${className}`.trim()}>
      {/* Small-caps Header Label */}
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[10px] sm:text-[11px] font-black tracking-wider text-slate-600 uppercase select-none">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
        {optional && (
          <span className="text-[10px] font-bold text-slate-400 tracking-normal normal-case">
            (optional)
          </span>
        )}
      </div>

      {/* Input Child Element */}
      <div>{children}</div>

      {/* Inline Error Message */}
      {error && (
        <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
