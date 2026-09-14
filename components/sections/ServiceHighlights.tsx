import React from "react";
import { Package, Route, CalendarClock, Clock } from "lucide-react";

interface HighlightItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    icon: Package,
    title: "Small goods specialists",
    description: "Parcels, documents, supplies, and more.",
  },
  {
    icon: Route,
    title: "Dedicated service",
    description: "Direct solutions for your business needs.",
  },
  {
    icon: CalendarClock,
    title: "Twice-weekly routes",
    description: "Scheduled service between communities.",
  },
  {
    icon: Clock,
    title: "12-hour options",
    description: "For eligible shipments and routes.",
  },
];

export const ServiceHighlights: React.FC = () => {
  return (
    <section className="w-full bg-[#F6F9FC] py-8 sm:py-12 lg:py-14 border-b border-slate-200/60">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {HIGHLIGHTS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-5 flex items-start gap-4 shadow-[0_4px_20px_rgba(7,26,46,0.03)] hover:shadow-[0_8px_25px_rgba(7,26,46,0.08)] hover:border-slate-300 transition-all duration-300 group"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EEF7FC] border border-[#D5EBF7] flex items-center justify-center shrink-0 text-[#075985] group-hover:bg-[#0878D1] group-hover:border-[#0878D1] group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2]" />
                </div>

                {/* Text Block */}
                <div className="flex flex-col min-w-0 justify-center pt-0.5">
                  <h3 className="font-extrabold text-[#071A2E] text-sm sm:text-base leading-snug tracking-tight whitespace-nowrap">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1 whitespace-nowrap truncate">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
