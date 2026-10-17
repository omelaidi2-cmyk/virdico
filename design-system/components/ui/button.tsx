import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold leading-tight " +
    "border border-transparent cursor-pointer transition-[transform,box-shadow,border-color,background] duration-[250ms] ease-out " +
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Blanc lumineux : action n°1 d'un bloc (navigation, recherche, newsletter) */
        primary: "vd-glow-hover bg-cta text-cta-foreground",
        /** Bleu dégradé : CTA d'affiliation (« Try ToolName free », « Get deal ») */
        blue: "vd-button-blue",
        /** Verre bordé : actions secondaires (« All reviews → », « Visit site ») */
        ghost: "border-border bg-white/[.03] text-foreground hover:border-border-strong hover:bg-white/[.06]",
        link: "px-0 text-accent hover:underline underline-offset-4",
      },
      size: {
        sm: "px-4 py-[9px] text-[13px]",
        md: "px-[22px] py-3 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

/** Bouton rond 42px (menu, fermer, retour en haut, partage). */
export const iconButtonClass =
  "grid size-[42px] place-items-center rounded-full border border-border bg-white/[.03] transition-colors " +
  "hover:border-border-strong [&_svg]:size-[18px] cursor-pointer";

/** Lien d'affiliation : rel sponsored + nouvel onglet, toujours. */
export function AffiliateLink({
  className,
  variant = "blue",
  size,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>) {
  return (
    <a
      rel="sponsored nofollow noopener"
      target="_blank"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
