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
      className={`relative w-full ${isOpen ? "z-50" : "z-20"} ${className}`}
    >
      {/* Trigger Box - Click anywhere to open calendar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium bg-white flex items-center justify-between cursor-pointer transition-all duration-150 select-none shadow-2xs ${
          error
            ? "border-rose-400 focus:border-rose-500 ring-2 ring-rose-200 text-rose-900"
            : isOpen
            ? "border-[#0088FF] ring-2 ring-[#0088FF]/25 text-slate-900 shadow-xs"
            : "border-slate-300 hover:border-slate-400 text-slate-800"
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
        <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
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
          <CalendarIcon className={`w-4 h-4 transition-colors ${isOpen || value ? "text-[#0088FF]" : "text-slate-400"}`} />
        </div>
      </div>

      {/* Popover Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 z-50 w-full sm:w-[268px] bg-white rounded-xl border border-slate-200/90 shadow-lg p-3 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          {/* Calendar Interactive Content */}
          <div className="relative z-10">
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                title="Previous month"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-xs sm:text-[13px] text-[#071A2E] tracking-tight">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                title="Next month"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Select Chips */}
            <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-0.5 scrollbar-none">
              <button
                type="button"
                onClick={() => handleQuickSelect("today")}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 hover:bg-[#0088FF]/15 text-slate-700 hover:text-[#0088FF] transition-colors whitespace-nowrap cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("tomorrow")}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 hover:bg-[#0088FF]/15 text-slate-700 hover:text-[#0088FF] transition-colors whitespace-nowrap cursor-pointer"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("nextMonday")}
                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 hover:bg-[#0088FF]/15 text-slate-700 hover:text-[#0088FF] transition-colors whitespace-nowrap cursor-pointer"
              >
                Next Mon
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-0.5 text-center mb-0.5">
              {DAYS_OF_WEEK.map((d) => (
                <span
                  key={d}
                  className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-0.5"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-0.5 text-center">
              {/* Empty slots before first day of month */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-7 w-7" />
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
                    className={`h-7 w-7 sm:h-7.5 sm:w-7.5 mx-auto rounded-lg text-[11px] font-semibold flex items-center justify-center transition-all duration-150 ${
                      isDisabled
                        ? "text-slate-300 cursor-not-allowed opacity-35 select-none"
                        : isSelected
                        ? "bg-[#0088FF] text-white font-bold shadow-xs scale-105"
                        : isToday
                        ? "border border-[#0088FF]/60 text-[#0088FF] font-bold hover:bg-[#0088FF]/10 cursor-pointer"
                        : "text-slate-700 hover:bg-[#0088FF]/10 hover:text-[#0088FF] cursor-pointer"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Pickup available Mon-Fri</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-bold text-[#0088FF] hover:underline cursor-pointer text-[10px]"
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
