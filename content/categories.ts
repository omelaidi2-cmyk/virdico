export interface Category {
  slug: string;
  name: string;
  /** Libellé court pour les chips des cartes */
  short: string;
  icon: "users" | "mail" | "board" | "spark" | "browser" | "shield" | "chart" | "server";
  description: string;
}

export const categories: Category[] = [
  { slug: "crm", name: "CRM & Sales", short: "CRM", icon: "users", description: "CRM and sales tools tested with real pipelines, from free plans to full sales suites." },
  { slug: "email-marketing", name: "Email Marketing", short: "Email", icon: "mail", description: "Email marketing platforms compared on deliverability, automation and real cost." },
  { slug: "project-management", name: "Project Management", short: "Projects", icon: "board", description: "Boards, timelines and automation tested by real teams." },
  { slug: "ai-tools", name: "AI Tools", short: "AI", icon: "spark", description: "AI writing, image and productivity tools tested on real tasks." },
  { slug: "website-builders", name: "Website Builders", short: "Builders", icon: "browser", description: "Website and store builders, from landing page to online shop." },
  { slug: "vpn", name: "VPN & Security", short: "VPN", icon: "shield", description: "VPNs and security tools tested for speed, privacy and price." },
  { slug: "accounting", name: "Accounting", short: "Accounting", icon: "chart", description: "Accounting and invoicing software for freelancers and small businesses." },
  { slug: "web-hosting", name: "Web Hosting", short: "Hosting", icon: "server", description: "Web hosting tested for speed, uptime and real prices after the promo ends." },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
