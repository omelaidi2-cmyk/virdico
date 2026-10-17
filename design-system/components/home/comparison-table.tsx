import type { ReactNode } from "react";
import { AffiliateLink } from "../ui/button";
import { Reveal } from "../ui/reveal";
import { ScoreBar } from "../ui/score";
import { cn } from "../../lib/cn";

export interface ComparisonRow {
  tool: string;
  /** Initiale ou logo (32px) */
  logo?: ReactNode;
  /** « ★ Top pick », « Best budget »… */
  label?: string;
  bestFor: string;
  score: number;
  freePlan: { available: boolean; label: string };
  startsAt: string;
  /** Lien d'affiliation (rel="sponsored nofollow") */
  href: string;
  /** La ligne n°1 : bouton blanc « Try free » ; les autres : « Visit site » */
  top?: boolean;
}

export interface ComparisonTableProps {
  /** Légende visible : « Scores from our hands-on tests. Last updated October 2026. » */
  caption: string;
  rows: ComparisonRow[];
}

const cell = "px-[22px] py-[18px] text-left align-middle border-b border-border";

export function ComparisonTable({ caption, rows }: ComparisonTableProps) {
  return (
    <Reveal
      className="vd-animate-bars not-prose overflow-hidden rounded-table border border-border"
      style={{ background: "var(--gradient-panel-top)" }}
    >
      {/* Région défilante focusable : utilisable au clavier sur mobile */}
      <div tabIndex={0} role="region" aria-label={`${caption} Scroll horizontally.`} className="relative overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <caption className="px-[22px] pt-[18px] text-left text-xs text-foreground-muted">{caption}</caption>
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-[.12em] text-foreground-muted">
              <th scope="col" className={cell}>Tool</th>
              <th scope="col" className={cell}>Best for</th>
              <th scope="col" className={cell}>Score</th>
              <th scope="col" className={cell}>Free plan</th>
              <th scope="col" className={cell}>Starts at</th>
              <th scope="col" className={cell}><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.tool} className="transition-colors hover:bg-white/[.025] [&:last-child>*]:border-0">
                <th scope="row" className={cell}>
                  <div className="flex items-center gap-3 font-semibold">
                    <span
                      aria-hidden
                      className="grid size-9 flex-none place-items-center rounded-[10px] text-sm font-bold"
                      style={{ background: "linear-gradient(135deg, #1c2a66, var(--primary))" }}
                    >
                      {row.logo ?? row.tool[0]}
                    </span>
                    <div>
                      {row.tool}
                      {row.label && <small className="block text-[11px] font-medium text-highlight">{row.label}</small>}
                    </div>
                  </div>
                </th>
                <td className={cell}>{row.bestFor}</td>
                <td className={cell}>
                  <div className="flex items-center gap-2.5">
                    <ScoreBar score={row.score} />
                    {row.score.toFixed(1)}
                  </div>
                </td>
                <td className={cn(cell, row.freePlan.available ? "text-success" : "text-foreground-muted")}>
                  {row.freePlan.available && <span aria-hidden>✓ </span>}
                  {row.freePlan.label}
                </td>
                <td className={cell}>{row.startsAt}</td>
                <td className={cell}>
                  <AffiliateLink href={row.href} variant={row.top ? "primary" : "ghost"} size="sm">
                    {row.top ? "Try free" : "Visit site"}
                  </AffiliateLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
