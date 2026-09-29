"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, MapPin, ZoomIn, ZoomOut, Phone } from "lucide-react";

interface CommunityItem {
  name: string;
  x: number; // percentage on map
  y: number; // percentage on map
  region: "northern" | "gta";
}

const ALL_COMMUNITIES: CommunityItem[] = [
  // Northern Ontario (Green dots along Hwy 11 corridor & North)
  { name: "Longlac", x: 44.0, y: 28.2, region: "northern" },
  { name: "Hearst", x: 48.5, y: 28.9, region: "northern" },
  { name: "Kapuskasing", x: 50.5, y: 31.0, region: "northern" },
  { name: "Timmins", x: 52.6, y: 33.0, region: "northern" },
  { name: "Cochrane", x: 52.4, y: 35.9, region: "northern" },
  { name: "Kirkland Lake", x: 54.3, y: 39.8, region: "northern" },
  { name: "Sudbury", x: 52.8, y: 51.1, region: "northern" },
  { name: "North Bay", x: 55.2, y: 52.3, region: "northern" },
  { name: "Parry Sound", x: 54.3, y: 58.9, region: "northern" },

  // GTA & Surrounding (Blue dots clustered around Lake Ontario)
  { name: "Newmarket", x: 55.0, y: 65.5, region: "gta" },
  { name: "Richmond Hill", x: 55.2, y: 66.8, region: "gta" },
  { name: "Vaughan", x: 54.8, y: 67.5, region: "gta" },
  { name: "Markham", x: 55.8, y: 67.8, region: "gta" },
  { name: "Pickering", x: 56.5, y: 68.2, region: "gta" },
  { name: "Ajax", x: 57.0, y: 68.5, region: "gta" },
  { name: "Whitby", x: 57.5, y: 68.5, region: "gta" },
  { name: "Oshawa", x: 58.0, y: 68.6, region: "gta" },
  { name: "Brampton", x: 54.0, y: 68.5, region: "gta" },
  { name: "Toronto", x: 55.3, y: 69.4, region: "gta" },
  { name: "Mississauga", x: 54.5, y: 70.5, region: "gta" },
  { name: "Oakville", x: 53.8, y: 71.8, region: "gta" },
  { name: "Burlington", x: 53.2, y: 72.8, region: "gta" },
  { name: "Hamilton", x: 52.5, y: 73.5, region: "gta" },
];

// Balanced two-column lists matching the user's reference image exactly
const NORTHERN_COL1 = ["North Bay", "Timmins", "Kapuskasing", "Longlac", "Sudbury"];
const NORTHERN_COL2 = ["Kirkland Lake", "Cochrane", "Hearst", "Parry Sound"];

const GTA_COL1 = ["Toronto", "Brampton", "Markham", "Oakville", "Oshawa", "Ajax", "Hamilton"];
const GTA_COL2 = ["Mississauga", "Vaughan", "Richmond Hill", "Burlington", "Pickering", "Whitby", "Newmarket"];

interface ServiceAreasCoverageProps {
  phone?: string;
}

export const ServiceAreasCoverage: React.FC<ServiceAreasCoverageProps> = ({
  phone = "705-978-3001",
}) => {
  const [filter, setFilter] = useState<"all" | "northern" | "gta">("all");
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const visibleMarkers = ALL_COMMUNITIES.filter((item) => {
    if (filter === "all") return true;
    return item.region === filter;
  });

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 1.8));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  return (
    <div className="w-full bg-[#F6F9FC]">
      {/* ========================================================
          SECTION 1: EXPLORE OUR COVERAGE (Map & Community Lists)
         ======================================================== */}
      <section className="pt-14 sm:pt-18 pb-16 sm:pb-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Eyebrow & Main Section Header */}
          <div className="mb-6 sm:mb-8">
            <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-2.5">
              EXPLORE OUR COVERAGE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-[#071A2E] tracking-tight leading-[1.12]">
              Your next delivery starts here.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
              Choose a region or a community to explore the map. Pickup availability and delivery timing are confirmed with your quote.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setActiveCommunity(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#071A2E] text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 shadow-2xs"
              }`}
            >
              All communities
            </button>

            <button
              type="button"
              onClick={() => {
                setFilter("northern");
                setActiveCommunity(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                filter === "northern"
                  ? "bg-[#071A2E] text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 shadow-2xs"
              }`}
            >
              Northern Ontario
            </button>

            <button
              type="button"
              onClick={() => {
                setFilter("gta");
                setActiveCommunity(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                filter === "gta"
                  ? "bg-[#071A2E] text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 shadow-2xs"
              }`}
            >
              GTA &amp; surrounding
            </button>
          </div>

          {/* Interactive Map Container */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-[#e3ecf0]">
            
            {/* Zoom Controls (Top Left) */}
            <div className="absolute top-4 left-4 z-20 flex flex-col rounded-lg overflow-hidden border border-slate-300/80 shadow-md bg-white">
              <button
                type="button"
                onClick={handleZoomIn}
                aria-label="Zoom in"
                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 border-b border-slate-200 font-bold text-lg select-none cursor-pointer"
              >
                +
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                aria-label="Zoom out"
                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold text-lg select-none cursor-pointer"
              >
                −
              </button>
            </div>

            {/* Map Canvas Frame */}
            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden select-none">
              <div
                className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Clean OpenStreetMap regional background */}
                <Image
                  src="/offices/coverage-map-clean.jpg"
                  alt="Bay to Bay Express regional delivery map covering Northern Ontario and Greater Toronto Area"
                  fill
                  priority
                  className="object-cover object-[53%_48%] pointer-events-none"
                />

                {/* Map Community Markers */}
                {visibleMarkers.map((marker) => {
                  const isNorthern = marker.region === "northern";
                  const isSelected = activeCommunity === marker.name;

                  return (
                    <div
                      key={marker.name}
                      style={{
                        left: `${marker.x}%`,
                        top: `${marker.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className="absolute z-10 group cursor-pointer"
                      onClick={() => setActiveCommunity(marker.name)}
                    >
                      {/* Marker Dot */}
                      <div
                        className={`relative flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-130 ${
                          isNorthern
                            ? "w-3.5 h-3.5 bg-[#059669] border-2 border-white shadow-[0_2px_5px_rgba(5,150,105,0.7)]"
                            : "w-3 h-3 bg-[#0284C7] border-2 border-white shadow-[0_2px_5px_rgba(2,132,199,0.7)]"
                        } ${isSelected ? "scale-140 ring-4 ring-[#0088FF]/40" : ""}`}
                      />

                      {/* Tooltip on Hover / Selected */}
                      <div
                        className={`absolute left-1/2 -top-8 -translate-x-1/2 px-2.5 py-1 bg-[#071A2E] text-white text-[11px] font-bold rounded-md whitespace-nowrap shadow-lg pointer-events-none transition-opacity duration-150 ${
                          isSelected
                            ? "opacity-100 z-30"
                            : "opacity-0 group-hover:opacity-100 z-20"
                        }`}
                      >
                        {marker.name}
                        <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-[#071A2E]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Right Map Leaflet Attribution */}
            <div className="absolute bottom-2 right-2.5 z-20 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-slate-600 border border-slate-200/60 select-none">
              Leaflet | © OpenStreetMap contributors
            </div>
          </div>

          {/* Under Map Disclaimer */}
          <p className="text-slate-500 text-[11px] sm:text-xs font-normal mt-2.5 leading-normal">
            Community locations only; routes confirmed when booking. Location data:{" "}
            <span className="underline cursor-default">GeoNames (CC BY 4.0)</span>.
          </p>

          {/* 2 Service Community Cards: Northern Ontario & GTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-12 sm:mt-16">
            
            {/* Card 1: Northern Ontario */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
                <Image
                  src="/services/delivery-van.jpg"
                  alt="Bay to Bay Express courier van servicing Northern Ontario communities"
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-1.5">
                  OUR SERVICE COMMUNITIES
                </span>
                <h3 className="font-display text-2xl sm:text-[26px] font-black text-[#071A2E] tracking-tight mb-6">
                  Northern Ontario
                </h3>

                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs sm:text-sm font-bold text-[#071A2E]">
                  {/* Left Column */}
                  <div className="flex flex-col gap-3.5">
                    {NORTHERN_COL1.map((city) => (
                      <a
                        key={city}
                        href="#quote"
                        onClick={() => setActiveCommunity(city)}
                        className="group flex items-center justify-between py-1 border-b border-slate-100 hover:text-[#0088FF] transition-colors"
                      >
                        <span>{city}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#0088FF] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-3.5">
                    {NORTHERN_COL2.map((city) => (
                      <a
                        key={city}
                        href="#quote"
                        onClick={() => setActiveCommunity(city)}
                        className="group flex items-center justify-between py-1 border-b border-slate-100 hover:text-[#0088FF] transition-colors"
                      >
                        <span>{city}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#0088FF] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: GTA & Surrounding Areas */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
                <Image
                  src="/gta-skyline.jpg"
                  alt="Toronto skyline and Lake Ontario connecting the Greater Toronto Area"
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-1.5">
                  OUR SERVICE COMMUNITIES
                </span>
                <h3 className="font-display text-2xl sm:text-[26px] font-black text-[#071A2E] tracking-tight mb-6">
                  GTA &amp; Surrounding Areas
                </h3>

                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs sm:text-sm font-bold text-[#071A2E]">
                  {/* Left Column */}
                  <div className="flex flex-col gap-3.5">
                    {GTA_COL1.map((city) => (
                      <a
                        key={city}
                        href="#quote"
                        onClick={() => setActiveCommunity(city)}
                        className="group flex items-center justify-between py-1 border-b border-slate-100 hover:text-[#0088FF] transition-colors"
                      >
                        <span>{city}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#0088FF] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    ))}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-3.5">
                    {GTA_COL2.map((city) => (
                      <a
                        key={city}
                        href="#quote"
                        onClick={() => setActiveCommunity(city)}
                        className="group flex items-center justify-between py-1 border-b border-slate-100 hover:text-[#0088FF] transition-colors"
                      >
                        <span>{city}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#0088FF] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Don't see your community? Callout */}
          <div className="mt-10 sm:mt-12 bg-[#EEF7FC] border border-[#D5EBF7] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xs">
            <div>
              <h4 className="font-display text-xl sm:text-2xl font-black text-[#071A2E] tracking-tight">
                Don’t see your community?
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm font-normal mt-1 leading-relaxed max-w-xl">
                We also serve GTA regions beyond those listed. Ask us about your route.
              </p>
            </div>

            <a
              href="#quote"
              className="bg-[#0088FF] hover:bg-[#0077EE] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-xs inline-flex items-center justify-center gap-2 transition-colors shrink-0"
            >
              <span>Check Your Route</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 2: OUR OFFICES (North Bay & Hearst)
         ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#F0F7FC] border-t border-slate-200/70">
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
              <div className="relative aspect-[21/8] sm:aspect-[21/8] w-full overflow-hidden bg-slate-100">
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
              <div className="relative aspect-[21/8] sm:aspect-[21/8] w-full overflow-hidden bg-slate-100">
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


      {/* ========================================================
          SECTION 3: DELIVERY CTA STRIP (Let's get your delivery moving)
         ======================================================== */}
      <section className="w-full bg-[#062B54] text-white py-12 sm:py-14 border-t border-slate-800/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[#4A8EF4] text-xs font-black tracking-widest uppercase block mb-2">
                YOUR GOODS. OUR COMMITMENT.
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Let’s get your delivery moving.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-normal mt-1.5 leading-relaxed">
                Tell us where it needs to go. We’ll confirm the details.
              </p>
            </div>

            <a
              href="#quote"
              className="bg-[#007DF2] hover:bg-[#006ED6] text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-sm inline-flex items-center justify-center gap-2 transition-colors shrink-0 self-start md:self-center"
            >
              <span>Request a Quote</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
