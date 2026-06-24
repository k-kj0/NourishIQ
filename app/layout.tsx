import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./AppContext";

export const metadata: Metadata = {
  title: "NourishIQ - Your Personalized Meal Planner",
  description: "Smart, personalized meal planning tailored to your diet, health goals, and lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
