import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Eyebrow } from "../ui/section-heading";
import { ScoreBar } from "./score";

export interface VerdictProps {
  tool: string;
  score: number;
  summary: string;
  /** Sous-notes : Ease of use, Features, Value… */
  ratings?: { label: string; score: number }[];
  pros: string[];
  cons: string[];
  cta?: { label: string; href: string; note?: string };
}

/** Encadré « Our verdict » d'un test : note, sous-notes, pour/contre et lien d'affiliation. */
export function Verdict({ tool, score, summary, ratings, pros, cons, cta }: VerdictProps) {
  return (
    <aside
      aria-label={`Verdict: ${tool}`}
      className="not-prose overflow-hidden rounded-table border border-border"
      style={{ background: "var(--gradient-panel-top)" }}
    >
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
        <div className="text-center md:border-r md:border-border md:pr-8">
          <p className="text-[64px] font-light leading-none tracking-[-.05em]">
            <span className="vd-text-gradient">{score.toFixed(1)}</span>
          </p>
          <p className="mt-1 text-xs text-foreground-muted">out of 10</p>
        </div>
        <div>
          <Eyebrow className="mb-2">Our verdict</Eyebrow>
          <p className="text-foreground-soft">{summary}</p>
          {ratings && (
            <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {ratings.map((rating) => (
                <div key={rating.label} className="flex items-center justify-between gap-4 text-sm">
                  <dt className="text-foreground-muted">{rating.label}</dt>
                  <dd className="flex items-center gap-3">
                    <ScoreBar score={rating.score} className="w-20" />
                    <span className="w-7 text-right font-semibold">{rating.score.toFixed(1)}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <div className="grid border-t border-border sm:grid-cols-2">
        <div className="p-6 sm:p-8">
          <h3 className="mb-3 text-sm font-semibold text-success">What we like</h3>
          <ul className="space-y-2 text-sm text-foreground-soft">
            {pros.map((pro) => (
              <li key={pro} className="flex gap-2.5"><span aria-hidden className="text-success">+</span>{pro}</li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border p-6 sm:border-t-0 sm:border-l sm:p-8">
          <h3 className="mb-3 text-sm font-semibold text-danger">What could be better</h3>
          <ul className="space-y-2 text-sm text-foreground-soft">
            {cons.map((con) => (
              <li key={con} className="flex gap-2.5"><span aria-hidden className="text-danger">−</span>{con}</li>
            ))}
          </ul>
        </div>
      </div>

      {cta && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-5 sm:px-8">
          {cta.note && <p className="text-xs text-foreground-muted">{cta.note}</p>}
          <Link href={cta.href} rel="sponsored nofollow noopener" target="_blank" className={buttonVariants()}>
            {cta.label}
          </Link>
        </div>
      )}
    </aside>
  );
}
