import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { baseUrl } from "@/app/sitemap";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Jonathan Li",
    template: "%s | Jonathan Li",
  },
  description:
    "Canadian AI researcher and web designer Jonathan here. From neural networks to life's big questions, I explore AI, physics, and entrepreneurship. Check out my blog, projects, and let's connect to ponder the universe together.",
  openGraph: {
    title: "Jonathan Li's Portfolio",
    description:
      "Canadian AI researcher and web designer Jonathan here. From neural networks to life's big questions, I explore AI, physics, and entrepreneurship. Check out my blog, projects, and let's connect to ponder the universe together.",
    url: baseUrl,
    siteName: "Jonathan Li's Portfolio",
    locale: "en_US",
    type: "website",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <Analytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
