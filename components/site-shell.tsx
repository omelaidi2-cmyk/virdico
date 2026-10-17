import { BackToTop, CookieBanner, SiteFooter, SiteHeader, SkipLink, StickyBanner } from "@/design-system/components";
import { slot } from "@/content/banners";
import { footer, nav } from "@/content/site";

export interface SiteShellProps {
  children: React.ReactNode;
  /** Bouton blanc de l'en-tête. Sur une page de test : le lien d'affiliation de l'outil. */
  headerCta?: { label: string; href: string; sponsored?: boolean };
  /** Élément à placer juste avant le <main> (barre de progression de lecture…) */
  before?: React.ReactNode;
  /** Éléments fixes en plus (barre CTA d'affiliation mobile…) */
  after?: React.ReactNode;
  /** Remonte le bouton « retour en haut » au-dessus de la barre CTA mobile */
  raisedBackToTop?: boolean;
}

/** Structure commune à toutes les pages : en-tête, pied de page, cookies, bannière sticky. */
export function SiteShell({ children, headerCta, before, after, raisedBackToTop }: SiteShellProps) {
  return (
    <>
      <SkipLink />
      {before}
      <SiteHeader
        items={nav}
        mobileExtra={[{ label: "How we test", href: "/how-we-test/" }]}
        cta={headerCta ?? { label: "Get the best deals", href: "/deals/" }}
      />
      <main id="main">{children}</main>
      <SiteFooter {...footer} />
      {after}
      <StickyBanner creative={slot("sticky")} />
      <CookieBanner />
      <BackToTop raised={raisedBackToTop} />
    </>
  );
}

/** En-tête de page de liste / page statique : eyebrow + grand titre fin + description, sur la lueur bleue. */
export function PageHeader({ eyebrow, title, muted, description }: { eyebrow: string; title: string; muted?: string; description?: string }) {
  return (
    <header className="vd-article-glow pt-[150px] pb-16">
      <div className="relative mx-auto max-w-content px-4 sm:px-5">
        <p className="mb-3.5 text-xs font-semibold uppercase tracking-[.18em] text-accent">{eyebrow}</p>
        <h1 className="max-w-[880px] text-[clamp(2.5rem,6vw,4.75rem)] font-light leading-[1.04] tracking-[-.045em]">
          {title} {muted && <span className="text-foreground-muted">{muted}</span>}
        </h1>
        {description && <p className="mt-5 max-w-[640px] text-lg text-foreground-soft">{description}</p>}
      </div>
    </header>
  );
}

export const wrap = "mx-auto max-w-content px-4 sm:px-5";
