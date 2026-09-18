"use client";

import React, { useState } from "react";
import { MapPin, ArrowRight, Clock, Truck, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { RegionItemData, ServiceAreaData } from "@/lib/prisma";
import { RouteMap } from "@/components/service-area/RouteMap";

interface ServiceAreaInteractiveProps {
  regions: RegionItemData[];
  serviceAreaContent: ServiceAreaData;
}

export const ServiceAreaInteractive: React.FC<ServiceAreaInteractiveProps> = ({
  regions,
  serviceAreaContent,
}) => {
  const [activeSlug, setActiveSlug] = useState<string>(
    regions.find((r) => r.status === "active")?.slug || regions[0]?.slug || "northern-ontario"
  );

  const activeRegion = regions.find((r) => r.slug === activeSlug) || regions[0];

  const hasStops = activeRegion && activeRegion.stops && activeRegion.stops.length > 0;

  return (
    <div className="w-full">
      {/* Region Selector Tabs Header */}
      <div className="flex flex-wrap items-center gap-3 mb-8 sm:mb-10">
        {regions.map((region) => {
          const isActive = region.slug === activeSlug;
          const isComingSoon = region.status === "coming_soon";

          return (
            <button
              key={region.id}
              onClick={() => setActiveSlug(region.slug)}
              className={`relative inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#071A2E] text-white shadow-lg shadow-[#071A2E]/20 border border-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 shadow-xs"
              }`}
            >
              <span>{region.name}</span>
              {isComingSoon && (
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  Coming Soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Region Details & Framing Copy */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 mb-3.5 sm:mb-4">
            <span className="w-6 h-[2px] bg-brand-blue rounded-full" aria-hidden="true" />
            <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase">
              {serviceAreaContent.eyebrow}
            </span>
          </div>

          {/* H2 Heading */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-4xl xl:text-[46px] 2xl:text-[52px] font-black text-[#071A2E] tracking-tight leading-[1.18]">
            {activeRegion.slug === "northern-ontario" ? (
              <>
                <span className="block">Dedicated &</span>
                <span className="text-[#25A8E8] block mt-1 sm:mt-1.5">
                  Scheduled Route.
                </span>
              </>
            ) : (
              <>
                <span className="block">Expanding</span>
                <span className="text-[#25A8E8] block mt-1 sm:mt-1.5">
                  Regional Network.
                </span>
              </>
            )}
          </h2>

          {/* Description Paragraph */}
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
            {activeRegion.slug === "northern-ontario"
              ? "Our dedicated special route connects North Bay to Hearst with guaranteed 12-hour delivery options, operating twice weekly along the Highway 11 corridor."
              : activeRegion.description ||
                "Express regional courier services expanding across Greater Toronto & Surrounding Areas."}
          </p>

          {/* Region Callout Info Card (Clean 1-block design) */}
          {activeRegion.slug === "northern-ontario" ? (
            <div className="mt-6 sm:mt-8 w-full bg-[#EEF7FC]/90 border border-[#D5EBF7] rounded-2xl p-4.5 sm:p-5 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#25A8E8]/15 border border-[#25A8E8]/30 flex items-center justify-center text-[#25A8E8] shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base font-extrabold text-[#071A2E] tracking-tight">
                  Highway 11 Corridor Route
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-0.5">
                  Connecting North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-bold text-slate-700">
                  <span className="inline-flex items-center gap-1.5 text-brand-blue">
                    <Clock className="w-3.5 h-3.5 text-[#25A8E8] shrink-0" /> 12-hour options*
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <Truck className="w-3.5 h-3.5 text-slate-500 shrink-0" /> Twice-weekly schedule
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 sm:mt-8 w-full bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4.5 sm:p-5 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base font-extrabold text-[#071A2E] tracking-tight">
                  Expansion Region in Progress
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-0.5">
                  We are finalising route frequencies, pickup hubs, and delivery schedules for GTA & Surrounding Areas.
                </p>
              </div>
            </div>
          )}

          {/* CTA Link */}
          <a
            href="#quote"
            className="mt-6 sm:mt-7 inline-flex items-center gap-2 text-sm sm:text-base font-extrabold text-brand-blue hover:text-[#0878D1] transition-colors group"
          >
            <span>Ask about a custom run in this region</span>
            <ArrowRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Right Column: Dynamic Map or Placeholder Card */}
        <div className="lg:col-span-7 w-full">
          {hasStops ? (
            <RouteMap stops={activeRegion.stops} badgeText={serviceAreaContent.badgeText} />
          ) : (
            <div className="w-full min-h-[380px] sm:min-h-[440px] bg-white rounded-[28px] border border-slate-200/80 shadow-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 mb-4 shadow-2xs">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black tracking-widest text-amber-800 uppercase bg-amber-100/90 border border-amber-300/80 px-3 py-1 rounded-full mb-3">
                EXPANSION REGION • COMING SOON
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A2E] tracking-tight mb-3">
                GTA & Surrounding Areas
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed mb-6 font-normal">
                Route stops, pickup schedules, and corridor details for Greater Toronto & Surrounding Areas are being finalized.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0" />
                <span>Pre-booking & custom run inquiries currently open</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
