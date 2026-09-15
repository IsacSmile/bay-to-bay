import React from "react";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { TagPill } from "@/components/about/TagPill";
import { AboutContentData, AboutTagPillItem } from "@/lib/prisma";

export interface AboutProps {
  content?: AboutContentData;
  tagPills?: AboutTagPillItem[];
}

export const About: React.FC<AboutProps> = ({ content, tagPills = [] }) => {
  // Default fallback data if content prop is missing
  const data: AboutContentData = content || {
    eyebrow: "ABOUT BAY TO BAY",
    headingPrimary: "Local routes.",
    headingAccent: "Professional service.",
    description:
      "Bay to Bay Express Inc. is a Northern Ontario delivery and logistics company focused on reliable small-goods transportation and dedicated business delivery solutions. We connect communities across Northern Ontario through scheduled, recurring, and customized delivery services designed around the needs of local businesses and organizations.",
    quoteText: "Reliable. Dedicated. Delivered.",
    quoteDescription:
      "A clear promise about how we approach scheduled, dedicated, and small-goods delivery across Northern Ontario.",
    attribution: "BAY TO BAY EXPRESS INC.",
  };

  const displayTags =
    tagPills.length > 0
      ? tagPills
      : [
          { id: "1", label: "Local", order: 1 },
          { id: "2", label: "Professional", order: 2 },
          { id: "3", label: "Reliable", order: 3 },
          { id: "4", label: "Flexible", order: 4 },
          { id: "5", label: "Business-focused", order: 5 },
        ];

  // Helper to ensure quotes aren't duplicated if user typed quotes into the admin input
  const formatQuoteText = (text: string) => {
    const trimmed = text.trim();
    if (trimmed.startsWith("“") || trimmed.startsWith('"')) {
      return trimmed;
    }
    return `“${trimmed}”`;
  };

  return (
    <section className="w-full bg-white text-slate-900 py-14 sm:py-20 lg:py-24 border-t border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Content Block (~60% on desktop) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <EyebrowLabel text={data.eyebrow} />

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-black tracking-tight text-[#071A2E] leading-[1.06]">
              <span>{data.headingPrimary} </span>
              <span className="text-brand-blue block sm:inline">{data.headingAccent}</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base lg:text-[16px] leading-relaxed max-w-2xl font-normal">
              {data.description}
            </p>

            {/* Tag Pills Row */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
              {displayTags.map((tag) => (
                <TagPill key={tag.id} label={tag.label} />
              ))}
            </div>
          </div>

          {/* Right Pull Quote Block (~35% on desktop, top-aligned) */}
          <div className="lg:col-span-5 pt-2 lg:pt-3">
            <div className="border-l-[3px] border-brand-blue pl-6 sm:pl-8 py-1 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A2E] leading-snug tracking-tight">
                {formatQuoteText(data.quoteText)}
              </h3>

              <p className="text-slate-500 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-md font-normal">
                {data.quoteDescription}
              </p>

              <div className="flex items-center gap-2.5 pt-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-xs font-black tracking-wider text-brand-blue uppercase">
                  {data.attribution}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
