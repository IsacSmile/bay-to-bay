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
    { stopNumber: "01", name: "North Bay", isStart: true, isEnd: false, order: 1, xPercent: 51.5, yPercent: 75.5 },
    { stopNumber: "02", name: "Kirkland Lake", isStart: false, isEnd: false, order: 2, xPercent: 58.0, yPercent: 62.5 },
    { stopNumber: "03", name: "Timmins", isStart: false, isEnd: false, order: 3, xPercent: 64.0, yPercent: 51.0 },
    { stopNumber: "04", name: "Cochrane", isStart: false, isEnd: false, order: 4, xPercent: 70.8, yPercent: 41.5 },
    { stopNumber: "05", name: "Kapuskasing", isStart: false, isEnd: false, order: 5, xPercent: 77.0, yPercent: 32.5 },
    { stopNumber: "06", name: "Hearst", isStart: false, isEnd: false, order: 6, xPercent: 84.8, yPercent: 21.5 },
    { stopNumber: "07", name: "Longlac", isStart: false, isEnd: true, order: 7, xPercent: 89.5, yPercent: 50.5 },
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
