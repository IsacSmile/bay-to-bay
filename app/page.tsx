import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { RouteCoverage } from "@/components/sections/RouteCoverage";
import { TargetServices } from "@/components/sections/TargetServices";
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

      {/* Feature Grid: Delivery Built Around Northern Ontario */}
      <FeatureGrid />

      {/* Route Coverage: Highway 11 Corridor Diagram */}
      <RouteCoverage />

      {/* Target Audiences: Businesses Served */}
      <TargetServices />

      {/* Quote Call-to-Action */}
      <QuoteCTA phone={contact.phone} />

      {/* Footer */}
      <Footer phone={contact.phone} email={contact.email || undefined} />
    </div>
  );
}
