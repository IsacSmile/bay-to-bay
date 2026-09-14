import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Bay to Bay Express Inc. | Northern Ontario Courier Service",
  description:
    "Dedicated and scheduled courier delivery solutions connecting North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, and Longlac.",
  keywords: [
    "Northern Ontario Courier",
    "North Bay to Hearst",
    "Highway 11 Courier",
    "Small goods delivery",
  ],
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
