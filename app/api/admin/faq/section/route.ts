import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, DEFAULT_FAQ_CONTENT } from "@/lib/prisma";

// GET /api/admin/faq/section - Fetch FAQ section content
export async function GET() {
  try {
    const data = await (prisma as any).faqContent.findUnique({
      where: { id: "default" },
    });

    if (!data) {
      return NextResponse.json(DEFAULT_FAQ_CONTENT);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.warn("Failed to fetch FAQ section content from DB, returning defaults:", error);
    return NextResponse.json(DEFAULT_FAQ_CONTENT);
  }
}

// PUT /api/admin/faq/section - Update FAQ section content
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { eyebrow, headingPrimary, headingAccent, description } = body;

    const updated = await (prisma as any).faqContent.upsert({
      where: { id: "default" },
      update: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(headingPrimary !== undefined && { headingPrimary }),
        ...(headingAccent !== undefined && { headingAccent }),
        ...(description !== undefined && { description }),
      },
      create: {
        id: "default",
        eyebrow: eyebrow || DEFAULT_FAQ_CONTENT.eyebrow,
        headingPrimary: headingPrimary || DEFAULT_FAQ_CONTENT.headingPrimary,
        headingAccent: headingAccent || DEFAULT_FAQ_CONTENT.headingAccent,
        description: description || DEFAULT_FAQ_CONTENT.description,
      },
    });

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update FAQ section content:", error);
    return NextResponse.json(
      { error: "Failed to update section content" },
      { status: 500 }
    );
  }
}
