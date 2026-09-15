import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/how-it-works/section - Get section content
export async function GET() {
  try {
    const data = await (prisma as any).howItWorksContent.findUnique({
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

// PUT /api/admin/how-it-works/section - Update section content
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { eyebrow, headingPrimary, headingAccent, description, ctaText } = body;

    const updated = await (prisma as any).howItWorksContent.upsert({
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
        eyebrow: eyebrow || "HOW IT WORKS",
        headingPrimary: headingPrimary || "Simple.",
        headingAccent: headingAccent || "Reliable. Delivered.",
        description: description || "A straightforward process from first conversation to final drop-off.",
        ctaText: ctaText || "Start your delivery →",
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
