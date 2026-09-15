"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { FaqItemData } from "@/lib/prisma";

export interface AccordionItemProps {
  item: FaqItemData;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  const contentId = `faq-answer-${item.id}`;
  const buttonId = `faq-button-${item.id}`;

  return (
    <div className="border-b border-slate-200/80 w-full">
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-left group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-blue/40 rounded-lg transition-colors"
      >
        <span
          style={{
            fontFamily:
              'var(--font-space-grotesk), "Space Grotesk", var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
          }}
          className="font-bold text-[#071A2E] text-base sm:text-lg lg:text-[17px] leading-snug group-hover:text-brand-blue transition-colors"
        >
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-brand-blue shrink-0 transition-transform duration-200 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        data-open={isOpen}
        className="grid grid-rows-[0fr] data-[open=true]:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out"
      >
        <div className="overflow-hidden">
          <p
            style={{
              fontFamily:
                'var(--font-space-grotesk), "Space Grotesk", var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
            }}
            className="text-slate-600 text-xs sm:text-sm sm:text-[15px] leading-relaxed pb-5 pr-4 whitespace-pre-line font-normal"
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};
