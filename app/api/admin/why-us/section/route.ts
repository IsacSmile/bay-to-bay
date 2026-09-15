import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/why-us/section - Fetch Why Us section content
export async function GET() {
  try {
    const data = await (prisma as any).whyUsContent.findUnique({
      where: { id: "default" },
    });

    if (!data) {
      return NextResponse.json({
        eyebrow: "WHY BAY TO BAY",
        headingPrimary: "A clearer way to",
        headingAccent: "move what matters.",
        tagline: "REGIONAL FOCUS · LOCAL KNOWLEDGE",
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch why us section content:", error);
    return NextResponse.json(
      { error: "Failed to fetch section content" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/why-us/section - Update Why Us section content
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { eyebrow, headingPrimary, headingAccent, tagline } = body;

    const updated = await (prisma as any).whyUsContent.upsert({
      where: { id: "default" },
      update: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(headingPrimary !== undefined && { headingPrimary }),
        ...(headingAccent !== undefined && { headingAccent }),
        ...(tagline !== undefined && { tagline }),
      },
      create: {
        id: "default",
        eyebrow: eyebrow || "WHY BAY TO BAY",
        headingPrimary: headingPrimary || "A clearer way to",
        headingAccent: headingAccent || "move what matters.",
        tagline: tagline || "REGIONAL FOCUS · LOCAL KNOWLEDGE",
      },
    });

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update why us section content:", error);
    return NextResponse.json(
      { error: "Failed to update section content" },
      { status: 500 }
    );
  }
}
