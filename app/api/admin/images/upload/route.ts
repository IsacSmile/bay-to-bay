import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import sharp from "sharp";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const oldImageId = formData.get("oldImageId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Compress & resize image using Sharp
    let pipeline = sharp(inputBuffer).rotate();

    // Determine output format & quality based on mime type
    const originalType = file.type.toLowerCase();
    let outputMimeType = "image/jpeg";
    
    if (originalType.includes("png")) {
      // Keep PNG for transparency, but compress
      pipeline = pipeline.resize(1600, 1600, {
        fit: "inside",
        withoutEnlargement: true,
      }).png({ quality: 82, compressionLevel: 8 });
      outputMimeType = "image/png";
    } else if (originalType.includes("webp")) {
      pipeline = pipeline.resize(1600, 1600, {
        fit: "inside",
        withoutEnlargement: true,
      }).webp({ quality: 80 });
      outputMimeType = "image/webp";
    } else {
      // Default to JPEG with 80% quality
      pipeline = pipeline.resize(1600, 1600, {
        fit: "inside",
        withoutEnlargement: true,
      }).jpeg({ quality: 80, mozjpeg: true });
      outputMimeType = "image/jpeg";
    }

    const compressedBuffer = await pipeline.toBuffer();

    // Save image to Neon Postgres DB
    const newImage = await prisma.image.create({
      data: {
        filename: file.name || "upload.jpg",
        mimeType: outputMimeType,
        data: compressedBuffer,
        size: compressedBuffer.length,
      },
    });

    // Delete replaced old image record if provided
    if (oldImageId) {
      try {
        await prisma.image.delete({ where: { id: oldImageId } });
      } catch {
        // Ignore if old image was already deleted or not found in DB
      }
    }

    return NextResponse.json({
      id: newImage.id,
      url: `/api/images/${newImage.id}`,
      filename: newImage.filename,
      mimeType: newImage.mimeType,
      size: newImage.size,
      originalSize: inputBuffer.length,
    });
  } catch (error) {
    console.error("Failed to upload & process image:", error);
    return NextResponse.json(
      { error: "Image upload or processing failed" },
      { status: 500 }
    );
  }
}
