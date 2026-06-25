import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./AppContext";

export const metadata: Metadata = {
  title: "NourishIQ - Smart Meal Planning",
  description: "Personalized nutrition and meal planning powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
