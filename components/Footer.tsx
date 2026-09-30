"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      <footer id="contact" className="relative bg-[#06203B] text-slate-300 text-sm border-t border-[#092D52] overflow-hidden">
        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-10 sm:pb-12">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12">
            
            {/* Column 1: Brand & Logo */}
            <div className="space-y-4">
              <Link href="/" className="inline-block shrink-0">
                <div className="bg-white rounded-lg px-3.5 py-1.5 inline-flex items-center justify-center shadow-xs">
                  <Image
                    src="/approved-logo.png"
                    alt="Bay to Bay Express Inc. Northern Ontario Courier"
                    width={185}
                    height={38}
                    className="h-8 sm:h-9 w-auto object-contain"
                  />
                </div>
              </Link>

              <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-xs">
                Small goods delivery across Northern Ontario and the GTA. Connecting communities, delivering what matters.
              </p>
            </div>

            {/* Column 2: Explore */}
            <div>
              <h4 className="font-bold text-white text-base tracking-tight mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-normal text-slate-300">
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Our services
                  </Link>
                </li>
                <li>
                  <Link href="/service-areas" className="hover:text-white transition-colors">
                    Service areas
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Bay to Bay
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-white transition-colors">
                    Frequently asked questions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Let's talk delivery */}
            <div>
              <h4 className="font-bold text-white text-base tracking-tight mb-4">
                Let&apos;s talk delivery
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm font-normal text-slate-300">
                <p>
                  <a
                    href={telLink}
                    className="hover:text-white transition-colors inline-block"
                  >
                    {phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-white transition-colors inline-block break-all"
                  >
                    {email}
                  </a>
                </p>
                <p>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors inline-block"
                  >
                    Request a quote
                  </Link>
                </p>
              </div>
            </div>

            {/* Column 4: Our offices */}
            <div>
              <h4 className="font-bold text-white text-base tracking-tight mb-4">
                Our offices
              </h4>
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-snug">
                <div>
                  <p className="font-bold text-white text-xs sm:text-sm">North Bay</p>
                  <p className="text-slate-300 mt-0.5">346 Oakwood Avenue</p>
                  <p className="text-slate-300">North Bay, ON P1B 5J2</p>
                </div>
                <div>
                  <p className="font-bold text-white text-xs sm:text-sm">Hearst</p>
                  <p className="text-slate-300 mt-0.5">13 8th St</p>
                  <p className="text-slate-300">Hearst, ON P0L 1N0</p>
                </div>
                <div className="pt-1">
                  <Link
                    href="/about"
                    className="text-slate-300 hover:text-white text-xs sm:text-sm font-normal inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
                  >
                    <span>Office &amp; contact details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Legal / Attribution Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-6 text-xs text-slate-400">
            <div className="space-y-2">
              <p className="text-slate-300">
                © 2026 Bay to Bay Express Inc. All rights reserved.
              </p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Vehicle, service and seasonal images are illustrative. Toronto photograph:{" "}
                <span className="underline">Leonard G. / Wikimedia Commons</span>,{" "}
                <span className="underline">CC SA 1.0</span>.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer text-xs"
              >
                Privacy &amp; enquiries
              </button>
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
