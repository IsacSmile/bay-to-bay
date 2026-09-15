"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
} from "lucide-react";

interface DatePickerProps {
  value?: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  minDate?: string; // YYYY-MM-DD
  className?: string;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SNOWFLAKES = [
  { left: "3%", size: 14, duration: "4.2s", delay: "0s", opacity: 0.85, char: "❄" },
  { left: "10%", size: 8, duration: "5.5s", delay: "1.0s", opacity: 0.9, char: "•" },
  { left: "20%", size: 16, duration: "3.8s", delay: "0.3s", opacity: 0.75, char: "❄" },
  { left: "31%", size: 9, duration: "4.9s", delay: "1.8s", opacity: 0.85, char: "•" },
  { left: "42%", size: 15, duration: "4.0s", delay: "1.2s", opacity: 0.8, char: "❄" },
  { left: "53%", size: 8, duration: "5.8s", delay: "0.1s", opacity: 0.9, char: "•" },
  { left: "64%", size: 16, duration: "3.5s", delay: "2.2s", opacity: 0.85, char: "❄" },
  { left: "76%", size: 10, duration: "4.6s", delay: "0.7s", opacity: 0.9, char: "•" },
  { left: "87%", size: 14, duration: "5.1s", delay: "0.4s", opacity: 0.8, char: "❄" },
  { left: "95%", size: 8, duration: "4.3s", delay: "2.7s", opacity: 0.9, char: "•" },
  { left: "15%", size: 12, duration: "3.9s", delay: "2.9s", opacity: 0.8, char: "❄" },
  { left: "37%", size: 14, duration: "4.7s", delay: "3.1s", opacity: 0.75, char: "❄" },
  { left: "58%", size: 9, duration: "4.1s", delay: "2.5s", opacity: 0.9, char: "•" },
  { left: "70%", size: 15, duration: "4.5s", delay: "3.4s", opacity: 0.8, char: "❄" },
  { left: "83%", size: 8, duration: "5.2s", delay: "1.6s", opacity: 0.85, char: "•" },
];

export const DatePicker: React.FC<DatePickerProps> = ({
  value = "",
  onChange,
  error,
  placeholder = "Select preferred date",
  minDate = new Date().toISOString().split("T")[0],
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value or default to today for calendar view
  const initialDate = value ? new Date(value + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  // Update view when value changes
  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

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

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Helper to format date string YYYY-MM-DD
  const formatDateString = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  // Format date for display in input
  const getFormattedDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSelectDate = (dateStr: string) => {
    onChange(dateStr);
    setIsOpen(false);
  };

  // Calculate calendar grid days
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const todayStr = new Date().toISOString().split("T")[0];

  // Quick select helpers
  const handleQuickSelect = (type: "today" | "tomorrow" | "nextMonday") => {
    const now = new Date();
    let target = new Date();

    if (type === "tomorrow") {
      target.setDate(now.getDate() + 1);
    } else if (type === "nextMonday") {
      const day = now.getDay();
      const diff = (8 - day) % 7 || 7;
      target.setDate(now.getDate() + diff);
    }

    const dateStr = formatDateString(
      target.getFullYear(),
      target.getMonth(),
      target.getDate()
    );
    handleSelectDate(dateStr);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isOpen ? "z-40" : "z-10"} ${className}`}
    >
      {/* Trigger Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium bg-white flex items-center justify-between cursor-pointer transition-all duration-150 select-none ${
          error
            ? "border-rose-400 focus:border-rose-500 ring-1 ring-rose-200 text-rose-900"
            : isOpen
            ? "border-brand-blue ring-2 ring-brand-blue/30 text-slate-900 shadow-xs"
            : "border-slate-200/90 hover:border-slate-300 text-slate-800"
        }`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={value ? "text-slate-900 font-semibold" : "text-slate-400 font-normal"}>
          {value ? getFormattedDisplayDate(value) : placeholder}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 text-slate-400 group-hover:text-brand-blue transition-colors">
          {value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear date"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <CalendarIcon className={`w-4 h-4 transition-colors ${isOpen || value ? "text-brand-blue" : "text-slate-400"}`} />
        </div>
      </div>

      {/* Popover Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-[320px] bg-white rounded-2xl border border-slate-200 shadow-xl p-4 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          
          {/* Animated Snowfall Layer */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
            <style>{`
              @keyframes calendarSnowfall {
                0% {
                  transform: translateY(-12px) translateX(0) rotate(0deg);
                  opacity: 0;
                }
                20% {
                  opacity: 0.95;
                }
                80% {
                  opacity: 0.95;
                }
                100% {
                  transform: translateY(340px) translateX(16px) rotate(360deg);
                  opacity: 0;
                }
              }
            `}</style>
            {SNOWFLAKES.map((flake, idx) => (
              <span
                key={idx}
                aria-hidden="true"
                className="absolute text-brand-blue/70 select-none leading-none pointer-events-none drop-shadow-2xs"
                style={{
                  left: flake.left,
                  top: 0,
                  fontSize: `${flake.size}px`,
                  opacity: flake.opacity,
                  animation: `calendarSnowfall ${flake.duration} linear infinite`,
                  animationDelay: flake.delay,
                }}
              >
                {flake.char}
              </span>
            ))}
          </div>

          {/* Calendar Interactive Content (z-10) */}
          <div className="relative z-10">
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg hover:bg-slate-100/90 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-extrabold text-sm text-[#071A2E] tracking-tight">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg hover:bg-slate-100/90 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Select Chips */}
            <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => handleQuickSelect("today")}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100/90 hover:bg-brand-blue/15 text-slate-700 hover:text-brand-blue transition-colors whitespace-nowrap cursor-pointer backdrop-blur-xs"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("tomorrow")}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100/90 hover:bg-brand-blue/15 text-slate-700 hover:text-brand-blue transition-colors whitespace-nowrap cursor-pointer backdrop-blur-xs"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("nextMonday")}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100/90 hover:bg-brand-blue/15 text-slate-700 hover:text-brand-blue transition-colors whitespace-nowrap cursor-pointer backdrop-blur-xs"
              >
                Next Mon
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {DAYS_OF_WEEK.map((d) => (
                <span
                  key={d}
                  className="text-[11px] font-bold text-slate-400 uppercase tracking-wider py-1"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Empty slots before first day of month */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-8" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDateString(viewYear, viewMonth, day);
                const isSelected = value === dateStr;
                const isToday = dateStr === todayStr;
                const isDisabled = minDate ? dateStr < minDate : false;

                return (
                  <button
                    key={dateStr}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelectDate(dateStr)}
                    className={`h-8 rounded-xl text-xs font-semibold flex items-center justify-center transition-all duration-150 ${
                      isDisabled
                        ? "text-slate-300 cursor-not-allowed opacity-40 select-none"
                        : isSelected
                        ? "bg-brand-blue text-white font-extrabold shadow-sm scale-105"
                        : isToday
                        ? "border border-brand-blue/60 text-brand-blue font-bold hover:bg-brand-blue/10 cursor-pointer"
                        : "text-slate-700 hover:bg-blue-50/80 hover:text-brand-blue cursor-pointer"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Pickup available Mon-Fri</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
