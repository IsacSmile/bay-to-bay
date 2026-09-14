import React from "react";
import Image from "next/image";
import { ArrowRight, Phone, Clock, Truck, Package } from "lucide-react";
import {
  getHeroData,
  getHeroRouteData,
  getContactData,
  getThemeSettings,
  hexToRgb,
} from "@/lib/prisma";
import { RouteCard } from "@/components/hero/RouteCard";
import { SnowfallEffect } from "@/components/hero/SnowfallEffect";
import { Button } from "@/components/ui/Button";

export async function Hero() {
  const heroData = await getHeroData();
  const routeData = await getHeroRouteData();
  const contactData = await getContactData();
  const themeSettings = await getThemeSettings();
  const { r, g, b } = hexToRgb(themeSettings.overlayColor);

  const phoneTelLink = `tel:${contactData.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section className="relative w-full min-h-[calc(100dvh-34px)] sm:min-h-[700px] lg:min-h-[calc(100vh-34px)] lg:h-auto xl:min-h-[740px] bg-[#04101D] text-white flex items-start lg:items-end overflow-hidden pt-[116px] sm:pt-32 lg:pt-32 xl:pt-36 pb-12 sm:pb-14 lg:pb-0">
      {/* 1. Base Background Image & Stacked Color Overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        
        {/* =======================================================
            1A. MOBILE BACKGROUND (Blurred Diffuse Treatment, < lg)
            ======================================================= */}
        <div className="block lg:hidden absolute inset-0 overflow-hidden">
          {/* Scaled + heavily blurred background image (no sharp trees or van) */}
          <Image
            src="/hero-bg.jpg"
            alt="Northern Ontario winter courier landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-125"
            style={{ filter: "blur(28px) brightness(0.80) saturate(1.1)" }}
          />

          {/* Soft Diagonal Gradient Overlay (Top-left dark navy -> Bottom-right moody teal glow, dimmed 15-20%) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(7, 31, 59, 0.96) 0%, rgba(14, 46, 76, 0.78) 45%, rgba(95, 160, 190, 0.26) 100%)",
            }}
          />

          {/* Subtle Top & Bottom Framing Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7, 31, 59, 0.4) 0%, transparent 20%, transparent 80%, rgba(7, 31, 59, 0.3) 100%)",
            }}
          />
        </div>

        {/* =======================================================
            1B. DESKTOP BACKGROUND (Sharp Photo + Directional Navy Gradient, >= lg)
            ======================================================= */}
        <div className="hidden lg:block absolute inset-0">
          {/* 1.1 Desktop Background Photo with brightness(0.85) saturate(1.05) filter */}
          <Image
            src="/hero-bg.jpg"
            alt="Delivery van in dusk Northern Ontario winter landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[82%_center]"
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
          <div className="absolute right-[18%] top-[53%] -translate-y-1/2 w-[420px] h-[420px] pointer-events-none z-[1] select-none opacity-35 animate-[headlightGlow_6s_ease-in-out_infinite] mix-blend-screen">
            <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(240,248,255,0.75)_0%,_rgba(37,168,232,0.4)_30%,_rgba(8,120,209,0.15)_60%,_transparent_80%)] filter blur-3xl" />
          </div>
        </div>

      </div>

      {/* 2. Dynamic 3-Layer Snowfall Effect (Sits ABOVE overlays) */}
      <SnowfallEffect enabled={themeSettings.snowfallEnabled} />

      {/* 3. Hero Content Container */}
      <div className="relative z-20 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-0 pb-0 lg:pb-8 xl:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end">
          
          {/* Left Side: Eyebrow, H1 Headline, Subhead, Body & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Small Eyebrow Badges: Single Lightweight Unit (Tier 2) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3.5 sm:mb-4 lg:mb-4 xl:mb-5">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-white tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse shadow-sm shadow-brand-orange shrink-0" />
                <span>{heroData.eyebrowLabel || "Northern Ontario Courier Service"}</span>
              </div>

              {heroData.pillBadge && (
                <span className="text-[11px] sm:text-xs font-bold text-brand-bright tracking-wider uppercase pl-0.5 sm:pl-0">
                  {heroData.pillBadge}
                </span>
              )}
            </div>

            {/* H1 Main Headline with Responsive Scale across Laptop and Desktop (Tier 1) */}
            <h1 className="font-display text-[clamp(2.75rem,10vw,3.6rem)] lg:text-[58px] xl:text-[72px] 2xl:text-[82px] font-black tracking-tight leading-[1.03] text-white">
              <span className="block text-white">{heroData.headingLine1 || "Reliable."}</span>
              <span className="block text-white">{heroData.headingLine2 || "Dedicated."}</span>
              <span className="block text-[#25A8E8]">{heroData.headingLine3Accent || "Delivered."}</span>
            </h1>

            {/* Supporting Subhead & Paragraph with Structured Vertical Rhythm */}
            <div className="mt-3.5 sm:mt-4 lg:mt-4 xl:mt-5 space-y-1.5 sm:space-y-2 max-w-[580px]">
              <p className="text-xl sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-[26px] font-bold text-white/95 tracking-tight">
                {heroData.subtext?.includes("Northern Ontario") ? (
                  <>
                    {heroData.subtext.split("Northern Ontario")[0]}
                    <br className="block sm:hidden" />
                    Northern Ontario{heroData.subtext.split("Northern Ontario")[1]}
                  </>
                ) : (
                  heroData.subtext || "Small goods delivery across Northern Ontario."
                )}
              </p>
              <p className="text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-[17px] text-[#D9EDF5] font-normal leading-relaxed">
                {heroData.description || "Dedicated and scheduled delivery solutions connecting North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac."}
              </p>
            </div>

            {/* Universal CTA Buttons (Tier 1 Action: Sentence case, unified font family) */}
            <div className="mt-5 sm:mt-6 lg:mt-6 xl:mt-8 flex flex-row flex-wrap items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="sm"
                href="#quote"
                rightIcon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                className="sm:px-6 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 lg:text-base xl:px-8 xl:py-3.5 xl:min-h-[52px]"
              >
                Request a quote
              </Button>

              <Button
                variant="secondary"
                size="sm"
                href={phoneTelLink}
                leftIcon={<Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-brand-bright" />}
                className="sm:px-6 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 lg:text-base xl:px-8 xl:py-3.5 xl:min-h-[52px]"
              >
                Call us
              </Button>
            </div>

            {/* Hero Feature Pills (Tier 3: Footnote-level metadata with breathing room & uniform sizing) */}
            {heroData.featurePills && heroData.featurePills.length > 0 && (
              <div className="mt-6 sm:mt-7 lg:mt-6 xl:mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
                {heroData.featurePills.map((pill, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium text-slate-300 backdrop-blur-xs transition-colors select-none"
                  >
                    {pill.icon === "clock" && <Clock className="w-3 h-3 text-brand-bright/70 shrink-0" />}
                    {pill.icon === "truck" && <Truck className="w-3 h-3 text-brand-bright/70 shrink-0" />}
                    {pill.icon === "package" && <Package className="w-3 h-3 text-brand-bright/70 shrink-0" />}
                    <span>{pill.label}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Side: Premium Floating Route Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end pt-6 lg:pt-0 pb-12 lg:pb-0">
            <RouteCard data={routeData} />
          </div>

        </div>
      </div>
    </section>
  );
}
