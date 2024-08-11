import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "TFT Leaderboard",
  description: "A leaderboard for TFT players",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-cover bg-no-repeat bg-tft-set-12">{children}</body>
      </html>
    </ClerkProvider>
  );
}
