import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NourishIQ - Smart Meal Planning",
  description: "Personalized meal plans based on your preferences, health goals, and lifestyle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
