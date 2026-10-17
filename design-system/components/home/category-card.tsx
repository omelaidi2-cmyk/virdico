import * as React from "react";
import Link from "next/link";
import { Reveal } from "../ui/reveal";
import { cn } from "../../lib/cn";

export interface CategoryCardProps {
  href: string;
  /** Une icône de ui/icons (UsersIcon, MailIcon…) */
  icon: React.ReactNode;
  name: string;
  count: number;
  countLabel?: string;
  /** Position dans la grille, pour échelonner l'apparition */
  index?: number;
  className?: string;
}

/** Carte de catégorie : icône bleutée, flèche ↗, halo et légère montée au survol. */
export function CategoryCard({ href, icon, name, count, countLabel = "reviews", index = 0, className }: CategoryCardProps) {
  return (
    <Reveal delay={(index % 4) * 70}>
      <Link
        href={href}
        className={cn(
          "vd-orb group relative block h-full rounded-card border border-card-border bg-panel p-[26px] transition-[transform,border-color] duration-300 ease-out",
          "hover:-translate-y-[3px] hover:border-border-accent",
          className,
        )}
      >
        <span
          aria-hidden
          className="absolute top-[26px] right-6 text-foreground-muted transition-all duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-foreground"
        >
          ↗
        </span>
        <span
          aria-hidden
          className="mb-6 grid size-11 place-items-center rounded-icon border border-accent-soft-border bg-accent-soft text-accent sm:mb-10 [&_svg]:size-5"
        >
          {icon}
        </span>
        <h3 className="text-lg font-medium tracking-[-.02em]">{name}</h3>
        <p className="text-[13px] text-foreground-muted">
          {count} {countLabel}
        </p>
      </Link>
    </Reveal>
  );
}
