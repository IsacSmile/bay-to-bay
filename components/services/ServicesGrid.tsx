import React from "react";
import {
  getServicesSectionData,
  getServicesData,
} from "@/lib/prisma";
import { ServiceCard } from "@/components/services/ServiceCard";

export async function ServicesGrid() {
  const sectionContent = await getServicesSectionData();
  const services = await getServicesData();

  return (
    <section
      id="services"
      className="w-full bg-[#F6F9FC] py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Block */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          {/* Eyebrow Label: Short horizontal line + OUR SERVICES */}
          <div className="inline-flex items-center gap-2.5 mb-3.5 sm:mb-4">
            <span
              className="w-6 h-[2px] bg-brand-blue rounded-full"
              aria-hidden="true"
            />
            <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase">
              {sectionContent.eyebrow}
            </span>
          </div>

          {/* H2 Headline: Two-Tone Styling */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-[54px] 2xl:text-[60px] font-black text-[#071A2E] tracking-tight leading-[1.08]">
            {sectionContent.headingPrimary}{" "}
            <span className="text-[#25A8E8] block sm:inline">
              {sectionContent.headingAccent}
            </span>
          </h2>

          {/* Paragraph Description */}
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
            {sectionContent.description}
          </p>
        </div>

        {/* Service Cards Responsive Grid (1 col mobile, 2 col tablet md:, 3 col desktop lg:) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-7">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id || index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
