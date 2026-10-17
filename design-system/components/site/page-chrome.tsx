"use client";

import * as React from "react";
import { iconButtonClass } from "../ui/button";
import { ArrowUpIcon } from "../ui/icons";
import { cn } from "../../lib/cn";

/** Lien d'évitement, premier élément focusable de la page. */
export function SkipLink({ href = "#main" }: { href?: string }) {
  return (
    <a
      href={href}
      className="fixed top-[-60px] left-4 z-[100] rounded-[10px] bg-cta px-4 py-2.5 font-semibold text-cta-foreground transition-[top] focus:top-4"
    >
      Skip to content
    </a>
  );
}

function useScrollY() {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/** Bouton « retour en haut », visible après 900px de scroll. */
export function BackToTop({ href = "#main", raised = false }: { href?: string; raised?: boolean }) {
  const show = useScrollY() > 900;
  return (
    <a
      href={href}
      aria-label="Back to top"
      className={cn(
        iconButtonClass,
        "vd-no-print fixed right-4 z-[60] transition-all duration-300",
        raised
          ? "bottom-[calc(84px+var(--sticky-banner-h,0px))] md:bottom-[calc(16px+var(--sticky-banner-h,0px))]"
          : "bottom-[calc(16px+var(--sticky-banner-h,0px))]",
        show ? "visible opacity-100" : "invisible translate-y-2.5 opacity-0",
      )}
    >
      <ArrowUpIcon />
    </a>
  );
}

/** Barre de progression de lecture, calée sur l'élément `targetId` (l'article). */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const target = document.getElementById(targetId);
    const bar = ref.current;
    if (!target || !bar) return;
    const onScroll = () => {
      const r = target.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, -r.top / total))})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId]);

  return <div ref={ref} aria-hidden className="vd-progress vd-no-print" />;
}

export interface StickyCtaProps {
  tool: string;
  score: number;
  note: string;
  href: string;
  label?: string;
  /** Masque la barre une fois l'article terminé */
  targetId: string;
}

/** Barre d'affiliation collée en bas de l'écran, sur mobile uniquement (< 860px). */
export function StickyCta({ tool, score, note, href, label = "Try free", targetId }: StickyCtaProps) {
  const y = useScrollY();
  const [articleOver, setArticleOver] = React.useState(false);

  React.useEffect(() => {
    const target = document.getElementById(targetId);
    if (target) setArticleOver(target.getBoundingClientRect().bottom <= window.innerHeight);
  }, [y, targetId]);

  const show = y > 700 && !articleOver;

  return (
    <div
      className={cn(
        "vd-no-print fixed inset-x-3 bottom-[calc(12px+var(--sticky-banner-h,0px))] z-[55] flex items-center justify-between gap-2.5 rounded-full border border-border bg-[rgb(8_12_30/.9)] py-2.5 pr-2.5 pl-[18px] text-sm backdrop-blur-[14px] transition-transform duration-[350ms] ease-out md:hidden",
        show ? "translate-y-0" : "translate-y-[140%]",
      )}
      inert={!show}
    >
      <span>
        <b className="font-semibold">{tool}</b> · {score.toFixed(1)}/10
        <br />
        <small className="text-highlight">{note}</small>
      </span>
      <a href={href} rel="sponsored nofollow noopener" target="_blank" className="vd-button-blue inline-flex rounded-full px-[22px] py-3 text-sm font-semibold">
        {label}
      </a>
    </div>
  );
}
