import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Convert Prisma Bytes field (Buffer) to Uint8Array/Buffer response
    const imageBuffer = Buffer.from(image.data);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": image.mimeType || "image/jpeg",
        "Content-Length": image.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
        ETag: `"${image.id}"`,
      },
    });
  } catch (error) {
    console.error("Error serving image from DB:", error);
    return NextResponse.json(
      { error: "Failed to serve image" },
      { status: 500 }
    );
  }
}
