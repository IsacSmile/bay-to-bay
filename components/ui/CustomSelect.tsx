"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface CustomSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: (string | SelectOption)[];
  error?: string;
  placeholder?: string;
  className?: string;
  onOpen?: () => void;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value = "",
  onChange,
  options,
  error,
  placeholder = "Select an option",
  className = "",
  onOpen,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to SelectOption objects
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Toggle open state with onOpen trigger
  const handleToggleOpen = () => {
    if (disabled) return;
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && onOpen) {
      onOpen();
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectOption = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isOpen ? "z-50" : "z-20"} ${className}`}
    >
      {/* Trigger Box */}
      <div
        onClick={handleToggleOpen}
        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium bg-white flex items-center justify-between cursor-pointer transition-all duration-150 select-none shadow-2xs ${
          disabled
            ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
            : error
            ? "border-rose-400 focus:border-rose-500 ring-2 ring-rose-200 text-rose-900"
            : isOpen
            ? "border-[#0088FF] ring-2 ring-[#0088FF]/25 text-slate-900 shadow-xs"
            : "border-slate-300 hover:border-slate-400 text-slate-800"
        }`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleToggleOpen();
          }
        }}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`truncate pr-2 ${
            selectedOption && selectedOption.value !== ""
              ? "text-slate-900 font-semibold"
              : "text-slate-400 font-normal"
          }`}
        >
          {selectedOption && selectedOption.value !== ""
            ? selectedOption.label
            : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#0088FF]" : ""
          }`}
        />
      </div>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/10 p-1.5 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          <ul role="listbox" className="space-y-0.5 max-h-60 overflow-y-auto scrollbar-thin">
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li
                  key={opt.value || "__empty__"}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer transition-colors duration-150 select-none ${
                    isSelected
                      ? "bg-[#EDF6FD] text-[#0088FF] font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex flex-col">
                    <span>{opt.label}</span>
                    {opt.sublabel && (
                      <span className="text-[11px] text-slate-400 font-normal mt-0.5">
                        {opt.sublabel}
                      </span>
                    )}
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#0088FF] shrink-0 ml-2" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
