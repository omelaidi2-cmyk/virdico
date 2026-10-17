import * as React from "react";
import Link from "next/link";
import { Chip } from "../ui/chip";
import { PillForm } from "../ui/pill-form";
import { SearchIcon } from "../ui/icons";
import { CountUp } from "./count-up";
import { cn } from "../../lib/cn";

export function Flare({ small = false, rays = 2 }: { small?: boolean; rays?: 1 | 2 }) {
  return (
    <div aria-hidden className={cn("vd-flare", small && "vd-flare--small")}>
      <div className="vd-flare__rays" />
      {rays === 2 && <div className="vd-flare__rays vd-flare__rays--alt" />}
      {!small && <div className="vd-flare__line" />}
      <div className="vd-flare__core" />
    </div>
  );
}

export interface HeroStat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

export interface HeroProps {
  /** Lien vers le dernier guide : « NEW 2026 guide to the best CRM tools → » */
  announcement?: { badge: string; text: string; href: string };
  /** Titre ; mettre en valeur un mot avec <span className="vd-text-gradient"> */
  title: React.ReactNode;
  description: string;
  search?: { action: string; placeholder: string };
  popular?: { label: string; href: string }[];
  stats?: HeroStat[];
  /** id de la section suivante, pour l'indicateur de scroll */
  next?: string;
}

/** Hero plein écran : horizon bleu, grille, éclat animé, titre fin géant, recherche, chiffres clés. */
export function Hero({ announcement, title, description, search, popular, stats, next }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="vd-horizon flex min-h-svh items-center pt-[140px] pb-[90px]">
      <Flare />
      <div className="mx-auto grid w-full max-w-content items-end gap-10 px-4 sm:px-5 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          {announcement && (
            <Link href={announcement.href} className="group mb-[26px] inline-flex">
              <Chip variant="announce" className="transition-colors group-hover:border-border-strong group-hover:text-foreground">
                <Chip variant="solid">{announcement.badge}</Chip>
                {announcement.text} →
              </Chip>
            </Link>
          )}
          <h1 id="hero-title" className="text-h1 font-light">
            {title}
          </h1>
        </div>

        <div className="max-w-[400px] lg:justify-self-end">
          <p className="mb-6 text-foreground-soft">{description}</p>
          {search && (
            <PillForm
              action={search.action}
              method="get"
              role="search"
              icon={<SearchIcon />}
              label="Search reviews"
              input={{ id: "q", name: "q", type: "search", placeholder: search.placeholder, autoComplete: "off" }}
              submitLabel="Search"
            />
          )}
          {popular && (
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-foreground-muted">
              <span>Popular:</span>
              {popular.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-border px-2.5 py-1 transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {stats && (
          <dl className="col-span-full mt-14 flex flex-wrap gap-y-[22px]">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col-reverse",
                  i === 0 ? "pr-[18px] sm:pr-[34px]" : "border-l border-white/[.18] px-[18px] sm:px-[34px]",
                )}
              >
                <dt className="text-[13px] text-foreground-soft">{stat.label}</dt>
                <dd className="text-[32px] font-light leading-none tracking-[-.04em] sm:text-stat">
                  <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {next && <a href={`#${next}`} aria-label="Scroll down" className="vd-scroll-hint hidden lg:block" />}
    </section>
  );
}
