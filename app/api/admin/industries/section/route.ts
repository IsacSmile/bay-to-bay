import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/industries/section - Fetch Who We Serve section content
export async function GET() {
  try {
    const data = await (prisma as any).whoWeServeContent.findUnique({
      where: { id: "default" },
    });

    if (!data) {
      return NextResponse.json({
        eyebrow: "WHO WE SERVE",
        headingPrimary: "Built for",
        headingAccent: "Northern Ontario businesses.",
        description:
          "Need a recurring delivery route? Let's talk through the pickup, destination, frequency, and service requirements.",
        ctaText: "Request a business quote",
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch who we serve section content:", error);
    return NextResponse.json(
      { error: "Failed to fetch section content" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/industries/section - Update Who We Serve section content
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { eyebrow, headingPrimary, headingAccent, description, ctaText } = body;

    const updated = await (prisma as any).whoWeServeContent.upsert({
      where: { id: "default" },
      update: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(headingPrimary !== undefined && { headingPrimary }),
        ...(headingAccent !== undefined && { headingAccent }),
        ...(description !== undefined && { description }),
        ...(ctaText !== undefined && { ctaText }),
      },
      create: {
        id: "default",
        eyebrow: eyebrow || "WHO WE SERVE",
        headingPrimary: headingPrimary || "Built for",
        headingAccent: headingAccent || "Northern Ontario businesses.",
        description:
          description ||
          "Need a recurring delivery route? Let's talk through the pickup, destination, frequency, and service requirements.",
        ctaText: ctaText || "Request a business quote",
      },
    });

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update who we serve section content:", error);
    return NextResponse.json(
      { error: "Failed to update section content" },
      { status: 500 }
    );
  }
}
