import { Metadata } from "next";
import { MapPin, Truck, Clock, ShieldCheck } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceArea } from "@/components/ServiceArea";
import { QuoteForm } from "@/components/QuoteForm";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  getAnnouncementData,
  getContactData,
  getQuoteFormSectionData,
  getQuoteCtaData,
} from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Service Areas | Bay to Bay Express Inc.",
  description:
    "Connecting Northern Ontario, the Greater Toronto Area (GTA), and surrounding communities. Reliable small goods delivery and scheduled courier runs.",
  openGraph: {
    title: "Service Areas | Bay to Bay Express Inc.",
    description:
      "From the North to the neighbourhood: courier and freight delivery across North Bay, Sudbury, Timmins, Cochrane, Kapuskasing, Hearst, and the GTA.",
    images: ["/gta-skyline.jpg"],
  },
};

const AREA_HIGHLIGHTS = [
  {
    icon: MapPin,
    title: "Highway 11 Corridor",
    subtitle: "North Bay to Hearst",
  },
  {
    icon: Truck,
    title: "Greater Toronto Area",
    subtitle: "GTA & Golden Horseshoe",
  },
  {
    icon: Clock,
    title: "Bi-Weekly Schedule",
    subtitle: "Tuesdays & Thursdays",
  },
  {
    icon: ShieldCheck,
    title: "Direct & Dedicated",
    subtitle: "Point-to-point courier",
  },
];

export default async function ServiceAreasPage() {
  const announcement = await getAnnouncementData();
  const contact = await getContactData();
  const quoteContent = await getQuoteFormSectionData();
  const quoteCtaContent = await getQuoteCtaData();

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
      {/* Search Engine JSON-LD Structured Data */}
      <JsonLd />

      {/* Top Announcement Bar */}
      <AnnouncementBar items={announcement.items} />

      {/* Sticky Main Header */}
      <Navbar phone={contact.phone} />

      {/* Hero Section matching the user's design */}
      <Hero
        bgImage="/gta-skyline.jpg"
        bgImageAlt="Toronto skyline and Lake Ontario connecting Northern Ontario and the GTA"
        badgeText="BAY TO BAY EXPRESS"
        headingLine1="From the North."
        headingLine2Accent="To the neighbourhood."
        headingLine2Color="text-white"
        hideGreenBar={true}
        subtext="Connecting Northern Ontario, the GTA and surrounding communities."
        isServiceAreasPage={true}
        exploreHref="#service-areas"
        exploreText="View Coverage Map"
      />

      {/* Service Area Highlights Bar */}
      <section className="w-full bg-[#071A2E] text-white py-6 border-b border-slate-800">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {AREA_HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-normal mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Service Area & Route Map */}
      <ServiceArea />

      {/* Quote Request Form */}
      <div id="quote" className="scroll-mt-20">
        <QuoteForm content={quoteContent} contact={contact} />
      </div>

      {/* Quote Call-to-Action Strip */}
      <QuoteCTA
        content={quoteCtaContent}
        phone={contact.phone}
        email={contact.email || undefined}
      />

      {/* Footer */}
      <Footer phone={contact.phone} email={contact.email || undefined} />
    </div>
  );
}
