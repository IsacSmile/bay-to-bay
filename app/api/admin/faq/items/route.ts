import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, DEFAULT_FAQ_ITEMS } from "@/lib/prisma";

// GET /api/admin/faq/items - List all FAQ items ordered by `order: asc`
export async function GET() {
  try {
    const items = await (prisma as any).faqItem.findMany({
      orderBy: { order: "asc" },
    });

    if (!items || items.length === 0) {
      return NextResponse.json(DEFAULT_FAQ_ITEMS);
    }

    return NextResponse.json(items);
  } catch (error) {
    console.warn("Failed to fetch FAQ items from DB, returning defaults:", error);
    return NextResponse.json(DEFAULT_FAQ_ITEMS);
  }
}

// POST /api/admin/faq/items - Create a new FAQ item
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer, order } = body;

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "FAQ Question is required" },
        { status: 400 }
      );
    }

    if (!answer || !answer.trim()) {
      return NextResponse.json(
        { error: "FAQ Answer is required" },
        { status: 400 }
      );
    }

    const count = await (prisma as any).faqItem.count();

    const newItem = await (prisma as any).faqItem.create({
      data: {
        question: question.trim(),
        answer: answer.trim(),
        order: typeof order === "number" ? order : count + 1,
      },
    });

    revalidatePath("/");
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Failed to create FAQ item:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ item" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/faq/items - Update an existing FAQ item or bulk reorder items
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Bulk reorder array check
    if (Array.isArray(body.items)) {
      const updates = body.items.map((item: { id: string; order: number }) =>
        (prisma as any).faqItem.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      );
      await prisma.$transaction(updates);
      revalidatePath("/");
      return NextResponse.json({ success: true });
    }

    // Single item update
    const { id, question, answer, order } = body;
    if (!id) {
      return NextResponse.json({ error: "FAQ item ID is required" }, { status: 400 });
    }

    const updated = await (prisma as any).faqItem.update({
      where: { id },
      data: {
        ...(question !== undefined && { question: question.trim() }),
        ...(answer !== undefined && { answer: answer.trim() }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update FAQ item:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ item" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/faq/items - Delete an FAQ item by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "FAQ item ID is required" }, { status: 400 });
    }

    await (prisma as any).faqItem.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete FAQ item:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ item" },
      { status: 500 }
    );
  }
}
