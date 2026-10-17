import Link from "next/link";
import { Badge } from "../ui/badge";
import { Author, type AuthorProps } from "./author";

export interface ArticleHeaderProps {
  title: string;
  description: string;
  category: { label: string; href: string };
  date: string; // ISO
  readingTime: number;
  author: Omit<AuthorProps, "size" | "className">;
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export function ArticleHeader({ title, description, category, date, readingTime, author }: ArticleHeaderProps) {
  return (
    <header className="mx-auto max-w-reading pt-16 pb-10 md:pt-24">
      <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-sm text-foreground-subtle">
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>
        <span aria-hidden>/</span>
        <Link href={category.href}>
          <Badge>{category.label}</Badge>
        </Link>
      </nav>

      <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl md:leading-[1.1]">
        {title}
      </h1>

      <p className="mt-5 text-lg text-foreground-muted text-pretty md:text-xl">{description}</p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <Author {...author} />
        <p className="text-sm text-foreground-subtle">
          <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
          <span aria-hidden> · </span>
          {readingTime} min de lecture
        </p>
      </div>
    </header>
  );
}
