import * as React from "react";
import { cn } from "../../lib/cn";

/** Note posée sur une vignette : « 9.2 / 10 ». */
export function ScoreBadge({ score, max = 10, className }: { score: number; max?: number; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-border bg-black/50 px-3 py-1.5 text-[13px] font-semibold backdrop-blur-md",
        className,
      )}
    >
      <b className="text-accent">{score.toFixed(1)}</b> / {max}
    </span>
  );
}

/**
 * Barre de score. Elle se remplit à l'apparition si un parent porte
 * `vd-animate-bars` et reçoit `is-in` (voir <Reveal>).
 */
export function ScoreBar({ score, max = 10, className }: { score: number; max?: number; className?: string }) {
  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={score}
      aria-label={`Score ${score} out of ${max}`}
      className={cn("vd-bar w-[110px]", className)}
    >
      <span style={{ "--w": `${(score / max) * 100}%` } as React.CSSProperties} />
    </div>
  );
}

/** Anneau de score du verdict (rempli au rendu serveur, sans JavaScript). */
export function ScoreRing({ score, max = 10, className }: { score: number; max?: number; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Score ${score} out of ${max}`}
      className={cn("vd-ring", className)}
      style={{ "--v": (score / max) * 100 } as React.CSSProperties}
    >
      <div>
        <div aria-hidden>
          <strong className="text-[32px] font-light tracking-[-.04em]">{score.toFixed(1)}</strong>
          <small className="mt-1 block text-[11px] text-foreground-muted">/ {max}</small>
        </div>
      </div>
    </div>
  );
}

/** Étoiles décoratives (la note chiffrée reste la référence). */
export function Stars({ score, max = 10 }: { score: number; max?: number }) {
  const filled = Math.round((score / max) * 5);
  return (
    <span aria-hidden className="text-sm tracking-[2px] text-highlight">
      {"★".repeat(filled)}
      <span className="opacity-30">{"★".repeat(5 - filled)}</span>
    </span>
  );
}
