import * as React from "react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { FacebookIcon, LinkedInIcon, XIcon } from "../ui/icons";
import { CookieSettingsButton } from "./cookie-banner";
import type { NavItem } from "./site-header";

const socialIcons = { x: XIcon, facebook: FacebookIcon, linkedin: LinkedInIcon };

export interface SiteFooterProps {
  tagline: string;
  social?: { network: keyof typeof socialIcons; href: string; label: string }[];
  columns: { title: string; links: NavItem[] }[];
  legal: NavItem[];
  siteName?: string;
  /** Mention d'affiliation, obligatoire pour un site d'avis */
  disclosure: string;
}

export function SiteFooter({ tagline, social, columns, legal, siteName = "Virdico", disclosure }: SiteFooterProps) {
  return (
    <footer className="vd-no-print border-t border-border pt-[70px] pb-10 text-sm text-foreground-muted">
      <div className="mx-auto max-w-content px-4 sm:px-5">
        <div className="grid grid-cols-2 gap-[30px] lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-full lg:col-span-1">
            <Logo className="mb-3.5 text-foreground" />
            <p className="max-w-[320px]">{tagline}</p>
            {social && (
              <div className="mt-[18px] flex gap-2">
                {social.map(({ network, href, label }) => {
                  const Icon = socialIcons[network];
                  return (
                    <a
                      key={network}
                      href={href}
                      aria-label={label}
                      rel="noopener"
                      target="_blank"
                      className="grid size-[38px] place-items-center rounded-full border border-border text-foreground transition-colors hover:border-border-strong [&_svg]:size-4"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h4 className="mb-3 font-semibold text-foreground">{column.title}</h4>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className="block py-1 transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-[46px] flex flex-wrap justify-between gap-5 border-t border-border pt-6 text-xs">
          <span>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </span>
          <nav aria-label="Legal" className="flex flex-wrap gap-[18px]">
            {legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
            <CookieSettingsButton />
          </nav>
        </div>
        <p className="mt-[18px] text-xs">{disclosure}</p>
      </div>
    </footer>
  );
}
