import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceHighlights } from "@/components/sections/ServiceHighlights";
import { TwiceWeeklyRoute } from "@/components/sections/TwiceWeeklyRoute";
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
  title: "Delivery & Courier Services | Bay to Bay Express Inc.",
  description:
    "Comprehensive courier and delivery services across Northern Ontario. Medical & pharmacy transport, legal document delivery, retail distribution, and dedicated scheduled runs.",
  openGraph: {
    title: "Delivery & Courier Services | Bay to Bay Express Inc.",
    description:
      "Reliable, time-sensitive delivery solutions for healthcare, legal, retail, and commercial businesses across Northern Ontario.",
  },
};

const SERVICE_OFFERINGS = [
  {
    number: "01",
    tag: "01 / MEDICAL & PHARMACY",
    title: "Care for the essentials.",
    description:
      "Medicine and pharmacy supplies, sample-delivery enquiries and blood-work reports. Tell us any packaging, temperature or special handling requirements so we can confirm suitability before booking.",
    features: ["Careful handling", "Clear communication", "Proof of delivery"],
    action: "Ask about medical & pharmacy",
    imageUrl: "/services/medical-pharmacy.jpg",
    alt: "Medicine and pharmacy supply delivery packages",
    imageLeft: true,
  },
  {
    number: "02",
    tag: "02 / DOCUMENTS & LEGAL PAPERS",
    title: "Important papers. Personal attention.",
    description:
      "Secure delivery enquiries for legal papers, demand drafts and banking documents. Contact us separately to confirm arrangements for banknote (cash) transfers.",
    features: ["Careful handling", "Clear communication", "Proof of delivery"],
    action: "Ask about documents & legal papers",
    imageUrl: "/services/documents.jpg",
    alt: "Confidential legal papers and documents",
    imageLeft: false,
  },
  {
    number: "03",
    tag: "03 / RETAIL & SMALL GOODS",
    title: "A connection for local business.",
    description:
      "From store-to-store parcels to small goods for individuals, we help keep your deliveries moving across the North and the GTA.",
    features: ["Careful handling", "Clear communication", "Proof of delivery"],
    action: "Ask about retail & small goods",
    imageUrl: "/services/retail-goods.jpg",
    alt: "Retail merchandise and parcels for local businesses",
    imageLeft: true,
  },
  {
    number: "04",
    tag: "04 / DEDICATED DELIVERY",
    title: "Your shipment. A dedicated journey.",
    description:
      "Direct service with no shared load when booked as a dedicated delivery. Our scheduled North Bay–Hearst runs leave North Bay on Tuesdays and Thursdays, returning from Hearst on Wednesdays and Fridays. Ask which service best suits your shipment.",
    features: ["Careful handling", "Clear communication", "Proof of delivery"],
    action: "Ask about dedicated delivery",
    imageUrl: "/services/delivery-van.jpg",
    alt: "Dedicated delivery van route across Northern Ontario",
    imageLeft: false,
  },
];

const SIMPLE_STEPS = [
  {
    step: "01",
    title: "Tell us the details",
    description: "Share your pickup, destination and package requirements.",
  },
  {
    step: "02",
    title: "Confirm your quote",
    description: "We confirm availability, price and delivery arrangements.",
  },
  {
    step: "03",
    title: "Ready for pickup",
    description: "Prepare your goods for the agreed pickup window.",
  },
  {
    step: "04",
    title: "Delivered with care",
    description: "Receive communication and proof of delivery.",
  },
];

const TIME_SENSITIVE_CARDS = [
  {
    title: "Medicine & pharmacy",
    description:
      "Ask about urgent medicine delivery along the North Bay–Hearst route. Share any special handling needs before booking.",
  },
  {
    title: "Samples & blood-work reports",
    description:
      "Enquire about sample delivery and the secure transfer of blood-work reports. Sample type, packaging, temperature and handling requirements must be confirmed before acceptance.",
  },
  {
    title: "Legal & banking documents",
    description:
      "Enquire about legal papers, demand drafts and banking documents. Banknote (cash) transfers require a separate discussion and confirmation before booking.",
  },
];

export default async function ServicesPage() {
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

      {/* Hero Section (Reuses identical Hero component with custom heading & paragraph) */}
      <Hero
        headingLine1="Small goods."
        headingLine2Accent="Big responsibility."
        subtext="Delivery services for the people and businesses that keep Ontario moving."
        isServicesPage
      />

      {/* Service Highlights Bar */}
      <ServiceHighlights />

      {/* Special Twice-Weekly Route (North Bay ↔ Hearst) */}
      <TwiceWeeklyRoute phone={contact.phone} />

      {/* Re-designed Services Showcase: Handled with care. Connected with purpose. */}
      <section id="services-list" className="w-full bg-white py-16 sm:py-20 lg:py-24 scroll-mt-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Section Header */}
          <div className="mb-14 sm:mb-18 lg:mb-20">
            <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-3">
              FIND YOUR DELIVERY SERVICE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-[#071A2E] tracking-tight leading-[1.12]">
              Handled with care.<br />
              Connected with purpose.
            </h2>
          </div>

          {/* 4 Alternating Service Showcase Rows */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {SERVICE_OFFERINGS.map((service, index) => {
              const isImageLeft = service.imageLeft;

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 w-full ${
                      isImageLeft ? "lg:order-1 order-1" : "lg:order-2 order-1"
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-100 group">
                      <Image
                        src={service.imageUrl}
                        alt={service.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      isImageLeft ? "lg:order-2 order-2" : "lg:order-1 order-2"
                    }`}
                  >
                    <span className="text-[#059669] text-xs font-black tracking-widest uppercase mb-2 block">
                      {service.tag}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#071A2E] tracking-tight leading-snug mb-3.5">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed mb-4 max-w-xl">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs font-bold text-[#059669] mb-5">
                      {service.features.map((feature, fIdx) => (
                        <span key={fIdx} className="inline-flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                          <span>{feature}</span>
                        </span>
                      ))}
                    </div>

                    {/* Action link */}
                    <a
                      href="#quote"
                      className="text-[#0284C7] hover:text-[#006ED6] font-bold text-xs sm:text-sm inline-flex items-center gap-1 group transition-colors self-start"
                    >
                      <span>{service.action}</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simple From Start to Finish: 4 Steps */}
          <div className="mt-24 sm:mt-32 pt-16 sm:pt-20 border-t border-slate-100">
            <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-2">
              SIMPLE FROM START TO FINISH
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-black text-[#071A2E] tracking-tight mb-10 sm:mb-12">
              From your door to theirs.
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-8 lg:gap-x-10 gap-y-9 sm:gap-y-12 lg:gap-y-10">
              {SIMPLE_STEPS.map((step, idx) => (
                <div key={idx}>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8ec5e7] block mb-2 sm:mb-2.5 font-display">
                    {step.step}
                  </span>
                  <h4 className="font-bold text-[15px] sm:text-lg text-[#071A2E] mb-1.5 sm:mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* When Timing Matters: 3 Cards */}
          <div className="mt-20 sm:mt-28">
            <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-2">
              WHEN TIMING MATTERS
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-black text-[#071A2E] tracking-tight mb-8 sm:mb-10">
              For your time-sensitive deliveries.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {TIME_SENSITIVE_CARDS.map((card, cIdx) => (
                <div
                  key={cIdx}
                  className="bg-[#F0F7FB] rounded-xl p-5 sm:p-6 border-l-4 border-[#059669] shadow-xs"
                >
                  <h4 className="font-bold text-base sm:text-lg text-[#071A2E] mb-2 leading-snug">
                    {card.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-[13px] font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-slate-400 text-[11px] sm:text-xs font-normal mt-5 leading-normal">
              Tell us the type of shipment when requesting a quote. Please do not enter patient details, account numbers or other sensitive information in the form.
            </p>

            <div className="mt-4">
              <a
                href="#quote"
                className="text-[#0284C7] hover:text-[#006ED6] font-bold text-xs sm:text-sm inline-flex items-center gap-1 group transition-colors"
              >
                <span>Discuss your delivery</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

        </div>
      </section>

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
