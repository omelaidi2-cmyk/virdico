"use client";

import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { PillForm } from "../ui/pill-form";
import { Eyebrow } from "../ui/section-heading";
import { cn } from "../../lib/cn";

export interface NewsletterProps {
  /** Server Action ou appel API (Resend, Beehiiv, ConvertKit…) */
  onSubscribe: (email: string) => Promise<void>;
  privacyHref?: string;
  className?: string;
}

function useSubscribe(onSubscribe: NewsletterProps["onSubscribe"]) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "error">("idle");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    try {
      await onSubscribe(String(new FormData(form).get("email")));
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }
  const message =
    status === "done" ? "Thanks! Check your inbox to confirm." : status === "error" ? "Something went wrong. Please try again." : "";
  return { status, handleSubmit, message };
}

/** Grand bloc centré à lueur montante (accueil). */
export function NewsletterCta({
  onSubscribe,
  privacyHref = "/privacy-policy/",
  eyebrow = "Weekly deals",
  title = "Exclusive SaaS discounts, every Friday.",
  description = "Get the best software deals and our newest reviews in your inbox. No spam, unsubscribe anytime.",
  className,
}: NewsletterProps & { eyebrow?: string; title?: string; description?: string }) {
  const { status, handleSubmit, message } = useSubscribe(onSubscribe);

  return (
    <div className={cn("vd-cta-glow rounded-3xl border border-border px-5 py-[60px] text-center sm:rounded-cta sm:px-10 sm:py-20", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id="nl-title" className="mx-auto mb-4 max-w-[720px] text-h2 font-light">
        {title}
      </h2>
      <p className="mx-auto mb-[30px] max-w-[520px] text-foreground-soft">{description}</p>
      <PillForm
        onSubmit={handleSubmit}
        pending={status === "loading"}
        className="mx-auto max-w-[460px]"
        label="Email address"
        input={{ id: "nl-email", name: "email", type: "email", required: true, autoComplete: "email", placeholder: "your@email.com" }}
        submitLabel={status === "loading" ? "Subscribing…" : "Subscribe"}
      />
      <p role="status" aria-live="polite" className={cn("mt-3 min-h-5 text-sm", status === "error" ? "text-danger" : "text-success")}>
        {message}
      </p>
      <p className="mt-3.5 text-xs text-foreground-muted">
        By subscribing you agree to our{" "}
        <Link href={privacyHref} className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

/** Version compacte, en fin d'article. */
export function NewsletterInline({
  onSubscribe,
  title = "Get SaaS deals every Friday",
  description = "New reviews and exclusive discounts. No spam.",
}: NewsletterProps & { title?: string; description?: string }) {
  const { status, handleSubmit, message } = useSubscribe(onSubscribe);

  return (
    <div className="not-prose vd-callout-glow mt-[60px] grid gap-[18px] rounded-[26px] border border-border px-5 py-[26px] sm:p-[34px]">
      <div>
        <h2 className="text-[28px] font-light tracking-[-.03em] text-foreground">{title}</h2>
        <p className="text-sm text-foreground-soft">{description}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-[440px] gap-2 rounded-full border border-border bg-[rgb(5_8_20/.65)] py-1.5 pr-1.5 pl-[18px]"
      >
        <label htmlFor="nl-inline-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-inline-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground-faint"
        />
        <button type="submit" disabled={status === "loading"} className={buttonVariants({ size: "sm" })}>
          Subscribe
        </button>
      </form>
      <p role="status" aria-live="polite" className={cn("text-[13px]", status === "error" ? "text-danger" : "text-success")}>
        {message}
      </p>
    </div>
  );
}
