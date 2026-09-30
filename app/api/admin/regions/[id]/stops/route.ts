import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const regionId = params.id;
    const body = await req.json();
    const { name, isStart, isEnd, xPercent, yPercent } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Location / Community name is required" },
        { status: 400 }
      );
    }

    const currentCount = await (prisma as any).heroRouteStop.count({
      where: { regionId },
    });

    const nextOrder = body.order ? Number(body.order) : currentCount + 1;
    const stopNumber = body.stopNumber || String(nextOrder).padStart(2, "0");

    const stop = await (prisma as any).heroRouteStop.create({
      data: {
        routeId: "default",
        regionId,
        stopNumber,
        name: name.trim(),
        isStart: !!isStart,
        isEnd: !!isEnd,
        order: nextOrder,
        xPercent: typeof xPercent === "number" ? xPercent : 50,
        yPercent: typeof yPercent === "number" ? yPercent : 50,
      },
    });

    try {
      revalidatePath("/service-areas");
      revalidatePath("/");
      revalidatePath("/admin/regions");
    } catch (e) {}

    return NextResponse.json(stop, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/regions/[id]/stops error:", error);
    return NextResponse.json({ error: "Failed to create location / stop" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  _context: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { stopId, stopNumber, name, isStart, isEnd, order, xPercent, yPercent } = body;

    if (!stopId) {
      return NextResponse.json({ error: "stopId is required" }, { status: 400 });
    }

    const updatedStop = await (prisma as any).heroRouteStop.update({
      where: { id: stopId },
      data: {
        ...(stopNumber !== undefined && { stopNumber }),
        ...(name !== undefined && { name: name.trim() }),
        ...(isStart !== undefined && { isStart }),
        ...(isEnd !== undefined && { isEnd }),
        ...(order !== undefined && { order: Number(order) }),
        ...(xPercent !== undefined && { xPercent: Number(xPercent) }),
        ...(yPercent !== undefined && { yPercent: Number(yPercent) }),
      },
    });

    try {
      revalidatePath("/service-areas");
      revalidatePath("/");
      revalidatePath("/admin/regions");
    } catch (e) {}

    return NextResponse.json(updatedStop);
  } catch (error) {
    console.error("PUT /api/admin/regions/[id]/stops error:", error);
    return NextResponse.json({ error: "Failed to update location / stop" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  _context: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const stopId = searchParams.get("stopId");

    if (!stopId) {
      return NextResponse.json({ error: "stopId query param is required" }, { status: 400 });
    }

    await (prisma as any).heroRouteStop.delete({
      where: { id: stopId },
    });

    try {
      revalidatePath("/service-areas");
      revalidatePath("/");
      revalidatePath("/admin/regions");
    } catch (e) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/regions/[id]/stops error:", error);
    return NextResponse.json({ error: "Failed to delete location / stop" }, { status: 500 });
  }
}
