/**
 * Générateurs de données structurées (schema.org JSON-LD) pour Virdico.
 * Usage : <JsonLd data={[organization(site), website(site)]} />
 *
 * Règles :
 * - Le JSON-LD doit décrire ce qui est VISIBLE sur la page (même note, mêmes questions FAQ).
 * - Une page de test = Review d'un SoftwareApplication tiers : éligible aux étoiles dans Google.
 * - FAQPage n'affiche plus de résultat enrichi pour la plupart des sites depuis 2023 ;
 *   on le garde (sans risque, utile aux moteurs IA) mais sans en attendre d'étoiles.
 */

export interface Site {
  name: string;
  url: string; // "https://virdico.com" sans slash final
  logo: string;
  sameAs?: string[];
  language?: string;
}

const abs = (site: Site, path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

export function organization(site: Site) {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#org`,
    name: site.name,
    url: `${site.url}/`,
    logo: abs(site, site.logo),
    sameAs: site.sameAs,
  };
}

export function website(site: Site) {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    inLanguage: site.language ?? "en",
    publisher: { "@id": `${site.url}/#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbs(site: Site, items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: abs(site, item.path) })),
  };
}

export interface ReviewInput {
  path: string;
  title: string;
  published: string; // ISO
  modified: string; // ISO
  author: { name: string; path: string };
  tool: { name: string; category?: string; os?: string; price?: string; currency?: string };
  score: number;
  pros: string[];
  cons: string[];
}

export function review(site: Site, r: ReviewInput) {
  const list = (items: string[]) => ({
    "@type": "ItemList",
    itemListElement: items.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
  });
  return {
    "@type": "Review",
    name: r.title,
    url: abs(site, r.path),
    datePublished: r.published,
    dateModified: r.modified,
    author: { "@type": "Person", name: r.author.name, url: abs(site, r.author.path) },
    publisher: { "@id": `${site.url}/#org` },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: r.tool.name,
      applicationCategory: r.tool.category ?? "BusinessApplication",
      operatingSystem: r.tool.os ?? "Web",
      ...(r.tool.price && { offers: { "@type": "Offer", price: r.tool.price, priceCurrency: r.tool.currency ?? "USD" } }),
    },
    reviewRating: { "@type": "Rating", ratingValue: String(r.score), bestRating: "10", worstRating: "1" },
    positiveNotes: list(r.pros),
    negativeNotes: list(r.cons),
  };
}

export function faq(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
