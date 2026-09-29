import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Truck, Clock, ShieldCheck } from "lucide-react";
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

const SERVICE_AREA_OFFERINGS = [
  {
    tag: "01 / NORTHERN ONTARIO HIGHWAY 11",
    title: "The Northern Ontario Highway 11 corridor.",
    description:
      "Special bi-weekly routes connecting North Bay, New Liskeard, Kirkland Lake, Timmins, Cochrane, Kapuskasing, and Hearst. Dependable transport across regional northern hubs.",
    features: ["Scheduled weekly departures", "Guaranteed careful handling", "Proof of delivery"],
    action: "View Northern Ontario route",
    imageUrl: "/services/delivery-van.jpg",
    alt: "Bay to Bay Express van traversing Northern Ontario",
    imageLeft: true,
  },
  {
    tag: "02 / GREATER TORONTO AREA & SURROUNDING",
    title: "Direct connections to the GTA.",
    description:
      "Seamless transfers between the Greater Toronto Area and northern communities. Servicing Toronto, Mississauga, Brampton, Vaughan, Markham, and surrounding regional business hubs.",
    features: ["Commercial dispatch", "Local store-to-door", "Coordinated delivery"],
    action: "Ask about GTA deliveries",
    imageUrl: "/gta-skyline.jpg",
    alt: "Toronto skyline and Greater Toronto Area connection",
    imageLeft: false,
  },
  {
    tag: "03 / SPECIALIZED & DEDICATED ROUTES",
    title: "Non-stop direct delivery when timing is critical.",
    description:
      "Direct origin-to-destination transport with no shared cargo or detours. Ideal for urgent medical supplies, confidential legal papers, and time-critical commercial goods.",
    features: ["Direct non-stop transport", "Dedicated vehicle", "Real-time status confirmation"],
    action: "Enquire about dedicated routing",
    imageUrl: "/services/documents.jpg",
    alt: "Dedicated urgent document and parcel delivery",
    imageLeft: true,
  },
  {
    tag: "04 / LOCAL BUSINESSES & COMMUNITIES",
    title: "A reliable bridge for local commerce.",
    description:
      "Connecting remote towns and metropolitan centers. Supporting independent retailers, healthcare providers, legal practices, and local manufacturers across Ontario.",
    features: ["Careful handling", "Clear communication", "Proof of delivery"],
    action: "Check your delivery zone",
    imageUrl: "/services/retail-goods.jpg",
    alt: "Local business retail parcel delivery",
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
    title: "Northern Highway 11 Corridor",
    description:
      "Special bi-weekly scheduled service between North Bay and Hearst with guaranteed handling along Highway 11.",
  },
  {
    title: "GTA & Southern Ontario Transfers",
    description:
      "Connecting Toronto, Mississauga, Brampton, and surrounding Golden Horseshoe hubs to Northern Ontario.",
  },
  {
    title: "Special & Remote Enquiries",
    description:
      "Enquire for custom off-corridor stops, rural drop-offs, and dedicated express vehicles tailored to your schedule.",
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

      {/* Coverage & Route Showcase */}
      <section id="areas-list" className="w-full bg-white py-16 sm:py-20 lg:py-24 scroll-mt-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Section Header */}
          <div className="mb-14 sm:mb-18 lg:mb-20">
            <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-3">
              FIND YOUR COVERAGE ZONE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-[#071A2E] tracking-tight leading-[1.12]">
              Connecting Northern Ontario.<br />
              Direct to the neighbourhood.
            </h2>
          </div>

          {/* 4 Alternating Service Area Showcase Rows */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {SERVICE_AREA_OFFERINGS.map((area, index) => {
              const isImageLeft = area.imageLeft;

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
                        src={area.imageUrl}
                        alt={area.alt}
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
                      {area.tag}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-black text-[#071A2E] tracking-tight leading-snug mb-3.5">
                      {area.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed mb-4 max-w-xl">
                      {area.description}
                    </p>

                    {/* Features checklist */}
                    <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs font-bold text-[#059669] mb-5">
                      {area.features.map((feature, fIdx) => (
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
                      <span>{area.action}</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simple From Start to Finish: 4 Steps (2-col mobile, 4-col desktop) */}
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
              Tell us the pickup location and destination when requesting a quote. Please do not enter patient details, account numbers or other sensitive information in the form.
            </p>

            <div className="mt-4">
              <a
                href="#quote"
                className="text-[#0284C7] hover:text-[#006ED6] font-bold text-xs sm:text-sm inline-flex items-center gap-1 group transition-colors"
              >
                <span>Discuss your route requirements</span>
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
