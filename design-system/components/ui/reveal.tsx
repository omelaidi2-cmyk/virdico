"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** Décalage en ms, pour échelonner les cartes d'une grille (index % 4 × 70) */
  delay?: number;
}

/** Fait apparaître l'élément (fondu + montée de 24px) quand il entre dans l'écran. */
export function Reveal({ as: Tag = "div", delay = 0, className, style, ...props }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-in");
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
      className={cn("vd-reveal", className)}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    />
  );
}
