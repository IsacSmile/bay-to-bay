import { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  getAnnouncementData,
  getContactData,
  getServicesData,
} from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Contact & Request a Quote | Bay to Bay Express Inc.",
  description:
    "Request a delivery quote or get in touch with Bay to Bay Express Inc. Connecting Northern Ontario and the GTA communities with dedicated small-goods delivery.",
  openGraph: {
    title: "Contact & Request a Quote | Bay to Bay Express Inc.",
    description:
      "Tell us about your shipment. We review the route details and confirm availability and pricing for delivery across Northern Ontario and the GTA.",
    images: ["/services/delivery-van.jpg"],
  },
};

export default async function ContactPage() {
  const announcement = await getAnnouncementData();
  const contact = await getContactData();
  const services = await getServicesData();

  const formattedServices = services.map((s) => ({
    id: s.id,
    title: s.title,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
      {/* Search Engine JSON-LD Structured Data */}
      <JsonLd />

      {/* Top Announcement Bar */}
      <AnnouncementBar items={announcement.items} />

      {/* Sticky Main Header */}
      <Navbar phone={contact.phone} />

      {/* Main Contact Form & Information Content */}
      <main className="flex-1">
        <ContactForm
          phone={contact.phone}
          email={contact.email || undefined}
          initialServices={formattedServices}
        />
      </main>


      {/* Footer */}
      <Footer phone={contact.phone} email={contact.email || undefined} />
    </div>
  );
}
