/** Un visuel : image (png, jpg, webp, gif) ou vidéo (GIF converti en .webm + .mp4). */
export type BannerMedia =
  | { type: "image"; src: string; width: number; height: number }
  | { type: "video"; webm: string; mp4: string; poster?: string; width: number; height: number };

export interface BannerCreative {
  /** Identifiant de la campagne : le clic passe par /play/[slug] */
  slug: string;
  /** Texte alternatif (ce que dit la bannière) */
  alt: string;
  /** Visuel principal */
  media: BannerMedia;
  /** Visuel mobile (< 900px), pour le sticky 320×50 par exemple */
  mobile?: BannerMedia;
}

export type BannerSize = "wide" | "sky" | "box" | "flow" | "inline" | "mobile-mid";
