import React from "react";
import { Calendar, MapPin, Package, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Calendar,
    title: "Scheduled Routes",
    description: "Reliable recurring delivery throughout Northern Ontario on a consistent weekly schedule.",
  },
  {
    icon: MapPin,
    title: "Local Coverage",
    description: "Connecting communities across the Highway 11 corridor from North Bay to Hearst & Longlac.",
  },
  {
    icon: Package,
    title: "Small Goods",
    description: "Purpose-built delivery optimized for smaller commercial shipments, parcels, and goods.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    description: "Dedicated courier operations with clear communication and dependable drop-off timing.",
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-14">
          <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase block mb-2">
            Why Choose Bay to Bay
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A2E] tracking-tight">
            Delivery built around Northern Ontario
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Purpose-built courier and freight solutions designed specifically for regional commercial logistics.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#F6F9FC] hover:bg-brand-soft/60 rounded-card p-6 sm:p-7 border border-slate-200/80 transition-all duration-200 hover:shadow-subtle group"
              >
                <div className="w-12 h-12 rounded-btn bg-white border border-slate-200/80 flex items-center justify-center mb-5 text-brand-blue shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#071A2E] mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
