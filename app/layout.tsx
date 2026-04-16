import type { Metadata } from "next";
import { Geist_Mono, Outfit, Sora } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aalgorix Academy | AI Education Platform",
  description: "A modern AI education platform with adaptive learning, AI-guided education, and immersive learning experiences for future-ready learners.",
  keywords: "AI education, adaptive learning, AI-guided courses, online learning platform, Aalgorix",
  openGraph: {
    title: "Aalgorix Academy | AI Education Platform",
    description: "Learn smarter with AI-guided education at Aalgorix Academy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${outfit.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
