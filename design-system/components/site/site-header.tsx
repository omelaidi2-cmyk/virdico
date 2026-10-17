"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../ui/logo";
import { buttonVariants, iconButtonClass } from "../ui/button";
import { CloseIcon, MenuIcon } from "../ui/icons";
import { cn } from "../../lib/cn";

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  items: NavItem[];
  /** Liens en plus dans le menu mobile (« How we test ») */
  mobileExtra?: NavItem[];
  /** href de l'élément actif (déduit de l'URL si absent) */
  current?: string;
  /** Bouton blanc à droite. Sur une page de test : le lien d'affiliation de l'outil. */
  cta: NavItem & { sponsored?: boolean };
}

/**
 * Barre fixe : transparente en haut de page, fond flouté + bordure après 40px de scroll.
 * Sous 960px : bouton menu qui ouvre un panneau plein écran (Échap pour fermer).
 */
export function SiteHeader({ items, mobileExtra = [], current, cta }: SiteHeaderProps) {
  const pathname = usePathname() ?? "/";
  const active =
    current ?? items.find((item) => (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)))?.href;
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const openRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      openRef.current?.focus();
    };
  }, [open]);

  const ctaProps = cta.sponsored ? { rel: "sponsored nofollow noopener", target: "_blank" } : {};

  return (
    <>
      <header
        className={cn(
          "vd-no-print fixed inset-x-0 top-0 z-50 border-b border-transparent py-[18px] transition-[padding,background,border-color] duration-300",
          scrolled && "border-border bg-[var(--nav-bg-scrolled)] py-2.5 backdrop-blur-[16px]",
        )}
      >
        <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 sm:px-5">
          <Logo />

          <nav aria-label="Main" className="hidden gap-1 rounded-full border border-border bg-overlay p-1.5 backdrop-blur-[14px] lg:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.href === active ? "page" : undefined}
                className="rounded-full px-4 py-2 text-sm text-foreground-muted transition-colors duration-200 hover:bg-white/[.07] hover:text-foreground aria-[current=page]:bg-white/[.07] aria-[current=page]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={cta.href} {...ctaProps} className={cn(buttonVariants(), "hidden lg:inline-flex")}>
              {cta.label}
            </a>
            <button
              ref={openRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className={cn(iconButtonClass, "lg:hidden")}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-[70] flex flex-col bg-[rgb(4_6_13/.96)] px-5 py-6 backdrop-blur-[20px]"
      >
        <div className="mb-10 flex items-center justify-between">
          <Logo />
          <button ref={closeRef} type="button" aria-label="Close menu" onClick={() => setOpen(false)} className={iconButtonClass}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile">
          {[...items, ...mobileExtra].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 text-[30px] font-light tracking-[-.03em]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={cta.href} {...ctaProps} onClick={() => setOpen(false)} className={cn(buttonVariants(), "mt-auto")}>
          {cta.label}
        </a>
      </div>
    </>
  );
}
