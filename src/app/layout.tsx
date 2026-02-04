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
  title: "Premium Wireless Headphones | AudioPro",
  description: "Experience crystal-clear audio with 40-hour battery life, active noise cancellation, and premium comfort. Free UK delivery & 30-day returns.",
  keywords: ["wireless headphones", "noise cancellation", "premium audio", "bluetooth headphones"],
  openGraph: {
    title: "Premium Wireless Headphones | AudioPro",
    description: "Experience crystal-clear audio with active noise cancellation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
