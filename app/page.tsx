import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceHighlights } from "@/components/sections/ServiceHighlights";
import { ServiceArea } from "@/components/ServiceArea";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { BusinessSolutions } from "@/components/BusinessSolutions";
import { WhoWeServe } from "@/components/WhoWeServe";
import { WhyUs } from "@/components/WhyUs";
import { HowItWorks } from "@/components/HowItWorks";
import { QuoteForm } from "@/components/QuoteForm";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  getAnnouncementData,
  getContactData,
  getQuoteFormSectionData,
  getAboutContentData,
  getAboutTagPillsData,
  getFaqContentData,
  getFaqItemsData,
  getQuoteCtaData,
} from "@/lib/prisma";

export default async function HomePage() {
  const announcement = await getAnnouncementData();
  const contact = await getContactData();
  const quoteContent = await getQuoteFormSectionData();
  const aboutContent = await getAboutContentData();
  const aboutTags = await getAboutTagPillsData();
  const faqContent = await getFaqContentData();
  const faqItems = await getFaqItemsData();
  const quoteCtaContent = await getQuoteCtaData();

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
      {/* Search Engine JSON-LD Structured Data */}
      <JsonLd />

      {/* Top Announcement Bar */}
      <AnnouncementBar items={announcement.items} />

      {/* Sticky Main Header */}
      <Navbar phone={contact.phone} />

      {/* Hero Section */}
      <div className="relative w-full bg-[#071A2E]">
        <Hero />
      </div>

      {/* Service Highlights Bar */}
      <ServiceHighlights />

      {/* Service Area — Animated Route Map */}
      <ServiceArea />

      {/* Delivery Solutions — Services Grid */}
      <ServicesGrid />

      {/* Business Solutions */}
      <BusinessSolutions />

      {/* Who We Serve */}
      <WhoWeServe />

      {/* Why Bay to Bay */}
      <WhyUs />

      {/* How It Works */}
      <HowItWorks />

      {/* Quote Request Form */}
      <QuoteForm content={quoteContent} contact={contact} />

      {/* About Section */}
      <About content={aboutContent} tagPills={aboutTags} />

      {/* FAQ Section */}
      <FAQ content={faqContent} items={faqItems} />

      {/* Quote Call-to-Action */}
      <QuoteCTA content={quoteCtaContent} phone={contact.phone} email={contact.email || undefined} />

      {/* Footer */}
      <Footer phone={contact.phone} email={contact.email || undefined} />
    </div>
  );
}
