import React from "react";
import Image from "next/image";
import { ArrowRight, Plus, FileText, Package, Truck, Trees } from "lucide-react";
import { getHeroData } from "@/lib/prisma";
import { SnowfallEffect } from "@/components/hero/SnowfallEffect";

export async function Hero() {
  const heroData = await getHeroData();

  return (
    <div className="relative w-full bg-[#071A2E]">
      {/* 1. Main Hero Container with Scrim & Photo */}
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 overflow-hidden">
        
        {/* Animated Snowfall Effect Overlay */}
        <SnowfallEffect />

        {/* Background Photo */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/hero-bg.jpg"
            alt="Bay to Bay Express delivery van on Northern Ontario highway"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] lg:object-right"
          />
          
          {/* Lighter Directional Scrim for crisp text contrast */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(7, 26, 46, 0.94) 0%, rgba(7, 26, 46, 0.82) 40%, rgba(7, 26, 46, 0.40) 70%, rgba(7, 26, 46, 0.10) 100%)",
            }}
          />
        </div>

        {/* Hero Content Block */}
        <div className="relative z-10 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            
            {/* H1 Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-black tracking-tight leading-[1.08] text-white">
              <span className="block text-white">
                {heroData.headingLine1 && heroData.headingLine1 !== "Reliable."
                  ? heroData.headingLine1
                  : "Small Goods Delivery"}
              </span>
              <span className="block text-[#25A8E8]">
                {heroData.headingLine3Accent && heroData.headingLine3Accent !== "Delivered."
                  ? heroData.headingLine3Accent
                  : "Across Northern Ontario"}
              </span>
            </h1>

            {/* Vibrant Green Underline Bar */}
            <div className="w-20 sm:w-24 h-1.5 bg-[#10B981] rounded-full my-4 sm:my-5" />

            {/* Subhead Tagline */}
            <p className="text-xl sm:text-2xl font-bold text-white/95 tracking-tight mb-6 sm:mb-8">
              {heroData.subtext && heroData.subtext.includes("Small goods")
                ? "Reliable. Dedicated. Delivered."
                : heroData.subtext || "Reliable. Dedicated. Delivered."}
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a
                href="#quote"
                className="bg-[#0088FF] hover:bg-[#0077EE] text-white font-extrabold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#service-areas"
                className="border border-white/40 bg-slate-900/30 backdrop-blur-xs hover:bg-white/10 text-white font-extrabold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-xl inline-flex items-center gap-2 transition-all duration-200"
              >
                <span>View Service Areas</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Bottom Slogan Badge */}
            <div className="inline-flex max-w-full items-center gap-2 text-[10px] xs:text-[11px] sm:text-xs xl:text-sm font-bold tracking-wider text-slate-300 uppercase bg-slate-900/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xs shadow-xs">
              <Trees className="w-4 h-4 text-[#10B981] shrink-0" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">SAME COMMUNITIES. A STRONGER NORTHERN ONTARIO.</span>
            </div>

          </div>
        </div>

        {/* Decorative Wavy Blue SVG Divider between Hero and Services Teaser Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden leading-none">
          {/* Layer 1: Vibrant Cyan-Blue Accent Wave Curve (#25A8E8) */}
          <svg
            className="relative block w-full h-12 sm:h-16 lg:h-24 text-[#25A8E8]"
            viewBox="0 0 1440 120"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,32 C240,96 480,0 720,48 C960,96 1200,16 1440,40 L1440,120 L0,120 Z" opacity="0.85" />
          </svg>
          {/* Layer 2: Light Background Surface Wave Curve (#F6F9FC) */}
          <svg
            className="relative block w-full h-10 sm:h-14 lg:h-20 text-[#F6F9FC] -mt-8 sm:-mt-10 lg:-mt-14"
            viewBox="0 0 1440 120"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M0,48 C320,112 640,16 960,64 C1120,88 1320,32 1440,48 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* 2. Services Teaser Strip directly under Hero */}
      <section className="relative z-20 w-full bg-[#F6F9FC] pt-2 pb-12 sm:pb-16 border-b border-slate-200/60">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 4 Feature Teaser Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            
            {/* Card 1: Medical & Pharmacy */}
            <a
              href="#services"
              className="bg-white rounded-2xl p-3.5 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(7,26,46,0.04)] hover:shadow-[0_8px_30px_rgba(7,26,46,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-start justify-between gap-3.5 sm:gap-0 group"
            >
              <div className="flex items-center sm:block gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center sm:mb-4 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg font-extrabold text-[#071A2E] leading-snug sm:mb-2 group-hover:text-[#0088FF] transition-colors truncate sm:whitespace-normal">
                    Medical & Pharmacy
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-normal leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none mt-0.5 sm:mt-0">
                    Time-sensitive delivery for healthcare and pharmacy needs across Northern Ontario.
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:mt-6 sm:w-full sm:flex sm:justify-end">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover:bg-[#0088FF] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </a>

            {/* Card 2: Documents */}
            <a
              href="#services"
              className="bg-white rounded-2xl p-3.5 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(7,26,46,0.04)] hover:shadow-[0_8px_30px_rgba(7,26,46,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-start justify-between gap-3.5 sm:gap-0 group"
            >
              <div className="flex items-center sm:block gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0284C7] text-white flex items-center justify-center sm:mb-4 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg font-extrabold text-[#071A2E] leading-snug sm:mb-2 group-hover:text-[#0088FF] transition-colors truncate sm:whitespace-normal">
                    Documents
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-normal leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none mt-0.5 sm:mt-0">
                    Secure, reliable delivery for important documents and paperwork.
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:mt-6 sm:w-full sm:flex sm:justify-end">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover:bg-[#0088FF] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </a>

            {/* Card 3: Retail & Small Goods */}
            <a
              href="#services"
              className="bg-white rounded-2xl p-3.5 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(7,26,46,0.04)] hover:shadow-[0_8px_30px_rgba(7,26,46,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-start justify-between gap-3.5 sm:gap-0 group"
            >
              <div className="flex items-center sm:block gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center sm:mb-4 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg font-extrabold text-[#071A2E] leading-snug sm:mb-2 group-hover:text-[#0088FF] transition-colors truncate sm:whitespace-normal">
                    Retail & Small Goods
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-normal leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none mt-0.5 sm:mt-0">
                    Flexible delivery for businesses and individuals across the North.
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:mt-6 sm:w-full sm:flex sm:justify-end">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover:bg-[#0088FF] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </a>

            {/* Card 4: Dedicated Delivery */}
            <a
              href="#services"
              className="bg-white rounded-2xl p-3.5 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(7,26,46,0.04)] hover:shadow-[0_8px_30px_rgba(7,26,46,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-start justify-between gap-3.5 sm:gap-0 group"
            >
              <div className="flex items-center sm:block gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0284C7] text-white flex items-center justify-center sm:mb-4 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg font-extrabold text-[#071A2E] leading-snug sm:mb-2 group-hover:text-[#0088FF] transition-colors truncate sm:whitespace-normal">
                    Dedicated Delivery
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-normal leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none mt-0.5 sm:mt-0">
                    Direct, dedicated service when it matters most.
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:mt-6 sm:w-full sm:flex sm:justify-end">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover:bg-[#0088FF] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </a>

          </div>

          {/* Footer Brand Slogan Bar */}
          <div className="mt-10 pt-6 border-t border-slate-200/70 flex items-center justify-center gap-3 text-[11px] sm:text-xs font-black tracking-widest uppercase text-slate-500">
            <span>NORTHERN PEOPLE</span>
            <Trees className="w-4 h-4 text-[#10B981]" />
            <span>STRONGER COMMUNITIES</span>
            <Trees className="w-4 h-4 text-[#10B981]" />
            <span>A BRIGHTER TOMORROW</span>
          </div>

        </div>
      </section>
    </div>
  );
}
