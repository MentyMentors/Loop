import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Menty Game Lounge",
  description:
    "A public game hub and a members-only engineering community feed for Menty.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
