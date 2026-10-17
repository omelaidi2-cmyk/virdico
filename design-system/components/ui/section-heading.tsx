import * as React from "react";
import { cn } from "../../lib/cn";

export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mb-3.5 text-xs uppercase tracking-[.18em] text-accent", className)} {...props} />
  );
}

export interface SectionHeadingProps {
  eyebrow: string;
  /** Partie principale du titre, en blanc */
  title: string;
  /** Suite du titre, atténuée : « Find the right tool <for every part of your business.> » */
  muted?: string;
  /** Lien ou bouton aligné à droite */
  action?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({ eyebrow, title, muted, action, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 flex flex-wrap items-end justify-between gap-6", className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Tag className="max-w-[720px] text-h2 font-light">
          {title} {muted && <span className="text-foreground-muted">{muted}</span>}
        </Tag>
      </div>
      {action}
    </div>
  );
}
