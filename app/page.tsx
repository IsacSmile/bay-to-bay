import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceHighlights } from "@/components/sections/ServiceHighlights";
import { TwiceWeeklyRoute } from "@/components/sections/TwiceWeeklyRoute";
import { CoverageTeaser } from "@/components/sections/CoverageTeaser";
import { HowItWorks } from "@/components/HowItWorks";
import { OurOffices } from "@/components/sections/OurOffices";
import { SeasonsCommitment } from "@/components/sections/SeasonsCommitment";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  getContactData,
  getQuoteCtaData,
} from "@/lib/prisma";

export default async function HomePage() {
  const contact = await getContactData();
  const quoteCtaContent = await getQuoteCtaData();

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
      {/* Search Engine JSON-LD Structured Data */}
      <JsonLd />

      {/* Sticky Main Header */}
      <Navbar phone={contact.phone} />

      {/* Hero Section */}
      <div className="relative w-full bg-[#071A2E]">
        <Hero />
      </div>

      {/* Service Highlights Bar */}
      <ServiceHighlights />

      {/* Special Twice-Weekly Route (North Bay ↔ Hearst) */}
      <TwiceWeeklyRoute phone={contact.phone} />

      {/* Connecting North & South (Coverage Preview) */}
      <CoverageTeaser />

      {/* How It Works */}
      <HowItWorks />

      {/* Our Offices (North Bay & Hearst) */}
      <OurOffices phone={contact.phone} />

      {/* Rooted in Ontario - Every season, The same commitment banner */}
      <SeasonsCommitment />

      {/* Quote Call-to-Action */}
      <QuoteCTA content={quoteCtaContent} phone={contact.phone} email={contact.email || undefined} />

      {/* Footer */}
      <Footer phone={contact.phone} email={contact.email || undefined} />
    </div>
  );
}
