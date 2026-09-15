import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/services/section - Fetch section header content
export async function GET() {
  try {
    const data = await prisma.servicesSectionContent.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json(data || {});
  } catch (error) {
    console.error("Failed to fetch section content:", error);
    return NextResponse.json(
      { error: "Failed to fetch section content" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/services/section - Update section header content
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { eyebrow, headingPrimary, headingAccent, description } = body;

    const updated = await prisma.servicesSectionContent.upsert({
      where: { id: "default" },
      update: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(headingPrimary !== undefined && { headingPrimary }),
        ...(headingAccent !== undefined && { headingAccent }),
        ...(description !== undefined && { description }),
      },
      create: {
        id: "default",
        eyebrow: eyebrow || "DELIVERY SOLUTIONS",
        headingPrimary: headingPrimary || "Built around the way",
        headingAccent: headingAccent || "your business moves.",
        description:
          description ||
          "From pharmacy supplies to legal documents, our focus is simple: dependable small-goods delivery that fits the route, the schedule, and the shipment requirements.",
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
