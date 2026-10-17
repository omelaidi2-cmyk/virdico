import { cn } from "../../lib/cn";
import type { BannerCreative, BannerMedia, BannerSize } from "./types";

/** Classe de l'emplacement et dimensions annoncées dans le placeholder. */
const SLOTS: Record<BannerSize, { className: string; size: string }> = {
  wide: { className: "blassa-wide", size: "728 × 146" },
  sky: { className: "blassa-sky", size: "160 × 600" },
  box: { className: "blassa-box", size: "100% × 260" },
  flow: { className: "blassa-flow", size: "100% × 130" },
  inline: { className: "rg-inline-promo", size: "100% × 130" },
  "mobile-mid": { className: "mobile-mid-promo", size: "320 × 100" },
};

export function Media({ media, className }: { media: BannerMedia; className?: string }) {
  if (media.type === "image") {
    // Les visuels publicitaires sont servis tels quels (pixel-perfect, GIF compris).
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={media.src} width={media.width} height={media.height} alt="" loading="lazy" decoding="async" className={className} />;
  }
  return (
    <video autoPlay muted loop playsInline preload="metadata" poster={media.poster} width={media.width} height={media.height} className={className}>
      <source src={media.webm} type="video/webm" />
      <source src={media.mp4} type="video/mp4" />
    </video>
  );
}

/** Contenu d'un emplacement : visuel cliquable si rempli, placeholder hachuré sinon. */
export function BannerBody({
  creative,
  size,
  advertiseHref = "/advertise/",
  compact = false,
}: {
  creative?: BannerCreative | null;
  size: string;
  advertiseHref?: string;
  compact?: boolean;
}) {
  if (!creative) {
    return (
      <div className="blassa blassa-empty">
        <span className="blassa-empty__tag">// SPONSORED</span>
        <span className="blassa-empty__title">{compact ? "Advertise here" : "Your brand here"}</span>
        <span className="blassa-empty__size">{size}</span>
        <a href={advertiseHref} className="blassa-empty__cta">
          Advertise with us →
        </a>
      </div>
    );
  }

  return (
    <a href={`/play/${creative.slug}/`} rel="sponsored nofollow" aria-label={`Sponsored: ${creative.alt}`} className="blassa blassa-media">
      <Media media={creative.media} className={creative.mobile ? "blassa-desktop" : undefined} />
      {creative.mobile && <Media media={creative.mobile} className="blassa-mobile" />}
    </a>
  );
}

export interface BannerProps {
  size: BannerSize;
  /** null ou absent = emplacement vide (placeholder visible) */
  creative?: BannerCreative | null;
  className?: string;
}

/**
 * Emplacement publicitaire réutilisable : <Banner size="wide" creative={banners.homeWide} />.
 * Formats : wide 728×146 · sky 160×600 · box 100%×260 · flow / inline 100%×130 · mobile-mid.
 */
export function Banner({ size, creative, className }: BannerProps) {
  const slot = SLOTS[size];
  return (
    <aside aria-label="Sponsored" className={cn("blassa-slot", slot.className, className)}>
      {creative && <span className="blassa-label">Sponsored</span>}
      <BannerBody creative={creative} size={slot.size} />
    </aside>
  );
}
