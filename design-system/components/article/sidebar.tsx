import * as React from "react";
import Link from "next/link";
import { AffiliateLink } from "../ui/button";
import { Coupon } from "../home/deal-card";

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-border bg-panel p-[22px]">
      <h2 className="mb-3.5 text-xs font-semibold uppercase tracking-[.16em] text-accent">{title}</h2>
      {children}
    </div>
  );
}

const row = "flex items-center justify-between border-b border-border py-2.5 text-sm last:border-0";

/** Colonne latérale collante (≥ 860px) : fiche rapide, offre, alternatives. */
export function ArticleSidebar({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <aside aria-label={label} className="vd-no-print grid gap-4 self-start md:sticky md:top-[100px]">
      {children}
    </aside>
  );
}

export function QuickFacts({ facts, cta }: { facts: { label: string; value: string }[]; cta: { label: string; href: string } }) {
  return (
    <Box title="Quick facts">
      <dl>
        {facts.map((fact) => (
          <div key={fact.label} className={row}>
            <dt>{fact.label}</dt>
            <dd className="font-semibold text-accent">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <AffiliateLink href={cta.href} className="mt-3.5 w-full">
        {cta.label}
      </AffiliateLink>
    </Box>
  );
}

export function DealBox({ value, text, code, href }: { value: string; text: string; code?: string; href: string }) {
  return (
    <Box title="Exclusive deal">
      <p className="text-sm text-foreground-soft">
        <strong className="block text-[30px] leading-[1.1] font-light tracking-[-.04em] text-foreground">{value}</strong>
        {text}
      </p>
      <Coupon code={code} className="mt-2.5 text-[13px]" />
      <AffiliateLink href={href} variant="ghost" className="mt-3.5 w-full">
        Claim deal
      </AffiliateLink>
    </Box>
  );
}

export function AlternativesBox({ items }: { items: { name: string; score: number; href: string }[] }) {
  return (
    <Box title="Alternatives">
      {items.map((item) => (
        <Link key={item.name} href={item.href} className={`${row} group`}>
          <span className="group-hover:text-foreground">{item.name}</span>
          <b className="font-semibold text-accent">{item.score.toFixed(1)}</b>
        </Link>
      ))}
    </Box>
  );
}
