import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const regionId = params.id;
    const body = await req.json();
    const { stopNumber, name, isStart, isEnd, order, xPercent, yPercent } = body;

    if (!stopNumber || !name) {
      return NextResponse.json(
        { error: "stopNumber and name are required" },
        { status: 400 }
      );
    }

    const stop = await (prisma as any).heroRouteStop.create({
      data: {
        routeId: "default",
        regionId,
        stopNumber,
        name,
        isStart: !!isStart,
        isEnd: !!isEnd,
        order: Number(order) || 1,
        xPercent: typeof xPercent === "number" ? xPercent : 0,
        yPercent: typeof yPercent === "number" ? yPercent : 0,
      },
    });

    return NextResponse.json(stop, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/regions/[id]/stops error:", error);
    return NextResponse.json({ error: "Failed to create route stop" }, { status: 500 });
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
        ...(name !== undefined && { name }),
        ...(isStart !== undefined && { isStart }),
        ...(isEnd !== undefined && { isEnd }),
        ...(order !== undefined && { order: Number(order) }),
        ...(xPercent !== undefined && { xPercent: Number(xPercent) }),
        ...(yPercent !== undefined && { yPercent: Number(yPercent) }),
      },
    });

    return NextResponse.json(updatedStop);
  } catch (error) {
    console.error("PUT /api/admin/regions/[id]/stops error:", error);
    return NextResponse.json({ error: "Failed to update route stop" }, { status: 500 });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/regions/[id]/stops error:", error);
    return NextResponse.json({ error: "Failed to delete route stop" }, { status: 500 });
  }
}
