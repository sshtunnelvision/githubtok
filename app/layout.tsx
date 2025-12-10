import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHubTok - Discover Trending GitHub Repositories | By Arek Halpern",
  description:
    "GitHubTok by Arek Halpern - A TikTok-style interface to swipe through trending GitHub repositories. Discover the hottest open source projects in a fun, engaging way.",
  keywords: [
    "Arek Halpern",
    "GitHubTok",
    "GitHub",
    "trending repositories",
    "open source",
    "developer tools",
    "GitHub discovery",
    "swipe interface",
  ],
  authors: [{ name: "Arek Halpern", url: "https://x.com/sshtunnelvision" }],
  creator: "Arek Halpern",
  publisher: "Arek Halpern",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "GitHubTok - Discover Trending Repositories | By Arek Halpern",
    description:
      "GitHubTok by Arek Halpern - Swipe through trending GitHub repositories like TikTok. Find your next favorite open source project.",
    siteName: "GitHubTok",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHubTok - Discover Trending Repositories | By Arek Halpern",
    description:
      "GitHubTok by Arek Halpern - Swipe through trending GitHub repositories like TikTok.",
    creator: "@sshtunnelvision",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
