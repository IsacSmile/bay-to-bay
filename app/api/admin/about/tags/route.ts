import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, DEFAULT_ABOUT_TAG_PILLS } from "@/lib/prisma";

// GET /api/admin/about/tags - List all tag pills ordered by `order: asc`
export async function GET() {
  try {
    const tags = await (prisma as any).aboutTagPill.findMany({
      orderBy: { order: "asc" },
    });

    if (!tags || tags.length === 0) {
      return NextResponse.json(DEFAULT_ABOUT_TAG_PILLS);
    }

    return NextResponse.json(tags);
  } catch (error) {
    console.warn("Failed to fetch About tag pills from DB, returning defaults:", error);
    return NextResponse.json(DEFAULT_ABOUT_TAG_PILLS);
  }
}

// POST /api/admin/about/tags - Create a new tag pill
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { label, order } = body;

    if (!label || !label.trim()) {
      return NextResponse.json(
        { error: "Tag label is required" },
        { status: 400 }
      );
    }

    const count = await (prisma as any).aboutTagPill.count();

    const newTag = await (prisma as any).aboutTagPill.create({
      data: {
        label: label.trim(),
        order: typeof order === "number" ? order : count + 1,
      },
    });

    revalidatePath("/");
    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error("Failed to create about tag pill:", error);
    return NextResponse.json(
      { error: "Failed to create tag pill" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/about/tags - Update an existing tag pill or bulk reorder tags
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Check if bulk reorder array is passed: { items: [{ id, order }, ...] }
    if (Array.isArray(body.items)) {
      const updates = body.items.map((item: { id: string; order: number }) =>
        (prisma as any).aboutTagPill.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      );
      await prisma.$transaction(updates);
      revalidatePath("/");
      return NextResponse.json({ success: true });
    }

    // Single item update
    const { id, label, order } = body;
    if (!id) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    const updatedTag = await (prisma as any).aboutTagPill.update({
      where: { id },
      data: {
        ...(label !== undefined && { label: label.trim() }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    revalidatePath("/");
    return NextResponse.json(updatedTag);
  } catch (error) {
    console.error("Failed to update about tag pill:", error);
    return NextResponse.json(
      { error: "Failed to update tag pill" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/about/tags - Delete a tag pill by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    await (prisma as any).aboutTagPill.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete about tag pill:", error);
    return NextResponse.json(
      { error: "Failed to delete tag pill" },
      { status: 500 }
    );
  }
}
