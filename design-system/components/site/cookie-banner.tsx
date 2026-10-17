"use client";

import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/cn";

export type Consent = "all" | "essential";

const STORAGE_KEY = "virdico_consent";
const OPEN_EVENT = "virdico:cookie-settings";

export function readConsent(): Consent | null {
  try {
    return localStorage.getItem(STORAGE_KEY) as Consent | null;
  } catch {
    return null;
  }
}

export interface CookieBannerProps {
  privacyHref?: string;
  /** Charger ici les scripts d'analytics/affiliation uniquement si consent === "all" */
  onConsent?: (consent: Consent) => void;
}

/** Bandeau de consentement : apparaît après 1,2 s si aucun choix n'est enregistré. */
export function CookieBanner({ privacyHref = "/privacy-policy/", onConsent }: CookieBannerProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const saved = readConsent();
    if (saved) onConsent?.(saved);
    const timer = saved ? undefined : setTimeout(() => setVisible(true), 1200);
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, [onConsent]);

  function choose(consent: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, consent);
    } catch {
      // Stockage indisponible : le choix vaut pour cette visite.
    }
    onConsent?.(consent);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="vd-no-print fixed inset-x-3 bottom-[calc(12px+var(--sticky-banner-h,0px))] z-[80] rounded-[20px] border border-border bg-[rgb(8_12_28/.92)] p-5 text-[13px] text-foreground-soft shadow-[0_20px_60px_rgb(0_0_0/.5)] backdrop-blur-[16px] sm:right-auto sm:left-4 sm:bottom-[calc(16px+var(--sticky-banner-h,0px))] sm:max-w-[400px]"
    >
      <strong className="mb-1.5 block text-[15px] text-foreground">We use cookies 🍪</strong>
      We use essential cookies to run the site and, with your consent, analytics and affiliate cookies. See our{" "}
      <Link href={privacyHref} className="underline">
        Privacy Policy
      </Link>
      .
      <div className="mt-3.5 flex gap-2">
        <button type="button" onClick={() => choose("all")} className={buttonVariants({ size: "sm" })}>
          Accept all
        </button>
        <button type="button" onClick={() => choose("essential")} className={buttonVariants({ variant: "ghost", size: "sm" })}>
          Essential only
        </button>
      </div>
    </div>
  );
}

/** Lien « Cookie settings » du pied de page : rouvre le bandeau. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={cn("cursor-pointer underline hover:text-foreground", className)}
    >
      Cookie settings
    </button>
  );
}
