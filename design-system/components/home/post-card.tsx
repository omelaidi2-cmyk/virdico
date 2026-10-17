import Image from "next/image";
import Link from "next/link";
import { Chip } from "../ui/chip";
import { Reveal } from "../ui/reveal";
import { ScoreBadge } from "../ui/score";
import { cn } from "../../lib/cn";

export interface PostCardProps {
  href: string;
  title: string;
  excerpt?: string;
  category: string;
  readingTime: string; // "12 min read"
  /** Date ISO de mise à jour + libellé affiché */
  updated?: { iso: string; label: string };
  score?: number;
  /** Pastille en haut à gauche : « Editor's choice » */
  badge?: string;
  cover?: { src: string; alt: string };
  /**
   * featured : grande carte de la une (titre 30px)
   * default  : carte de grille (titre 21px)
   * compact  : ligne horizontale à vignette (colonne à droite de la une)
   */
  variant?: "featured" | "default" | "compact";
  moreLabel?: string;
  index?: number;
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
  badge,
  cover,
  variant = "default",
  moreLabel = variant === "featured" ? "Read the review" : "Read more",
  index = 0,
  className,
}: PostCardProps) {
  const compact = variant === "compact";

  return (
    <Reveal delay={(index % 4) * 70} className="h-full">
      <Link
        href={href}
        className={cn(
          "group h-full overflow-hidden rounded-card border border-card-border bg-panel transition-[border-color,transform] duration-300 ease-out",
          "hover:-translate-y-[3px] hover:border-[rgb(120_150_255/.35)]",
          compact ? "grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr]" : "flex flex-col",
          className,
        )}
      >
        <div aria-hidden={!cover} className={cn("vd-thumb relative overflow-hidden", compact ? "h-full min-h-[110px]" : "aspect-video")}>
          {cover && (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes={compact ? "140px" : variant === "featured" ? "(min-width: 961px) 58vw, 100vw" : "(min-width: 961px) 33vw, 100vw"}
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          )}
          {badge && !compact && (
            <span className="absolute top-3.5 left-3.5 rounded-full bg-primary px-[11px] py-[5px] text-[11px] font-bold uppercase tracking-[.05em] text-white">
              {badge}
            </span>
          )}
          {score !== undefined && !compact && <ScoreBadge score={score} className="absolute top-3.5 right-3.5" />}
        </div>

        <div className={cn("flex flex-1 flex-col gap-2.5", compact ? "p-[18px]" : "p-6")}>
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-foreground-muted">
            <Chip>{category}</Chip>
            <span>{readingTime}</span>
            {updated && (
              <>
                <span aria-hidden className="size-[3px] rounded-full bg-foreground-muted" />
                <time dateTime={updated.iso}>{updated.label}</time>
              </>
            )}
          </div>

          <h3
            className={cn(
              "font-medium leading-[1.28] tracking-[-.025em] text-balance",
              variant === "featured" ? "text-2xl sm:text-[30px]" : compact ? "text-[17px]" : "text-[21px]",
            )}
          >
            {title}
          </h3>

          {excerpt && !compact && <p className="text-sm text-foreground-muted">{excerpt}</p>}

          {!compact && (
            <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-accent">
              {moreLabel}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          )}
        </div>
      </Link>
    </Reveal>
  );
}
