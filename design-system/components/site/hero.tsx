import * as React from "react";
import { Chip } from "../ui/chip";
import { cn } from "../../lib/cn";

export function Flare() {
  return (
    <div aria-hidden className="vd-flare">
      <div className="vd-flare__rays" />
      <div className="vd-flare__rays vd-flare__rays--alt" />
      <div className="vd-flare__line" />
      <div className="vd-flare__core" />
    </div>
  );
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroProps {
  announcement?: { badge: string; text: string };
  /** Titre ; mettre en valeur un mot avec <span className="vd-text-gradient"> */
  title: React.ReactNode;
  description: string;
  /** Formulaire de recherche (PillForm) ou tout autre CTA */
  action?: React.ReactNode;
  stats?: HeroStat[];
}

/** Hero plein écran : horizon bleu, grille, éclat lumineux, titre fin géant. */
export function Hero({ announcement, title, description, action, stats }: HeroProps) {
  return (
    <section className="vd-horizon flex min-h-svh items-center pt-[140px] pb-[90px]">
      <Flare />
      <div className="mx-auto grid w-full max-w-content items-end gap-10 px-5 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          {announcement && (
            <Chip variant="announce" className="mb-6">
              <Chip variant="solid">{announcement.badge}</Chip>
              {announcement.text}
            </Chip>
          )}
          <h1 className="text-h1 font-light">{title}</h1>
        </div>

        <div className="max-w-[380px] lg:justify-self-end">
          <p className="mb-6 text-foreground-soft">{description}</p>
          {action}
        </div>

        {stats && (
          <dl className="col-span-full mt-14 flex flex-wrap gap-y-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col-reverse",
                  i === 0 ? "pr-[34px]" : "border-l border-white/[.18] px-[18px] sm:px-[34px]",
                )}
              >
                <dt className="text-[13px] text-foreground-soft">{stat.label}</dt>
                <dd className="text-[32px] font-light leading-none tracking-[-.04em] sm:text-stat">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
