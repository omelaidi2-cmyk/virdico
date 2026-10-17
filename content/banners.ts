import type { BannerCreative } from "@/design-system/components";

/**
 * Campagnes publicitaires (système BLASSA).
 * Chaque clic passe par /play/[slug]/ puis redirige vers `url` : un seul endroit pour suivre les clics.
 *
 * Ajouter une campagne :
 * 1. déposer le visuel dans public/banners/ (GIF animé → convertir en .webm + .mp4) ;
 * 2. l'ajouter ci-dessous ;
 * 3. l'affecter à un ou plusieurs emplacements dans `slots`.
 */
export const campaigns: Record<string, BannerCreative & { url: string }> = {
  // Bannières maison (style BLASSA) : à utiliser tant qu'un emplacement n'est pas vendu.
  "house-deals-wide": {
    slug: "house-deals-wide",
    alt: "Virdico — Exclusive SaaS deals, every Friday",
    url: "/deals/",
    media: { type: "image", src: "/banners/virdico-deals-728x146.svg", width: 728, height: 146 },
  },
  "house-deals-sky": {
    slug: "house-deals-sky",
    alt: "Virdico — Weekly SaaS deals, every Friday",
    url: "/deals/",
    media: { type: "image", src: "/banners/virdico-deals-160x600.svg", width: 160, height: 600 },
  },
  "house-deals-sticky": {
    slug: "house-deals-sticky",
    alt: "Virdico — SaaS deals every Friday",
    url: "/deals/",
    media: { type: "image", src: "/banners/virdico-deals-728x90.svg", width: 728, height: 90 },
    mobile: { type: "image", src: "/banners/virdico-deals-320x50.svg", width: 320, height: 50 },
  },
  // Exemple (désactivé tant qu'il n'est affecté à aucun emplacement) :
  // "tool-a-autumn": {
  //   slug: "tool-a-autumn",
  //   alt: "Tool A — 30% off the yearly Pro plan",
  //   url: "https://tool-a.example/?ref=virdico",
  //   media: { type: "image", src: "/banners/tool-a-728x146.webp", width: 728, height: 146 },
  // },
  // "tool-v-sticky": {
  //   slug: "tool-v-sticky",
  //   alt: "Tool V VPN — 68% off",
  //   url: "https://tool-v.example/?ref=virdico",
  //   media: { type: "video", webm: "/banners/tool-v-728x90.webm", mp4: "/banners/tool-v-728x90.mp4", width: 728, height: 90 },
  //   mobile: { type: "image", src: "/banners/tool-v-320x50.gif", width: 320, height: 50 },
  // },
};

/** Les 10 emplacements du site. null = emplacement vide (placeholder hachuré « // SPONSORED »). */
export type SlotId =
  | "homeWide"
  | "homeSky"
  | "homeFlow"
  | "homeMobileMid"
  | "categoryWide"
  | "categoryFlow"
  | "categoryMobileMid"
  | "articleBox"
  | "articleInline"
  | "sticky";

/** Affectation campagne → emplacement. Exemple : homeSky: "house-deals-sky" */
const assign: Record<SlotId, string | null> = {
  homeWide: null,
  homeSky: null,
  homeFlow: null,
  homeMobileMid: null,
  categoryWide: null,
  categoryFlow: null,
  categoryMobileMid: null,
  articleBox: null,
  articleInline: null,
  sticky: null,
};

export function slot(id: SlotId): BannerCreative | null {
  const slug = assign[id];
  return slug ? (campaigns[slug] ?? null) : null;
}
