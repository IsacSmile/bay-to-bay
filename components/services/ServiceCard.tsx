import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ServiceItemData } from "@/lib/prisma";

interface ServiceCardProps {
  service: ServiceItemData;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
}) => {
  // Placeholder stock photos (temporary stock photo placeholders - replace with real branded photography before production launch)
  const defaultImages = [
    "/services/medical-pharmacy.jpg",
    "/services/documents.jpg",
    "/services/retail-goods.jpg",
    "/services/delivery-van.jpg",
  ];

  const photoUrl =
    service.imageUrl && service.imageUrl.trim() !== ""
      ? service.imageUrl
      : defaultImages[index % defaultImages.length];

  return (
    <div
      className={`group rounded-2xl border bg-white overflow-hidden transition-all duration-300 flex flex-col md:flex-row hover:shadow-lg hover:-translate-y-0.5 ${
        service.isPriority
          ? "border-sky-300/80 shadow-md ring-1 ring-sky-200/60"
          : "border-slate-200/90 shadow-sm"
      }`}
    >
      {/* Photo Column: Photo on left ~40% width on desktop, full width top on mobile */}
      <div className="w-full md:w-5/12 shrink-0 relative h-48 sm:h-52 md:h-auto min-h-[190px] bg-slate-100 overflow-hidden">
        {/* Placeholder stock image - flagged for replacement before launch */}
        <img
          src={photoUrl}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {service.isPriority && (
          <div className="absolute top-3 left-3 bg-[#071F3B]/90 text-white font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Content Column: Text & CTA on right ~60% width on desktop */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between bg-white">
        <div>
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-[#071F3B] tracking-tight mb-2 group-hover:text-brand-blue transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
            {service.description}
          </p>
        </div>

        {/* Learn More Link with Arrow */}
        <a
          href="#quote"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-brand-blue hover:text-sky-700 transition-colors pt-1 group/link"
        >
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

