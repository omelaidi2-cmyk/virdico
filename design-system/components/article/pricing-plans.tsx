"use client";

import * as React from "react";
import { AffiliateLink } from "../ui/button";
import { cn } from "../../lib/cn";

export interface Plan {
  name: string;
  /** Prix mensuel et prix mensuel en facturation annuelle. Identiques pour un plan gratuit. */
  price: { monthly: number; yearly: number };
  unit: string; // "per user / month", "Up to 2 users"
  features: string[];
  cta: { label: string; href: string };
  /** Plan mis en avant (« BEST VALUE ») */
  ribbon?: string;
}

export interface PricingPlansProps {
  plans: Plan[];
  currency?: string;
  /** « save 20% » */
  yearlySaving?: string;
  /** « Prices checked on Oct 15, 2026… » */
  note: string;
}

/** Bascule Mensuel / Annuel + cartes de plans. Le rendu serveur montre l'annuel. */
export function PricingPlans({ plans, currency = "$", yearlySaving, note }: PricingPlansProps) {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("yearly");

  return (
    <div className="not-prose">
      <div role="group" aria-label="Billing period" className="mt-1.5 mb-1 inline-flex rounded-full border border-border bg-panel p-1">
        {(["monthly", "yearly"] as const).map((period) => (
          <button
            key={period}
            type="button"
            aria-pressed={billing === period}
            onClick={() => setBilling(period)}
            className="cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold text-foreground-muted aria-pressed:bg-cta aria-pressed:text-cta-foreground"
          >
            {period === "monthly" ? "Monthly" : "Yearly"}
            {period === "yearly" && yearlySaving && <em className="ml-1 text-[11px] not-italic text-success">{yearlySaving}</em>}
          </button>
        ))}
      </div>

      <div className="my-[18px] grid gap-[22px] md:grid-cols-3 md:gap-3.5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col gap-1.5 rounded-[20px] border border-border bg-panel p-6",
              plan.ribbon && "border-[rgb(120_150_255/.55)] bg-[linear-gradient(180deg,rgb(47_91_255/.18),transparent)]",
            )}
          >
            {plan.ribbon && (
              <span className="absolute -top-[11px] left-5 rounded-full bg-primary px-2.5 py-[3px] text-[11px] font-bold tracking-[.04em] text-white">
                {plan.ribbon}
              </span>
            )}
            <b className="font-semibold text-foreground">{plan.name}</b>
            <strong aria-live="polite" className="text-4xl leading-[1.1] font-light tracking-[-.04em] text-foreground">
              {currency}
              {plan.price[billing]}
            </strong>
            <small className="text-[13px] text-foreground-muted">{plan.unit}</small>
            <ul className="vd-check-list vd-check-list--accent mt-2.5 mb-1 space-y-1 text-sm">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <AffiliateLink href={plan.cta.href} variant={plan.ribbon ? "blue" : "ghost"} className="mt-auto">
              {plan.cta.label}
            </AffiliateLink>
          </div>
        ))}
      </div>
      <p className="text-[13px] text-foreground-muted">{note}</p>
    </div>
  );
}
