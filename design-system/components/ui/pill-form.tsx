import * as React from "react";
import { cn } from "../../lib/cn";
import { buttonVariants } from "./button";

export interface PillFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "children"> {
  /** Attributs du champ (id, name, type, placeholder, required…) */
  input: React.InputHTMLAttributes<HTMLInputElement> & { id: string };
  /** Libellé du champ, lu par les lecteurs d'écran */
  label: string;
  submitLabel: React.ReactNode;
  /** Icône à gauche du champ (loupe pour la recherche) */
  icon?: React.ReactNode;
  pending?: boolean;
}

/** Champ + bouton blanc dans une même capsule : recherche du hero, newsletter. */
export function PillForm({ input, label, submitLabel, icon, pending, className, ...props }: PillFormProps) {
  const { className: inputClassName, ...inputProps } = input;

  return (
    <form
      className={cn(
        "flex items-center gap-2 rounded-full border border-border bg-[rgb(5_8_20/.65)] py-1.5 pr-1.5 pl-[18px] backdrop-blur-md",
        "transition-colors focus-within:border-[rgb(143_176_255/.55)]",
        className,
      )}
      {...props}
    >
      {icon && <span aria-hidden className="flex-none text-foreground-muted [&_svg]:size-[18px]">{icon}</span>}
      <label htmlFor={input.id} className="sr-only">
        {label}
      </label>
      <input
        className={cn(
          "min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-foreground-faint",
          inputClassName,
        )}
        {...inputProps}
      />
      <button type="submit" disabled={pending} className={buttonVariants()}>
        {submitLabel}
      </button>
    </form>
  );
}
