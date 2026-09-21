import React from "react";
import { ArrowUpRight } from "lucide-react";
import { getWhoWeServeSectionData, getIndustryTagsData } from "@/lib/prisma";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Button } from "@/components/ui/Button";
import { IndustryTag } from "@/components/who-we-serve/IndustryTag";

export async function WhoWeServe() {
  const content = await getWhoWeServeSectionData();
  const tags = await getIndustryTagsData();

  // Split tags into 2 columns for top-to-bottom filling layout on desktop (matching 7 / 6 reference split)
  const half = Math.ceil(tags.length / 2);
  const col1Tags = tags.slice(0, half);
  const col2Tags = tags.slice(half);

  return (
    <section
      id="who-we-serve"
      className="relative w-full bg-[#04101D] text-white py-16 sm:py-20 lg:py-24 border-b border-white/5 overflow-hidden"
    >

      {/* Decorative Ambient Top-Right Faint Arc Pattern */}
      <div
        className="absolute -right-16 -top-16 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] pointer-events-none opacity-10 sm:opacity-[0.14] text-brand-bright z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="400" cy="0" r="140" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="400" cy="0" r="220" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="400" cy="0" r="300" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="400" cy="0" r="380" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column — Content Block (~38% desktop width) */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center">
            
            {/* Eyebrow Label */}
            <EyebrowLabel text={content.eyebrow} />

            {/* Two-Tone Headline */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-black tracking-tight leading-[1.05] mb-4 text-white">
              {content.headingPrimary}{" "}
              <span className="text-brand-bright block sm:inline">{content.headingAccent}</span>
            </h2>

            {/* Paragraph Text */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-[17px] leading-relaxed mb-6 sm:mb-8 max-w-xl">
              {content.description}
            </p>

            {/* CTA Button */}
            <div>
              <Button
                href="#quote"
                variant="primary"
                size="lg"
                rightIcon={<ArrowUpRight className="w-5 h-5" aria-hidden="true" />}
              >
                {content.ctaText}
              </Button>
            </div>
          </div>

          {/* Right Column — Industry Tags Grid (~62% desktop width) */}
          <div className="lg:col-span-7 w-full">
            
            {/* Desktop 2-column layout (Top-to-bottom then left-to-right split) */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-3.5">
                {col1Tags.map((tag) => (
                  <IndustryTag key={tag.id} label={tag.label} icon={tag.icon} />
                ))}
              </div>
              <div className="flex flex-col gap-3.5">
                {col2Tags.map((tag) => (
                  <IndustryTag key={tag.id} label={tag.label} icon={tag.icon} />
                ))}
              </div>
            </div>

            {/* Mobile single-column stacked layout */}
            <div className="flex sm:hidden flex-col gap-3">
              {tags.map((tag) => (
                <IndustryTag key={tag.id} label={tag.label} icon={tag.icon} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
