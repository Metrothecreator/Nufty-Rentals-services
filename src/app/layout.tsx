import type { Metadata } from "next";
import type { ReactNode } from "react";
import QuoteProvider from "@/components/QuoteProvider";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cubix.build";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cubix | Construction & Architecture",
    template: "%s | Cubix",
  },
  description:
    "Cubix is a design-led construction and architecture company. From concept to handover, we deliver residential, commercial and interior projects with one accountable team.",
  keywords: [
    "construction company",
    "architecture firm",
    "residential construction",
    "commercial construction",
    "renovation",
    "interior fit-out",
    "project management",
    "Cubix",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cubix | Construction & Architecture",
    description:
      "Design-led construction and architecture. From concept to handover, we build spaces that last and inspire.",
    url: SITE_URL,
    siteName: "Cubix",
    type: "website",
    images: [{ url: "/seq/frame-05.jpg", width: 1600, height: 1000, alt: "A completed Cubix project at dusk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cubix | Construction & Architecture",
    description: "Design-led construction and architecture. Build the extraordinary.",
    images: ["/seq/frame-05.jpg"],
  },
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
