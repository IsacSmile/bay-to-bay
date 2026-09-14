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
  email: "info@baytobayexpress.ca",
};

export const DEFAULT_HERO: HeroData = {
  eyebrowLabel: "NORTHERN ONTARIO COURIER SERVICE",
  pillBadge: "HIGHWAY 11 CORRIDOR",
  headingLine1: "Reliable.",
  headingLine2: "Dedicated.",
  headingLine3Accent: "Delivered.",
  subtext: "Small goods delivery across Northern Ontario.",
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
  title: "North Bay → Longlac",
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
    { id: "6", stopNumber: "06", name: "Hearst", isStart: false, isEnd: false, order: 6, xPercent: 74, yPercent: 35 },
    { id: "7", stopNumber: "07", name: "Longlac", isStart: false, isEnd: true, order: 7, xPercent: 85, yPercent: 26 },
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
