import React from "react";
import { Repeat, Truck, Globe, Calendar, HeartHandshake } from "lucide-react";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const defaultFeatures: FeatureItem[] = [
  {
    id: "recurring-routes",
    title: "Recurring Routes",
    description: "Set up regular weekly or twice-weekly deliveries.",
    icon: <Repeat className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />,
  },
  {
    id: "dedicated-runs",
    title: "Dedicated Runs",
    description: "A direct delivery solution designed around your shipment.",
    icon: <Truck className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />,
  },
  {
    id: "multi-location",
    title: "Multi-Location Delivery",
    description: "Coordinate deliveries between multiple Northern Ontario locations.",
    icon: <Globe className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />,
  },
  {
    id: "scheduled-pickup",
    title: "Scheduled Pickup & Delivery",
    description: "Plan transportation around your business schedule.",
    icon: <Calendar className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />,
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    description: "Talk through the route, frequency, and service details with our team.",
    icon: <HeartHandshake className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" />,
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
      {defaultFeatures.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3.5 p-4 sm:p-4.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 hover:bg-white hover:border-slate-300/90 hover:shadow-sm transition-all duration-200 group"
        >
          <div className="p-1 rounded-md bg-brand-blue/5 group-hover:bg-brand-blue/10 transition-colors">
            {item.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-extrabold text-[#071A2E] text-sm sm:text-base leading-snug">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-normal mt-0.5 sm:mt-1">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
