import Link from "next/link";
import { Logo } from "../ui/logo";
import type { NavItem } from "./site-header";

export interface SiteFooterProps {
  tagline: string;
  columns: { title: string; links: NavItem[] }[];
  copyright: string;
  /** Mention d'affiliation, obligatoire pour un site d'avis */
  disclosure?: string;
}

export function SiteFooter({ tagline, columns, copyright, disclosure }: SiteFooterProps) {
  return (
    <footer className="border-t border-border pt-[60px] pb-10 text-sm text-foreground-muted">
      <div className="mx-auto max-w-content px-5">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="mb-3.5 text-foreground" />
            <p className="max-w-[300px]">{tagline}</p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-3 font-medium text-foreground">{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="block py-1 transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-5 border-t border-border pt-6 text-xs">
          <span>{copyright}</span>
          {disclosure && <span>{disclosure}</span>}
        </div>
      </div>
    </footer>
  );
}
