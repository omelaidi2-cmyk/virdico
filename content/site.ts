import type { NavItem } from "@/design-system/components";
import type { Site } from "@/design-system/lib/seo";

/** URL publique du site (sans slash final). En local : NEXT_PUBLIC_SITE_URL=http://localhost:3000 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://virdico.com").replace(/\/$/, "");

export const site: Site = {
  name: "Virdico",
  url: SITE_URL,
  logo: "/logo.svg",
  language: "en",
  // EDIT : vrais profils sociaux
  sameAs: ["https://x.com/virdico", "https://www.facebook.com/virdico", "https://www.linkedin.com/company/virdico"],
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Comparisons", href: "/comparisons/" },
  { label: "Categories", href: "/categories/" },
  { label: "Deals", href: "/deals/" },
];

export const footer = {
  tagline: "Independent SaaS reviews and comparisons to help you choose software with confidence.",
  social: [
    { network: "x" as const, href: "https://x.com/virdico", label: "Virdico on X" },
    { network: "facebook" as const, href: "https://www.facebook.com/virdico", label: "Virdico on Facebook" },
    { network: "linkedin" as const, href: "https://www.linkedin.com/company/virdico", label: "Virdico on LinkedIn" },
  ],
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Reviews", href: "/reviews/" },
        { label: "Comparisons", href: "/comparisons/" },
        { label: "Deals", href: "/deals/" },
        { label: "Categories", href: "/categories/" },
      ],
    },
    {
      title: "Popular",
      links: [
        { label: "Best CRM", href: "/best-crm-software/" },
        { label: "Best email marketing", href: "/best-email-marketing/" },
        { label: "Best AI writing", href: "/best-ai-writing-tools/" },
        { label: "Best VPN", href: "/best-vpn/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about/" },
        { label: "How we test", href: "/how-we-test/" },
        { label: "Advertise", href: "/advertise/" },
        { label: "Contact", href: "/contact/" },
      ],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms of Use", href: "/terms/" },
    { label: "Disclosure", href: "/affiliate-disclosure/" },
  ],
  disclosure:
    "Virdico is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. This never changes our scores.",
};

/** Format des dates affichées : « Oct 15, 2026 » */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}
