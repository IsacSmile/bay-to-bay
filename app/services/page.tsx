import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  FileText,
  Activity,
  ThermometerSnowflake,
  PhoneCall,
  MapPin,
} from "lucide-react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
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

const DETAILED_SERVICES = [
  {
    id: "medical",
    badge: "TIME-SENSITIVE HEALTHCARE",
    badgeColor: "bg-emerald-500/15 text-emerald-700 border-emerald-300/40",
    title: "Medical & Pharmacy Courier",
    tagline: "Safe, rapid delivery for clinics, pharmacies, laboratories, and regional hospitals.",
    description:
      "Healthcare deliveries demand precision, speed, and strict protocols. Our drivers are trained in handling sensitive pharmaceuticals, prescription medications, lab specimens, and clinical supplies. We provide secure, temperature-conscious transport connecting medical hubs from North Bay across Northern Ontario.",
    imageUrl: "/services/medical-pharmacy.jpg",
    icon: Activity,
    accentColor: "#059669",
    features: [
      "Temperature-conscious transport for pharmaceuticals, vaccines & biologics",
      "Urgent diagnostic samples, laboratory specimens & biopsy materials",
      "Tamper-evident chain of custody & privacy compliance",
      "Scheduled restock runs for community pharmacies & regional clinics",
      "Priority 12-hour delivery on eligible Northern Ontario corridors*",
      "Direct recipient handoff with digital signature capture",
    ],
    cargoTypes: [
      "Prescription medicines",
      "Pathology & blood samples",
      "Diagnostic equipment",
      "Surgical & dental supplies",
      "Urgent patient records",
    ],
  },
  {
    id: "documents",
    badge: "CONFIDENTIAL & COMPLIANT",
    badgeColor: "bg-sky-500/15 text-sky-800 border-sky-300/40",
    title: "Legal & Sensitive Documents",
    tagline: "Chain-of-custody delivery for law firms, accounting practices, and corporate registries.",
    description:
      "When electronic transmission is insufficient and physical signatures or original hard copies are mandatory, Bay to Bay Express delivers peace of mind. We specialize in real estate closings, court filings, tender submissions, and confidential corporate records with direct hand-to-hand delivery.",
    imageUrl: "/services/documents.jpg",
    icon: FileText,
    accentColor: "#0284C7",
    features: [
      "Real estate closing packages, deed transfers & mortgage documentation",
      "Court filings, litigation briefs & confidential dispute materials",
      "Water-resistant, tamper-evident document security pouches",
      "Direct recipient identity verification at point of delivery",
      "Immediate digital proof of delivery (POD) sent to dispatch and sender",
      "Strict confidentiality agreements signed by all couriers",
    ],
    cargoTypes: [
      "Court briefs & filings",
      "Real estate closing packages",
      "Notarized legal contracts",
      "Sealed commercial tenders",
      "Confidential HR & audit records",
    ],
  },
  {
    id: "retail",
    badge: "COMMERCE & SUPPLY CHAIN",
    badgeColor: "bg-blue-500/15 text-blue-800 border-blue-300/40",
    title: "Retail & Small Goods Distribution",
    tagline: "Dependable parcel and inventory fulfillment connecting Northern Ontario businesses.",
    description:
      "Keep your shelves stocked and your online customers satisfied. From boutique storefronts to automotive repair shops and industrial suppliers, we provide scheduled regional linehauls that keep commerce moving smoothly along the Highway 11 corridor without the exorbitant fees of major national carriers.",
    imageUrl: "/services/retail-goods.jpg",
    icon: Package,
    accentColor: "#0070F3",
    features: [
      "Store-to-store stock transfers & inventory rebalancing",
      "Last-mile commercial parcel fulfillment for Northern Ontario customers",
      "Automotive parts, industrial hardware, and urgent machinery components",
      "Fragile goods care with specialized strapping, padding & blankets",
      "Convenient consolidation and scheduled drop-offs for retail locations",
      "Transparent flat-rate and route-based pricing",
    ],
    cargoTypes: [
      "B2B retail merchandise",
      "Automotive & machinery parts",
      "Electronics & hardware",
      "Store inventory replenishment",
      "E-commerce packages",
    ],
  },
  {
    id: "dedicated",
    badge: "EXCLUSIVE FLEET ACCESS",
    badgeColor: "bg-indigo-500/15 text-indigo-800 border-indigo-300/40",
    title: "Dedicated & Scheduled Fleet Delivery",
    tagline: "Custom recurring runs or point-to-point dedicated vehicle dispatch on your schedule.",
    description:
      "For organizations that require guaranteed vehicle capacity or predictable recurring routes. Whether you need a dedicated van every Tuesday and Thursday or emergency point-to-point dispatch for critical industrial components, we tailor an exclusive delivery solution around your timetable.",
    imageUrl: "/services/delivery-van.jpg",
    icon: Truck,
    accentColor: "#4F46E5",
    features: [
      "Exclusive vehicle hire: direct origin-to-destination with zero co-mingling",
      "Custom recurring routes (daily, twice-weekly, or monthly contract runs)",
      "High-security freight with dedicated driver assignment",
      "Emergency expedited dispatch for critical downtime situations",
      "Full corridor coverage: North Bay, Temiskaming Shores, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst & Longlac",
      "Personalized dispatch coordination and live trip updates",
    ],
    cargoTypes: [
      "Time-critical manufacturing components",
      "Exclusive bulk goods",
      "Regular multi-stop supply runs",
      "High-value proprietary equipment",
      "Scheduled inter-office transfers",
    ],
  },
];

const SERVICE_CAPABILITIES = [
  {
    icon: Clock,
    title: "12-Hour Priority Corridors",
    description:
      "Fast regional transit along Highway 11 connecting North Bay through Hearst and Longlac.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Chain of Custody",
    description:
      "Every parcel is logged, tracked, and signed for by the verified recipient upon delivery.",
  },
  {
    icon: ThermometerSnowflake,
    title: "Temperature-Conscious Care",
    description:
      "Climate-controlled cabins designed to safeguard pharmaceuticals, specimens, and sensitive goods.",
  },
  {
    icon: PhoneCall,
    title: "Direct Regional Dispatch",
    description:
      "Direct line to dispatch who know Northern Ontario roads, weather, and communities.",
  },
];

export default async function ServicesPage() {
  const announcement = await getAnnouncementData();
  const contact = await getContactData();
  const quoteContent = await getQuoteFormSectionData();
  const quoteCtaContent = await getQuoteCtaData();
  const telLink = `tel:${contact.phone.replace(/[^0-9]/g, "")}`;

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

      {/* 2. Key Capabilities / Guarantee Badges */}
      <section className="w-full bg-[#F6F9FC] py-8 sm:py-12 border-b border-slate-200/80">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SERVICE_CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5FC] text-[#0088FF] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#071A2E] leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Detailed Services Sections Showcase */}
      <section className="w-full py-16 sm:py-24">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Introduction */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="text-xs font-black tracking-widest text-[#0088FF] uppercase block mb-2">
              OUR COMPLETE SERVICE SUITE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-[#071A2E] tracking-tight leading-tight">
              Tailored Logistics for Every Industry
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Explore our core courier categories below. Each service is fully customizable to your
              business&apos;s schedule, volume, and compliance standards.
            </p>
          </div>

          {/* Detailed Service Cards List */}
          <div className="space-y-12 sm:space-y-16">
            {DETAILED_SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24 bg-white rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                    
                    {/* Image Column */}
                    <div
                      className={`lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full bg-slate-900 overflow-hidden ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden pointer-events-none" />
                    </div>

                    {/* Content Column */}
                    <div
                      className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div>
                        {/* Eyebrow Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-wider border uppercase ${service.badgeColor}`}
                          >
                            {service.badge}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="font-display text-2xl sm:text-3xl font-black text-[#071A2E] tracking-tight mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-[#0088FF] mb-4">
                          {service.tagline}
                        </p>

                        {/* Full Description */}
                        <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal mb-6">
                          {service.description}
                        </p>

                        {/* Key Capabilities Checklist */}
                        <div className="mb-6">
                          <h4 className="text-xs font-black tracking-wider text-slate-800 uppercase mb-3">
                            SERVICE SPECIFICATIONS & CAPABILITIES
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.features.map((feature, fIndex) => (
                              <div
                                key={fIndex}
                                className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-snug"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Typical Cargo Handled Tags */}
                        <div className="mb-8">
                          <h4 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-2">
                            FREQUENTLY TRANSPORTED CARGO:
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {service.cargoTypes.map((cargo, cIndex) => (
                              <span
                                key={cIndex}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/70"
                              >
                                {cargo}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Row */}
                      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <MapPin className="w-4 h-4 text-[#0088FF]" />
                          <span>Eligible on North Bay ↔ Hearst scheduled corridor</span>
                        </div>

                        <a
                          href="#quote"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0088FF] hover:bg-[#0077EE] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
                        >
                          <span>Request Quote for This Service</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>

                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Twice-Weekly Corridor Highlight Banner */}
      <section className="w-full bg-[#062E57] text-white py-14 sm:py-18">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xs">
            <div className="max-w-2xl">
              <span className="text-[#38BDF8] text-xs font-black tracking-widest uppercase block mb-2">
                SCHEDULED HIGHWAY 11 RUNS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Our Special Twice-Weekly Route: North Bay ↔ Hearst
              </h3>
              <p className="mt-3 text-slate-300 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed">
                Connect your shipments along our established regional run stopping through
                Temiskaming Shores, Kirkland Lake, Matheson, Timmins, Cochrane, Kapuskasing,
                Hearst, and Longlac. Scheduled northbound runs with return service the following day.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <Link
                href="/#route"
                className="bg-[#0088FF] hover:bg-[#0077EE] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>View Route Timeline & Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quote Request Form */}
      <div id="quote" className="scroll-mt-20">
        <QuoteForm content={quoteContent} contact={contact} />
      </div>

      {/* 6. Quote Call-to-Action Strip */}
      <QuoteCTA
        content={quoteCtaContent}
        phone={contact.phone}
        email={contact.email || undefined}
      />

      {/* 7. Footer */}
      <Footer phone={contact.phone} email={contact.email || undefined} />
    </div>
  );
}
