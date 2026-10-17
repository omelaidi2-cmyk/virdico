import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Colonne de lecture de l'article (contenu MDX). Les blocs `not-prose`
 * (verdict, tableaux, encarts…) gardent leur propre style.
 */
export function Prose({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <article className={cn("prose-vd min-w-0 max-w-none", className)} {...props} />;
}

/** Grille 3 colonnes : sommaire · article · colonne latérale (2 puis 1 colonne en dessous). */
export function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-content gap-12 px-4 pt-10 pb-[100px] sm:px-5 md:grid-cols-[minmax(0,1fr)_280px] md:pt-[60px] 2xl:grid-cols-[220px_minmax(0,1fr)_280px]">
      {children}
    </div>
  );
}
