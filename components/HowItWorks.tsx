import React from "react";
import { ArrowRight } from "lucide-react";
import {
  getHowItWorksSectionData,
  getHowItWorksStepsData,
} from "@/lib/prisma";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { StepItem } from "@/components/how-it-works/StepItem";

export async function HowItWorks() {
  const content = await getHowItWorksSectionData();
  const steps = await getHowItWorksStepsData();

  const totalStepsFormatted = String(steps.length || 4).padStart(2, "0");

  return (
    <section
      id="how-it-works"
      className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Content Block (~35-40%) */}
          <div className="lg:col-span-5 max-w-xl">
            {/* Eyebrow Label */}
            <EyebrowLabel text={content.eyebrow} />

            {/* Two-Tone Headline H2 */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] font-black text-[#071A2E] tracking-tight leading-[1.05] mb-5 sm:mb-6">
              <span className="block">{content.headingPrimary}</span>
              <span className="text-brand-blue block mt-1">{content.headingAccent}</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed mb-6 sm:mb-8">
              {content.description}
            </p>

            {/* CTA Link */}
            <div>
              <a
                href="#quote"
                className="inline-flex items-center gap-2 text-brand-blue font-extrabold text-sm sm:text-base hover:text-[#0878D1] transition-colors group"
              >
                <span>{content.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Steps Panel (~60-65%) */}
          <div className="lg:col-span-7 w-full pt-2 lg:pt-0">
            {/* Steps Panel Header Row */}
            <div className="flex items-center justify-between border-b border-slate-200/90 pb-3.5 mb-2 sm:mb-4 text-[11px] sm:text-xs">
              {/* Left: Dispatch Sequence Label */}
              <span className="font-extrabold tracking-widest text-slate-400 uppercase">
                SERVICE PROCESS
              </span>

              {/* Right: Dynamic Step Counter */}
              <span className="font-extrabold tracking-widest text-brand-blue uppercase bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                01 / {totalStepsFormatted}
              </span>
            </div>

            {/* Step Items List */}
            <div className="divide-y divide-slate-100">
              {steps.map((step, index) => (
                <StepItem
                  key={step.id || index}
                  index={index}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
