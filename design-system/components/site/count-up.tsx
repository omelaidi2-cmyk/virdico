"use client";

import * as React from "react";

/**
 * Compte de 0 à `value` en 1,4 s (easing cubique). Le rendu serveur affiche directement
 * la valeur finale : rien ne change sans JavaScript ni avec « réduire les animations ».
 */
export function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const format = (v: number) => v.toFixed(decimals) + suffix;
  const [text, setText] = React.useState(format(value));

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let start: number | null = null;
    const step = (t: number) => {
      start ??= t;
      const p = Math.min(1, (t - start) / 1400);
      setText((value * (1 - Math.pow(1 - p, 3))).toFixed(decimals) + suffix);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, decimals, suffix]);

  return <>{text}</>;
}
