import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NourishIQ - Smart Meal Planning",
  description: "Personalized meal plans based on your preferences, health goals, and lifestyle.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#22c55e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#fafaf8] text-gray-900 antialiased">{children}</body>
    </html>
  );
}
