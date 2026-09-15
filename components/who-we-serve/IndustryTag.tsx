import React from "react";
import {
  Activity,
  Pill,
  ShieldCheck,
  FileText,
  Landmark,
  Store,
  Building,
  Package,
  Truck,
  Globe,
  HeartHandshake,
  Building2,
  Sparkles,
  Cross,
  Scale,
  HardHat,
  Factory,
  Wrench,
  Briefcase,
  ShoppingBag,
  Send,
  Users,
  Boxes,
  Stethoscope,
} from "lucide-react";

export interface IndustryTagProps {
  label: string;
  icon?: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  activity: Activity,
  pill: Pill,
  stethoscope: Stethoscope,
  "shield-check": ShieldCheck,
  "file-text": FileText,
  landmark: Landmark,
  store: Store,
  building: Building,
  package: Package,
  truck: Truck,
  globe: Globe,
  "heart-handshake": HeartHandshake,
  "building-2": Building2,
  sparkles: Sparkles,
  cross: Cross,
  scale: Scale,
  "hard-hat": HardHat,
  factory: Factory,
  wrench: Wrench,
  briefcase: Briefcase,
  "shopping-bag": ShoppingBag,
  send: Send,
  users: Users,
  boxes: Boxes,
};

export const IndustryTag: React.FC<IndustryTagProps> = ({
  label,
  icon = "building-2",
  className = "",
}) => {
  const IconComponent = iconMap[icon.toLowerCase()] || Building2;

  return (
    <div
      className={`group flex items-center gap-3.5 px-4 sm:px-5 py-3.5 rounded-xl bg-[#0D243B]/80 hover:bg-[#122E4A] border border-white/10 hover:border-white/20 transition-all duration-200 shadow-sm min-h-[52px] ${className}`.trim()}
    >
      <div className="p-1 rounded-md bg-brand-bright/10 group-hover:bg-brand-bright/20 transition-colors shrink-0">
        <IconComponent className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-brand-bright shrink-0" />
      </div>
      <span className="text-white font-medium sm:font-semibold text-xs sm:text-sm lg:text-[15px] leading-snug tracking-tight">
        {label}
      </span>
    </div>
  );
};
