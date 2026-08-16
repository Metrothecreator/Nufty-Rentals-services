import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nufty Rental Service | Canopy & Event Rentals in Port Harcourt",
    template: "%s | Nufty Rental Service",
  },
  description:
    "Nufty Rental Service provides premium canopy, tent and event rental services in Port Harcourt — weddings, corporate events, parties and celebrations. Get a quote on WhatsApp.",
  keywords: [
    "canopy rental Port Harcourt",
    "event canopy rental Port Harcourt",
    "tent rental Port Harcourt",
    "event rentals Port Harcourt",
    "wedding canopy rental Port Harcourt",
    "party canopy rental Port Harcourt",
    "event equipment rental Port Harcourt",
    "marquee tent Nigeria",
    "Nufty Rental Service",
    "event rental Rivers State",
  ],
  alternates: { canonical: "/" },
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
  openGraph: {
    title: "Nufty Rental Service | Canopy & Event Rentals in Port Harcourt",
    description:
      "Premium event canopy and rental services for unforgettable occasions in Port Harcourt. Get a quote on WhatsApp.",
    url: SITE_URL,
    siteName: "Nufty Rental Service",
    locale: "en_NG",
    type: "website",
    images: [{ url: "/sequences/canopy/frame_0120.jpg", width: 1600, height: 1000, alt: "A Nufty Rental Service canopy dressed for an event." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nufty Rental Service | Canopy & Event Rentals in Port Harcourt",
    description: "Premium event canopy and rental services in Port Harcourt. Get a quote on WhatsApp.",
    images: ["/sequences/canopy/frame_0120.jpg"],
  },
  icons: {
    icon: "/images/logo-nufty.png",
    apple: "/images/logo-nufty.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Nufty Rental Service",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo-nufty.png`,
      image: `${SITE_URL}/sequences/canopy/frame_0120.jpg`,
      telephone: "+2348033448671",
      sameAs: ["https://wa.me/2348033448671"],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Nufty Rental Service",
      image: `${SITE_URL}/sequences/canopy/frame_0120.jpg`,
      url: SITE_URL,
      telephone: ["+2348033448671", "+2348054782270"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "609 Ikwere Road, Rumuigbo",
        addressLocality: "Port Harcourt",
        addressRegion: "Rivers State",
        addressCountry: "NG",
      },
      areaServed: {
        "@type": "City",
        name: "Port Harcourt",
      },
      description:
        "Premium canopy, tent and event rental services in Port Harcourt — covering weddings, corporate events, parties and celebrations.",
      serviceType: [
        "Canopy Rental",
        "Tent Rental",
        "Event Setup & Décor",
        "Wedding Canopy",
        "Corporate Event Rental",
        "Party & Celebration Rental",
        "Event Equipment Rental",
      ],
          opens: "07:00",
          closes: "20:00",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
