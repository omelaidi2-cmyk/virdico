"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TocItem {
  id: string;
  label: string;
}

/** Sommaire collant (≥ 1100px), avec la section en cours surlignée. */
export function TableOfContents({ items, title = "Contents" }: { items: TocItem[]; title?: string }) {
  const [active, setActive] = React.useState(items[0]?.id);

  React.useEffect(() => {
    const onScroll = () => {
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 140) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label="Table of contents" className="vd-no-print sticky top-[100px] hidden self-start text-sm 2xl:block">
      <h2 className="mb-3.5 text-xs font-semibold uppercase tracking-[.16em] text-accent">{title}</h2>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={item.id === active ? "location" : undefined}
          className={cn(
            "block border-l border-border py-[7px] pl-3.5 text-foreground-muted transition-colors hover:border-accent hover:text-foreground",
            item.id === active && "border-accent text-foreground",
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

/** Sommaire repliable affiché en tête d'article sous 1100px. */
export function MobileToc({ items, title = "Contents" }: { items: TocItem[]; title?: string }) {
  const ref = React.useRef<HTMLDetailsElement>(null);
  return (
    <details ref={ref} className="not-prose group mb-[26px] rounded-2xl border border-border bg-panel 2xl:hidden">
      <summary className="flex cursor-pointer list-none justify-between px-[18px] py-3.5 font-semibold text-foreground after:text-accent after:content-['+'] group-open:after:content-['−'] [&::-webkit-details-marker]:hidden">
        {title}
      </summary>
      <nav aria-label="Table of contents" className="px-[18px] pb-3.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => ref.current && (ref.current.open = false)}
            className="block py-1.5 text-[15px] text-foreground-muted hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
