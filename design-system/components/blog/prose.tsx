import * as React from "react";
import { cn } from "../../lib/cn";

/** Conteneur typographique pour le contenu MDX / HTML d'un article. */
export function Prose({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("prose-vd", className)} {...props} />;
}
