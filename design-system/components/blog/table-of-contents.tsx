import { cn } from "../../lib/cn";

export interface TableOfContentsProps {
  items: { id: string; label: string }[];
  title?: string;
  className?: string;
}

/** Sommaire collant, à placer dans la colonne latérale de l'article. */
export function TableOfContents({ items, title = "On this page", className }: TableOfContentsProps) {
  return (
    <nav aria-label={title} className={cn("sticky top-28 text-sm", className)}>
      <p className="mb-3 text-xs uppercase tracking-[.18em] text-accent">{title}</p>
      <ol className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="-ml-px block border-l border-transparent py-1 pl-4 text-foreground-muted transition-colors hover:border-accent hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
