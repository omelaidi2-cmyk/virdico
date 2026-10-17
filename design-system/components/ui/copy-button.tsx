"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  value: string;
  copiedLabel?: React.ReactNode;
}

/** Copie `value` dans le presse-papiers et affiche « Copied ✓ » pendant 1,8 s. */
export function CopyButton({ value, copiedLabel = "Copied ✓", className, children, ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Presse-papiers indisponible (http, permission refusée) : on garde le retour visuel.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button type="button" onClick={copy} className={cn(className, copied && "is-copied")} {...props}>
      <span aria-live="polite">{copied ? copiedLabel : children}</span>
    </button>
  );
}
