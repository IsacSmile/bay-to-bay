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
  buttonHref = "/contact",
}) => {
  const data: QuoteCtaData = content || DEFAULT_QUOTE_CTA;
  const eyebrow = data.eyebrow || "YOUR GOODS. OUR COMMITMENT.";
  const heading = data.heading || "Let’s get your delivery moving.";
  const description =
    data.description || "Tell us where it needs to go. We’ll confirm the details.";

  return (
    <section
      id="quote-cta"
      className="w-full bg-[#062B54] text-white py-14 sm:py-16 lg:py-20 border-t border-slate-800/60"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 lg:gap-10">
          {/* Left Text Block */}
          <div>
            <span className="text-[#4A8EF4] text-xs sm:text-sm font-black tracking-widest uppercase block mb-2.5">
              {eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-white tracking-[0.015em] leading-[1.15]">
              {heading}
            </h2>
            <p className="text-slate-200 text-base sm:text-[18px] lg:text-[19px] font-normal mt-2.5 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {/* Right Action Button */}
          <Link
            href={buttonHref}
            className="bg-[#007DF2] hover:bg-[#006ED6] text-white font-bold text-base sm:text-lg px-7 py-3.5 sm:py-4 rounded-xl shadow-md inline-flex items-center justify-center gap-2.5 transition-all duration-150 shrink-0 self-start md:self-center cursor-pointer hover:shadow-lg active:scale-95"
          >
            <span>Request a Quote</span>
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
