import React from "react";
import Image from "next/image";
import Link from "next/link";

export const CoverageTeaser: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#F6F9FC] border-b border-slate-200/60">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block: Left title & Right description */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-2.5">
              CONNECTING NORTH &amp; SOUTH
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-[#071A2E] tracking-tight leading-[1.12]">
              One connection.
              <br />
              More communities.
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-md lg:mb-1">
            From Northern Ontario to the GTA, your goods are in good hands. Explore our
            communities and plan your next delivery.
          </p>
        </div>

        {/* 2 Big Image Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Northern Ontario */}
          <Link
            href="/service-areas#northern-coverage"
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden h-[380px] sm:h-[420px] lg:h-[450px] shadow-md border border-slate-200/80 block cursor-pointer transition-shadow hover:shadow-xl bg-slate-900"
          >
            <Image
              src="/services/delivery-van.jpg"
              alt="Bay to Bay Express courier van servicing Northern Ontario communities"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Deep rich navy bottom gradient overlay matching the reference image */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(to top, rgba(7, 26, 46, 0.95) 0%, rgba(7, 26, 46, 0.78) 35%, rgba(7, 26, 46, 0.25) 65%, transparent 100%)",
              }}
            />
            {/* Text Overlay */}
            <div className="relative z-20 h-full p-6 sm:p-8 lg:p-9 flex flex-col justify-end text-white">
              <span className="text-slate-300 text-[11px] sm:text-xs font-bold tracking-widest uppercase block mb-1.5">
                LAKES. FORESTS. COMMUNITIES.
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-black text-white tracking-tight mb-2">
                Northern Ontario
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm font-normal leading-relaxed mb-4 max-w-sm">
                From North Bay and Sudbury to Hearst and Longlac.
              </p>
              <span className="inline-flex items-center gap-1.5 text-white font-bold text-xs sm:text-sm group-hover:text-[#38BDF8] transition-colors">
                <span>Explore northern coverage</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>

          {/* Card 2: GTA & Surrounding Areas */}
          <Link
            href="/service-areas#gta-coverage"
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden h-[380px] sm:h-[420px] lg:h-[450px] shadow-md border border-slate-200/80 block cursor-pointer transition-shadow hover:shadow-xl bg-slate-900"
          >
            <Image
              src="/gta-skyline.jpg"
              alt="Toronto skyline and Lake Ontario connecting Greater Toronto Area communities"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Deep rich navy bottom gradient overlay matching the reference image */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(to top, rgba(7, 26, 46, 0.95) 0%, rgba(7, 26, 46, 0.78) 35%, rgba(7, 26, 46, 0.25) 65%, transparent 100%)",
              }}
            />
            {/* Text Overlay */}
            <div className="relative z-20 h-full p-6 sm:p-8 lg:p-9 flex flex-col justify-end text-white">
              <span className="text-slate-300 text-[11px] sm:text-xs font-bold tracking-widest uppercase block mb-1.5">
                CITY STREETS. LOCAL CONNECTIONS.
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-black text-white tracking-tight mb-2">
                GTA &amp; Surrounding Areas
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm font-normal leading-relaxed mb-4 max-w-sm">
                Toronto, Mississauga, Hamilton and communities across the region.
              </p>
              <span className="inline-flex items-center gap-1.5 text-white font-bold text-xs sm:text-sm group-hover:text-[#38BDF8] transition-colors">
                <span>Explore southern coverage</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>

        </div>

        {/* Disclaimer Footnote */}
        <p className="text-slate-500 text-xs sm:text-[13px] font-normal mt-4 sm:mt-5 leading-normal">
          *Delivery windows and scheduled service are confirmed for your route before booking.
        </p>

      </div>
    </section>
  );
};
