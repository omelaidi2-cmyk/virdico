import * as React from "react";
import Link from "next/link";
import { Chip } from "../ui/chip";
import { CheckIcon } from "../ui/icons";
import { Flare } from "../site/hero";

export interface Crumb {
  label: string;
  href?: string;
}

export interface ArticleHeroProps {
  /** Le dernier élément (sans href) est la page courante */
  breadcrumbs: Crumb[];
  category: string;
  /** Titre ; mettre en valeur une partie avec <span className="vd-text-gradient"> */
  title: React.ReactNode;
  lead: string;
  author: { name: string; href: string; avatar?: string };
  updated: { iso: string; label: string };
  readingTime: string;
  /** Badges de confiance : « Tested for 30 days », « Paid plan used »… */
  trust?: string[];
}

export function ArticleHero({ breadcrumbs, category, title, lead, author, updated, readingTime, trust }: ArticleHeroProps) {
  return (
    <header className="vd-article-glow pt-[150px] pb-[70px]">
      <Flare small rays={1} />
      <div className="relative mx-auto max-w-content px-4 sm:px-5">
        <nav aria-label="Breadcrumb">
          <ol className="mb-[22px] flex flex-wrap gap-2 text-[13px] text-foreground-muted">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.label} aria-current={crumb.href ? undefined : "page"} className="flex gap-2">
                {i > 0 && <span aria-hidden className="opacity-50">/</span>}
                {crumb.href ? <Link href={crumb.href} className="hover:text-foreground">{crumb.label}</Link> : crumb.label}
              </li>
            ))}
          </ol>
        </nav>

        <Chip>{category}</Chip>
        <h1 className="my-4 max-w-[880px] text-[clamp(2.25rem,5.6vw,4.375rem)] font-light leading-[1.05] tracking-[-.04em] mb-5">
          {title}
        </h1>
        <p className="max-w-[680px] text-lg text-foreground-soft">{lead}</p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3.5 text-[13px] text-foreground-muted">
          <div className="flex items-center gap-3">
            {author.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={author.avatar} alt="" width={40} height={40} className="size-10 flex-none rounded-full object-cover" />
            ) : (
              <span aria-hidden className="size-10 flex-none rounded-full" style={{ background: "linear-gradient(135deg, var(--accent), var(--primary))" }} />
            )}
            <div>
              <b className="font-semibold text-foreground">
                By <Link href={author.href}>{author.name}</Link>
              </b>
              <br />
              Updated <time dateTime={updated.iso}>{updated.label}</time> · {readingTime}
            </div>
          </div>
          {trust && (
            <ul className="flex flex-wrap gap-2">
              {trust.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[.03] px-[11px] py-[5px] text-xs text-foreground-soft [&_svg]:size-[13px] [&_svg]:text-success"
                >
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
