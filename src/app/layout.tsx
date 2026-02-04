import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "AETHER | Professional Grade Skincare, Simplified",
  description: "Experience professional-grade skincare with our complimentary 3-product anti-aging system. Clinically proven results in 7 days. Dermatologist tested, cruelty-free formulations.",
  keywords: ["anti-aging skincare", "professional skincare", "luxury skincare", "dermatologist tested", "complimentary skincare", "clinical skincare", "premium beauty"],
  openGraph: {
    title: "AETHER | Professional Grade Skincare, Simplified",
    description: "Complimentary experience set - Clinical-strength formulations for radiant, healthy skin",
    type: "website",
    siteName: "AETHER",
  },
  twitter: {
    card: "summary_large_image",
    title: "AETHER | Professional Grade Skincare",
    description: "Complimentary experience set - Clinical-strength formulations",
  },
  other: {
    "theme-color": "#A8B5A0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <meta name="theme-color" content="#A8B5A0" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
