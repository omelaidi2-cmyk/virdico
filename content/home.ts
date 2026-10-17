import type { ComparisonRow } from "@/design-system/components/home/comparison-table";
import type { HeroStat } from "@/design-system/components/site/hero";

// EDIT : vrais chiffres
export const heroStats: HeroStat[] = [
  { value: 4.9, decimals: 1, label: "Reader rating" },
  { value: 320, suffix: "+", label: "Tools tested" },
  { value: 15, suffix: "k", label: "Monthly readers" },
];

export const announcement = { badge: "NEW", text: "2026 guide to the best CRM tools", href: "/best-crm-software/" };

export const popular = [
  { label: "CRM", href: "/best-crm-software/" },
  { label: "VPN", href: "/best-vpn/" },
  { label: "AI writing", href: "/best-ai-writing-tools/" },
  { label: "Hosting", href: "/best-web-hosting/" },
];

export const topics = ["CRM", "Email Marketing", "Project Management", "Website Builders", "VPN", "AI Writing", "Accounting", "Web Hosting"];

// EDIT : liens d'affiliation
export const crmComparison: ComparisonRow[] = [
  { tool: "ToolName", label: "★ Top pick", bestFor: "Small teams", score: 9.2, freePlan: { available: true, label: "Yes" }, startsAt: "$15/mo", href: "#", top: true },
  { tool: "Tool B", label: "Best features", bestFor: "Growing sales teams", score: 8.8, freePlan: { available: false, label: "14-day trial" }, startsAt: "$29/mo", href: "#" },
  { tool: "Tool C", label: "Best budget", bestFor: "Freelancers", score: 8.1, freePlan: { available: true, label: "Yes" }, startsAt: "$9/mo", href: "#" },
];

export const testSteps = [
  { title: "We sign up", text: "We create a real account and use the paid plan, like you would." },
  { title: "We use it for weeks", text: "Real projects, real data, for at least 14 days per tool." },
  { title: "We score it", text: "Ease of use, features, value and support — the same grid for every tool." },
  { title: "We update it", text: "Prices and features change. We re-check every review regularly." },
];
