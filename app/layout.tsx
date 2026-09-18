import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://baytobayexpress.com"),
  title: {
    default: "Northern Ontario Courier & Delivery Services | Bay to Bay Express",
    template: "%s | Bay to Bay Express Inc.",
  },
  description:
    "Leading Northern Ontario courier providing small goods delivery, dedicated delivery, and scheduled routes connecting North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac. Medical & business courier solutions.",
  keywords: [
    "Northern Ontario courier",
    "North Bay courier",
    "Timmins courier",
    "Kirkland Lake delivery service",
    "Cochrane courier",
    "Kapuskasing courier",
    "Hearst courier",
    "Longlac courier",
    "Northern Ontario delivery service",
    "Small goods delivery Northern Ontario",
    "Dedicated delivery Northern Ontario",
    "Business courier Northern Ontario",
    "Scheduled delivery Northern Ontario",
    "Medical courier Northern Ontario",
    "Highway 11 courier corridor",
    "Bay to Bay Express Inc.",
  ],
  authors: [{ name: "Bay to Bay Express Inc.", url: "https://baytobayexpress.com" }],
  creator: "Bay to Bay Express Inc.",
  publisher: "Bay to Bay Express Inc.",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "https://baytobayexpress.com",
  },
  openGraph: {
    title: "Northern Ontario Courier & Delivery Services | Bay to Bay Express",
    description:
      "Dedicated and scheduled small goods courier connecting North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac.",
    url: "https://baytobayexpress.com",
    siteName: "Bay to Bay Express Inc.",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/bay-to-bay-logo.webp",
        width: 1200,
        height: 630,
        alt: "Bay to Bay Express Inc. Northern Ontario Courier Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northern Ontario Courier Services | Bay to Bay Express",
    description:
      "Scheduled & dedicated small goods delivery connecting North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst & Longlac.",
    images: ["/bay-to-bay-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${spaceGrotesk.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-screen bg-[#F6F9FC] text-[#12263A] antialiased flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
