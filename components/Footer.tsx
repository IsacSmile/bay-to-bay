"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { SnowfallEffect } from "@/components/hero/SnowfallEffect";
import { PrivacyEnquiriesModal } from "@/components/PrivacyEnquiriesModal";

interface FooterProps {
  phone?: string;
  email?: string;
}

export const Footer: React.FC<FooterProps> = ({
  phone = "705-978-3001",
  email = "baytobayexpress@gmail.com",
}) => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const telLink = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <footer id="contact" className="relative bg-[#071A2E] text-slate-400 text-sm border-t border-[#0D2942] overflow-hidden">
        {/* Animated Snowfall Effect Overlay */}
        <SnowfallEffect />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#0D2942]">
            
            {/* Brand Info & Taglines (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <Link href="/" className="flex items-center gap-3 shrink-0">
                <Image
                  src="/bay-to-bay-logo.webp"
                  alt="Bay to Bay Express Inc. Northern Ontario Courier & Small Goods Delivery"
                  width={42}
                  height={42}
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <div className="font-black text-white text-xl leading-tight">
                    Bay to Bay
                  </div>
                  <div className="text-[10px] font-black text-brand-bright uppercase tracking-widest leading-none mt-0.5">
                    EXPRESS INC.
                  </div>
                </div>
              </Link>

              {/* Tagline & Subhead */}
              <div className="space-y-1">
                <p className="text-sm font-extrabold text-brand-bright tracking-wide">
                  Reliable. Dedicated. Delivered.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-sm">
                  Small Goods Delivery Across Northern Ontario
                </p>
              </div>

              {/* Direct Contact Links */}
              <div className="pt-2 flex flex-col space-y-2 text-xs sm:text-sm">
                <a
                  href={telLink}
                  className="inline-flex items-center gap-2.5 text-white font-bold hover:text-brand-bright transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-bright shrink-0" />
                  <span>{phone}</span>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-bright shrink-0" />
                  <span>{email}</span>
                </a>
              </div>
            </div>

            {/* Navigation Links (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="font-extrabold text-white uppercase text-xs tracking-widest mb-4">
                Navigation
              </h4>
              <ul className="space-y-2 text-slate-300 font-medium text-xs sm:text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/service-areas" className="hover:text-white transition-colors">
                    Service Areas
                  </Link>
                </li>
                <li>
                  <Link href="/#route" className="hover:text-white transition-colors">
                    Twice-Weekly Route
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <a href="#quote" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Our offices (4 cols) matching reference screenshot */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-bold text-white text-lg tracking-tight">
                Our offices
              </h4>
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-normal">
                <div>
                  <p className="font-bold text-white text-sm">North Bay</p>
                  <p className="text-slate-300">346 Oakwood Avenue</p>
                  <p className="text-slate-300">North Bay, ON P1B 5J2</p>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Hearst</p>
                  <p className="text-slate-300">13 8th St</p>
                  <p className="text-slate-300">Hearst, ON P0L 1N0</p>
                </div>
              </div>
              <div className="pt-1">
                <Link
                  href="/about"
                  className="underline underline-offset-4 text-slate-200 hover:text-white font-medium text-xs sm:text-sm inline-flex items-center gap-1 transition-colors"
                >
                  <span>Office &amp; contact details</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Footer Links Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-6">
            <div>
              © 2026 Bay to Bay Express Inc. All Rights Reserved.
            </div>

            {/* Footer Legal & Quote Request Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-medium text-slate-400">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-slate-300 hover:text-white font-medium transition-colors cursor-pointer underline underline-offset-2"
              >
                Privacy &amp; enquiries
              </button>
              <span className="text-slate-600">|</span>
              <a
                href="#quote"
                className="text-brand-bright hover:text-white font-bold transition-colors"
              >
                Quote Request
              </a>
              <a
                href="/admin/quotes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-brand-bright font-bold transition-colors border-l border-slate-700 pl-3"
              >
                Admin Panel
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Privacy & Enquiries Information Modal */}
      <PrivacyEnquiriesModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        phone={phone}
        email={email}
      />
    </>
  );
};
