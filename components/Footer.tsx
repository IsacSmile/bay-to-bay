import React from "react";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { SnowfallEffect } from "@/components/hero/SnowfallEffect";

interface FooterProps {
  phone?: string;
  email?: string;
  snowfallEnabled?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  phone = "705-978-3001",
  email = "info@baytobayexpress.ca",
  snowfallEnabled = true,
}) => {
  const telLink = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer id="contact" className="relative bg-[#071A2E] text-slate-400 text-sm border-t border-[#0D2942] overflow-hidden">
      {/* Snowfall Canvas Animation */}
      <SnowfallEffect enabled={snowfallEnabled} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#0D2942]">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/bay-to-bay-logo.webp"
                alt="Bay to Bay Express Inc."
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
              <div>
                <div className="font-extrabold text-white text-lg leading-tight">
                  Bay to Bay
                </div>
                <div className="text-[10px] font-black text-brand-bright uppercase tracking-widest leading-none">
                  EXPRESS INC.
                </div>
              </div>
            </a>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              Dedicated and scheduled delivery solutions connecting North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac.
            </p>

            <div className="pt-2 flex flex-col space-y-2">
              <a
                href={telLink}
                className="inline-flex items-center gap-2.5 text-white font-bold hover:text-brand-bright transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-bright" />
                <span>{phone}</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-bright" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-white uppercase text-xs tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-slate-300 font-medium">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#routes" className="hover:text-white transition-colors">
                  Highway 11 Routes
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#quote" className="hover:text-white transition-colors">
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-extrabold text-white uppercase text-xs tracking-widest mb-4">
              Service Areas
            </h4>
            <ul className="space-y-2 text-slate-300 text-xs font-normal">
              <li>North Bay Hub</li>
              <li>Kirkland Lake</li>
              <li>Timmins Hub</li>
              <li>Cochrane</li>
              <li>Kapuskasing</li>
              <li>Hearst Destination</li>
              <li>Longlac Terminal</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Bay to Bay Express Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-300 transition-colors">Accessibility</span>
            <a
              href="/admin/quotes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-brand-bright font-bold transition-colors border-l border-slate-700 pl-4"
            >
              Admin Panel
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
