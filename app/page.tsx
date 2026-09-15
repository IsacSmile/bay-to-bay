import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceHighlights } from "@/components/sections/ServiceHighlights";
import { ServiceArea } from "@/components/ServiceArea";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Footer } from "@/components/Footer";
import { getAnnouncementData, getContactData } from "@/lib/prisma";

export default async function HomePage() {
  const announcement = await getAnnouncementData();
  const contact = await getContactData();

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
      {/* Top Announcement Bar */}
      <AnnouncementBar items={announcement.items} />

      {/* Sticky Main Header */}
      <div className="sticky top-0 z-50 -mb-[68px] sm:-mb-[72px] pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar phone={contact.phone} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full bg-[#04101D]">
        <Hero />
      </div>

      {/* Service Highlights Bar */}
      <ServiceHighlights />

      {/* Service Area — Animated Route Map */}
      <ServiceArea />

      {/* Delivery Solutions — Services Grid */}
      <ServicesGrid />

      {/* Quote Call-to-Action */}
      <QuoteCTA phone={contact.phone} />

      {/* Footer */}
      <Footer phone={contact.phone} email={contact.email || undefined} />
    </div>
  );
}
