import Link from "next/link";
import { cn } from "../../lib/cn";

/** Carré dégradé lumineux avec la coche, + nom du site. */
export function Logo({ name = "Virdico", href = "/", className }: { name?: string; href?: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label={`${name} home`}
      className={cn("flex items-center gap-[9px] text-lg font-semibold tracking-[-.02em]", className)}
    >
      <i
        aria-hidden
        className="grid size-[26px] place-items-center rounded-lg shadow-[0_0_18px_rgb(80_120_255/.6)] after:h-[7px] after:w-2.5 after:translate-x-px after:-translate-y-px after:-rotate-45 after:border-[2.5px] after:border-t-0 after:border-r-0 after:border-background after:content-['']"
        style={{ background: "var(--gradient-logo)" }}
      />
      {name}
    </Link>
  );
}
