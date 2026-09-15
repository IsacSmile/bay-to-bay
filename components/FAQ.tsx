import React from "react";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FaqContentData, FaqItemData, DEFAULT_FAQ_CONTENT, DEFAULT_FAQ_ITEMS } from "@/lib/prisma";

export interface FAQProps {
  content?: FaqContentData;
  items?: FaqItemData[];
}

export const FAQ: React.FC<FAQProps> = ({ content, items = [] }) => {
  const data: FaqContentData = content || DEFAULT_FAQ_CONTENT;
  const faqList: FaqItemData[] = items.length > 0 ? items : DEFAULT_FAQ_ITEMS;

  return (
    <section
      id="faq"
      className="w-full bg-[#F6F9FC] text-slate-900 py-14 sm:py-20 lg:py-24 border-t border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Content Block */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <EyebrowLabel text={data.eyebrow} />

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-black tracking-tight text-[#071A2E] leading-[1.06]">
              <span>{data.headingPrimary} </span>
              <span className="text-brand-blue block sm:inline">{data.headingAccent}</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md font-normal">
              {data.description}
            </p>
          </div>

          {/* Right Accordion List (Decreased width) */}
          <div className="lg:col-span-7 max-w-2xl lg:max-w-none w-full">
            <FaqAccordion items={faqList} />
          </div>

        </div>
      </div>
    </section>
  );
};
