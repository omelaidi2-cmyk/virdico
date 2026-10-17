import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { SITE_URL } from "@/content/site";
import "./globals.css";

// Police du site
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });

// Polices du design system bannières (chargées à la demande, sans préchargement)
const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-chakra", display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Virdico — Honest SaaS Reviews, Comparisons & Deals", template: "%s — Virdico" },
  description:
    "Virdico tests SaaS tools hands-on and compares them side by side — CRM, email marketing, AI, hosting and more — so you pick the right software, fast.",
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: { type: "website", siteName: "Virdico", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#04060d",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${chakra.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
