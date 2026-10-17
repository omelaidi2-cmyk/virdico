import Link from "next/link";
import { Logo } from "../ui/logo";
import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/cn";

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  items: NavItem[];
  /** href de l'élément actif */
  current?: string;
  cta: NavItem;
}

/** Barre flottante : logo · navigation en capsule floutée · bouton blanc. */
export function SiteHeader({ items, current, cta }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-[18px] z-50">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-5">
        <Logo />

        <nav
          aria-label="Main"
          className="hidden gap-1 rounded-full border border-border bg-overlay p-1.5 backdrop-blur-[14px] lg:flex"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === current ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-foreground-muted transition-colors duration-200",
                "hover:bg-white/[.07] hover:text-foreground aria-[current=page]:bg-white/[.07] aria-[current=page]:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={cta.href} className={cn(buttonVariants(), "hidden sm:inline-flex")}>
            {cta.label}
          </Link>
          {/* Brancher ici un menu mobile (Sheet / Dialog) */}
          <Link href="#menu" className={cn(buttonVariants({ variant: "ghost" }), "lg:hidden")}>
            Menu
          </Link>
        </div>
      </div>
    </header>
  );
}
