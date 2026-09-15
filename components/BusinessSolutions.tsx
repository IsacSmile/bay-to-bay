import React from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getBusinessSolutionsData, getHeroRouteData } from "@/lib/prisma";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Button } from "@/components/ui/Button";
import { FeatureGrid } from "@/components/business-solutions/FeatureGrid";

export async function BusinessSolutions() {
  const content = await getBusinessSolutionsData();
  const routeData = await getHeroRouteData();

  // Sort stops to get true start and end stop names dynamically
  const sortedStops = [...routeData.stops].sort((a, b) => a.order - b.order);
  const startStopName =
    sortedStops.find((s) => s.isStart)?.name || sortedStops[0]?.name || "NORTH BAY";
  const endStopName =
    sortedStops.find((s) => s.isEnd)?.name ||
    sortedStops[sortedStops.length - 1]?.name ||
    "HEARST";

  const dynamicRouteLabel = `${startStopName.toUpperCase()} → ${endStopName.toUpperCase()}`;

  return (
    <section
      id="business-solutions"
      className="w-full bg-[#F6F9FC] py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column — Image Card (~42% desktop width) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-xl sm:shadow-2xl bg-[#04101D] flex flex-col justify-between border border-slate-200/30">
              
              {/* Photo Area (Top ~80%) */}
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] overflow-hidden">
                <Image
                  src="/bay-to-bay-van-detail.webp"
                  alt="Bay to Bay Express delivery van with packages"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>

              {/* Bottom Navy Text Band (Solid ~20% block beneath photo) */}
              <div className="bg-[#04101D] p-5 sm:p-6 lg:p-7 text-left flex flex-col gap-1 z-10 border-t border-white/5">
                <span className="text-brand-blue text-sm sm:text-base font-extrabold tracking-wide">
                  Bay to Bay Express Inc.
                </span>
                <span className="text-white text-lg sm:text-xl lg:text-2xl font-black tracking-tight leading-tight">
                  Reliable. Dedicated. Delivered.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — Content Block (~58% desktop width) */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            
            {/* Eyebrow Label */}
            <EyebrowLabel text={content.eyebrow} />

            {/* H2 Heading: Two-Tone */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-black text-[#071A2E] tracking-tight leading-[1.05] mb-4">
              {content.headingPrimary}{" "}
              <span className="text-brand-blue block sm:inline">{content.headingAccent}</span>
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed mb-6 sm:mb-7 max-w-2xl">
              {content.description}
            </p>

            {/* Dispatch Brief Bar */}
            <a
              href="#quote-form"
              className="group relative block w-full bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-slate-300 py-3.5 sm:py-4 pl-5 sm:pl-6 pr-4 sm:pr-5 mb-6 sm:mb-8 transition-all duration-200 rounded-xl shadow-xs overflow-hidden"
            >
              {/* Vertical Orange Left Border Accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[4px] bg-amber-500"
                aria-hidden="true"
              />

              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] sm:text-xs font-black tracking-widest text-brand-blue uppercase flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span>DISPATCH BRIEF</span>
                    <span className="text-slate-300 font-normal text-[10px]" aria-hidden="true">•</span>
                    <span>{dynamicRouteLabel}</span>
                  </div>
                  <p className="text-xs sm:text-[13.5px] text-slate-600 mt-1 leading-normal line-clamp-2 sm:line-clamp-1">
                    {content.briefText}
                  </p>
                </div>
                <ArrowRight
                  className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </div>
            </a>

            {/* Feature Grid (5 items) */}
            <div className="w-full mb-8 sm:mb-9">
              <FeatureGrid />
            </div>

            {/* CTA Button */}
            <div>
              <Button
                href="#quote-form"
                variant="primary"
                size="lg"
                rightIcon={<ArrowUpRight className="w-5 h-5" aria-hidden="true" />}
              >
                {content.ctaText}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
