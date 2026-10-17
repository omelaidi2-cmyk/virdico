import Link from "next/link";
import { cn } from "../../lib/cn";

export function Logo({ name = "Virdico", className }: { name?: string; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 text-lg font-semibold tracking-tight", className)}>
      <i
        aria-hidden
        className="size-[26px] rounded-lg shadow-[0_0_18px_rgb(80_120_255/.6)]"
        style={{ background: "var(--gradient-logo)" }}
      />
      {name}
    </Link>
  );
}
