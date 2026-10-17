import { AffiliateLink } from "../ui/button";
import { ScoreRing, Stars } from "../ui/score";

export interface VerdictCardProps {
  score: number;
  title: string;
  summary: string;
  cta: { label: string; href: string; note?: string };
}

/** Verdict en haut de l'article : anneau de score, étoiles, résumé, CTA bleu. */
export function VerdictCard({ score, title, summary, cta }: VerdictCardProps) {
  return (
    <section
      aria-labelledby="verdict-title"
      className="relative z-[2] grid items-center justify-items-center gap-[30px] rounded-[26px] border border-[rgb(120_150_255/.3)] p-7 text-center backdrop-blur-[10px] md:grid-cols-[auto_1fr_auto] md:justify-items-stretch md:text-left"
      style={{ background: "var(--gradient-panel-diag)" }}
    >
      <ScoreRing score={score} />
      <div>
        <div className="mb-1">
          <Stars score={score} />
        </div>
        <h2 id="verdict-title" className="mb-1.5 text-xl font-medium tracking-[-.02em]">
          {title}
        </h2>
        <p className="text-sm text-foreground-soft">{summary}</p>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <AffiliateLink href={cta.href}>{cta.label}</AffiliateLink>
        {cta.note && <small className="text-xs text-foreground-muted">{cta.note}</small>}
      </div>
    </section>
  );
}
