"use client";

import * as React from "react";
import { PillForm } from "../ui/pill-form";
import { Eyebrow } from "../ui/section-heading";
import { cn } from "../../lib/cn";

export interface NewsletterCtaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Server Action ou appel API (Resend, Beehiiv, ConvertKit…) */
  onSubscribe: (email: string) => Promise<void>;
  className?: string;
}

/** Grand bloc arrondi avec lueur bleue montante. */
export function NewsletterCta({
  eyebrow = "Weekly deals",
  title = "Exclusive SaaS discounts, every Friday.",
  description = "Get the best software deals and our newest reviews in your inbox. No spam, unsubscribe anytime.",
  onSubscribe,
  className,
}: NewsletterCtaProps) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email"));
    setStatus("loading");
    try {
      await onSubscribe(email);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className={cn("vd-cta-glow rounded-cta border border-border px-5 py-16 text-center sm:px-10 sm:py-20", className)}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mx-auto mb-4 max-w-[720px] text-h2 font-light">{title}</h2>
      <p className="mx-auto mb-[30px] max-w-[520px] text-foreground-soft">{description}</p>

      {status === "done" ? (
        <p role="status" className="font-semibold text-accent">
          You're in. Check your inbox to confirm.
        </p>
      ) : (
        <PillForm
          onSubmit={handleSubmit}
          pending={status === "loading"}
          className="mx-auto max-w-[460px]"
          input={{ name: "email", type: "email", required: true, autoComplete: "email", placeholder: "your@email.com", "aria-label": "Email" }}
          submitLabel={status === "loading" ? "Subscribing…" : "Subscribe"}
        />
      )}
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-danger">
          Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}
