"use client";

import React from "react";
import Image from "next/image";
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
  return (
    <section className="relative w-full overflow-hidden bg-[#061B30] min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] flex items-center">
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

        {/* Desktop Smooth Gradient Overlay for Enhanced Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none" />

        {/* Mobile Full Subtle Dark Scrim */}
        <div className="absolute inset-0 bg-slate-950/45 sm:hidden pointer-events-none" />
      </div>

      {/* Gentle Snowfall Infinite Loop Animation */}
      <SnowfallEffect enabled={true} />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          
          {/* Eyebrow */}
          <span className="text-sky-300 font-bold text-xs sm:text-sm md:text-[15px] tracking-[0.2em] uppercase block mb-1">
            {eyebrow}
          </span>

          {/* Main Two-Line Large Bold Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-black text-white tracking-tight leading-[1.08] sm:leading-[1.12]">
            <span>{headingLine1}</span>
            <br />
            <span>{headingLine2}</span>
          </h2>

          {/* Description Paragraph */}
          <p className="text-slate-100 text-sm sm:text-base md:text-lg lg:text-[19px] font-normal leading-relaxed max-w-xl pt-2">
            {subtext}
          </p>

        </div>
      </div>
    </section>
  );
};
