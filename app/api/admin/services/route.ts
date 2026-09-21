import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, DEFAULT_SERVICES_ITEMS } from "@/lib/prisma";

// GET /api/admin/services - List all service items ordered by `order: asc`
export async function GET() {
  try {
    const services = await prisma.serviceItem.findMany({
      orderBy: { order: "asc" },
    });
    if (services && services.length > 0) {
      return NextResponse.json(services);
    }
    return NextResponse.json(DEFAULT_SERVICES_ITEMS);
  } catch (error) {
    console.warn("Failed to fetch services from DB, returning fallback default services.", error);
    return NextResponse.json(DEFAULT_SERVICES_ITEMS);
  }
}

// POST /api/admin/services - Create a new service item
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, icon, imageUrl, order, isPriority } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const count = await prisma.serviceItem.count();

    const newService = await (prisma.serviceItem as any).create({
      data: {
        title,
        description,
        icon: icon || "package",
        imageUrl: imageUrl || "",
        order: typeof order === "number" ? order : count + 1,
        isPriority: Boolean(isPriority),
      },
    });

    revalidatePath("/");
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Failed to create service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/services - Update an existing service or reorder multiple services
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Check if bulk reorder array is passed: { items: [{ id, order }, ...] }
    if (Array.isArray(body.items)) {
      const updates = body.items.map((item: { id: string; order: number }) =>
        prisma.serviceItem.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      );
      await prisma.$transaction(updates);
      revalidatePath("/");
      return NextResponse.json({ success: true });
    }

    // Single item update
    const { id, title, description, icon, imageUrl, order, isPriority } = body;
    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    if (imageUrl !== undefined) {
      const existing = await prisma.serviceItem.findUnique({ where: { id } });
      if (
        existing?.imageUrl &&
        existing.imageUrl.startsWith("/api/images/") &&
        existing.imageUrl !== imageUrl
      ) {
        const oldImageId = existing.imageUrl.split("/api/images/")[1];
        if (oldImageId) {
          await prisma.image.delete({ where: { id: oldImageId } }).catch(() => {});
        }
      }
    }

    const updatedService = await (prisma.serviceItem as any).update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(order !== undefined && { order: Number(order) }),
        ...(isPriority !== undefined && { isPriority: Boolean(isPriority) }),
      },
    });

    revalidatePath("/");
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Failed to update service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/services - Delete a service item by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const existing = await prisma.serviceItem.findUnique({ where: { id } });
    if (existing?.imageUrl && existing.imageUrl.startsWith("/api/images/")) {
      const imageId = existing.imageUrl.split("/api/images/")[1];
      if (imageId) {
        await prisma.image.delete({ where: { id: imageId } }).catch(() => {});
      }
    }

    await prisma.serviceItem.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
