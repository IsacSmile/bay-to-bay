import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, slug, status, description, order } = body;

    const updatedRegion = await (prisma as any).region.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && {
          slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        }),
        ...(status !== undefined && { status }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    return NextResponse.json(updatedRegion);
  } catch (error) {
    console.error("PUT /api/admin/regions/[id] error:", error);
    return NextResponse.json({ error: "Failed to update region" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await (prisma as any).region.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/regions/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete region" }, { status: 500 });
  }
}
