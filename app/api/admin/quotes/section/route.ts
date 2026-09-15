import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/quotes/section - Get quote section content
export async function GET() {
  try {
    const data = await (prisma as any).quoteFormContent.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json(data || {});
  } catch (error) {
    console.error("Failed to fetch quote section content:", error);
    return NextResponse.json(
      { error: "Failed to fetch quote section content" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/quotes/section - Update quote section content
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      eyebrow,
      headingPrimary,
      headingAccent,
      description,
      serviceNoteLead,
      serviceNoteText,
      disclaimer,
    } = body;

    const updated = await (prisma as any).quoteFormContent.upsert({
      where: { id: "default" },
      update: {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(headingPrimary !== undefined && { headingPrimary }),
        ...(headingAccent !== undefined && { headingAccent }),
        ...(description !== undefined && { description }),
        ...(serviceNoteLead !== undefined && { serviceNoteLead }),
        ...(serviceNoteText !== undefined && { serviceNoteText }),
        ...(disclaimer !== undefined && { disclaimer }),
      },
      create: {
        id: "default",
        eyebrow: eyebrow || "REQUEST A QUOTE",
        headingPrimary: headingPrimary || "Tell us the route.",
        headingAccent: headingAccent || "We'll help plan the run.",
        description: description || "Share a few details about your pickup, delivery, and shipment. We'll contact you to discuss the right service arrangement.",
        serviceNoteLead: serviceNoteLead || "Service note:",
        serviceNoteText: serviceNoteText || "12-hour options and medical/pharmacy supply delivery are subject to route, pickup time, shipment, handling, and service requirements.",
        disclaimer: disclaimer || "No price calculator is shown. We'll review the route and shipment details with you directly.",
      },
    });

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update quote section content:", error);
    return NextResponse.json(
      { error: "Failed to update quote section content" },
      { status: 500 }
    );
  }
}
