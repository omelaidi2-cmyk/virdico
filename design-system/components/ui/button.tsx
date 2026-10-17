import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold " +
    "border border-transparent transition-all duration-300 cursor-pointer " +
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Bouton blanc lumineux : action principale */
        primary: "vd-glow-hover bg-cta text-cta-foreground",
        /** Bouton translucide bordé : actions secondaires (« All categories → ») */
        ghost: "border-border bg-white/[.03] text-foreground hover:border-border-strong",
        /** Bouton bleu électrique : à réserver aux CTA d'affiliation forts */
        accent: "bg-primary text-white hover:bg-primary-deep",
        link: "px-0 text-accent hover:underline underline-offset-4",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-[22px] text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";
