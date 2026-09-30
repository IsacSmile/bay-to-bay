import { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { AboutContent } from "@/components/sections/AboutContent";
import { Footer } from "@/components/Footer";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { JsonLd } from "@/components/JsonLd";
import { getAnnouncementData, getContactData, getQuoteCtaData } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "About Us | Bay to Bay Express Inc.",
  description:
    "Local. Northern. Dependable. Connecting Northern Ontario and the GTA communities with dedicated small-goods delivery.",
  openGraph: {
    title: "About Us | Bay to Bay Express Inc.",
    description:
      "Bay to Bay Express focuses on small-goods delivery across Northern Ontario and the GTA, with scheduled and dedicated arrangements for businesses and communities.",
    images: ["/services/delivery-van.jpg"],
  },
};

export default async function AboutPage() {
  const announcement = await getAnnouncementData();
  const contact = await getContactData();
  const quoteCtaContent = await getQuoteCtaData();

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
      {/* Search Engine JSON-LD Structured Data */}
      <JsonLd />

      {/* Top Announcement Bar */}
      <AnnouncementBar items={announcement.items} />

      {/* Sticky Main Header */}
      <Navbar phone={contact.phone} />

      {/* Main About Content (Exact UI from Reference) */}
      <main className="flex-1">
        <AboutContent phone={contact.phone} />
      </main>

      {/* Quote Call-to-Action Strip */}
      <QuoteCTA content={quoteCtaContent} buttonHref="/#quote" />

      {/* Footer */}
      <Footer phone={contact.phone} email={contact.email || undefined} />
    </div>
  );
}
