import { cn } from "../../lib/cn";

/** Note posée sur la vignette : « 9.2 / 10 ». */
export function ScoreBadge({ score, max = 10, className }: { score: number; max?: number; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-border bg-score px-3 py-1.5 text-[13px] font-semibold backdrop-blur-md",
        className,
      )}
    >
      <b className="text-accent">{score.toFixed(1)}</b> / {max}
    </span>
  );
}

/** Barre de score horizontale du tableau comparatif. */
export function ScoreBar({ score, max = 10, className }: { score: number; max?: number; className?: string }) {
  const percent = Math.round((score / max) * 100);
  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={score}
      aria-label={`Score ${score} / ${max}`}
      className={cn("h-1.5 w-[120px] overflow-hidden rounded-full bg-white/[.08]", className)}
    >
      <span className="block h-full" style={{ width: `${percent}%`, background: "var(--gradient-bar)" }} />
    </div>
  );
}
