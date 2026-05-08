import type { Metadata } from "next";
import { Geist_Mono, Inter, Outfit, Playfair_Display, Sora } from "next/font/google";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aalgorix World Academy | AI Education Platform",
  description: "A modern AI education platform with adaptive learning, AI-guided education, and immersive learning experiences for future-ready learners.",
  keywords: "AI education, adaptive learning, AI-guided courses, online learning platform, Aalgorix",
  openGraph: {
    title: "Aalgorix World Academy | AI Education Platform",
    description: "Learn smarter with AI Avatar-aided education.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const saved = localStorage.getItem("aa_theme");
    // Default theme is ALWAYS light unless user explicitly toggles.
    const theme = saved === "dark" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();`,
          }}
        />
      </head>
      <body
        className={`${sora.variable} ${outfit.variable} ${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
