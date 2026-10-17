import type { NavItem } from "../components";

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
    { title: "Explore", links: [{ label: "Reviews", href: "/reviews/" }, { label: "Comparisons", href: "/comparisons/" }, { label: "Deals", href: "/deals/" }, { label: "Categories", href: "/categories/" }] },
    { title: "Popular", links: [{ label: "Best CRM", href: "/best-crm-software/" }, { label: "Best email marketing", href: "/best-email-marketing/" }, { label: "Best AI writing", href: "/best-ai-writing-tools/" }, { label: "Best VPN", href: "/best-vpn/" }] },
    { title: "Company", links: [{ label: "About us", href: "/about/" }, { label: "How we test", href: "/how-we-test/" }, { label: "Contact", href: "/contact/" }, { label: "Affiliate disclosure", href: "/affiliate-disclosure/" }] },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms of Use", href: "/terms/" },
    { label: "Disclosure", href: "/affiliate-disclosure/" },
  ],
  disclosure:
    "Virdico is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. This never changes our scores.",
};
