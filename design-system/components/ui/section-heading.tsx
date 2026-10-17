import * as React from "react";
import { cn } from "../../lib/cn";
import { Reveal } from "./reveal";

export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mb-3.5 text-xs font-semibold uppercase tracking-[.18em] text-accent", className)} {...props} />
  );
}

export interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  /** Partie principale du titre, en blanc */
  title: string;
  /** Suite du titre, atténuée : « Find the right tool <for every part of your business.> » */
  muted?: string;
  /** Lien aligné à droite (« All reviews → ») */
  action?: React.ReactNode;
  className?: string;
}

/** En-tête de section. `id` sert à `aria-labelledby` sur la <section>. */
export function SectionHeading({ id, eyebrow, title, muted, action, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-12 flex flex-wrap items-end justify-between gap-6", className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="max-w-[720px] text-h2 font-light">
          {title} {muted && <span className="text-foreground-muted">{muted}</span>}
        </h2>
      </div>
      {action}
    </Reveal>
  );
}
