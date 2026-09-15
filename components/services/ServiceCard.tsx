import React from "react";
import {
  Activity,
  Package,
  Truck,
  CalendarDays,
  Repeat,
  FileText,
  Store,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import { ServiceItemData } from "@/lib/prisma";

const ICON_MAP: Record<string, LucideIcon> = {
  activity: Activity,
  package: Package,
  truck: Truck,
  calendar: CalendarDays,
  repeat: Repeat,
  "file-text": FileText,
  store: Store,
  "building-2": Building2,
  building: Building2,
  "shield-check": ShieldCheck,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

interface ServiceCardProps {
  service: ServiceItemData;
  index: number;
  routeLabel?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  routeLabel = "NORTH BAY → LONGLAC",
}) => {
  const IconComponent = ICON_MAP[service.icon] || Package;
  const cardNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 active:scale-[0.99] cursor-pointer ${
        service.isPriority
          ? "bg-[#EEF7FC]/80 border-slate-200/80 border-l-4 border-l-brand-blue shadow-card hover:shadow-card-hover"
          : "bg-white border-slate-200/80 shadow-card hover:shadow-card-hover"
      }`}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Card Number Badge */}
          <div className="w-6 h-6 rounded-full border border-sky-200/90 bg-white/80 flex items-center justify-center text-[10px] font-black text-brand-blue shadow-2xs">
            {cardNumber}
          </div>

          {/* Route Label */}
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400">
            {routeLabel}
          </span>
        </div>

        {/* Priority / Route Status Badge */}
        <div className="flex justify-end mb-4">
          {service.isPriority ? (
            <span className="bg-[#D5EBF7] text-[#0878D1] font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#BBE0F5] shadow-2xs">
              PRIORITY FOCUS
            </span>
          ) : (
            <span className="text-brand-blue font-black text-[10px] tracking-wider uppercase py-0.5">
              ROUTE READY
            </span>
          )}
        </div>

        {/* Icon Chip */}
        <div className="w-11 h-11 rounded-full bg-[#E5F3FA] border border-[#CDE6F5] flex items-center justify-center text-brand-blue shrink-0 mb-4 transition-transform duration-200 group-hover:scale-105 shadow-2xs">
          <IconComponent className="w-5 h-5 stroke-[2.2]" />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-[#071A2E] tracking-tight mb-2 leading-snug">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      {/* Link Action */}
      <a
        href="#quote"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-brand-blue group-hover/link:text-[#0878D1] transition-colors mt-auto pt-2 group-hover:translate-x-0.5"
      >
        <span>Discuss this service</span>
        <ArrowUpRight className="w-4 h-4 text-brand-blue transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
};
