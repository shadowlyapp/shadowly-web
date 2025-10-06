import "./globals.css";
import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Shadowly Player",
  description: "Sync YouTube transcript with video",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-100 text-black font-sans min-h-screen overflow-x-hidden">
        <Analytics />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}