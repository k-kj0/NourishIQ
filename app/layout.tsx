export const metadata = {
  title: "NourishIQ",
  description: "Your personalized meal planner",
};

import { AppProvider } from "./AppContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
