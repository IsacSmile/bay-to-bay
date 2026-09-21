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
      email: "baytobayexpress@gmail.com",
    },
    create: {
      id: "default",
      phone: "705-978-3001",
      email: "baytobayexpress@gmail.com",
    },
  });

  // Hero Content
  await prisma.heroContent.upsert({
    where: { id: "default" },
    update: {
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
    },
    create: {
      id: "default",
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
    },
  });

  // Regions Seeding
  const northernRegion = await (prisma as any).region.upsert({
    where: { slug: "northern-ontario" },
    update: {
      name: "Northern Ontario",
      status: "active",
      order: 1,
      description:
        "Our dedicated special route connecting North Bay to Hearst, including key Highway 11 corridor stops with guaranteed 12-hour delivery options twice weekly.",
    },
    create: {
      id: "reg-northern-ontario",
      name: "Northern Ontario",
      slug: "northern-ontario",
      status: "active",
      order: 1,
      description:
        "Our dedicated special route connecting North Bay to Hearst, including key Highway 11 corridor stops with guaranteed 12-hour delivery options twice weekly.",
    },
  });

  await (prisma as any).region.upsert({
    where: { slug: "gta-surrounding-areas" },
    update: {
      name: "GTA & Surrounding Areas",
      status: "coming_soon",
      order: 2,
      description:
        "Details coming soon. Express regional courier services expanding across Greater Toronto & Surrounding Areas.",
    },
    create: {
      id: "reg-gta",
      name: "GTA & Surrounding Areas",
      slug: "gta-surrounding-areas",
      status: "coming_soon",
      order: 2,
      description:
        "Details coming soon. Express regional courier services expanding across Greater Toronto & Surrounding Areas.",
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
    await (prisma as any).heroRouteStop.create({
      data: {
        routeId: "default",
        regionId: northernRegion.id,
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
      headingPrimary: "Connecting Regional Hubs.",
      headingAccent: "Delivering what matters.",
      description:
        "Our route knowledge is regional by design. We connect communities across Northern Ontario and expanding regions with small-goods transportation, scheduled service, and delivery arrangements built for local businesses.",
      cardTitle: "Local knowledge. Regional reach.",
      cardDescription: "North Bay to Hearst, with key Highway 11 corridor stops.",
      badgeText: "Scheduled regional route",
    },
    create: {
      id: "default",
      eyebrow: "SERVICE AREA",
      headingPrimary: "Connecting Regional Hubs.",
      headingAccent: "Delivering what matters.",
      description:
        "Our route knowledge is regional by design. We connect communities across Northern Ontario and expanding regions with small-goods transportation, scheduled service, and delivery arrangements built for local businesses.",
      cardTitle: "Local knowledge. Regional reach.",
      cardDescription: "North Bay to Hearst, with key Highway 11 corridor stops.",
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
  await (prisma as any).servicesSectionContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "OUR SERVICES",
      headingPrimary: "Delivery services for",
      headingAccent: "your business",
      description:
        "Reliable, flexible courier solutions to keep your business moving.",
      ctaHeading: "Need regular deliveries?",
      ctaSubtext: "Let's talk about a delivery solution that works for your business.",
      ctaButtonText: "Discuss Your Route",
    },
    create: {
      id: "default",
      eyebrow: "OUR SERVICES",
      headingPrimary: "Delivery services for",
      headingAccent: "your business",
      description:
        "Reliable, flexible courier solutions to keep your business moving.",
      ctaHeading: "Need regular deliveries?",
      ctaSubtext: "Let's talk about a delivery solution that works for your business.",
      ctaButtonText: "Discuss Your Route",
    },
  });

  // Service Items (Delete and re-seed defaults with image URLs)
  await prisma.serviceItem.deleteMany({});

  const defaultServices = [
    {
      title: "Medical & Pharmacy",
      description:
        "Time-sensitive delivery for clinics, pharmacies and healthcare providers. We get essential supplies where they need to be, safely and on time.",
      icon: "activity",
      imageUrl: "/services/medical-pharmacy.jpg",
      order: 1,
      isPriority: true,
    },
    {
      title: "Documents & Legal Papers",
      description:
        "Secure, reliable delivery of important documents, contracts and legal paperwork across the region.",
      icon: "file-text",
      imageUrl: "/services/documents.jpg",
      order: 2,
      isPriority: false,
    },
    {
      title: "Retail & Small Goods",
      description:
        "Fast, dependable delivery for online orders, retail stock and small business supplies. From one parcel to regular runs, we've got you covered.",
      icon: "store",
      imageUrl: "/services/retail-goods.jpg",
      order: 3,
      isPriority: false,
    },
    {
      title: "Dedicated & Scheduled Delivery",
      description:
        "Regular or on-demand runs for businesses that need a dependable delivery partner. A dedicated service tailored to your schedule and locations.",
      icon: "truck",
      imageUrl: "/services/delivery-van.jpg",
      order: 4,
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

  // 9. How It Works Content & Steps
  await (prisma as any).howItWorksContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "HOW IT WORKS",
      headingPrimary: "Simple.",
      headingAccent: "Reliable. Delivered.",
      description: "A straightforward process from first conversation to final drop-off.",
      ctaText: "Start your delivery →",
    },
    create: {
      id: "default",
      eyebrow: "HOW IT WORKS",
      headingPrimary: "Simple.",
      headingAccent: "Reliable. Delivered.",
      description: "A straightforward process from first conversation to final drop-off.",
      ctaText: "Start your delivery →",
    },
  });

  await (prisma as any).howItWorksStep.deleteMany({});

  const defaultSteps = [
    {
      title: "Request a quote",
      description: "Tell us what you need delivered.",
      order: 1,
    },
    {
      title: "Schedule",
      description: "We confirm the pickup, delivery, and service requirements.",
      order: 2,
    },
    {
      title: "Pickup",
      description: "Your shipment is collected according to the agreed schedule.",
      order: 3,
    },
    {
      title: "Delivery",
      description: "Your goods are delivered to the destination.",
      order: 4,
    },
  ];

  for (const step of defaultSteps) {
    await (prisma as any).howItWorksStep.create({
      data: step,
    });
  }

  // 10. Quote Form Content & Sample Quote Submissions
  await (prisma as any).quoteFormContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "REQUEST A QUOTE",
      headingPrimary: "Tell us the route.",
      headingAccent: "We'll help plan the run.",
      description: "Share a few details about your pickup, delivery, and shipment. We'll contact you to discuss the right service arrangement.",
      serviceNoteLead: "Service note:",
      serviceNoteText: "12-hour options and medical/pharmacy supply delivery are subject to route, pickup time, shipment, handling, and service requirements.",
      disclaimer: "No price calculator is shown. We'll review the route and shipment details with you directly.",
    },
    create: {
      id: "default",
      eyebrow: "REQUEST A QUOTE",
      headingPrimary: "Tell us the route.",
      headingAccent: "We'll help plan the run.",
      description: "Share a few details about your pickup, delivery, and shipment. We'll contact you to discuss the right service arrangement.",
      serviceNoteLead: "Service note:",
      serviceNoteText: "12-hour options and medical/pharmacy supply delivery are subject to route, pickup time, shipment, handling, and service requirements.",
      disclaimer: "No price calculator is shown. We'll review the route and shipment details with you directly.",
    },
  });

  const countQuotes = await (prisma as any).quoteRequest.count();
  if (countQuotes === 0) {
    await (prisma as any).quoteRequest.createMany({
      data: [
        {
          fullName: "Sarah Jenkins",
          companyName: "Northern Health Logistics",
          phone: "705-978-3001",
          email: "sjenkins@nhlogistics.ca",
          pickupLocation: "North Bay Regional Hospital",
          deliveryLocation: "Timmins District Hospital",
          preferredDate: "2026-09-20",
          frequency: "Twice weekly",
          packageCount: "4 boxes",
          approxWeight: "35 kg",
          typeOfGoods: "Medical Supplies & Diagnostic Samples",
          additionalInfo: "Requires temperature-controlled storage during transit.",
          status: "new",
        },
        {
          fullName: "Marc Tremblay",
          companyName: "Hearst Mining Equipment",
          phone: "705-372-1144",
          email: "mtremblay@hearstmining.ca",
          pickupLocation: "Kirkland Lake Branch",
          deliveryLocation: "Hearst Highway 11 Yard",
          preferredDate: "2026-09-22",
          frequency: "One time",
          packageCount: "2 pallets",
          approxWeight: "120 kg",
          typeOfGoods: "Replacement Machinery Parts",
          additionalInfo: "Tailgate drop-off needed at Hearst yard.",
          status: "contacted",
        },
      ],
    });
  }

  // 11. About Section Content & Tag Pills
  await (prisma as any).aboutContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "ABOUT BAY TO BAY",
      headingPrimary: "Local routes.",
      headingAccent: "Professional service.",
      description:
        "Bay to Bay Express Inc. is a Northern Ontario delivery and logistics company focused on reliable small-goods transportation and dedicated business delivery solutions. We connect communities across Northern Ontario through scheduled, recurring, and customized delivery services designed around the needs of local businesses and organizations.",
      quoteText: "Reliable. Dedicated. Delivered.",
      quoteDescription:
        "A clear promise about how we approach scheduled, dedicated, and small-goods delivery across Northern Ontario.",
      attribution: "BAY TO BAY EXPRESS INC.",
    },
    create: {
      id: "default",
      eyebrow: "ABOUT BAY TO BAY",
      headingPrimary: "Local routes.",
      headingAccent: "Professional service.",
      description:
        "Bay to Bay Express Inc. is a Northern Ontario delivery and logistics company focused on reliable small-goods transportation and dedicated business delivery solutions. We connect communities across Northern Ontario through scheduled, recurring, and customized delivery services designed around the needs of local businesses and organizations.",
      quoteText: "Reliable. Dedicated. Delivered.",
      quoteDescription:
        "A clear promise about how we approach scheduled, dedicated, and small-goods delivery across Northern Ontario.",
      attribution: "BAY TO BAY EXPRESS INC.",
    },
  });

  await (prisma as any).aboutTagPill.deleteMany({});

  const defaultAboutTags = [
    { label: "Local", order: 1 },
    { label: "Professional", order: 2 },
    { label: "Reliable", order: 3 },
    { label: "Flexible", order: 4 },
    { label: "Business-focused", order: 5 },
  ];

  for (const tag of defaultAboutTags) {
    await (prisma as any).aboutTagPill.create({
      data: tag,
    });
  }

  // 12. FAQ Section Content & Items
  await (prisma as any).faqContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "COMMON QUESTIONS",
      headingPrimary: "Good to know",
      headingAccent: "before you book.",
      description:
        "Clear details help us plan the right route and service arrangement for your shipment.",
    },
    create: {
      id: "default",
      eyebrow: "COMMON QUESTIONS",
      headingPrimary: "Good to know",
      headingAccent: "before you book.",
      description:
        "Clear details help us plan the right route and service arrangement for your shipment.",
    },
  });

  await (prisma as any).faqItem.deleteMany({});

  const defaultFaqItems = [
    {
      question: "What areas do you serve?",
      answer:
        "We currently focus on North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst and Longlac.",
      order: 1,
    },
    {
      question: "How often do you operate your routes?",
      answer:
        "Dedicated scheduled services are available twice weekly on applicable routes.",
      order: 2,
    },
    {
      question: "Do you provide small-goods delivery?",
      answer:
        "Yes. Small goods and business shipments are a primary focus of our service.",
      order: 3,
    },
    {
      question: "Do you provide recurring deliveries?",
      answer:
        "Yes. Businesses can discuss weekly, twice-weekly or customized recurring delivery arrangements.",
      order: 4,
    },
    {
      question: "Do you provide 12-hour delivery?",
      answer:
        "12-hour delivery options may be available depending on the route, pickup time, shipment and service requirements.",
      order: 5,
    },
    {
      question: "Do you provide dedicated deliveries?",
      answer:
        "Yes. Dedicated delivery solutions are available depending on the shipment and route.",
      order: 6,
    },
    {
      question: "How do I request a quote?",
      answer:
        "Complete the online quote form or contact Bay to Bay Express directly at 705-978-3001 or baytobayexpress@gmail.com.",
      order: 7,
    },
    {
      question: "Do you deliver medical or pharmacy supplies?",
      answer:
        "Medical and pharmacy-related deliveries may be available subject to shipment requirements, applicable regulations, handling requirements and service arrangements.",
      order: 8,
    },
    {
      question: "Can businesses establish recurring delivery services?",
      answer:
        "Yes. Contact us to discuss your route, frequency and delivery requirements.",
      order: 9,
    },
  ];

  for (const item of defaultFaqItems) {
    await (prisma as any).faqItem.create({
      data: item,
    });
  }

  // 13. Quote CTA Content
  await (prisma as any).quoteCtaContent.upsert({
    where: { id: "default" },
    update: {
      eyebrow: "LET'S MOVE YOUR BUSINESS FORWARD",
      heading: "Your route starts here.",
      description:
        "Call or email Bay to Bay Express to discuss a delivery, recurring route, or pharmacy supply shipment.",
      phoneText: "705-978-3001",
      emailLabel: "Email us",
      emailAddress: "baytobayexpress@gmail.com",
      brandLogoText: "Bay to Bay EXPRESS INC.",
    },
    create: {
      id: "default",
      eyebrow: "LET'S MOVE YOUR BUSINESS FORWARD",
      heading: "Your route starts here.",
      description:
        "Call or email Bay to Bay Express to discuss a delivery, recurring route, or pharmacy supply shipment.",
      phoneText: "705-978-3001",
      emailLabel: "Email us",
      emailAddress: "baytobayexpress@gmail.com",
      brandLogoText: "Bay to Bay EXPRESS INC.",
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

