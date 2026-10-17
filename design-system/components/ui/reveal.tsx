"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** Décalage en ms, pour échelonner les cartes d'une grille (index % 4 × 70) */
  delay?: number;
}

/**
 * Fait apparaître l'élément (fondu + montée de 24px) quand il entre dans l'écran.
 * Ajoute aussi `is-in`, qui remplit les barres de score d'un parent `vd-animate-bars`.
 * Sans JavaScript, le contenu reste visible (voir effects.css).
 */
export function Reveal({ as: Tag = "div", delay = 0, className, style, ...props }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("vd-reveal", inView && "is-in", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    />
  );
}
