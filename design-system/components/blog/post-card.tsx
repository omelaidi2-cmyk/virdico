import Image from "next/image";
import Link from "next/link";
import { Chip } from "../ui/chip";
import { ScoreBadge } from "./score";
import { cn } from "../../lib/cn";

export interface PostCardProps {
  href: string;
  title: string;
  excerpt?: string;
  category: string;
  readingTime: string; // "12 min read"
  updated?: string; // "Updated Oct 2026"
  score?: number;
  cover?: { src: string; alt: string };
  /**
   * featured : grande carte de la une (titre 30px, lien « Read the review → »)
   * default  : carte de grille (titre 22px)
   * compact  : ligne horizontale à vignette carrée (colonne à droite de la une)
   */
  variant?: "featured" | "default" | "compact";
  ctaLabel?: string;
  className?: string;
}

export function PostCard({
  href,
  title,
  excerpt,
  category,
  readingTime,
  updated,
  score,
  cover,
  variant = "default",
  ctaLabel = "Read the review →",
  className,
}: PostCardProps) {
  const compact = variant === "compact";

  return (
    <Link
      href={href}
      className={cn(
        "group overflow-hidden rounded-card border border-card-border bg-panel transition-colors duration-300 hover:border-border-accent",
        compact ? "grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr]" : "flex flex-col",
        className,
      )}
    >
      <div className={cn("vd-thumb relative overflow-hidden", compact ? "h-full min-h-28" : "aspect-video")}>
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={compact ? "140px" : variant === "featured" ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        {score !== undefined && !compact && <ScoreBadge score={score} className="absolute top-3.5 right-3.5" />}
      </div>

      <div className={cn("flex flex-1 flex-col gap-2.5", compact ? "p-[18px]" : "p-6")}>
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-foreground-muted">
          <Chip>{category}</Chip>
          <span>{readingTime}</span>
          {updated && <span>{updated}</span>}
        </div>

        <h3
          className={cn(
            "font-medium leading-tight tracking-[-.025em] text-balance",
            variant === "featured" ? "text-2xl md:text-[30px]" : compact ? "text-[17px]" : "text-[22px]",
          )}
        >
          {title}
        </h3>

        {excerpt && !compact && <p className="text-sm text-foreground-muted">{excerpt}</p>}

        {variant === "featured" && <span className="mt-auto pt-2 text-sm font-semibold text-accent">{ctaLabel}</span>}
      </div>
    </Link>
  );
}
