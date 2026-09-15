import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/industries - List all industry tags ordered by `order: asc`
export async function GET() {
  try {
    const tags = await (prisma as any).industryTag.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Failed to fetch industry tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch industry tags" },
      { status: 500 }
    );
  }
}

// POST /api/admin/industries - Create a new industry tag
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { label, icon, order } = body;

    if (!label) {
      return NextResponse.json(
        { error: "Tag label is required" },
        { status: 400 }
      );
    }

    const count = await (prisma as any).industryTag.count();

    const newTag = await (prisma as any).industryTag.create({
      data: {
        label,
        icon: icon || "building-2",
        order: typeof order === "number" ? order : count + 1,
      },
    });

    revalidatePath("/");
    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error("Failed to create industry tag:", error);
    return NextResponse.json(
      { error: "Failed to create industry tag" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/industries - Update an existing industry tag or reorder multiple tags
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Check if bulk reorder array is passed: { items: [{ id, order }, ...] }
    if (Array.isArray(body.items)) {
      const updates = body.items.map((item: { id: string; order: number }) =>
        (prisma as any).industryTag.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      );
      await prisma.$transaction(updates);
      revalidatePath("/");
      return NextResponse.json({ success: true });
    }

    // Single item update
    const { id, label, icon, order } = body;
    if (!id) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    const updatedTag = await (prisma as any).industryTag.update({
      where: { id },
      data: {
        ...(label !== undefined && { label }),
        ...(icon !== undefined && { icon }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    revalidatePath("/");
    return NextResponse.json(updatedTag);
  } catch (error) {
    console.error("Failed to update industry tag:", error);
    return NextResponse.json(
      { error: "Failed to update industry tag" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/industries - Delete an industry tag by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
    }

    await (prisma as any).industryTag.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete industry tag:", error);
    return NextResponse.json(
      { error: "Failed to delete industry tag" },
      { status: 500 }
    );
  }
}
