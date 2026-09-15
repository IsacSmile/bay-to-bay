import React from "react";
import { MapPin, ArrowRight, Truck, Check } from "lucide-react";

const STOPS = [
  { name: "North Bay", role: "Start Hub", isStart: true },
  { name: "Kirkland Lake", role: "Intermediate Stop" },
  { name: "Timmins", role: "Commercial Hub" },
  { name: "Cochrane", role: "Intermediate Stop" },
  { name: "Kapuskasing", role: "Regional Hub" },
  { name: "Hearst", role: "Corridor Destination" },
  { name: "Longlac", role: "End Station", isEnd: true },
];

export const RouteCoverage: React.FC = () => {
  return (
    <section id="routes" className="py-16 sm:py-20 bg-[#F6F9FC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-2xl text-left mb-12 sm:mb-14">
          <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase block mb-2">
            Highway 11 Corridor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A2E] tracking-tight">
            Connecting Northern Ontario
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Scheduled twice-weekly courier runs connecting key industrial, retail, and municipal centers across the region.
          </p>
        </div>

        {/* Stylized Visual Route Diagram Container */}
        <div className="bg-white rounded-container p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-[#071A2E] flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-blue" />
                <span>North Bay → Hearst & Longlac Route</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Twice-weekly scheduled departures connecting all 7 primary communities along Highway 11.
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-brand-soft text-brand-blue px-4 py-2 rounded-full text-xs font-bold shrink-0 border border-sky-100">
              <span>Highway 11 Express Run</span>
            </div>
          </div>

          {/* Stepper Timeline Diagram (Desktop horizontal / Mobile vertical) */}
          <div className="relative py-4">
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-[44px] left-[40px] right-[40px] h-1 bg-sky-100 z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-4 relative z-10">
              {STOPS.map((stop, index) => {
                const isFirst = stop.isStart;
                const isLast = stop.isEnd;

                return (
                  <div
                    key={index}
                    className="flex lg:flex-col items-center lg:text-center gap-4 lg:gap-3 group"
                  >
                    {/* Node Marker Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200 group-hover:scale-110 ${
                        isFirst || isLast
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/30 ring-4 ring-sky-100"
                          : "bg-white border-2 border-brand-blue text-brand-blue shadow-sm group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white group-hover:shadow-md group-hover:shadow-brand-blue/30"
                      }`}
                    >
                      {isFirst ? "01" : isLast ? `0${index + 1}` : `0${index + 1}`}
                    </div>

                    {/* Community Info */}
                    <div className="flex-1 lg:flex-none">
                      <div
                        className={`text-sm tracking-tight ${
                          isFirst || isLast ? "font-extrabold text-[#071A2E]" : "font-bold text-slate-700"
                        }`}
                      >
                        {stop.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {stop.role}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Route Highlights Footer Grid */}
          <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-btn bg-[#F6F9FC]">
              <Check className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="font-semibold text-slate-700">Dedicated express cargo space</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-btn bg-[#F6F9FC]">
              <Check className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="font-semibold text-slate-700">Door-to-door commercial drop-off</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-btn bg-[#F6F9FC]">
              <Check className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="font-semibold text-slate-700">Regular recurring freight contracts</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
