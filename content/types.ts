import type { ComponentType } from "react";

export interface Rating {
  label: string;
  score: number;
}

export interface ReviewData {
  tool: string;
  /** EDIT : lien d'affiliation */
  affiliateUrl: string;
  verdictTitle: string;
  verdictSummary: string;
  ctaNote: string;
  ratings: Rating[];
  pros: string[];
  cons: string[];
  quickFacts: { label: string; value: string }[];
  alternatives: { name: string; score: number; href: string }[];
  deal?: { value: string; text: string; code?: string; href: string };
  /** Pour le JSON-LD SoftwareApplication */
  os?: string;
  price?: string;
}

export interface PostMeta {
  slug: string;
  /** review = test d'un outil · guide = « best of » / tutoriel · comparison = « A vs B » */
  type: "review" | "guide" | "comparison";
  title: string;
  /** Partie du titre affichée en dégradé dans l'en-tête */
  highlight?: string;
  description: string;
  excerpt: string;
  category: string;
  readingTime: string;
  published: string;
  updated: string;
  author: string;
  score?: number;
  badge?: string;
  featured?: boolean;
  trust?: string[];
  takeaways?: { label: string; text: string }[];
  /** Titres H2 du corps, dans l'ordre (le sommaire et les ancres en sont dérivés) */
  toc: string[];
  faq?: { question: string; answer: string }[];
  review?: ReviewData;
}

export interface Post {
  meta: PostMeta;
  Content: ComponentType;
}

export interface PageMeta {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  updated?: string;
}
