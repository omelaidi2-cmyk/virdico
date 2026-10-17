import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

export const chipVariants = cva("inline-flex items-center gap-1.5 rounded-full font-medium", {
  variants: {
    variant: {
      /** Catégorie d'un article */
      outline: "border border-border px-2.5 py-0.5 text-[11px] text-chip",
      /** Pastille « NEW » */
      solid: "bg-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white",
      /** Annonce en haut du hero : « NEW 2026 guide to… » */
      announce: "border border-border bg-white/[.03] py-1.5 pl-2 pr-3.5 text-[13px] text-foreground-muted",
    },
  },
  defaultVariants: { variant: "outline" },
});

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {}

export function Chip({ className, variant, ...props }: ChipProps) {
  return <span className={cn(chipVariants({ variant }), className)} {...props} />;
}
