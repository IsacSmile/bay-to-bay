import React from "react";
import { Clock, Calendar, CheckCircle2 } from "lucide-react";
import { RouteCardData } from "@/lib/prisma";

interface RouteCardProps {
  data: RouteCardData;
}

export const RouteCard: React.FC<RouteCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-[24px] shadow-floating border border-slate-200/80 p-5 sm:p-5 lg:p-5 xl:p-6 text-slate-800 transition-all duration-200 w-full max-w-[382px] lg:max-w-[390px] xl:max-w-[445px] mx-auto lg:ml-auto lg:mr-0">
      {/* Top Header Badge Row */}
      <div className="flex items-start justify-between gap-3 mb-4 lg:mb-5 pb-3.5 lg:pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-extrabold tracking-widest text-brand-blue uppercase block mb-1">
            {data.label || "SPECIAL ROUTE"}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#071A2E] tracking-tight flex items-center gap-2">
            {data.title || "North Bay → Hearst"}
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-brand-soft text-brand-blue font-extrabold px-3 py-1.5 rounded-full text-xs shrink-0 border border-sky-100 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-brand-blue" />
          <span>{data.duration || "12h"}</span>
        </div>
      </div>

      {/* 01-07 Vertical Timeline Stepper */}
      <div className="relative pl-1 mb-4 lg:mb-5 xl:mb-6 space-y-3.5 sm:space-y-4 xl:space-y-4.5">
        {data.stops.map((stop, index) => {
          const isFirst = stop.isStart || index === 0;
          const isLast = stop.isEnd || index === data.stops.length - 1;

          return (
            <div key={stop.id || index} className="relative flex items-center justify-between group">
              {/* Vertical Connecting Line */}
              {index < data.stops.length - 1 && (
                <div
                  className="absolute left-[13px] top-[24px] bottom-[-18px] sm:bottom-[-20px] w-[2px] bg-sky-200 group-hover:bg-brand-blue transition-colors"
                  aria-hidden="true"
                />
              )}

              <div className="flex items-center gap-3.5 z-10">
                {/* Blue Circular Number Node */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold transition-transform duration-200 group-hover:scale-110 ${
                    isFirst || isLast
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/30"
                      : "bg-white border-2 border-sky-200 text-brand-blue"
                  }`}
                >
                  {stop.stopNumber}
                </div>

                {/* Stop Name */}
                <span
                  className={`text-sm tracking-tight ${
                    isFirst || isLast
                      ? "font-extrabold text-[#071A2E]"
                      : "font-bold text-slate-700"
                  }`}
                >
                  {stop.name}
                </span>
              </div>

              {/* START / END Tag Badges */}
              {isFirst && (
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-brand-blue bg-sky-50 px-2 py-0.5 rounded border border-sky-200/80">
                  START
                </span>
              )}

              {isLast && (
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-brand-orange bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                  END
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Callout */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-btn p-3 lg:p-3 xl:p-3.5 text-xs text-slate-600 leading-relaxed font-medium">
        <span className="font-extrabold text-[#071A2E] block mb-0.5">{data.footerLead || "Scheduled with reliability."}</span>
        <span>{data.footerDesc || "Ask about your route, recurring pickup, or dedicated run."}</span>
      </div>
    </div>
  );
};
