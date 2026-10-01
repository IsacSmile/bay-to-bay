import React from "react";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";

interface OurOfficesProps {
  phone?: string;
}

export const OurOffices: React.FC<OurOfficesProps> = ({
  phone = "705-978-3001",
}) => {
  return (
    <section id="offices" className="py-16 sm:py-20 lg:py-24 bg-[#F0F7FC] border-t border-slate-200/70 scroll-mt-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow & Title */}
        <div className="mb-10 sm:mb-12">
          <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-3">
            LOCAL PRESENCE. A STRONGER CONNECTION.
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black text-[#071A2E] tracking-[0.02em]">
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
              <div className="absolute bottom-3 left-3 bg-[#071A2E]/85 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>North Bay</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col">
              <span className="text-[#059669] text-xs sm:text-[13px] font-black tracking-widest uppercase block mb-1">
                NORTH BAY OFFICE
              </span>
              <h3 className="font-display text-2xl sm:text-[28px] font-black text-[#071A2E] tracking-[0.015em] mb-2">
                North Bay
              </h3>
              <div className="text-slate-700 text-base sm:text-[18px] font-normal leading-relaxed mb-5">
                <p>346 Oakwood Avenue</p>
                <p>North Bay, ON P1B 5J2</p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=346+Oakwood+Avenue+North+Bay+ON+P1B+5J2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0284C7] hover:text-[#006ED6] font-bold text-base sm:text-lg group transition-colors self-start mb-6"
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
              <div className="absolute bottom-3 left-3 bg-[#071A2E]/85 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Hearst</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col">
              <span className="text-[#059669] text-xs sm:text-[13px] font-black tracking-widest uppercase block mb-1">
                HEARST OFFICE
              </span>
              <h3 className="font-display text-2xl sm:text-[28px] font-black text-[#071A2E] tracking-[0.015em] mb-2">
                Hearst
              </h3>
              <div className="text-slate-700 text-base sm:text-[18px] font-normal leading-relaxed mb-5">
                <p>13 8th St</p>
                <p>Hearst, ON P0L 1N0</p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=13+8th+St+Hearst+ON+P0L+1N0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0284C7] hover:text-[#006ED6] font-bold text-base sm:text-lg group transition-colors self-start mb-6"
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
        <div className="mt-8 text-base sm:text-[18px] text-slate-600 font-normal">
          <p>Please contact us to arrange a visit, pickup or drop-off.</p>
          <div className="mt-2.5">
            <a
              href={`tel:${phone.replace(/[^0-9]/g, "")}`}
              className="inline-flex items-center gap-1.5 text-[#0284C7] hover:text-[#006ED6] font-bold text-base sm:text-lg group transition-colors"
            >
              <span>Talk to our team: {phone}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
