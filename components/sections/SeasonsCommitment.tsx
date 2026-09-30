"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Snowflake } from "lucide-react";
import { SnowfallEffect } from "@/components/hero/SnowfallEffect";

export interface SeasonsCommitmentProps {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  subtext?: string;
  bgImage?: string;
}

export const SeasonsCommitment: React.FC<SeasonsCommitmentProps> = ({
  eyebrow = "ROOTED IN ONTARIO",
  headingLine1 = "Every season.",
  headingLine2 = "The same commitment.",
  subtext = "Connecting people, businesses and communities across the North and the GTA.",
  bgImage = "/seasons-branded-moose.webp",
}) => {
  const [isSnowing, setIsSnowing] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#061B30] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center">
      {/* Background Scenic Road & Seasons Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={bgImage}
          alt="Bay to Bay Express delivery van travelling through changing seasons across Ontario"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[center_35%] lg:object-center"
        />

        {/* Desktop Smooth Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none" />

        {/* Mobile Full Subtle Dark Scrim */}
        <div className="absolute inset-0 bg-slate-950/45 sm:hidden pointer-events-none" />
      </div>

      {/* Gentle Snowfall Effect Overlay (Toggled via button) */}
      <SnowfallEffect enabled={isSnowing} />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="max-w-xl space-y-3 sm:space-y-4">
          
          {/* Eyebrow */}
          <span className="text-sky-300 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase block">
            {eyebrow}
          </span>

          {/* Main Two-Line Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-white tracking-tight leading-[1.12]">
            <span>{headingLine1}</span>
            <br />
            <span>{headingLine2}</span>
          </h2>

          {/* Description Paragraph */}
          <p className="text-slate-100 text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed max-w-lg pt-1">
            {subtext}
          </p>

          {/* Interactive Snowfall Toggle Button */}
          <div className="pt-3 sm:pt-4">
            <button
              type="button"
              onClick={() => setIsSnowing((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl border border-white/40 hover:border-white/80 bg-black/35 hover:bg-black/50 text-white font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-xs transition-all duration-200 shadow-xs hover:scale-[1.02] active:scale-95 cursor-pointer select-none"
            >
              <Snowflake className={`w-4 h-4 transition-transform duration-300 ${isSnowing ? "text-sky-300 rotate-180" : "text-white/80"}`} />
              <span>{isSnowing ? "Turn off snowfall" : "Turn on gentle snowfall"}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
