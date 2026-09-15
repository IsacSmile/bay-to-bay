import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/how-it-works - List all steps ordered by `order: asc`
export async function GET() {
  try {
    const items = await (prisma as any).howItWorksStep.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch how it works steps:", error);
    return NextResponse.json(
      { error: "Failed to fetch how it works steps" },
      { status: 500 }
    );
  }
}

// POST /api/admin/how-it-works - Create a new step
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, order } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const count = await (prisma as any).howItWorksStep.count();

    const newItem = await (prisma as any).howItWorksStep.create({
      data: {
        title,
        description,
        order: typeof order === "number" ? order : count + 1,
      },
    });

    revalidatePath("/");
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Failed to create step:", error);
    return NextResponse.json(
      { error: "Failed to create step" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/how-it-works - Update an existing step or reorder multiple steps
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Bulk reorder array: { items: [{ id, order }, ...] }
    if (Array.isArray(body.items)) {
      const updates = body.items.map((item: { id: string; order: number }) =>
        (prisma as any).howItWorksStep.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      );
      await prisma.$transaction(updates);
      revalidatePath("/");
      return NextResponse.json({ success: true });
    }

    // Single item update
    const { id, title, description, order } = body;
    if (!id) {
      return NextResponse.json({ error: "Step ID is required" }, { status: 400 });
    }

    const updatedItem = await (prisma as any).howItWorksStep.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    revalidatePath("/");
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Failed to update step:", error);
    return NextResponse.json(
      { error: "Failed to update step" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/how-it-works - Delete a step by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Step ID is required" }, { status: 400 });
    }

    await (prisma as any).howItWorksStep.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete step:", error);
    return NextResponse.json(
      { error: "Failed to delete step" },
      { status: 500 }
    );
  }
}
