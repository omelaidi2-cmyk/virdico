import Link from "next/link";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface CategoryCardProps {
  href: string;
  icon: React.ReactNode;
  name: string;
  count: number;
  countLabel?: string;
  className?: string;
}

/** Carte de catégorie : icône dans un carré bleuté, halo qui apparaît au survol. */
export function CategoryCard({ href, icon, name, count, countLabel = "reviews", className }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "vd-orb block rounded-card border border-card-border bg-panel p-[26px] transition-all duration-300",
        "hover:-translate-y-[3px] hover:border-border-accent",
        className,
      )}
    >
      <span
        aria-hidden
        className="mb-10 grid size-[42px] place-items-center rounded-icon border border-accent-soft-border bg-accent-soft text-lg [&_svg]:size-5"
      >
        {icon}
      </span>
      <h3 className="text-lg font-medium tracking-tight">{name}</h3>
      <p className="text-[13px] text-foreground-muted">
        {count} {countLabel}
      </p>
    </Link>
  );
}
