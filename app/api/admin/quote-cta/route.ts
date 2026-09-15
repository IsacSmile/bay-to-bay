import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, DEFAULT_QUOTE_CTA } from "@/lib/prisma";

// GET /api/admin/quote-cta - Fetch Quote CTA content
export async function GET() {
  try {
    const data = await (prisma as any).quoteCtaContent.findUnique({
      where: { id: "default" },
    });

    if (!data) {
      return NextResponse.json(DEFAULT_QUOTE_CTA);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.warn("Failed to fetch Quote CTA content from DB, returning defaults:", error);
    return NextResponse.json(DEFAULT_QUOTE_CTA);
  }
}

// PUT /api/admin/quote-cta - Update Quote CTA content
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { eyebrow, heading, description, phoneText, emailLabel, emailAddress, brandLogoText } = body;

    const updated = await (prisma as any).quoteCtaContent.upsert({
      where: { id: "default" },
      update: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(heading !== undefined && { heading }),
        ...(description !== undefined && { description }),
        ...(phoneText !== undefined && { phoneText }),
        ...(emailLabel !== undefined && { emailLabel }),
        ...(emailAddress !== undefined && { emailAddress }),
        ...(brandLogoText !== undefined && { brandLogoText }),
      },
      create: {
        id: "default",
        eyebrow: eyebrow || DEFAULT_QUOTE_CTA.eyebrow,
        heading: heading || DEFAULT_QUOTE_CTA.heading,
        description: description || DEFAULT_QUOTE_CTA.description,
        phoneText: phoneText || DEFAULT_QUOTE_CTA.phoneText,
        emailLabel: emailLabel || DEFAULT_QUOTE_CTA.emailLabel,
        emailAddress: emailAddress || DEFAULT_QUOTE_CTA.emailAddress,
        brandLogoText: brandLogoText || DEFAULT_QUOTE_CTA.brandLogoText,
      },
    });

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update Quote CTA content:", error);
    return NextResponse.json(
      { error: "Failed to update Quote CTA content" },
      { status: 500 }
    );
  }
}
