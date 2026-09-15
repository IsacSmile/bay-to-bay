import React from "react";
import { RouteStopItem } from "@/lib/prisma";

interface RouteSummaryBarProps {
  stops: RouteStopItem[];
}

export const RouteSummaryBar: React.FC<RouteSummaryBarProps> = ({ stops }) => {
  const sortedStops = [...stops].sort((a, b) => a.order - b.order);
  const startStop = sortedStops.find((s) => s.isStart) || sortedStops[0] || {
    stopNumber: "01",
    name: "North Bay",
  };
  const endStop = sortedStops.find((s) => s.isEnd) || sortedStops[sortedStops.length - 1] || {
    stopNumber: "07",
    name: "Longlac",
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 sm:px-6 border border-slate-200/80 border-l-4 border-l-brand-blue shadow-card transition-all duration-200">
      {/* Desktop Horizontal Layout */}
      <div className="hidden lg:flex items-center justify-between gap-6">
        {/* Route Start */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#071A2E] text-white font-black text-xs flex items-center justify-center shadow-md shrink-0">
            {startStop.stopNumber}
          </div>
          <div>
            <div className="text-base font-extrabold text-[#071A2E] leading-tight">
              {startStop.name}
            </div>
            <div className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mt-0.5">
              ROUTE START
            </div>
          </div>
        </div>

        {/* Dashed Center Corridor Line */}
        <div className="flex-1 relative flex items-center justify-center px-4">
          <div
            className="w-full border-b-2 border-dashed border-sky-200/80"
            aria-hidden="true"
          />
          <span className="absolute bg-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-brand-blue border border-sky-100 shadow-xs">
            SCHEDULED CORRIDOR
          </span>
        </div>

        {/* Route End */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-brand-orange text-white font-black text-xs flex items-center justify-center shadow-md shrink-0">
            {endStop.stopNumber}
          </div>
          <div>
            <div className="text-base font-extrabold text-[#071A2E] leading-tight">
              {endStop.name}
            </div>
            <div className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mt-0.5">
              ROUTE END
            </div>
          </div>
        </div>

        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 shrink-0">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span>Twice weekly · eligible 12-hour options</span>
        </div>
      </div>

      {/* Mobile & Tablet Layout (Compact Stacked) */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          {/* Start */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#071A2E] text-white font-black text-[11px] flex items-center justify-center shadow-sm shrink-0">
              {startStop.stopNumber}
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#071A2E] leading-tight">
                {startStop.name}
              </div>
              <div className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase">
                START
              </div>
            </div>
          </div>

          {/* Connector Arrow */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-brand-blue bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              CORRIDOR
            </span>
          </div>

          {/* End */}
          <div className="flex items-center gap-2.5">
            <div>
              <div className="text-sm font-extrabold text-[#071A2E] leading-tight text-right">
                {endStop.name}
              </div>
              <div className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase text-right">
                END
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-brand-orange text-white font-black text-[11px] flex items-center justify-center shadow-sm shrink-0">
              {endStop.stopNumber}
            </div>
          </div>
        </div>

        {/* Tag Pill Mobile */}
        <div className="inline-flex items-center justify-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-700 w-full text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span>Twice weekly · eligible 12-hour options</span>
        </div>
      </div>
    </div>
  );
};
