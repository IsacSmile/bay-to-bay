import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

export interface QuoteNotificationData {
  id: string;
  fullName: string;
  companyName?: string | null;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  preferredDate: string;
  frequency: string;
  packageCount?: string | null;
  approxWeight?: string | null;
  typeOfGoods?: string | null;
  additionalInfo?: string | null;
  createdAt: Date | string;
}

/**
 * Sends an admin-only notification email when a new quote request is submitted.
 * MUST be called inside a non-blocking try/catch block so failures never affect customer experience.
 */
export async function sendQuoteNotification(quote: QuoteNotificationData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.includes("placeholder") || apiKey.trim() === "") {
    console.warn(
      "[Quote Notification Email]: RESEND_API_KEY is missing or contains placeholder. Email send skipped."
    );
    return;
  }

  const resend = new Resend(apiKey);

  // 1. Retrieve admin notification recipient email from DB settings
  let recipientEmail = "i.faiz.dev@gmail.com";
  try {
    const quoteContent = await (prisma as any).quoteFormContent.findUnique({
      where: { id: "default" },
      select: { notificationEmail: true },
    });

    if (quoteContent?.notificationEmail && quoteContent.notificationEmail.trim() !== "") {
      recipientEmail = quoteContent.notificationEmail.trim();
    }
  } catch (dbErr) {
    console.warn(
      "[Quote Notification Email]: Could not fetch notificationEmail from DB, using fallback:",
      recipientEmail,
      dbErr
    );
  }

  // 2. Build Admin Detail View URL
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const adminDetailUrl = `${baseUrl}/admin/quotes?id=${quote.id}`;

  const submittedDate = new Date(quote.createdAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Toronto",
  });

  // 3. Construct HTML Template
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request — ${escapeHtml(quote.fullName)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; color: #1e293b; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: #071A2E; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .header p { margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 24px; }
    .badge { display: inline-block; background-color: #eff6ff; color: #1d4ed8; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 16px; border: 1px solid #bfdbfe; }
    .field-group { margin-bottom: 20px; }
    .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; }
    .field-value { font-size: 15px; font-weight: 600; color: #0f172a; margin: 0; }
    .field-value-sub { font-size: 14px; font-weight: 400; color: #475569; margin-top: 2px; }
    .grid { display: table; width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .row { display: table-row; }
    .col { display: table-cell; width: 50%; padding-bottom: 16px; vertical-align: top; }
    .divider { border-top: 1px solid #e2e8f0; margin: 20px 0; }
    .notes-box { background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 12px 16px; border-radius: 4px; margin-top: 8px; }
    .notes-box p { margin: 0; font-size: 14px; color: #334155; white-space: pre-wrap; }
    .cta-button { display: inline-block; background-color: #0284c7; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 8px; margin-top: 20px; text-align: center; }
    .footer { background-color: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Quote Request</h1>
      <p>Submitted on ${submittedDate}</p>
    </div>

    <div class="content">
      <div class="badge">New Route Lead</div>

      <div class="field-group">
        <div class="field-label">Customer Name</div>
        <div class="field-value">${escapeHtml(quote.fullName)}</div>
        ${quote.companyName ? `<div class="field-value-sub">Company: ${escapeHtml(quote.companyName)}</div>` : '<div class="field-value-sub">Personal Shipment</div>'}
      </div>

      <div class="grid">
        <div class="row">
          <div class="col">
            <div class="field-label">Phone Number</div>
            <div class="field-value"><a href="tel:${escapeHtml(quote.phone)}" style="color:#0284c7; text-decoration:none;">${escapeHtml(quote.phone)}</a></div>
          </div>
          <div class="col">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${escapeHtml(quote.email)}" style="color:#0284c7; text-decoration:none;">${escapeHtml(quote.email)}</a></div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="grid">
        <div class="row">
          <div class="col">
            <div class="field-label">Pickup Location</div>
            <div class="field-value">${escapeHtml(quote.pickupLocation)}</div>
          </div>
          <div class="col">
            <div class="field-label">Delivery Location</div>
            <div class="field-value">${escapeHtml(quote.deliveryLocation)}</div>
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="row">
          <div class="col">
            <div class="field-label">Preferred Date</div>
            <div class="field-value">${escapeHtml(quote.preferredDate)}</div>
          </div>
          <div class="col">
            <div class="field-label">Frequency</div>
            <div class="field-value">${escapeHtml(quote.frequency)}</div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="grid">
        <div class="row">
          <div class="col">
            <div class="field-label">Number of Packages</div>
            <div class="field-value">${escapeHtml(quote.packageCount || "N/A")}</div>
          </div>
          <div class="col">
            <div class="field-label">Approximate Weight</div>
            <div class="field-value">${escapeHtml(quote.approxWeight || "N/A")}</div>
          </div>
        </div>
      </div>

      <div class="field-group">
        <div class="field-label">Type of Goods</div>
        <div class="field-value">${escapeHtml(quote.typeOfGoods || "N/A")}</div>
      </div>

      ${
        quote.additionalInfo
          ? `
      <div class="field-group">
        <div class="field-label">Additional Information</div>
        <div class="notes-box">
          <p>${escapeHtml(quote.additionalInfo)}</p>
        </div>
      </div>
      `
          : ""
      }

      <div style="text-align: center; margin-top: 28px;">
        <a href="${adminDetailUrl}" class="cta-button" target="_blank">View Quote in Admin Panel &rarr;</a>
      </div>
    </div>

    <div class="footer">
      Bay to Bay Express Inc. Admin Notification &bull; <a href="${adminDetailUrl}" style="color:#64748b;">${adminDetailUrl}</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  // 4. Construct Plain Text Version
  const textContent = `
NEW QUOTE REQUEST — ${quote.fullName}
Submitted: ${submittedDate}

CUSTOMER INFORMATION
- Full Name: ${quote.fullName}
- Company Name: ${quote.companyName || "N/A"}
- Phone: ${quote.phone}
- Email: ${quote.email}

ROUTE & SCHEDULE
- Pickup Location: ${quote.pickupLocation}
- Delivery Location: ${quote.deliveryLocation}
- Preferred Date: ${quote.preferredDate}
- Frequency: ${quote.frequency}

CARGO DETAILS
- Package Count: ${quote.packageCount || "N/A"}
- Approx Weight: ${quote.approxWeight || "N/A"}
- Type of Goods: ${quote.typeOfGoods || "N/A"}

ADDITIONAL INFORMATION
${quote.additionalInfo || "None provided"}

VIEW IN ADMIN PANEL:
${adminDetailUrl}
  `.trim();

  // 5. Send via Resend SDK
  try {
    const fromAddress = process.env.RESEND_FROM_EMAIL || "Bay to Bay Express <onboarding@resend.dev>";
    
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [recipientEmail],
      subject: `New Quote Request — ${quote.fullName}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error(
        "[Quote Notification Email Error]: Resend API returned error:",
        error
      );
    } else {
      console.log(
        `[Quote Notification Email Success]: Email dispatched to ${recipientEmail} (ID: ${data?.id})`
      );
    }
  } catch (err: any) {
    console.error(
      "[Quote Notification Email Exception]: Failed to send notification email:",
      err?.message || err
    );
  }
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
