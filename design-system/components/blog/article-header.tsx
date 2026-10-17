import Link from "next/link";
import { Chip } from "../ui/chip";
import { Author, type AuthorProps } from "./author";
import { ScoreBadge } from "./score";

export interface ArticleHeaderProps {
  title: string;
  description: string;
  category: { label: string; href: string };
  readingTime: string;
  updated: string;
  author: Omit<AuthorProps, "className">;
  score?: number;
  /** Mention d'affiliation affichée sous l'auteur */
  disclosure?: string;
}

/** En-tête d'article, posé sur l'horizon bleu (même langage que le hero). */
export function ArticleHeader({
  title,
  description,
  category,
  readingTime,
  updated,
  author,
  score,
  disclosure,
}: ArticleHeaderProps) {
  return (
    <header className="vd-horizon pt-40 pb-16">
      <div className="mx-auto max-w-[920px] px-5">
        <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2.5 text-[13px] text-foreground-muted">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span aria-hidden>/</span>
          <Link href={category.href}><Chip>{category.label}</Chip></Link>
          <span aria-hidden>·</span>
          <span>{readingTime}</span>
          <span aria-hidden>·</span>
          <span>{updated}</span>
          {score !== undefined && <ScoreBadge score={score} className="ml-auto" />}
        </nav>

        <h1 className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-light leading-[1.05] tracking-[-.04em] text-balance">
          {title}
        </h1>
        <p className="mt-6 max-w-[640px] text-lg text-foreground-soft">{description}</p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[.12] pt-6">
          <Author {...author} />
          {disclosure && <p className="max-w-sm text-xs text-foreground-muted">{disclosure}</p>}
        </div>
      </div>
    </header>
  );
}
