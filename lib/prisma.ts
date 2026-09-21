import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Check if database URL is a real connection string vs placeholder
function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (
    !url ||
    url.trim() === "" ||
    url.includes("dummy_password") ||
    url.includes("ep-sample-123456") ||
    url.includes("localhost:5432/baytobay")
  ) {
    return false;
  }
  return true;
}

// Timeout wrapper for database queries to prevent slow network hangs
async function withTimeout<T>(promise: Promise<T>, ms: number = 1200): Promise<T | null> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<null>((resolve) => {
    timeoutId = setTimeout(() => resolve(null), ms);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}

// Types for components
export interface FeaturePillItem {
  icon: string;
  label: string;
}

export interface RouteStopItem {
  id: string;
  stopNumber: string;
  name: string;
  isStart?: boolean;
  isEnd?: boolean;
  order: number;
  xPercent?: number | null;
  yPercent?: number | null;
}

export interface RouteCardData {
  label: string;
  title: string;
  duration: string;
  footerLead: string;
  footerDesc: string;
  stops: RouteStopItem[];
}

export interface HeroData {
  eyebrowLabel: string;
  pillBadge: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3Accent: string;
  subtext: string;
  description: string;
  disclaimer: string | null;
  featurePills: FeaturePillItem[];
}

export interface AnnouncementData {
  items: string[];
}

export interface ContactData {
  phone: string;
  email: string | null;
}

// Fallback Defaults matching reference design
export const DEFAULT_ANNOUNCEMENT: AnnouncementData = {
  items: [
    "NORTHERN ONTARIO ROUTES",
    "NORTH BAY TO HEARST",
    "TWICE-WEEKLY SERVICE OPTIONS",
  ],
};

export const DEFAULT_CONTACT: ContactData = {
  phone: "705-978-3001",
  email: "baytobayexpress@gmail.com",
};

export const DEFAULT_HERO: HeroData = {
  eyebrowLabel: "NORTHERN ONTARIO COURIER SERVICE",
  pillBadge: "HIGHWAY 11 CORRIDOR",
  headingLine1: "Small Goods Delivery",
  headingLine2: "",
  headingLine3Accent: "Across Northern Ontario",
  subtext: "Reliable. Dedicated. Delivered.",
  description:
    "Dedicated and scheduled delivery solutions connecting North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac.",
  disclaimer: "*Timing subject to route and location conditions.",
  featurePills: [
    { icon: "clock", label: "12-hour options*" },
    { icon: "truck", label: "Twice-weekly routes" },
    { icon: "package", label: "Small goods specialists" },
  ],
};

export interface ServiceAreaData {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  cardTitle: string;
  cardDescription: string;
  badgeText: string;
}

export const DEFAULT_SERVICE_AREA: ServiceAreaData = {
  eyebrow: "SERVICE AREA",
  headingPrimary: "Connecting Northern Ontario.",
  headingAccent: "Delivering what matters.",
  description:
    "Our route knowledge is regional by design. We connect communities across Northern Ontario with small-goods transportation, scheduled service, and delivery arrangements that work for local businesses.",
  cardTitle: "Local knowledge. Regional reach.",
  cardDescription: "North Bay to Hearst, with key stops in between.",
  badgeText: "Scheduled regional route",
};

export const DEFAULT_ROUTE: RouteCardData = {
  label: "SPECIAL ROUTE",
  title: "North Bay → Hearst",
  duration: "12h",
  footerLead: "Scheduled with reliability.",
  footerDesc:
    "Ask about your route, recurring pickup, or dedicated run.",
  stops: [
    { id: "1", stopNumber: "01", name: "North Bay", isStart: true, isEnd: false, order: 1, xPercent: 24, yPercent: 88 },
    { id: "2", stopNumber: "02", name: "Kirkland Lake", isStart: false, isEnd: false, order: 2, xPercent: 35, yPercent: 78 },
    { id: "3", stopNumber: "03", name: "Timmins", isStart: false, isEnd: false, order: 3, xPercent: 46, yPercent: 68 },
    { id: "4", stopNumber: "04", name: "Cochrane", isStart: false, isEnd: false, order: 4, xPercent: 55, yPercent: 58 },
    { id: "5", stopNumber: "05", name: "Kapuskasing", isStart: false, isEnd: false, order: 5, xPercent: 65, yPercent: 46 },
    { id: "6", stopNumber: "06", name: "Hearst", isStart: false, isEnd: true, order: 6, xPercent: 74, yPercent: 35 },
    { id: "7", stopNumber: "07", name: "Longlac", isStart: false, isEnd: false, order: 7, xPercent: 85, yPercent: 26 },
  ],
};

export async function getAnnouncementData(): Promise<AnnouncementData> {
  if (!isDatabaseConfigured()) return DEFAULT_ANNOUNCEMENT;

  try {
    const data = await withTimeout(
      prisma.siteSettings.findUnique({
        where: { id: "default" },
      })
    );
    if (data?.announcementItems && data.announcementItems.length > 0) {
      return { items: data.announcementItems };
    }
  } catch (error) {
    console.warn("Failed to fetch announcement settings from DB, using fallback defaults.", error);
  }
  return DEFAULT_ANNOUNCEMENT;
}

export async function getContactData(): Promise<ContactData> {
  if (!isDatabaseConfigured()) return DEFAULT_CONTACT;

  try {
    const data = await withTimeout(
      prisma.contactDetails.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return { phone: data.phone, email: data.email };
    }
  } catch (error) {
    console.warn("Failed to fetch contact details from DB, using fallback defaults.", error);
  }
  return DEFAULT_CONTACT;
}

export async function getHeroData(): Promise<HeroData> {
  if (!isDatabaseConfigured()) return DEFAULT_HERO;

  try {
    const data = await withTimeout(
      prisma.heroContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      const pills = Array.isArray(data.featurePills)
        ? (data.featurePills as unknown as FeaturePillItem[])
        : DEFAULT_HERO.featurePills;

      return {
        eyebrowLabel: data.eyebrowLabel || DEFAULT_HERO.eyebrowLabel,
        pillBadge: data.pillBadge || DEFAULT_HERO.pillBadge,
        headingLine1: data.headingLine1 || DEFAULT_HERO.headingLine1,
        headingLine2: data.headingLine2 || DEFAULT_HERO.headingLine2,
        headingLine3Accent: data.headingLine3Accent || DEFAULT_HERO.headingLine3Accent,
        subtext: data.subtext || DEFAULT_HERO.subtext,
        description: data.description || DEFAULT_HERO.description,
        disclaimer: data.disclaimer ?? DEFAULT_HERO.disclaimer,
        featurePills: pills,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch hero content from DB, using fallback defaults.", error);
  }
  return DEFAULT_HERO;
}

export async function getHeroRouteData(): Promise<RouteCardData> {
  if (!isDatabaseConfigured()) return DEFAULT_ROUTE;

  try {
    const route = await withTimeout(
      prisma.heroRoute.findUnique({
        where: { id: "default" },
        include: {
          stops: {
            orderBy: { order: "asc" },
          },
        },
      })
    );
    if (route && route.stops.length > 0) {
      return {
        label: route.label,
        title: route.title,
        duration: route.duration,
        footerLead: route.footerLead,
        footerDesc: route.footerDesc,
        stops: route.stops.map((s: { id: string; stopNumber: string; name: string; isStart: boolean; isEnd: boolean; order: number; xPercent?: number | null; yPercent?: number | null }) => ({
          id: s.id,
          stopNumber: s.stopNumber,
          name: s.name,
          isStart: s.isStart,
          isEnd: s.isEnd,
          order: s.order,
          xPercent: s.xPercent ?? null,
          yPercent: s.yPercent ?? null,
        })),
      };
    }
  } catch (error) {
    console.warn("Failed to fetch route data from DB, using fallback defaults.", error);
  }
  return DEFAULT_ROUTE;
}

export interface RegionItemData {
  id: string;
  name: string;
  slug: string;
  status: "active" | "coming_soon" | string;
  description: string | null;
  order: number;
  stops: RouteStopItem[];
}

export const DEFAULT_REGIONS: RegionItemData[] = [
  {
    id: "reg-northern-ontario",
    name: "Northern Ontario",
    slug: "northern-ontario",
    status: "active",
    order: 1,
    description:
      "Our dedicated special route: North Bay to Hearst, including North Bay and Longlac, guaranteed 12-hour delivery, twice weekly.",
    stops: [
      { id: "1", stopNumber: "01", name: "North Bay", isStart: true, isEnd: false, order: 1, xPercent: 24, yPercent: 88 },
      { id: "2", stopNumber: "02", name: "Kirkland Lake", isStart: false, isEnd: false, order: 2, xPercent: 35, yPercent: 78 },
      { id: "3", stopNumber: "03", name: "Timmins", isStart: false, isEnd: false, order: 3, xPercent: 46, yPercent: 68 },
      { id: "4", stopNumber: "04", name: "Cochrane", isStart: false, isEnd: false, order: 4, xPercent: 55, yPercent: 58 },
      { id: "5", stopNumber: "05", name: "Kapuskasing", isStart: false, isEnd: false, order: 5, xPercent: 65, yPercent: 46 },
      { id: "6", stopNumber: "06", name: "Hearst", isStart: false, isEnd: true, order: 6, xPercent: 74, yPercent: 35 },
      { id: "7", stopNumber: "07", name: "Longlac", isStart: false, isEnd: false, order: 7, xPercent: 85, yPercent: 26 },
    ],
  },
  {
    id: "reg-gta",
    name: "GTA & Surrounding Areas",
    slug: "gta-surrounding-areas",
    status: "coming_soon",
    order: 2,
    description:
      "Details coming soon. Express regional courier services expanding across Greater Toronto & Surrounding Areas.",
    stops: [],
  },
];

export async function getRegionsData(): Promise<RegionItemData[]> {
  if (!isDatabaseConfigured()) return DEFAULT_REGIONS;

  try {
    const regions = await withTimeout(
      (prisma as any).region.findMany({
        orderBy: { order: "asc" },
        include: {
          stops: {
            orderBy: { order: "asc" },
          },
        },
      })
    );

    if (Array.isArray(regions) && regions.length > 0) {
      return (regions as any[]).map((r) => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        status: r.status,
        description: r.description,
        order: r.order,
        stops: Array.isArray(r.stops)
          ? r.stops.map((s: any) => ({
              id: s.id,
              stopNumber: s.stopNumber,
              name: s.name,
              isStart: s.isStart,
              isEnd: s.isEnd,
              order: s.order,
              xPercent: s.xPercent ?? null,
              yPercent: s.yPercent ?? null,
            }))
          : [],
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch regions from DB, using fallback defaults.", error);
  }
  return DEFAULT_REGIONS;
}

export async function getServiceAreaData(): Promise<ServiceAreaData> {
  if (!isDatabaseConfigured()) return DEFAULT_SERVICE_AREA;

  try {
    const data = await withTimeout(
      prisma.serviceAreaContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return {
        eyebrow: data.eyebrow || DEFAULT_SERVICE_AREA.eyebrow,
        headingPrimary: data.headingPrimary || DEFAULT_SERVICE_AREA.headingPrimary,
        headingAccent: data.headingAccent || DEFAULT_SERVICE_AREA.headingAccent,
        description: data.description || DEFAULT_SERVICE_AREA.description,
        cardTitle: data.cardTitle || DEFAULT_SERVICE_AREA.cardTitle,
        cardDescription: data.cardDescription || DEFAULT_SERVICE_AREA.cardDescription,
        badgeText: data.badgeText || DEFAULT_SERVICE_AREA.badgeText,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch service area content from DB, using fallback defaults.", error);
  }
  return DEFAULT_SERVICE_AREA;
}

export interface ThemeSettingsData {
  snowfallEnabled: boolean;
  overlayColor: string;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Default to navy-900 #071f3b -> (7, 31, 59)
  const defaultRgb = { r: 7, g: 31, b: 59 };
  if (!hex) return defaultRgb;

  if (hex.includes(",")) {
    const parts = hex.split(",").map((p) => parseInt(p.trim(), 10));
    if (parts.length >= 3 && !parts.some(isNaN)) {
      return { r: parts[0], g: parts[1], b: parts[2] };
    }
  }

  const cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length === 3) {
    return {
      r: parseInt(cleanHex[0] + cleanHex[0], 16),
      g: parseInt(cleanHex[1] + cleanHex[1], 16),
      b: parseInt(cleanHex[2] + cleanHex[2], 16),
    };
  }
  if (cleanHex.length === 6) {
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16),
    };
  }
  return defaultRgb;
}

export async function getThemeSettings(): Promise<ThemeSettingsData> {
  const defaultOverlay = "#071f3b"; // navy-900
  if (!isDatabaseConfigured()) {
    return { snowfallEnabled: true, overlayColor: defaultOverlay };
  }

  try {
    const settings = await withTimeout(
      prisma.themeSettings.findUnique({
        where: { id: "default" },
      })
    );
    if (settings) {
      const raw = settings as unknown as Record<string, unknown>;
      return {
        snowfallEnabled: settings.snowfallEnabled ?? true,
        overlayColor: (raw.overlayColor as string) || (raw.overlay_color as string) || defaultOverlay,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch theme settings from DB, using defaults.", error);
  }
  return { snowfallEnabled: true, overlayColor: defaultOverlay };
}

export async function getSnowfallEnabled(): Promise<boolean> {
  const theme = await getThemeSettings();
  return theme.snowfallEnabled;
}

// Services Section Types & Data
export interface ServicesSectionData {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  ctaHeading: string;
  ctaSubtext: string;
  ctaButtonText: string;
}

export interface ServiceItemData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  icon: string;
  order: number;
  isPriority: boolean;
}

export const DEFAULT_SERVICES_SECTION: ServicesSectionData = {
  eyebrow: "OUR SERVICES",
  headingPrimary: "Delivery services for your business",
  headingAccent: "",
  description: "Reliable, flexible courier solutions to keep your business moving.",
  ctaHeading: "Need regular deliveries?",
  ctaSubtext: "Let's talk about a delivery solution that works for your business.",
  ctaButtonText: "Discuss Your Route",
};

export const DEFAULT_SERVICES_ITEMS: ServiceItemData[] = [
  {
    id: "1",
    title: "Medical & Pharmacy",
    description:
      "Time-sensitive delivery for clinics, pharmacies and healthcare providers. We get essential supplies where they need to be, safely and on time.",
    imageUrl: "/services/medical-pharmacy.jpg",
    icon: "activity",
    order: 1,
    isPriority: true,
  },
  {
    id: "2",
    title: "Documents & Legal Papers",
    description:
      "Secure, reliable delivery of important documents, contracts and legal paperwork across the region.",
    imageUrl: "/services/documents.jpg",
    icon: "file-text",
    order: 2,
    isPriority: false,
  },
  {
    id: "3",
    title: "Retail & Small Goods",
    description:
      "Fast, dependable delivery for online orders, retail stock and small business supplies. From one parcel to regular runs, we've got you covered.",
    imageUrl: "/services/retail-goods.jpg",
    icon: "package",
    order: 3,
    isPriority: false,
  },
  {
    id: "4",
    title: "Dedicated & Scheduled Delivery",
    description:
      "Regular or on-demand runs for businesses that need a dependable delivery partner. A dedicated service tailored to your schedule and locations.",
    imageUrl: "/services/delivery-van.jpg",
    icon: "truck",
    order: 4,
    isPriority: false,
  },
];

export async function getServicesSectionData(): Promise<ServicesSectionData> {
  if (!isDatabaseConfigured()) return DEFAULT_SERVICES_SECTION;

  try {
    const data = await withTimeout(
      prisma.servicesSectionContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      const raw = data as unknown as Record<string, unknown>;
      return {
        eyebrow: data.eyebrow || DEFAULT_SERVICES_SECTION.eyebrow,
        headingPrimary: data.headingPrimary || DEFAULT_SERVICES_SECTION.headingPrimary,
        headingAccent: data.headingAccent ?? DEFAULT_SERVICES_SECTION.headingAccent,
        description: data.description || DEFAULT_SERVICES_SECTION.description,
        ctaHeading: (raw.ctaHeading as string) || DEFAULT_SERVICES_SECTION.ctaHeading,
        ctaSubtext: (raw.ctaSubtext as string) || DEFAULT_SERVICES_SECTION.ctaSubtext,
        ctaButtonText: (raw.ctaButtonText as string) || DEFAULT_SERVICES_SECTION.ctaButtonText,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch services section content from DB, using defaults.", error);
  }
  return DEFAULT_SERVICES_SECTION;
}

export async function getServicesData(): Promise<ServiceItemData[]> {
  if (!isDatabaseConfigured()) return DEFAULT_SERVICES_ITEMS;

  try {
    const services = await withTimeout(
      prisma.serviceItem.findMany({
        orderBy: { order: "asc" },
      })
    );
    if (services && services.length > 0) {
      return services.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        imageUrl: (s as any).imageUrl || DEFAULT_SERVICES_ITEMS.find((d) => d.id === s.id)?.imageUrl || undefined,
        icon: s.icon,
        order: s.order,
        isPriority: s.isPriority,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch service items from DB, using fallback defaults.", error);
  }
  return DEFAULT_SERVICES_ITEMS;
}

// Business Solutions Types & Data
export interface BusinessSolutionsData {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  briefText: string;
  ctaText: string;
}

export const DEFAULT_BUSINESS_SOLUTIONS: BusinessSolutionsData = {
  eyebrow: "BUSINESS SOLUTIONS",
  headingPrimary: "More than a delivery.",
  headingAccent: "A logistics partner.",
  description:
    "Businesses need transportation they can count on. We provide scheduled and dedicated delivery solutions designed to help Northern Ontario businesses move small goods efficiently between communities.",
  briefText:
    "Choose a recurring route, direct run, or a custom arrangement that fits your locations.",
  ctaText: "Discuss your business needs",
};

export async function getBusinessSolutionsData(): Promise<BusinessSolutionsData> {
  if (!isDatabaseConfigured()) return DEFAULT_BUSINESS_SOLUTIONS;

  try {
    const data = await withTimeout(
      prisma.businessSolutionsContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return {
        eyebrow: data.eyebrow || DEFAULT_BUSINESS_SOLUTIONS.eyebrow,
        headingPrimary: data.headingPrimary || DEFAULT_BUSINESS_SOLUTIONS.headingPrimary,
        headingAccent: data.headingAccent || DEFAULT_BUSINESS_SOLUTIONS.headingAccent,
        description: data.description || DEFAULT_BUSINESS_SOLUTIONS.description,
        briefText: data.briefText || DEFAULT_BUSINESS_SOLUTIONS.briefText,
        ctaText: data.ctaText || DEFAULT_BUSINESS_SOLUTIONS.ctaText,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch business solutions content from DB, using fallback defaults.", error);
  }
  return DEFAULT_BUSINESS_SOLUTIONS;
}

// Who We Serve Types & Data
export interface WhoWeServeSectionData {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  ctaText: string;
}

export interface IndustryTagItem {
  id: string;
  label: string;
  icon: string;
  order: number;
}

export const DEFAULT_WHO_WE_SERVE_SECTION: WhoWeServeSectionData = {
  eyebrow: "WHO WE SERVE",
  headingPrimary: "Built for",
  headingAccent: "Northern Ontario businesses.",
  description:
    "Need a recurring delivery route? Let's talk through the pickup, destination, frequency, and service requirements.",
  ctaText: "Request a business quote",
};

export const DEFAULT_INDUSTRY_TAGS: IndustryTagItem[] = [
  { id: "1", label: "Healthcare Organizations", icon: "activity", order: 1 },
  { id: "2", label: "Pharmacies", icon: "pill", order: 2 },
  { id: "3", label: "Medical Clinics", icon: "shield-check", order: 3 },
  { id: "4", label: "Law Firms", icon: "file-text", order: 4 },
  { id: "5", label: "Financial Businesses", icon: "landmark", order: 5 },
  { id: "6", label: "Retailers", icon: "store", order: 6 },
  { id: "7", label: "Construction Companies", icon: "building", order: 7 },
  { id: "8", label: "Manufacturers", icon: "package", order: 8 },
  { id: "9", label: "Contractors", icon: "truck", order: 9 },
  { id: "10", label: "Government Organizations", icon: "globe", order: 10 },
  { id: "11", label: "Non-Profit Organizations", icon: "heart-handshake", order: 11 },
  { id: "12", label: "Small Businesses", icon: "building-2", order: 12 },
  { id: "13", label: "E-Commerce Businesses", icon: "sparkles", order: 13 },
];

export async function getWhoWeServeSectionData(): Promise<WhoWeServeSectionData> {
  if (!isDatabaseConfigured()) return DEFAULT_WHO_WE_SERVE_SECTION;

  try {
    const data = await withTimeout(
      prisma.whoWeServeContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return {
        eyebrow: data.eyebrow || DEFAULT_WHO_WE_SERVE_SECTION.eyebrow,
        headingPrimary: data.headingPrimary || DEFAULT_WHO_WE_SERVE_SECTION.headingPrimary,
        headingAccent: data.headingAccent || DEFAULT_WHO_WE_SERVE_SECTION.headingAccent,
        description: data.description || DEFAULT_WHO_WE_SERVE_SECTION.description,
        ctaText: data.ctaText || DEFAULT_WHO_WE_SERVE_SECTION.ctaText,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch who we serve section content from DB, using fallback defaults.", error);
  }
  return DEFAULT_WHO_WE_SERVE_SECTION;
}

export async function getIndustryTagsData(): Promise<IndustryTagItem[]> {
  if (!isDatabaseConfigured()) return DEFAULT_INDUSTRY_TAGS;

  try {
    const tags = await withTimeout(
      prisma.industryTag.findMany({
        orderBy: { order: "asc" },
      })
    );
    if (tags && tags.length > 0) {
      return tags.map((t) => ({
        id: t.id,
        label: t.label,
        icon: t.icon,
        order: t.order,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch industry tags from DB, using fallback defaults.", error);
  }
  return DEFAULT_INDUSTRY_TAGS;
}

// Why Us Types & Data
export interface WhyUsSectionData {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  tagline: string;
}

export interface ReasonItemData {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export const DEFAULT_WHY_US_SECTION: WhyUsSectionData = {
  eyebrow: "WHY BAY TO BAY",
  headingPrimary: "A clearer way to",
  headingAccent: "move what matters.",
  tagline: "REGIONAL FOCUS · LOCAL KNOWLEDGE",
};

export const DEFAULT_REASON_ITEMS: ReasonItemData[] = [
  {
    id: "1",
    title: "Northern Ontario focus",
    description: "We understand the communities and transportation needs of Northern Ontario.",
    icon: "building-2",
    order: 1,
  },
  {
    id: "2",
    title: "Reliable service",
    description: "Professional delivery with clear communication and dependable scheduling.",
    icon: "shield-check",
    order: 2,
  },
  {
    id: "3",
    title: "Dedicated delivery",
    description: "Direct delivery solutions for businesses that need consistency.",
    icon: "truck",
    order: 3,
  },
  {
    id: "4",
    title: "Twice-weekly service",
    description: "Scheduled route options designed for recurring business needs.",
    icon: "calendar",
    order: 4,
  },
  {
    id: "5",
    title: "Small goods focus",
    description: "Specialized around parcels, documents, supplies, and other small shipments.",
    icon: "package",
    order: 5,
  },
  {
    id: "6",
    title: "Flexible solutions",
    description: "One-time, recurring, and customized delivery options.",
    icon: "sparkles",
    order: 6,
  },
];

export async function getWhyUsSectionData(): Promise<WhyUsSectionData> {
  if (!isDatabaseConfigured()) return DEFAULT_WHY_US_SECTION;

  try {
    const data = await withTimeout(
      prisma.whyUsContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return {
        eyebrow: data.eyebrow || DEFAULT_WHY_US_SECTION.eyebrow,
        headingPrimary: data.headingPrimary || DEFAULT_WHY_US_SECTION.headingPrimary,
        headingAccent: data.headingAccent || DEFAULT_WHY_US_SECTION.headingAccent,
        tagline: data.tagline || DEFAULT_WHY_US_SECTION.tagline,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch why us section content from DB, using fallback defaults.", error);
  }
  return DEFAULT_WHY_US_SECTION;
}

export async function getReasonItemsData(): Promise<ReasonItemData[]> {
  if (!isDatabaseConfigured()) return DEFAULT_REASON_ITEMS;

  try {
    const items = await withTimeout<any[]>(
      (prisma as any).reasonItem.findMany({
        orderBy: { order: "asc" },
      })
    );
    if (items && items.length > 0) {
      return items.map((i: any) => ({
        id: i.id,
        title: i.title,
        description: i.description,
        icon: i.icon || "package",
        order: i.order,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch reason items from DB, using fallback defaults.", error);
  }
  return DEFAULT_REASON_ITEMS;
}

// Types & Data for How It Works Section
export interface HowItWorksSectionData {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  ctaText: string;
}

export interface HowItWorksStepData {
  id: string;
  title: string;
  description: string;
  order: number;
}

export const DEFAULT_HOW_IT_WORKS_SECTION: HowItWorksSectionData = {
  eyebrow: "HOW IT WORKS",
  headingPrimary: "Simple.",
  headingAccent: "Reliable. Delivered.",
  description: "A straightforward process from first conversation to final drop-off.",
  ctaText: "Start your delivery →",
};

export const DEFAULT_HOW_IT_WORKS_STEPS: HowItWorksStepData[] = [
  {
    id: "1",
    title: "Request a quote",
    description: "Tell us what you need delivered.",
    order: 1,
  },
  {
    id: "2",
    title: "Schedule",
    description: "We confirm the pickup, delivery, and service requirements.",
    order: 2,
  },
  {
    id: "3",
    title: "Pickup",
    description: "Your shipment is collected according to the agreed schedule.",
    order: 3,
  },
  {
    id: "4",
    title: "Delivery",
    description: "Your goods are delivered to the destination.",
    order: 4,
  },
];

export async function getHowItWorksSectionData(): Promise<HowItWorksSectionData> {
  if (!isDatabaseConfigured()) return DEFAULT_HOW_IT_WORKS_SECTION;

  try {
    const data = await withTimeout<any>(
      (prisma as any).howItWorksContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return {
        eyebrow: data.eyebrow || DEFAULT_HOW_IT_WORKS_SECTION.eyebrow,
        headingPrimary: data.headingPrimary || DEFAULT_HOW_IT_WORKS_SECTION.headingPrimary,
        headingAccent: data.headingAccent || DEFAULT_HOW_IT_WORKS_SECTION.headingAccent,
        description: data.description || DEFAULT_HOW_IT_WORKS_SECTION.description,
        ctaText: data.ctaText || DEFAULT_HOW_IT_WORKS_SECTION.ctaText,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch how it works section content from DB, using fallback defaults.", error);
  }
  return DEFAULT_HOW_IT_WORKS_SECTION;
}

export async function getHowItWorksStepsData(): Promise<HowItWorksStepData[]> {
  if (!isDatabaseConfigured()) return DEFAULT_HOW_IT_WORKS_STEPS;

  try {
    const items = await withTimeout<any[]>(
      (prisma as any).howItWorksStep.findMany({
        orderBy: { order: "asc" },
      })
    );
    if (items && items.length > 0) {
      return items.map((i: any) => ({
        id: i.id,
        title: i.title,
        description: i.description,
        order: i.order,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch how it works steps from DB, using fallback defaults.", error);
  }
  return DEFAULT_HOW_IT_WORKS_STEPS;
}

// Types & Data for Quote Form Section
export interface QuoteFormSectionData {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  serviceNoteLead: string;
  serviceNoteText: string;
  disclaimer: string;
}

export const DEFAULT_QUOTE_FORM_SECTION: QuoteFormSectionData = {
  eyebrow: "REQUEST A QUOTE",
  headingPrimary: "Tell us the route.",
  headingAccent: "We'll help plan the run.",
  description: "Share a few details about your pickup, delivery, and shipment. We'll contact you to discuss the right service arrangement.",
  serviceNoteLead: "Service note:",
  serviceNoteText: "12-hour options and medical/pharmacy supply delivery are subject to route, pickup time, shipment, handling, and service requirements.",
  disclaimer: "No price calculator is shown. We'll review the route and shipment details with you directly.",
};

export async function getQuoteFormSectionData(): Promise<QuoteFormSectionData> {
  if (!isDatabaseConfigured()) return DEFAULT_QUOTE_FORM_SECTION;

  try {
    const data = await withTimeout<any>(
      (prisma as any).quoteFormContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return {
        eyebrow: data.eyebrow || DEFAULT_QUOTE_FORM_SECTION.eyebrow,
        headingPrimary: data.headingPrimary || DEFAULT_QUOTE_FORM_SECTION.headingPrimary,
        headingAccent: data.headingAccent || DEFAULT_QUOTE_FORM_SECTION.headingAccent,
        description: data.description || DEFAULT_QUOTE_FORM_SECTION.description,
        serviceNoteLead: data.serviceNoteLead || DEFAULT_QUOTE_FORM_SECTION.serviceNoteLead,
        serviceNoteText: data.serviceNoteText || DEFAULT_QUOTE_FORM_SECTION.serviceNoteText,
        disclaimer: data.disclaimer || DEFAULT_QUOTE_FORM_SECTION.disclaimer,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch quote form content from DB, using fallback defaults.", error);
  }
  return DEFAULT_QUOTE_FORM_SECTION;
}

// About Section Types & Data
export interface AboutContentData {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
  quoteText: string;
  quoteDescription: string;
  attribution: string;
}

export interface AboutTagPillItem {
  id: string;
  label: string;
  order: number;
}

export const DEFAULT_ABOUT_CONTENT: AboutContentData = {
  eyebrow: "ABOUT BAY TO BAY",
  headingPrimary: "Local routes.",
  headingAccent: "Professional service.",
  description:
    "Bay to Bay Express Inc. is a Northern Ontario delivery and logistics company focused on reliable small-goods transportation and dedicated business delivery solutions. We connect communities across Northern Ontario through scheduled, recurring, and customized delivery services designed around the needs of local businesses and organizations.",
  quoteText: "Reliable. Dedicated. Delivered.",
  quoteDescription:
    "A clear promise about how we approach scheduled, dedicated, and small-goods delivery across Northern Ontario.",
  attribution: "BAY TO BAY EXPRESS INC.",
};

export const DEFAULT_ABOUT_TAG_PILLS: AboutTagPillItem[] = [
  { id: "1", label: "Local", order: 1 },
  { id: "2", label: "Professional", order: 2 },
  { id: "3", label: "Reliable", order: 3 },
  { id: "4", label: "Flexible", order: 4 },
  { id: "5", label: "Business-focused", order: 5 },
];

export async function getAboutContentData(): Promise<AboutContentData> {
  if (!isDatabaseConfigured()) return DEFAULT_ABOUT_CONTENT;

  try {
    const data = await withTimeout<any>(
      (prisma as any).aboutContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return {
        eyebrow: data.eyebrow || DEFAULT_ABOUT_CONTENT.eyebrow,
        headingPrimary: data.headingPrimary || DEFAULT_ABOUT_CONTENT.headingPrimary,
        headingAccent: data.headingAccent || DEFAULT_ABOUT_CONTENT.headingAccent,
        description: data.description || DEFAULT_ABOUT_CONTENT.description,
        quoteText: data.quoteText || DEFAULT_ABOUT_CONTENT.quoteText,
        quoteDescription: data.quoteDescription || DEFAULT_ABOUT_CONTENT.quoteDescription,
        attribution: data.attribution || DEFAULT_ABOUT_CONTENT.attribution,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch about content from DB, using fallback defaults.", error);
  }
  return DEFAULT_ABOUT_CONTENT;
}

export async function getAboutTagPillsData(): Promise<AboutTagPillItem[]> {
  if (!isDatabaseConfigured()) return DEFAULT_ABOUT_TAG_PILLS;

  try {
    const tags = await withTimeout<any[]>(
      (prisma as any).aboutTagPill.findMany({
        orderBy: { order: "asc" },
      })
    );
    if (tags && tags.length > 0) {
      return tags.map((t) => ({
        id: t.id,
        label: t.label,
        order: t.order,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch about tag pills from DB, using fallback defaults.", error);
  }
  return DEFAULT_ABOUT_TAG_PILLS;
}

// FAQ Section Types & Data
export interface FaqContentData {
  eyebrow: string;
  headingPrimary: string;
  headingAccent: string;
  description: string;
}

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export const DEFAULT_FAQ_CONTENT: FaqContentData = {
  eyebrow: "COMMON QUESTIONS",
  headingPrimary: "Good to know",
  headingAccent: "before you book.",
  description: "Clear details help us plan the right route and service arrangement for your shipment.",
};

export const DEFAULT_FAQ_ITEMS: FaqItemData[] = [
  {
    id: "1",
    question: "What areas do you serve?",
    answer:
      "We currently focus on North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst and Longlac.",
    order: 1,
  },
  {
    id: "2",
    question: "How often do you operate your routes?",
    answer:
      "Dedicated scheduled services are available twice weekly on applicable routes.",
    order: 2,
  },
  {
    id: "3",
    question: "Do you provide small-goods delivery?",
    answer:
      "Yes. Small goods and business shipments are a primary focus of our service.",
    order: 3,
  },
  {
    id: "4",
    question: "Do you provide recurring deliveries?",
    answer:
      "Yes. Businesses can discuss weekly, twice-weekly or customized recurring delivery arrangements.",
    order: 4,
  },
  {
    id: "5",
    question: "Do you provide 12-hour delivery?",
    answer:
      "12-hour delivery options may be available depending on the route, pickup time, shipment and service requirements.",
    order: 5,
  },
  {
    id: "6",
    question: "Do you provide dedicated deliveries?",
    answer:
      "Yes. Dedicated delivery solutions are available depending on the shipment and route.",
    order: 6,
  },
  {
    id: "7",
    question: "How do I request a quote?",
    answer:
      "Complete the online quote form or contact Bay to Bay Express directly at 705-978-3001 or baytobayexpress@gmail.com.",
    order: 7,
  },
  {
    id: "8",
    question: "Do you deliver medical or pharmacy supplies?",
    answer:
      "Medical and pharmacy-related deliveries may be available subject to shipment requirements, applicable regulations, handling requirements and service arrangements.",
    order: 8,
  },
  {
    id: "9",
    question: "Can businesses establish recurring delivery services?",
    answer:
      "Yes. Contact us to discuss your route, frequency and delivery requirements.",
    order: 9,
  },
];

export async function getFaqContentData(): Promise<FaqContentData> {
  if (!isDatabaseConfigured()) return DEFAULT_FAQ_CONTENT;

  try {
    const data = await withTimeout<any>(
      (prisma as any).faqContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return {
        eyebrow: data.eyebrow || DEFAULT_FAQ_CONTENT.eyebrow,
        headingPrimary: data.headingPrimary || DEFAULT_FAQ_CONTENT.headingPrimary,
        headingAccent: data.headingAccent || DEFAULT_FAQ_CONTENT.headingAccent,
        description: data.description || DEFAULT_FAQ_CONTENT.description,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch FAQ content from DB, using fallback defaults.", error);
  }
  return DEFAULT_FAQ_CONTENT;
}

export async function getFaqItemsData(): Promise<FaqItemData[]> {
  if (!isDatabaseConfigured()) return DEFAULT_FAQ_ITEMS;

  try {
    const items = await withTimeout<any[]>(
      (prisma as any).faqItem.findMany({
        orderBy: { order: "asc" },
      })
    );
    if (items && items.length > 0) {
      return items.map((i) => ({
        id: i.id,
        question: i.question,
        answer: i.answer,
        order: i.order,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch FAQ items from DB, using fallback defaults.", error);
  }
  return DEFAULT_FAQ_ITEMS;
}

// Quote CTA Banner Types & Data
export interface QuoteCtaData {
  eyebrow: string;
  heading: string;
  description: string;
  phoneText: string;
  emailLabel: string;
  emailAddress: string;
  brandLogoText: string;
}

export const DEFAULT_QUOTE_CTA: QuoteCtaData = {
  eyebrow: "LET'S MOVE YOUR BUSINESS FORWARD",
  heading: "Your route starts here.",
  description:
    "Call or email Bay to Bay Express to discuss a delivery, recurring route, or pharmacy supply shipment.",
  phoneText: "705-978-3001",
  emailLabel: "Email us",
  emailAddress: "baytobayexpress@gmail.com",
  brandLogoText: "Bay to Bay EXPRESS INC.",
};

export async function getQuoteCtaData(): Promise<QuoteCtaData> {
  if (!isDatabaseConfigured()) return DEFAULT_QUOTE_CTA;

  try {
    const data = await withTimeout<any>(
      (prisma as any).quoteCtaContent.findUnique({
        where: { id: "default" },
      })
    );
    if (data) {
      return {
        eyebrow: data.eyebrow || DEFAULT_QUOTE_CTA.eyebrow,
        heading: data.heading || DEFAULT_QUOTE_CTA.heading,
        description: data.description || DEFAULT_QUOTE_CTA.description,
        phoneText: data.phoneText || DEFAULT_QUOTE_CTA.phoneText,
        emailLabel: data.emailLabel || DEFAULT_QUOTE_CTA.emailLabel,
        emailAddress: data.emailAddress || DEFAULT_QUOTE_CTA.emailAddress,
        brandLogoText: data.brandLogoText || DEFAULT_QUOTE_CTA.brandLogoText,
      };
    }
  } catch (error) {
    console.warn("Failed to fetch Quote CTA content from DB, using fallback defaults.", error);
  }
  return DEFAULT_QUOTE_CTA;
}










