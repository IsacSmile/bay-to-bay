import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, DEFAULT_ABOUT_CONTENT } from "@/lib/prisma";

// GET /api/admin/about/section - Fetch About section content
export async function GET() {
  try {
    const data = await (prisma as any).aboutContent.findUnique({
      where: { id: "default" },
    });

    if (!data) {
      return NextResponse.json(DEFAULT_ABOUT_CONTENT);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.warn("Failed to fetch About section content from DB, returning defaults:", error);
    return NextResponse.json(DEFAULT_ABOUT_CONTENT);
  }
}

// PUT /api/admin/about/section - Update About section content
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      eyebrow,
      headingPrimary,
      headingAccent,
      description,
      quoteText,
      quoteDescription,
      attribution,
    } = body;

    const updated = await (prisma as any).aboutContent.upsert({
      where: { id: "default" },
      update: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(headingPrimary !== undefined && { headingPrimary }),
        ...(headingAccent !== undefined && { headingAccent }),
        ...(description !== undefined && { description }),
        ...(quoteText !== undefined && { quoteText }),
        ...(quoteDescription !== undefined && { quoteDescription }),
        ...(attribution !== undefined && { attribution }),
      },
      create: {
        id: "default",
        eyebrow: eyebrow || DEFAULT_ABOUT_CONTENT.eyebrow,
        headingPrimary: headingPrimary || DEFAULT_ABOUT_CONTENT.headingPrimary,
        headingAccent: headingAccent || DEFAULT_ABOUT_CONTENT.headingAccent,
        description: description || DEFAULT_ABOUT_CONTENT.description,
        quoteText: quoteText || DEFAULT_ABOUT_CONTENT.quoteText,
        quoteDescription: quoteDescription || DEFAULT_ABOUT_CONTENT.quoteDescription,
        attribution: attribution || DEFAULT_ABOUT_CONTENT.attribution,
      },
    });

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update about section content:", error);
    return NextResponse.json(
      { error: "Failed to update section content" },
      { status: 500 }
    );
  }
}
