import React from "react";
import {
  getHowItWorksSectionData,
  getHowItWorksStepsData,
} from "@/lib/prisma";
import { StepItem } from "@/components/how-it-works/StepItem";

export async function HowItWorks() {
  const content = await getHowItWorksSectionData();
  const steps = await getHowItWorksStepsData();

  return (
    <section
      id="how-it-works"
      className="w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          {/* Eyebrow in Green */}
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#059669] uppercase mb-3 sm:mb-4">
            {content.eyebrow || "SIMPLE FROM START TO FINISH"}
          </p>

          {/* Large Heading */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#071A2E] tracking-[0.015em] leading-[1.12]">
            {content.headingPrimary || "From your door to theirs."}
            {content.headingAccent && (
              <span className="text-brand-blue ml-2">{content.headingAccent}</span>
            )}
          </h2>
        </div>

        {/* 4 Column Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
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
    </section>
  );
}
