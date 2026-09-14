import React from "react";
import { ArrowRight, Phone } from "lucide-react";

interface QuoteCTAProps {
  phone?: string;
}

export const QuoteCTA: React.FC<QuoteCTAProps> = ({ phone = "705-978-3001" }) => {
  const telLink = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <section id="quote" className="py-16 sm:py-20 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="bg-[#071A2E] text-white rounded-container p-8 sm:p-12 lg:p-16 shadow-floating border border-[#0D2942] relative overflow-hidden">
          
          {/* Subtle Background Accent Pattern */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-extrabold tracking-widest text-brand-bright uppercase block mb-3">
              Get Started Today
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Need a reliable delivery partner in Northern Ontario?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed max-w-2xl">
              Tell us what you're moving, where it's going, and when you need it delivered. Our dedicated team is ready to assist.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`mailto:info@baytobayexpress.ca?subject=Quote%20Request%20-%20Bay%20to%20Bay`}
                className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white text-base font-bold px-8 py-4 rounded-btn shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-bright"
              >
                <span>Request a quote</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={telLink}
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-base font-bold px-8 py-4 rounded-btn transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <Phone className="w-5 h-5 text-brand-bright" />
                <span>Call Bay to Bay ({phone})</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
