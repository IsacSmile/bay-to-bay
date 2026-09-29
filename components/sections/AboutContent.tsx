import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, ArrowRight } from "lucide-react";

interface AboutContentProps {
  phone?: string;
}

export const AboutContent: React.FC<AboutContentProps> = ({
  phone = "705-978-3001",
}) => {
  return (
    <div className="w-full">
      {/* ========================================================
          1. ABOUT HEADER / HERO STRIP
         ======================================================== */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-14 bg-[#F6F9FC] border-b border-slate-200/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-3">
            ABOUT BAY TO BAY
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-black text-[#071A2E] tracking-tight leading-[1.14]">
            Local. Northern. Dependable.
          </h1>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
            Connecting Northern Ontario and the GTA communities with dedicated small-goods delivery.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. DELIVERING WHAT MATTERS (Text + Lake Van Image)
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[#059669] text-xs font-black tracking-widest uppercase block">
                BAY TO BAY EXPRESS INC.
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#071A2E] tracking-tight leading-snug">
                Delivering what matters
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed">
                Businesses rely on the movement of everyday goods. A parcel, a document or an essential supply needs to reach the right place with care.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed">
                Bay to Bay Express focuses on small-goods delivery across Northern Ontario and the GTA, with scheduled and dedicated arrangements for businesses and communities.
              </p>
              
              {/* Distinctive Quote Highlight */}
              <div className="pt-2">
                <div className="border-l-[3px] border-[#0088FF] pl-4 py-1">
                  <p className="font-bold text-base sm:text-lg text-[#071A2E] tracking-tight">
                    Your goods. Our commitment.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image Column (Delivery Van along Lake) */}
            <div className="lg:col-span-6">
              <div className="relative h-[300px] sm:h-[360px] lg:h-[420px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100">
                <Image
                  src="/services/delivery-van.jpg"
                  alt="Bay to Bay Express delivery van along Northern Ontario lake"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. OUR PURPOSE & OUR APPROACH (Two Column Grid)
         ======================================================== */}
      <section className="py-14 sm:py-18 bg-[#F6F9FC] border-b border-slate-200/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
            
            {/* Column 1: Our Purpose */}
            <div>
              <h3 className="font-display text-2xl sm:text-[28px] font-black text-[#071A2E] tracking-tight mb-2.5">
                Our purpose
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed max-w-lg">
                Help local businesses and communities stay connected through dependable small-goods delivery.
              </p>
            </div>

            {/* Column 2: Our Approach */}
            <div>
              <h3 className="font-display text-2xl sm:text-[28px] font-black text-[#071A2E] tracking-tight mb-2.5">
                Our approach
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed max-w-lg">
                Understand your shipment, agree on the arrangements and keep communication clear from pickup through delivery.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. NEED REGULAR DELIVERIES? (Dark Navy Banner)
         ======================================================== */}
      <section className="w-full bg-[#062B54] text-white py-10 sm:py-12 border-t border-slate-800/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Need regular deliveries?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-normal mt-1 leading-relaxed">
                Let’s talk about a delivery arrangement that works for your business.
              </p>
            </div>

            <a
              href="/#quote"
              className="bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-sm inline-flex items-center justify-center gap-1.5 transition-colors shrink-0 self-start sm:self-center cursor-pointer"
            >
              <span>Discuss Your Route</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR OFFICES (North Bay & Hearst)
         ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#F0F7FC]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Eyebrow & Title */}
          <div className="mb-10 sm:mb-12">
            <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-3">
              LOCAL PRESENCE. A STRONGER CONNECTION.
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black text-[#071A2E] tracking-tight">
              Our offices
            </h2>
          </div>

          {/* 2 Office Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Office 1: North Bay */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col">
              <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/offices/north-bay.jpg"
                  alt="Gateway of the North City of North Bay stone arch entrance"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-[#071A2E]/85 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>North Bay</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-1">
                  NORTH BAY OFFICE
                </span>
                <h3 className="font-display text-2xl font-black text-[#071A2E] tracking-tight mb-2">
                  North Bay
                </h3>
                <div className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                  <p>346 Oakwood Avenue</p>
                  <p>North Bay, ON P1B 5J2</p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=346+Oakwood+Avenue+North+Bay+ON+P1B+5J2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0284C7] hover:text-[#006ED6] font-bold text-xs sm:text-sm group transition-colors self-start mb-6"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View office location</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="text-slate-400 text-[11px] font-normal mt-auto border-t border-slate-100 pt-3">
                  City photo: Earl Andrew / Wikimedia Commons (public domain)
                </p>
              </div>
            </div>

            {/* Office 2: Hearst */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col">
              <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/offices/hearst.jpg"
                  alt="Town of Hearst office building in Northern Ontario"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-[#071A2E]/85 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Hearst</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-1">
                  HEARST OFFICE
                </span>
                <h3 className="font-display text-2xl font-black text-[#071A2E] tracking-tight mb-2">
                  Hearst
                </h3>
                <div className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                  <p>13 8th St</p>
                  <p>Hearst, ON P0L 1N0</p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=13+8th+St+Hearst+ON+P0L+1N0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0284C7] hover:text-[#006ED6] font-bold text-xs sm:text-sm group transition-colors self-start mb-6"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View office location</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="text-slate-400 text-[11px] font-normal mt-auto border-t border-slate-100 pt-3">
                  City photo: Town of Hearst
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Notes & Direct Phone Link */}
          <div className="mt-8 text-xs sm:text-sm text-slate-500 font-normal">
            <p>Please contact us to arrange a visit, pickup or drop-off.</p>
            <div className="mt-2.5">
              <a
                href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center gap-1 text-[#0284C7] hover:text-[#006ED6] font-bold text-xs sm:text-sm group transition-colors"
              >
                <span>Talk to our team: {phone}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
