import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, DEFAULT_SERVICES_SECTION } from "@/lib/prisma";

// GET /api/admin/services/section - Fetch section header content
export async function GET() {
  try {
    const data = await prisma.servicesSectionContent.findUnique({
      where: { id: "default" },
    });
    if (!data) {
      return NextResponse.json(DEFAULT_SERVICES_SECTION);
    }
    const raw = data as unknown as Record<string, unknown>;
    return NextResponse.json({
      eyebrow: data.eyebrow || DEFAULT_SERVICES_SECTION.eyebrow,
      headingPrimary: data.headingPrimary || DEFAULT_SERVICES_SECTION.headingPrimary,
      headingAccent: data.headingAccent ?? DEFAULT_SERVICES_SECTION.headingAccent,
      description: data.description || DEFAULT_SERVICES_SECTION.description,
      ctaHeading: (raw.ctaHeading as string) || DEFAULT_SERVICES_SECTION.ctaHeading,
      ctaSubtext: (raw.ctaSubtext as string) || DEFAULT_SERVICES_SECTION.ctaSubtext,
      ctaButtonText: (raw.ctaButtonText as string) || DEFAULT_SERVICES_SECTION.ctaButtonText,
    });
  } catch (error) {
    console.warn("Failed to fetch section content from DB, returning default section content.", error);
    return NextResponse.json(DEFAULT_SERVICES_SECTION);
  }
}

// PUT /api/admin/services/section - Update section header content & bottom CTA banner
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      eyebrow,
      headingPrimary,
      headingAccent,
      description,
      ctaHeading,
      ctaSubtext,
      ctaButtonText,
    } = body;

    const updated = await (prisma.servicesSectionContent as any).upsert({
      where: { id: "default" },
      update: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(headingPrimary !== undefined && { headingPrimary }),
        ...(headingAccent !== undefined && { headingAccent }),
        ...(description !== undefined && { description }),
        ...(ctaHeading !== undefined && { ctaHeading }),
        ...(ctaSubtext !== undefined && { ctaSubtext }),
        ...(ctaButtonText !== undefined && { ctaButtonText }),
      },
      create: {
        id: "default",
        eyebrow: eyebrow || "OUR SERVICES",
        headingPrimary: headingPrimary || "Delivery services for",
        headingAccent: headingAccent || "your business",
        description:
          description ||
          "Reliable, flexible courier solutions to keep your business moving.",
        ctaHeading: ctaHeading || "Need regular deliveries?",
        ctaSubtext:
          ctaSubtext ||
          "Let's talk about a delivery solution that works for your business.",
        ctaButtonText: ctaButtonText || "Discuss Your Route",
      },
    });

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update section content:", error);
    return NextResponse.json(
      { error: "Failed to update section content" },
      { status: 500 }
    );
  }
}
