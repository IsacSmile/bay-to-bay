import React from "react";
import Link from "next/link";
import { QuoteCtaData, DEFAULT_QUOTE_CTA } from "@/lib/prisma";

export interface QuoteCTAProps {
  content?: QuoteCtaData;
  buttonHref?: string;
  phone?: string;
  email?: string;
}

export const QuoteCTA: React.FC<QuoteCTAProps> = ({
  content,
  buttonHref = "#quote",
}) => {
  const data: QuoteCtaData = content || DEFAULT_QUOTE_CTA;
  const eyebrow = data.eyebrow || "YOUR GOODS. OUR COMMITMENT.";
  const heading = data.heading || "Let’s get your delivery moving.";
  const description =
    data.description || "Tell us where it needs to go. We’ll confirm the details.";

  return (
    <section
      id="quote-cta"
      className="w-full bg-[#062B54] text-white py-12 sm:py-14 border-t border-slate-800/60"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text Block */}
          <div>
            <span className="text-[#4A8EF4] text-xs font-black tracking-widest uppercase block mb-2">
              {eyebrow}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {heading}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-normal mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Action Button */}
          <Link
            href={buttonHref}
            className="bg-[#007DF2] hover:bg-[#006ED6] text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-xs inline-flex items-center justify-center gap-2 transition-all duration-150 shrink-0 self-start md:self-center cursor-pointer"
          >
            <span>Request a Quote</span>
            <span className="text-base leading-none">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
