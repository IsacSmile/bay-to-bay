import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const regions = await (prisma as any).region.findMany({
      orderBy: { order: "asc" },
      include: {
        stops: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json(regions);
  } catch (error) {
    console.error("GET /api/admin/regions error:", error);
    return NextResponse.json({ error: "Failed to fetch regions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, status, description, order } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const region = await (prisma as any).region.create({
      data: {
        name,
        slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        status: status || "coming_soon",
        description: description || null,
        order: typeof order === "number" ? order : 0,
      },
    });

    return NextResponse.json(region, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/regions error:", error);
    return NextResponse.json({ error: "Failed to create region" }, { status: 500 });
  }
}
