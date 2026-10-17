"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/cn";

export interface NewsletterCtaProps {
  title?: string;
  description?: string;
  /** Appelée avec l'email ; brancher ici Resend, Brevo, ConvertKit… */
  onSubscribe: (email: string) => Promise<void>;
  className?: string;
}

export function NewsletterCta({
  title = "Recevez nos meilleurs conseils",
  description = "Un email par semaine. Des méthodes concrètes, zéro spam. Désinscription en un clic.",
  onSubscribe,
  className,
}: NewsletterCtaProps) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email") as string;
    setStatus("loading");
    try {
      await onSubscribe(email);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={cn("rounded-xl border border-border bg-surface p-8 md:p-10", className)}>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-foreground-muted">{description}</p>

      {status === "done" ? (
        <p role="status" className="mt-6 text-sm font-medium text-success">
          Merci ! Vérifiez votre boîte mail pour confirmer l'inscription.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Adresse email
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.com"
            className="sm:max-w-xs"
          />
          <Button type="submit" size="lg" disabled={status === "loading"} className="h-11">
            {status === "loading" ? "Inscription…" : "S'abonner"}
          </Button>
        </form>
      )}
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-danger">
          Une erreur est survenue. Réessayez dans un instant.
        </p>
      )}
    </section>
  );
}
