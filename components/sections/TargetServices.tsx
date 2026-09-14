import React from "react";
import { Store, ShoppingBag, Factory, HardHat, Truck } from "lucide-react";

const AUDIENCES = [
  {
    icon: Store,
    title: "Local Businesses",
    description: "Scheduled parcel and document transportation for regional storefronts and offices.",
  },
  {
    icon: ShoppingBag,
    title: "Retail & Suppliers",
    description: "Dependable stock replenishment connecting distributors to local retail outlets.",
  },
  {
    icon: Factory,
    title: "Manufacturers",
    description: "Time-critical delivery of industrial components, spare parts, and machinery goods.",
  },
  {
    icon: HardHat,
    title: "Contractors",
    description: "On-demand equipment and materials drop-off directly to Northern jobsites.",
  },
  {
    icon: Truck,
    title: "Commercial Shipments",
    description: "Custom recurring freight and small goods logistics tailored to your schedule.",
  },
];

export const TargetServices: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-2xl text-left mb-12 sm:mb-14">
          <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase block mb-2">
            Who We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A2E] tracking-tight">
            Tailored for Northern Ontario Businesses
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Dependable transportation solutions built for the unique logistics demands of regional commerce and industry.
          </p>
        </div>

        {/* 5 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {AUDIENCES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F6F9FC] rounded-card p-6 sm:p-7 border border-slate-200/80 transition-all duration-200 hover:shadow-subtle hover:border-slate-300"
              >
                <div className="w-10 h-10 rounded-btn bg-brand-soft text-brand-blue flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#071A2E] mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
