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
    { stopNumber: "06", name: "Hearst", isStart: false, isEnd: false, order: 6, xPercent: 74, yPercent: 35 },
    { stopNumber: "07", name: "Longlac", isStart: false, isEnd: true, order: 7, xPercent: 85, yPercent: 26 },
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
