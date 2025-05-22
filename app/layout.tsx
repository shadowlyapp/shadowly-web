import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shadowly Player",
  description: "Sync YouTube transcript with video",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-black font-sans min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}