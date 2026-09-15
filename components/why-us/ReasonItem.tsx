import React from "react";
import {
  Building2,
  ShieldCheck,
  Truck,
  CalendarDays,
  Package,
  Sparkles,
  MapPin,
  Compass,
  Sliders,
  Activity,
  FileText,
  Store,
  Landmark,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "building-2": Building2,
  building: Building2,
  "shield-check": ShieldCheck,
  shield: ShieldCheck,
  truck: Truck,
  calendar: CalendarDays,
  repeat: CalendarDays,
  package: Package,
  sparkles: Sparkles,
  "map-pin": MapPin,
  compass: Compass,
  sliders: Sliders,
  activity: Activity,
  "file-text": FileText,
  store: Store,
  landmark: Landmark,
};

export interface ReasonItemProps {
  index: number;
  title: string;
  description: string;
  icon?: string;
  className?: string;
}

export const ReasonItem: React.FC<ReasonItemProps> = ({
  index,
  title,
  description,
  icon = "package",
  className = "",
}) => {
  const IconComponent = ICON_MAP[icon.toLowerCase()] || Package;
  const numberLabel = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`rounded-2xl p-6 sm:p-7 bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.99] flex flex-col justify-between group h-full cursor-pointer ${className}`.trim()}
    >
      <div>
        {/* Top Header Row with Icon Chip & Secondary Number Badge */}
        <div className="flex items-start justify-between gap-3 mb-5">
          {/* Circular Icon Chip */}
          <div className="w-11 h-11 rounded-full bg-[#E5F3FA] border border-[#CDE6F5] flex items-center justify-center text-brand-blue shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-2xs">
            <IconComponent className="w-5 h-5 stroke-[2.2]" />
          </div>

          {/* Secondary 2-Digit Number Badge */}
          <div className="w-6 h-6 rounded-full border border-sky-200/90 bg-slate-50/90 flex items-center justify-center text-[10px] font-black text-brand-blue shadow-2xs select-none">
            {numberLabel}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-[#071A2E] tracking-tight mb-2 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
