import React from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import {
  getHeroData,
  getHeroRouteData,
  getContactData,
  getThemeSettings,
  hexToRgb,
} from "@/lib/prisma";
import { RouteCard } from "@/components/hero/RouteCard";
import { SnowfallEffect } from "@/components/hero/SnowfallEffect";

export async function Hero() {
  const heroData = await getHeroData();
  const routeData = await getHeroRouteData();
  const contactData = await getContactData();
  const themeSettings = await getThemeSettings();
  const { r, g, b } = hexToRgb(themeSettings.overlayColor);

  const phoneTelLink = `tel:${contactData.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section className="relative w-full min-h-[640px] sm:min-h-[700px] lg:h-screen lg:min-h-[740px] bg-[#04101D] text-white flex items-center lg:items-end overflow-hidden py-16 sm:py-20 lg:py-0">
      {/* 1. Base Background Image & Stacked Color Overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* 1.1 Background Photo with brightness(0.85) saturate(1.05) filter */}
        <Image
          src="/hero-bg.jpg"
          alt="Delivery van in dusk Northern Ontario winter landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-[82%_center]"
          style={{ filter: "brightness(0.85) saturate(1.05)" }}
        />
        
        {/* 1.2 Navy-tinted Gradient Overlay (Heavier left, fading right, theme-derived) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(100deg, rgba(${r}, ${g}, ${b}, 0.92) 0%, rgba(${r}, ${g}, ${b}, 0.75) 30%, rgba(${r}, ${g}, ${b}, 0.45) 60%, rgba(${r}, ${g}, ${b}, 0.25) 100%)`,
          }}
        />

        {/* 1.3 Subtle Vertical Vignette Div (Darkens top & bottom edges) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, 0.35) 0%, rgba(${r}, ${g}, ${b}, 0) 20%, rgba(${r}, ${g}, ${b}, 0) 80%, rgba(${r}, ${g}, ${b}, 0.45) 100%)`,
          }}
        />

        {/* 1.4 Subtle Vehicle Headlight Atmospheric Glow Animation (Slow 6s breathing bloom) */}
        <div className="absolute right-[10%] sm:right-[18%] top-[50%] sm:top-[53%] -translate-y-1/2 w-72 h-72 sm:w-[420px] sm:h-[420px] pointer-events-none z-[1] select-none opacity-35 animate-[headlightGlow_6s_ease-in-out_infinite] mix-blend-screen">
          <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(240,248,255,0.75)_0%,_rgba(37,168,232,0.4)_30%,_rgba(8,120,209,0.15)_60%,_transparent_80%)] filter blur-2xl sm:blur-3xl" />
        </div>
      </div>

      {/* 2. Dynamic 3-Layer Snowfall Effect (Sits ABOVE overlays) */}
      <SnowfallEffect enabled={themeSettings.snowfallEnabled} />

      {/* 3. Hero Content Container (Pulled up by 1 more rem: pb-16 / 4rem bottom gap) */}
      <div className="relative z-20 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-12 lg:pt-14 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          
          {/* Left Side: Eyebrow, H1 Headline, Subhead, Body & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Small Eyebrow Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse shadow-sm shadow-brand-orange" />
                <span>{heroData.eyebrowLabel || "NORTHERN ONTARIO COURIER SERVICE"}</span>
              </div>

              <span className="bg-brand-bright/20 backdrop-blur-md border border-brand-bright/40 text-brand-bright px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest">
                {heroData.pillBadge || "HIGHWAY 11 CORRIDOR"}
              </span>
            </div>

            {/* H1 Main Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[80px] font-black tracking-tight leading-[1.03] text-white">
              <span className="block">{heroData.headingLine1 || "Reliable."}</span>
              <span className="block">{heroData.headingLine2 || "Dedicated."}</span>
              <span className="block text-[#25A8E8]">{heroData.headingLine3Accent || "Delivered."}</span>
            </h1>

            {/* Supporting Subhead & Paragraph */}
            <div className="mt-5 sm:mt-6 space-y-2 max-w-[580px]">
              <p className="text-xl sm:text-2xl font-bold text-white/95 tracking-tight">
                {heroData.subtext || "Small goods delivery across Northern Ontario."}
              </p>
              <p className="text-sm sm:text-base text-[#D9EDF5] font-normal leading-relaxed">
                {heroData.description || "Dedicated and scheduled delivery solutions connecting North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac."}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2.5 bg-brand-blue hover:bg-brand-bright text-white text-base font-extrabold px-8 py-3.5 rounded-btn h-[52px] shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center"
              >
                <span>Request a quote</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={phoneTelLink}
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-base font-bold px-8 py-3.5 rounded-btn h-[52px] backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center"
              >
                <Phone className="w-4 h-4 text-brand-bright" />
                <span>Call us</span>
              </a>
            </div>

          </div>

          {/* Right Side: Premium Floating Route Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end pt-6 lg:pt-0">
            <RouteCard data={routeData} />
          </div>

        </div>
      </div>
    </section>
  );
}
