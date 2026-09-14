import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { getHeroRouteData, getServiceAreaData } from "@/lib/prisma";
import { RouteMap } from "@/components/service-area/RouteMap";

export async function ServiceArea() {
  const routeData = await getHeroRouteData();
  const serviceAreaContent = await getServiceAreaData();

  return (
    <section id="service-areas" className="w-full bg-[#F6F9FC] py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text Content (~45% width on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center">
            
            {/* Eyebrow: Short horizontal line + SERVICE AREA */}
            <div className="inline-flex items-center gap-2.5 mb-3.5 sm:mb-4">
              <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
              <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase">
                {serviceAreaContent.eyebrow}
              </span>
            </div>

            {/* H2 Headline: Two-Tone Styling */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-4xl xl:text-[42px] font-black text-[#071A2E] tracking-tight leading-[1.15]">
              {serviceAreaContent.headingPrimary}{" "}
              <span className="text-[#25A8E8] block lg:inline">
                {serviceAreaContent.headingAccent}
              </span>
            </h2>

            {/* Paragraph Description */}
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
              {serviceAreaContent.description}
            </p>

            {/* Info Card: Light-Blue Background */}
            <div className="mt-6 sm:mt-8 w-full bg-[#EEF7FC] border border-[#D5EBF7] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#25A8E8]/15 border border-[#25A8E8]/30 flex items-center justify-center text-[#25A8E8] shrink-0 mt-0.5">
                <MapPin className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#071A2E] tracking-tight">
                  {serviceAreaContent.cardTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-0.5">
                  {serviceAreaContent.cardDescription}
                </p>
              </div>
            </div>

            {/* Link: Ask about your route → */}
            <a
              href="#quote"
              className="mt-6 sm:mt-7 inline-flex items-center gap-2 text-sm sm:text-base font-extrabold text-brand-blue hover:text-[#0878D1] transition-colors group"
            >
              <span>Ask about your route</span>
              <ArrowRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

          {/* Right Column: Route Map Card (~55% width on desktop) */}
          <div className="lg:col-span-7 w-full">
            <RouteMap
              stops={routeData.stops}
              badgeText={serviceAreaContent.badgeText}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
