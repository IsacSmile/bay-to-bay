import React from "react";
import {
  getServicesSectionData,
  getServicesData,
} from "@/lib/prisma";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ArrowRight } from "lucide-react";

export async function ServicesGrid() {
  const sectionContent = await getServicesSectionData();
  const services = await getServicesData();

  const ctaHeading = sectionContent.ctaHeading || "Need regular deliveries?";
  const ctaSubtext =
    sectionContent.ctaSubtext ||
    "Let's talk about a delivery solution that works for your business.";
  const ctaButtonText = sectionContent.ctaButtonText || "Discuss Your Route";

  return (
    <section
      id="services"
      className="w-full bg-[#F8FAFC] pt-16 sm:pt-20 lg:pt-24 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Block */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 mb-3.5 sm:mb-4">
            <span
              className="w-6 h-[2px] bg-brand-blue rounded-full"
              aria-hidden="true"
            />
            <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase">
              {sectionContent.eyebrow}
            </span>
          </div>

          {/* H2 Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#071F3B] tracking-tight leading-[1.08]">
            {sectionContent.headingPrimary}{" "}
            <span className="text-brand-blue block sm:inline">
              {sectionContent.headingAccent}
            </span>
          </h2>

          {/* Paragraph Description */}
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
            {sectionContent.description}
          </p>
        </div>

        {/* Service Photo Cards 2-Column Grid (1 col mobile, 2 col desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id || index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner (Full-width dark navy banner) */}
      <div className="w-full bg-[#071F3B] relative overflow-hidden text-white py-12 sm:py-16">
        {/* Decorative faint route line motif */}
        <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M-100 280C200 240 400 120 720 180C1040 240 1250 80 1540 120"
              stroke="#38BDF8"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M-100 280C200 240 400 120 720 180C1040 240 1250 80 1540 120"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray="16 16"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
              {ctaHeading}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {ctaSubtext}
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0070F3] hover:bg-[#0051B3] text-white font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <span>{ctaButtonText}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

