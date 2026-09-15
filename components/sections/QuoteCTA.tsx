import React from "react";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { QuoteCtaData, DEFAULT_QUOTE_CTA } from "@/lib/prisma";

export interface QuoteCTAProps {
  content?: QuoteCtaData;
  phone?: string;
  email?: string;
}

export const QuoteCTA: React.FC<QuoteCTAProps> = ({ content, phone, email }) => {
  const data: QuoteCtaData = content || DEFAULT_QUOTE_CTA;
  const activePhone = phone || data.phoneText || "705-978-3001";
  const activeEmail = email || data.emailAddress || "info@baytobayexpress.ca";
  const telLink = `tel:${activePhone.replace(/[^\d+]/g, "")}`;
  const mailtoLink = `mailto:${activeEmail}`;

  return (
    <section
      id="quote-cta"
      className="w-full bg-[#05172A] text-white py-14 sm:py-16 lg:py-20 relative overflow-hidden border-t border-slate-800/80"
    >
      {/* Background Curved Vector Arc Pattern (matching reference image) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 z-0"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-100 350 C400 150 900 100 1540 220"
          stroke="#00A8FF"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M-50 380 C450 180 950 120 1590 240"
          stroke="#00A8FF"
          strokeWidth="1"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Block */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <EyebrowLabel text={data.eyebrow} />

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight text-white leading-[1.1]">
              {data.heading}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-lg font-normal">
              {data.description}
            </p>
          </div>

          {/* Right Action Controls & Brand Mark */}
          <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-3 sm:gap-4 pt-2 lg:pt-0">
            
            {/* Glowing Cyan Phone Button */}
            <a
              href={telLink}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#00A8FF] hover:bg-[#0096E6] text-[#05172A] font-extrabold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-[0_0_22px_rgba(0,168,255,0.45)] hover:shadow-[0_0_30px_rgba(0,168,255,0.65)] hover:scale-[1.02] cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#05172A] shrink-0" />
              <span>{activePhone}</span>
            </a>

            {/* Dark Outlined Email Button */}
            <a
              href={mailtoLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#09223D]/90 hover:bg-[#0C2B4E] border border-slate-700/80 hover:border-slate-500 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-xs hover:scale-[1.02] cursor-pointer"
            >
              <Mail className="w-4 h-4 text-slate-300 shrink-0" />
              <span>{data.emailLabel || "Email us"}</span>
            </a>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-[1px] h-9 bg-slate-700/60 mx-1 shrink-0" />

            {/* Brand Logo & Text */}
            <div className="flex items-center gap-2.5 pl-1 sm:pl-0">
              <Image
                src="/bay-to-bay-logo.webp"
                alt="Bay to Bay Express Inc."
                width={32}
                height={32}
                className="h-8 w-8 object-contain shrink-0"
              />
              <div className="flex flex-col text-left">
                <span className="text-white font-extrabold text-xs sm:text-[13px] tracking-tight leading-none">
                  Bay to Bay
                </span>
                <span className="text-[9px] font-black tracking-widest text-sky-400 uppercase leading-none mt-0.5">
                  EXPRESS INC.
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
