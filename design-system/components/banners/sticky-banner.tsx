"use client";

import * as React from "react";
import { BannerBody } from "./banner";
import type { BannerCreative } from "./types";

const DISMISS_KEY = "virdico_sticky_closed";

/**
 * Barre publicitaire fixe en bas de page (728×90 desktop, 320×50 mobile).
 * Apparaît après 400px de scroll ; fermable (mémorisé pour la session).
 * Publie sa hauteur dans --sticky-banner-h pour que les autres éléments fixes se décalent.
 */
export function StickyBanner({ creative }: { creative?: BannerCreative | null }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [closed, setClosed] = React.useState(true);

  React.useEffect(() => {
    try {
      setClosed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setClosed(false);
    }
  }, []);

  React.useEffect(() => {
    if (closed) return;
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [closed]);

  React.useEffect(() => {
    const root = document.documentElement;
    const height = visible && !closed && ref.current ? ref.current.offsetHeight : 0;
    root.style.setProperty("--sticky-banner-h", `${height}px`);
    return () => root.style.setProperty("--sticky-banner-h", "0px");
  }, [visible, closed]);

  function close() {
    setClosed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Stockage indisponible : fermé pour cette page seulement.
    }
  }

  if (closed) return null;

  return (
    <div ref={ref} className={`sticky-cta${visible ? " is-visible" : ""}`} inert={!visible}>
      <button type="button" className="sticky-cta__close" aria-label="Close ad" onClick={close}>
        ×
      </button>
      <BannerBody creative={creative} size="728 × 90" compact />
    </div>
  );
}
