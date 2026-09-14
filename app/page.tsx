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
      {/* Dark Hero Container with Transparent AnnouncementBar & Floating Navbar Overlay */}
      <div className="relative w-full bg-[#04101D]">
        {/* Top Announcement Bar */}
        <AnnouncementBar items={announcement.items} />

        {/* Main Navbar Overlay */}
        <div className="relative z-50 -mb-[68px] sm:-mb-[72px] h-[68px] sm:h-[72px]">
          <Navbar phone={contact.phone} />
        </div>

        {/* Hero Section */}
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
