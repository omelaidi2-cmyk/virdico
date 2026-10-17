import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/cn";

export interface PostCardProps {
  href: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingTime: number; // minutes
  cover?: { src: string; alt: string };
  /** "featured" : carte large pour l'article à la une */
  variant?: "default" | "featured";
  className?: string;
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" });

export function PostCard({
  href,
  title,
  excerpt,
  category,
  date,
  readingTime,
  cover,
  variant = "default",
  className,
}: PostCardProps) {
  const featured = variant === "featured";

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background",
        "transition-[box-shadow,border-color] duration-200 ease-out hover:border-border-strong hover:shadow-md",
        featured && "md:grid md:grid-cols-2",
        className,
      )}
    >
      {cover && (
        <div className={cn("relative aspect-[16/9] overflow-hidden bg-surface-muted", featured && "md:aspect-auto")}>
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className={cn("flex flex-1 flex-col gap-3 p-6", featured && "md:justify-center md:p-10")}>
        <div className="flex items-center gap-3 text-xs text-foreground-subtle">
          <Badge>{category}</Badge>
          <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
          <span aria-hidden>·</span>
          <span>{readingTime} min de lecture</span>
        </div>

        <h3
          className={cn(
            "font-semibold tracking-tight text-foreground text-balance",
            featured ? "text-2xl md:text-3xl" : "text-lg",
          )}
        >
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>

        <p className={cn("text-foreground-muted line-clamp-3", featured ? "text-base" : "text-sm")}>{excerpt}</p>

        <span className="mt-auto pt-2 text-sm font-medium text-link">
          Lire l'article <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </article>
  );
}
