import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { QuoteFormSchema } from "@/lib/schemas/quote";
import { sendQuoteNotification } from "@/lib/email";

// Simple in-memory rate-limiter map: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps outside the current 10-minute window
  const validTimestamps = timestamps.filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: Request) {
  try {
    // 1. Basic IP rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please try again later or call us directly." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot Bot Protection: if honeypot field is filled, pretend to succeed silently
    if (body.website_hp && String(body.website_hp).trim() !== "") {
      console.warn("Honeypot triggered by bot submission, silently ignoring.");
      return NextResponse.json({ success: true });
    }

    // 3. Server-side Zod validation
    const validationResult = QuoteFormSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });

      return NextResponse.json(
        { error: "Please fix the validation errors below.", fieldErrors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 4. Prisma Database Insertion
    const newQuote = await (prisma as any).quoteRequest.create({
      data: {
        fullName: data.fullName,
        companyName: data.companyName || null,
        phone: data.phone,
        email: data.email,
        pickupLocation: data.pickupLocation,
        deliveryLocation: data.deliveryLocation,
        preferredDate: data.preferredDate,
        frequency: data.frequency,
        packageCount: data.packageCount || null,
        approxWeight: data.approxWeight || null,
        typeOfGoods: data.typeOfGoods || null,
        additionalInfo: data.additionalInfo || null,
        status: "new",
      },
    });

    // 5. Best-effort Admin Email Notification (non-blocking, never fails customer response)
    try {
      await sendQuoteNotification(newQuote);
    } catch (emailErr) {
      console.error("[Quote API]: Non-fatal error in sendQuoteNotification:", emailErr);
    }

    return NextResponse.json({ success: true, id: newQuote.id }, { status: 201 });
  } catch (error: any) {
    console.error(
      "[Quote API Error]: Failed to submit quote request.",
      "Error Message:", error?.message || error,
      "Code:", error?.code,
      "Stack:", error?.stack
    );
    return NextResponse.json(
      { error: "Failed to process quote request. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
