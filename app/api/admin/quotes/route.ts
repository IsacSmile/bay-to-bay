import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/quotes - List all quote requests, ordered by `createdAt: desc`
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where = status && status !== "all" ? { status } : {};

    const quotes = await (prisma as any).quoteRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Failed to fetch quote requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch quote requests" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/quotes - Update status of a quote request ("new", "contacted", "archived")
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Quote ID and status are required" },
        { status: 400 }
      );
    }

    const updated = await (prisma as any).quoteRequest.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/quotes");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update quote status:", error);
    return NextResponse.json(
      { error: "Failed to update quote status" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/quotes - Delete a quote request by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Quote ID is required" }, { status: 400 });
    }

    await (prisma as any).quoteRequest.delete({
      where: { id },
    });

    revalidatePath("/admin/quotes");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete quote request:", error);
    return NextResponse.json(
      { error: "Failed to delete quote request" },
      { status: 500 }
    );
  }
}
