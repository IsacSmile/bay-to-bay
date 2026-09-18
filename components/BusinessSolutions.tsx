import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getBusinessSolutionsData } from "@/lib/prisma";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Button } from "@/components/ui/Button";

export async function BusinessSolutions() {
  const content = await getBusinessSolutionsData();

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
            <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed mb-6 sm:mb-8 max-w-2xl">
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
        </div>
      </div>
    </section>
  );
}
