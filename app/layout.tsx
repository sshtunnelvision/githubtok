import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHubTok - Discover Trending Repositories",
  description:
    "Swipe through trending GitHub repositories to discover interesting projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <NavBar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
