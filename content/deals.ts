export interface Deal {
  category: string;
  value: string;
  suffix: string;
  description: string;
  /** Absent = « No code needed » */
  code?: string;
  expires: string;
  /** EDIT : lien d'affiliation */
  href: string;
}

// EDIT : uniquement de vraies offres, avec de vrais codes et de vraies dates
export const deals: Deal[] = [
  { category: "CRM", value: "30%", suffix: "off · Tool A", description: "On the yearly Pro plan, for new customers.", code: "VIRDICO30", expires: "Ends Oct 31, 2026", href: "#" },
  { category: "VPN", value: "68%", suffix: "off · Tool V", description: "2-year plan + 3 extra months free.", expires: "Limited time", href: "#" },
  { category: "Hosting", value: "$2.99", suffix: "/mo · Tool H", description: "Free domain for one year included.", code: "VIRDICO", expires: "Ends Nov 30, 2026", href: "#" },
  { category: "Email", value: "20%", suffix: "off · Tool E", description: "On any annual plan, first year only.", code: "VIRDICO20", expires: "Ends Dec 31, 2026", href: "#" },
  { category: "AI", value: "2 months", suffix: "free · Tool W", description: "When you choose yearly billing.", expires: "Limited time", href: "#" },
  { category: "Builders", value: "25%", suffix: "off · Tool S", description: "On the Business plan for new stores.", code: "VIRDICO25", expires: "Ends Nov 15, 2026", href: "#" },
];
