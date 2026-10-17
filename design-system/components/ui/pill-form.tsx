import * as React from "react";
import { cn } from "../../lib/cn";
import { buttonVariants } from "./button";

export interface PillFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "children"> {
  /** Attributs du champ (name, type, placeholder, required…) */
  input: React.InputHTMLAttributes<HTMLInputElement> & { "aria-label": string };
  submitLabel: React.ReactNode;
  pending?: boolean;
}

/** Champ + bouton dans une même capsule : recherche du hero et newsletter. */
export function PillForm({ input, submitLabel, pending, className, ...props }: PillFormProps) {
  const { className: inputClassName, ...inputProps } = input;

  return (
    <form
      className={cn(
        "flex items-center gap-2 rounded-full border border-border bg-[rgb(5_8_20/.65)] py-1.5 pr-1.5 pl-[18px] backdrop-blur-md",
        "focus-within:border-border-accent transition-colors",
        className,
      )}
      {...props}
    >
      <input
        className={cn(
          "min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-faint",
          inputClassName,
        )}
        {...inputProps}
      />
      <button type="submit" disabled={pending} className={buttonVariants({ size: "md" })}>
        {submitLabel}
      </button>
    </form>
  );
}
