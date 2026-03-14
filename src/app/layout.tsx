import "./globals.css";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zentaanacanis.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zentaana Canis | FCI 19/25",
    template: "%s | Zentaana Canis",
  },
  description: "FCI registered dog breeding kennel — Uzgajivačnica pasa",
  keywords: [
    "dog breeder",
    "FCI",
    "kennel",
    "uzgajivačnica",
    "psi",
    "Zentaana Canis",
    "Croatia",
  ],
  authors: [{ name: "Zentaana Canis" }],
  openGraph: {
    type: "website",
    locale: "hr_HR",
    alternateLocale: "en_US",
    siteName: "Zentaana Canis",
    title: "Zentaana Canis | FCI 19/25",
    description: "FCI registered dog breeding kennel",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/images/zc_logo2.png`,
        width: 1200,
        height: 630,
        alt: "Zentaana Canis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentaana Canis | FCI 19/25",
    description: "FCI registered dog breeding kennel",
    images: [`${siteUrl}/images/zc_logo2.png`],
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
  return children;
}
