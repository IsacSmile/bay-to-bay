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
      <section className="pt-14 sm:pt-20 pb-14 sm:pb-16 bg-[#F6F9FC] border-b border-slate-200/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#059669] text-xs sm:text-sm font-black tracking-widest uppercase block mb-3.5">
            ABOUT BAY TO BAY
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] xl:text-[60px] font-black text-[#071A2E] tracking-tight leading-[1.08] sm:leading-[1.1]">
            Local. Northern. Dependable.
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-[21px] text-slate-600 font-normal leading-relaxed max-w-3xl">
            Connecting Northern Ontario and the GTA communities with dedicated small-goods delivery.
          </p>
        </div>
      </section>

      {/* ========================================================
          2. DELIVERING WHAT MATTERS (Text + Lake Van Image)
         ======================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[#059669] text-xs sm:text-sm font-black tracking-widest uppercase block">
                BAY TO BAY EXPRESS INC.
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-[#071A2E] tracking-tight leading-[1.12]">
                Delivering what matters
              </h2>
              <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed">
                Businesses rely on the movement of everyday goods. A parcel, a document or an essential supply needs to reach the right place with care.
              </p>
              <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed">
                Bay to Bay Express focuses on small-goods delivery across Northern Ontario and the GTA, with scheduled and dedicated arrangements for businesses and communities.
              </p>
              
              {/* Distinctive Quote Highlight */}
              <div className="pt-2 sm:pt-3">
                <div className="border-l-[4px] border-[#0088FF] pl-4 sm:pl-5 py-1">
                  <p className="font-black text-lg sm:text-xl lg:text-[22px] text-[#071A2E] tracking-tight">
                    Your goods. Our commitment.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image Column (Delivery Van along Lake) */}
            <div className="lg:col-span-6">
              <div className="relative h-[320px] sm:h-[380px] lg:h-[450px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100">
                <Image
                  src="/services/delivery-van.jpg"
                  alt="Bay to Bay Express delivery van along Northern Ontario lake"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
      <section className="py-16 sm:py-20 bg-[#F6F9FC] border-b border-slate-200/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
            
            {/* Column 1: Our Purpose */}
            <div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-black text-[#071A2E] tracking-tight mb-3">
                Our purpose
              </h3>
              <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed max-w-xl">
                Help local businesses and communities stay connected through dependable small-goods delivery.
              </p>
            </div>

            {/* Column 2: Our Approach */}
            <div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-black text-[#071A2E] tracking-tight mb-3">
                Our approach
              </h3>
              <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed max-w-xl">
                Understand your shipment, agree on the arrangements and keep communication clear from pickup through delivery.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. NEED REGULAR DELIVERIES? (Dark Navy Banner)
         ======================================================== */}
      <section className="w-full bg-[#062B54] text-white py-14 sm:py-16 border-t border-slate-800/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-tight">
                Need regular deliveries?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-normal mt-2 leading-relaxed max-w-xl">
                Let’s talk about a delivery arrangement that works for your business.
              </p>
            </div>

            <a
              href="/#quote"
              className="bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-xl shadow-md inline-flex items-center justify-center gap-2 transition-all duration-150 shrink-0 self-start sm:self-center cursor-pointer hover:shadow-lg active:scale-95"
            >
              <span>Discuss Your Route</span>
              <span className="text-base leading-none">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR OFFICES (North Bay & Hearst)
         ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#F0F7FC]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Eyebrow & Title */}
          <div className="mb-10 sm:mb-14">
            <span className="text-[#059669] text-xs sm:text-sm font-black tracking-widest uppercase block mb-3">
              LOCAL PRESENCE. A STRONGER CONNECTION.
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-black text-[#071A2E] tracking-tight">
              Our offices
            </h2>
          </div>

          {/* 2 Office Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Office 1: North Bay */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/offices/north-bay.jpg"
                  alt="Gateway of the North City of North Bay stone arch entrance"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-[#071A2E]/85 backdrop-blur-xs text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>North Bay</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <span className="text-[#059669] text-xs sm:text-sm font-black tracking-widest uppercase block mb-1.5">
                  NORTH BAY OFFICE
                </span>
                <h3 className="font-display text-2xl sm:text-[28px] font-black text-[#071A2E] tracking-tight mb-2.5">
                  North Bay
                </h3>
                <div className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed mb-5">
                  <p>346 Oakwood Avenue</p>
                  <p>North Bay, ON P1B 5J2</p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=346+Oakwood+Avenue+North+Bay+ON+P1B+5J2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0284C7] hover:text-[#006ED6] font-bold text-sm sm:text-base group transition-colors self-start mb-6"
                >
                  <MapPin className="w-4 h-4" />
                  <span>View office location</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="text-slate-400 text-xs font-normal mt-auto border-t border-slate-100 pt-3">
                  City photo: Earl Andrew / Wikimedia Commons (public domain)
                </p>
              </div>
            </div>

            {/* Office 2: Hearst */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/offices/hearst.jpg"
                  alt="Town of Hearst office building in Northern Ontario"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-[#071A2E]/85 backdrop-blur-xs text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Hearst</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <span className="text-[#059669] text-xs sm:text-sm font-black tracking-widest uppercase block mb-1.5">
                  HEARST OFFICE
                </span>
                <h3 className="font-display text-2xl sm:text-[28px] font-black text-[#071A2E] tracking-tight mb-2.5">
                  Hearst
                </h3>
                <div className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed mb-5">
                  <p>13 8th St</p>
                  <p>Hearst, ON P0L 1N0</p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=13+8th+St+Hearst+ON+P0L+1N0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0284C7] hover:text-[#006ED6] font-bold text-sm sm:text-base group transition-colors self-start mb-6"
                >
                  <MapPin className="w-4 h-4" />
                  <span>View office location</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="text-slate-400 text-xs font-normal mt-auto border-t border-slate-100 pt-3">
                  City photo: Town of Hearst
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Notes & Direct Phone Link */}
          <div className="mt-8 text-sm sm:text-base text-slate-500 font-normal">
            <p>Please contact us to arrange a visit, pickup or drop-off.</p>
            <div className="mt-2.5">
              <a
                href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center gap-1 text-[#0284C7] hover:text-[#006ED6] font-bold text-sm sm:text-base group transition-colors"
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
