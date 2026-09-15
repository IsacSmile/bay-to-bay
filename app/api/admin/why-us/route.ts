import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/why-us - List all reason items ordered by `order: asc`
export async function GET() {
  try {
    const items = await (prisma as any).reasonItem.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch reason items:", error);
    return NextResponse.json(
      { error: "Failed to fetch reason items" },
      { status: 500 }
    );
  }
}

// POST /api/admin/why-us - Create a new reason item
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, icon, order } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const count = await (prisma as any).reasonItem.count();

    const newItem = await (prisma as any).reasonItem.create({
      data: {
        title,
        description,
        icon: icon || "package",
        order: typeof order === "number" ? order : count + 1,
      },
    });

    revalidatePath("/");
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Failed to create reason item:", error);
    return NextResponse.json(
      { error: "Failed to create reason item" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/why-us - Update an existing reason item or reorder multiple items
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Bulk reorder array: { items: [{ id, order }, ...] }
    if (Array.isArray(body.items)) {
      const updates = body.items.map((item: { id: string; order: number }) =>
        (prisma as any).reasonItem.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      );
      await prisma.$transaction(updates);
      revalidatePath("/");
      return NextResponse.json({ success: true });
    }

    // Single item update
    const { id, title, description, icon, order } = body;
    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    const updatedItem = await (prisma as any).reasonItem.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    revalidatePath("/");
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Failed to update reason item:", error);
    return NextResponse.json(
      { error: "Failed to update reason item" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/why-us - Delete a reason item by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    await (prisma as any).reasonItem.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete reason item:", error);
    return NextResponse.json(
      { error: "Failed to delete reason item" },
      { status: 500 }
    );
  }
}
