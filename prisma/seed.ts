import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      announcementItems: [
        "NORTHERN ONTARIO ROUTES",
        "NORTH BAY TO HEARST",
        "TWICE-WEEKLY SERVICE OPTIONS",
      ],
    },
    create: {
      id: "default",
      siteName: "Bay to Bay Express Inc.",
      announcementItems: [
        "NORTHERN ONTARIO ROUTES",
        "NORTH BAY TO HEARST",
        "TWICE-WEEKLY SERVICE OPTIONS",
      ],
    },
  });

  // Contact Details
  await prisma.contactDetails.upsert({
    where: { id: "default" },
    update: {
      phone: "705-978-3001",
      email: "info@baytobayexpress.ca",
    },
    create: {
      id: "default",
      phone: "705-978-3001",
      email: "info@baytobayexpress.ca",
    },
  });

  // Hero Content
  await prisma.heroContent.upsert({
    where: { id: "default" },
    update: {
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
    },
    create: {
      id: "default",
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
    },
  });

  // Hero Route & Stops
  await prisma.heroRoute.upsert({
    where: { id: "default" },
    update: {
      label: "SPECIAL ROUTE",
      title: "North Bay → Hearst",
      duration: "12h",
      footerLead: "Scheduled with reliability.",
      footerDesc: "Ask about your route, recurring pickup, or dedicated run.",
    },
    create: {
      id: "default",
      label: "SPECIAL ROUTE",
      title: "North Bay → Hearst",
      duration: "12h",
      footerLead: "Scheduled with reliability.",
      footerDesc: "Ask about your route, recurring pickup, or dedicated run.",
    },
  });

  // Delete existing stops for clean seed
  await prisma.heroRouteStop.deleteMany({
    where: { routeId: "default" },
  });

  const stops = [
    { stopNumber: "01", name: "North Bay", isStart: true, isEnd: false, order: 1, xPercent: 24, yPercent: 88 },
    { stopNumber: "02", name: "Kirkland Lake", isStart: false, isEnd: false, order: 2, xPercent: 35, yPercent: 78 },
    { stopNumber: "03", name: "Timmins", isStart: false, isEnd: false, order: 3, xPercent: 46, yPercent: 68 },
    { stopNumber: "04", name: "Cochrane", isStart: false, isEnd: false, order: 4, xPercent: 55, yPercent: 58 },
    { stopNumber: "05", name: "Kapuskasing", isStart: false, isEnd: false, order: 5, xPercent: 65, yPercent: 46 },
    { stopNumber: "06", name: "Hearst", isStart: false, isEnd: true, order: 6, xPercent: 74, yPercent: 35 },
    { stopNumber: "07", name: "Longlac", isStart: false, isEnd: false, order: 7, xPercent: 85, yPercent: 26 },
  ];

  for (const stop of stops) {
    await prisma.heroRouteStop.create({
      data: {
        routeId: "default",
        stopNumber: stop.stopNumber,
        name: stop.name,
        isStart: stop.isStart,
        isEnd: stop.isEnd,
        order: stop.order,
        xPercent: stop.xPercent,
        yPercent: stop.yPercent,
      },
    });
  }

  // Service Area Content
  await prisma.serviceAreaContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "SERVICE AREA",
      headingPrimary: "Connecting Northern Ontario.",
      headingAccent: "Delivering what matters.",
      description:
        "Our route knowledge is regional by design. We connect communities across Northern Ontario with small-goods transportation, scheduled service, and delivery arrangements that work for local businesses.",
      cardTitle: "Local knowledge. Regional reach.",
      cardDescription: "North Bay to Hearst, with key stops in between.",
      badgeText: "Scheduled regional route",
    },
    create: {
      id: "default",
      eyebrow: "SERVICE AREA",
      headingPrimary: "Connecting Northern Ontario.",
      headingAccent: "Delivering what matters.",
      description:
        "Our route knowledge is regional by design. We connect communities across Northern Ontario with small-goods transportation, scheduled service, and delivery arrangements that work for local businesses.",
      cardTitle: "Local knowledge. Regional reach.",
      cardDescription: "North Bay to Hearst, with key stops in between.",
      badgeText: "Scheduled regional route",
    },
  });

  // Theme Settings
  await prisma.themeSettings.upsert({
    where: { id: "default" },
    update: {
      snowfallEnabled: true,
    },
    create: {
      id: "default",
      snowfallEnabled: true,
    },
  });

  // Services Section Content
  await prisma.servicesSectionContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "DELIVERY SOLUTIONS",
      headingPrimary: "Built around the way",
      headingAccent: "your business moves.",
      description:
        "From pharmacy supplies to legal documents, our focus is simple: dependable small-goods delivery that fits the route, the schedule, and the shipment requirements.",
    },
    create: {
      id: "default",
      eyebrow: "DELIVERY SOLUTIONS",
      headingPrimary: "Built around the way",
      headingAccent: "your business moves.",
      description:
        "From pharmacy supplies to legal documents, our focus is simple: dependable small-goods delivery that fits the route, the schedule, and the shipment requirements.",
    },
  });

  // Service Items (Delete and re-seed defaults)
  await prisma.serviceItem.deleteMany({});

  const defaultServices = [
    {
      title: "Medical & Pharmacy Supply Delivery",
      description:
        "Move pharmacy supplies, medical items, and small healthcare shipments where they need to go—subject to route and handling requirements.",
      icon: "activity",
      order: 1,
      isPriority: true,
    },
    {
      title: "Small Goods Delivery",
      description:
        "Focused transportation for parcels, supplies, retail items, and other manageable small shipments.",
      icon: "package",
      order: 2,
      isPriority: false,
    },
    {
      title: "Dedicated Delivery Services",
      description:
        "A direct delivery solution designed around your shipment, route, and preferred timing.",
      icon: "truck",
      order: 3,
      isPriority: false,
    },
    {
      title: "Scheduled Route Delivery",
      description:
        "Twice-weekly service options connecting key Northern Ontario communities on a dependable schedule.",
      icon: "calendar",
      order: 4,
      isPriority: false,
    },
    {
      title: "Recurring Business Deliveries",
      description:
        "Set up weekly, twice-weekly, monthly, or customized recurring pickups and drop-offs.",
      icon: "repeat",
      order: 5,
      isPriority: false,
    },
    {
      title: "Legal & Business Documents",
      description:
        "Professional movement of documents and small business materials between locations.",
      icon: "file-text",
      order: 6,
      isPriority: false,
    },
    {
      title: "Retail & Small-Goods Delivery",
      description:
        "Help your retail operation keep stock and small orders moving across the route.",
      icon: "store",
      order: 7,
      isPriority: false,
    },
    {
      title: "Business-to-Business Delivery",
      description:
        "Reliable regional transportation built around the way Northern Ontario businesses operate.",
      icon: "building-2",
      order: 8,
      isPriority: false,
    },
    {
      title: "Secure Business Transfers",
      description:
        "Discuss secure document, deposit, or small-goods transfers where the shipment and service requirements fit.",
      icon: "shield-check",
      order: 9,
      isPriority: false,
    },
    {
      title: "Custom & Special Shipment Requests",
      description:
        "Tailored transport arrangements for unique cargo size, handling, or timing constraints.",
      icon: "sparkles",
      order: 10,
      isPriority: false,
    },
  ];

  for (const item of defaultServices) {
    await prisma.serviceItem.create({
      data: item,
    });
  }

  // Business Solutions Content
  await (prisma as any).businessSolutionsContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "BUSINESS SOLUTIONS",
      headingPrimary: "More than a delivery.",
      headingAccent: "A logistics partner.",
      description:
        "Businesses need transportation they can count on. We provide scheduled and dedicated delivery solutions designed to help Northern Ontario businesses move small goods efficiently between communities.",
      briefText:
        "Choose a recurring route, direct run, or a custom arrangement that fits your locations.",
      ctaText: "Discuss your business needs",
    },
    create: {
      id: "default",
      eyebrow: "BUSINESS SOLUTIONS",
      headingPrimary: "More than a delivery.",
      headingAccent: "A logistics partner.",
      description:
        "Businesses need transportation they can count on. We provide scheduled and dedicated delivery solutions designed to help Northern Ontario businesses move small goods efficiently between communities.",
      briefText:
        "Choose a recurring route, direct run, or a custom arrangement that fits your locations.",
      ctaText: "Discuss your business needs",
    },
  });

  // Who We Serve Content
  await (prisma as any).whoWeServeContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "WHO WE SERVE",
      headingPrimary: "Built for",
      headingAccent: "Northern Ontario businesses.",
      description:
        "Need a recurring delivery route? Let's talk through the pickup, destination, frequency, and service requirements.",
      ctaText: "Request a business quote",
    },
    create: {
      id: "default",
      eyebrow: "WHO WE SERVE",
      headingPrimary: "Built for",
      headingAccent: "Northern Ontario businesses.",
      description:
        "Need a recurring delivery route? Let's talk through the pickup, destination, frequency, and service requirements.",
      ctaText: "Request a business quote",
    },
  });

  // Industry Tags (Delete and re-seed defaults)
  await (prisma as any).industryTag.deleteMany({});

  const defaultIndustryTags = [
    { label: "Healthcare Organizations", icon: "activity", order: 1 },
    { label: "Pharmacies", icon: "pill", order: 2 },
    { label: "Medical Clinics", icon: "shield-check", order: 3 },
    { label: "Law Firms", icon: "file-text", order: 4 },
    { label: "Financial Businesses", icon: "landmark", order: 5 },
    { label: "Retailers", icon: "store", order: 6 },
    { label: "Construction Companies", icon: "building", order: 7 },
    { label: "Manufacturers", icon: "package", order: 8 },
    { label: "Contractors", icon: "truck", order: 9 },
    { label: "Government Organizations", icon: "globe", order: 10 },
    { label: "Non-Profit Organizations", icon: "heart-handshake", order: 11 },
    { label: "Small Businesses", icon: "building-2", order: 12 },
    { label: "E-Commerce Businesses", icon: "sparkles", order: 13 },
  ];

  for (const tag of defaultIndustryTags) {
    await (prisma as any).industryTag.create({
      data: tag,
    });
  }

  // Why Us Content
  await (prisma as any).whyUsContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "WHY BAY TO BAY",
      headingPrimary: "A clearer way to",
      headingAccent: "move what matters.",
      tagline: "REGIONAL FOCUS · LOCAL KNOWLEDGE",
    },
    create: {
      id: "default",
      eyebrow: "WHY BAY TO BAY",
      headingPrimary: "A clearer way to",
      headingAccent: "move what matters.",
      tagline: "REGIONAL FOCUS · LOCAL KNOWLEDGE",
    },
  });

  // Reason Items (Delete and re-seed defaults)
  await (prisma as any).reasonItem.deleteMany({});

  const defaultReasons = [
    {
      title: "Northern Ontario focus",
      description: "We understand the communities and transportation needs of Northern Ontario.",
      icon: "building-2",
      order: 1,
    },
    {
      title: "Reliable service",
      description: "Professional delivery with clear communication and dependable scheduling.",
      icon: "shield-check",
      order: 2,
    },
    {
      title: "Dedicated delivery",
      description: "Direct delivery solutions for businesses that need consistency.",
      icon: "truck",
      order: 3,
    },
    {
      title: "Twice-weekly service",
      description: "Scheduled route options designed for recurring business needs.",
      icon: "calendar",
      order: 4,
    },
    {
      title: "Small goods focus",
      description: "Specialized around parcels, documents, supplies, and other small shipments.",
      icon: "package",
      order: 5,
    },
    {
      title: "Flexible solutions",
      description: "One-time, recurring, and customized delivery options.",
      icon: "sparkles",
      order: 6,
    },
  ];

  for (const item of defaultReasons) {
    await (prisma as any).reasonItem.create({
      data: item,
    });
  }

  console.log("Seeding finished successfully!");



}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
