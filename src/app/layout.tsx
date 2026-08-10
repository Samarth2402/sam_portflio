import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import AIChatbot from "@/components/AIChatbot";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samarth Solanki | AI / ML Engineer",
  description: "Portfolio of Samarth Solanki, AI / ML Engineer building intelligent systems and automation workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased dark bg-background text-text-primary`}>
      <body className="min-h-screen flex flex-col font-sans">
        <CustomCursor />
        {children}
        <AIChatbot />
      </body>
    </html>
  );
}
