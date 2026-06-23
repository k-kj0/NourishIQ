export const metadata = {
  title: "NourishIQ",
  description: "Your personalized meal planner",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
