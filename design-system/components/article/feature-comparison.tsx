import * as React from "react";
import Link from "next/link";
import { AffiliateLink, buttonVariants } from "../ui/button";
import { cn } from "../../lib/cn";

export interface FeatureComparisonProps {
  /** Colonnes ; la première est l'outil testé (mise en avant) */
  tools: { name: string; href: string; affiliate?: boolean }[];
  /** Une ligne par critère ; true/false s'affichent ✓ / ✕ */
  rows: { label: string; values: (string | number | boolean)[] }[];
  caption: string;
}

function Value({ value }: { value: string | number | boolean }) {
  if (value === true) return <span className="text-success">✓<span className="sr-only"> Yes</span></span>;
  if (value === false) return <span className="text-danger">✕<span className="sr-only"> No</span></span>;
  return <>{value}</>;
}

const cell = "px-[18px] py-3.5 text-left border-b border-border";

/** « ToolName vs others » : tableau de critères, colonne de l'outil testé surlignée. */
export function FeatureComparison({ tools, rows, caption }: FeatureComparisonProps) {
  return (
    <div className="not-prose my-[22px] overflow-hidden rounded-[20px] border border-border">
      <div tabIndex={0} role="region" aria-label={`${caption}, scroll horizontally`} className="relative overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-white/[.02] text-[11px] font-semibold uppercase tracking-[.12em] text-foreground-muted">
              <th scope="col" className={cell}>Feature</th>
              {tools.map((tool, i) => (
                <th key={tool.name} scope="col" className={cn(cell, i === 0 && "bg-[rgb(47_91_255/.1)] text-foreground")}>
                  {tool.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className={cn(cell, "font-medium text-foreground-muted")}>{row.label}</th>
                {row.values.map((value, i) => (
                  <td key={i} className={cn(cell, i === 0 && "bg-[rgb(47_91_255/.1)] font-semibold text-foreground")}>
                    <Value value={value} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className={cn(cell, "border-0")} />
              {tools.map((tool, i) => (
                <td key={tool.name} className={cn(cell, "border-0", i === 0 && "bg-[rgb(47_91_255/.1)]")}>
                  {tool.affiliate ? (
                    <AffiliateLink href={tool.href} size="sm">Try free</AffiliateLink>
                  ) : (
                    <Link href={tool.href} className={buttonVariants({ variant: "ghost", size: "sm" })}>Review</Link>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
