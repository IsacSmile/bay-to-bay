import React from "react";
import { getWhyUsSectionData, getReasonItemsData, getHeroRouteData } from "@/lib/prisma";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { AnimatedRouteBar } from "@/components/why-us/AnimatedRouteBar";
import { ReasonGridAnimated } from "@/components/why-us/ReasonGridAnimated";

export async function WhyUs() {
  const content = await getWhyUsSectionData();
  const reasons = await getReasonItemsData();
  const routeData = await getHeroRouteData();

  const sortedStops = [...routeData.stops].sort((a, b) => a.order - b.order);

  return (
    <section
      id="why-us"
      className="w-full bg-[#F6F9FC] py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-4xl">
          {/* Eyebrow Label */}
          <EyebrowLabel text={content.eyebrow} />

          {/* Two-Tone Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-black text-[#071A2E] tracking-tight leading-[1.05] mb-6 sm:mb-8">
            {content.headingPrimary}{" "}
            <span className="text-brand-blue block sm:inline">{content.headingAccent}</span>
          </h2>
        </div>

        {/* Route Mini-Bar Row with Animated All Stops & Tagline */}
        <AnimatedRouteBar stops={sortedStops} tagline={content.tagline} />

        {/* Reason Items Cards Grid with Staggered Entrance Animation */}
        <ReasonGridAnimated reasons={reasons} />

      </div>
    </section>
  );
}

