import React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
              Need a reliable delivery partner in Northern Ontario?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed max-w-2xl">
              Tell us what you're moving, where it's going, and when you need it delivered. Our dedicated team is ready to assist.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="primary"
                size="md"
                href="mailto:info@baytobayexpress.ca?subject=Quote%20Request%20-%20Bay%20to%20Bay"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="px-8 py-4"
              >
                Request a quote
              </Button>

              <Button
                variant="secondary"
                size="md"
                href={telLink}
                leftIcon={<Phone className="w-5 h-5 text-brand-bright" />}
                className="px-8 py-4"
              >
                Call Bay to Bay ({phone})
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
