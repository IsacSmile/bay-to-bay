import { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TwiceWeeklyRoute } from "@/components/sections/TwiceWeeklyRoute";
import { ServiceAreasCoverage } from "@/components/sections/ServiceAreasCoverage";
import { Footer } from "@/components/Footer";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { JsonLd } from "@/components/JsonLd";
import {
  getAnnouncementData,
  getContactData,
  getQuoteCtaData,
  getRegionsData,
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

export default async function ServiceAreasPage() {
  const announcement = await getAnnouncementData();
  const contact = await getContactData();
  const quoteCtaContent = await getQuoteCtaData();
  const regions = await getRegionsData();

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
        exploreHref="#route"
        exploreText="View Route Schedule"
      />

      {/* Special Twice-Weekly Route (North Bay ↔ Hearst) */}
      <TwiceWeeklyRoute phone={contact.phone} />

      {/* Explore Our Coverage & Our Offices */}
      <ServiceAreasCoverage phone={contact.phone} regions={regions} />

      {/* Quote Call-to-Action Strip */}
      <QuoteCTA content={quoteCtaContent} buttonHref="/contact" />

      {/* Footer */}
      <Footer phone={contact.phone} email={contact.email || undefined} />
    </div>
  );
}
