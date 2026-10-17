import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ScoreBar } from "./score";

export interface ComparisonRow {
  tool: string;
  bestFor: string;
  score: number;
  freePlan: string;
  /** Lien d'affiliation : rendu avec rel="sponsored nofollow" */
  href: string;
  ctaLabel?: string;
  /** Met la ligne en avant (bouton blanc) — en général le n°1 */
  highlight?: boolean;
}

export interface ComparisonTableProps {
  caption: string;
  rows: ComparisonRow[];
  labels?: { tool: string; bestFor: string; score: string; freePlan: string };
}

const defaultLabels = { tool: "Tool", bestFor: "Best for", score: "Score", freePlan: "Free plan" };

export function ComparisonTable({ caption, rows, labels = defaultLabels }: ComparisonTableProps) {
  return (
    <div
      className="not-prose overflow-hidden rounded-table border border-border"
      style={{ background: "var(--gradient-panel-top)" }}
    >
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border text-xs font-medium uppercase tracking-[.1em] text-foreground-muted">
              <th scope="col" className="px-[22px] py-[18px] font-medium">{labels.tool}</th>
              <th scope="col" className="px-[22px] py-[18px] font-medium">{labels.bestFor}</th>
              <th scope="col" className="px-[22px] py-[18px] font-medium">{labels.score}</th>
              <th scope="col" className="px-[22px] py-[18px] font-medium">{labels.freePlan}</th>
              <th scope="col" className="px-[22px] py-[18px]"><span className="sr-only">Link</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.tool} className="border-b border-border last:border-0">
                <th scope="row" className="px-[22px] py-[18px] font-semibold">{row.tool}</th>
                <td className="px-[22px] py-[18px]">{row.bestFor}</td>
                <td className="px-[22px] py-[18px]"><ScoreBar score={row.score} /></td>
                <td className="px-[22px] py-[18px]">{row.freePlan}</td>
                <td className="px-[22px] py-[18px] text-right">
                  <Link
                    href={row.href}
                    rel="sponsored nofollow noopener"
                    target="_blank"
                    className={buttonVariants({ variant: row.highlight ? "primary" : "ghost", size: "sm" })}
                  >
                    {row.ctaLabel ?? (row.highlight ? "Try free" : "Visit site")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
