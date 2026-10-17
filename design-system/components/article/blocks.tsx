import * as React from "react";
import Link from "next/link";
import { AffiliateLink, buttonVariants } from "../ui/button";
import { FlaskIcon } from "../ui/icons";
import { Reveal } from "../ui/reveal";
import { ScoreBar } from "../ui/score";
import { cn } from "../../lib/cn";

/* Tous ces blocs portent `not-prose` : ils gardent leur style dans <Prose>. */

const panel = "rounded-[20px] border border-border bg-panel";

/** Mention d'affiliation en tête d'article. */
export function Disclosure({ href = "/affiliate-disclosure/" }: { href?: string }) {
  return (
    <p className="not-prose mb-[30px] flex gap-2.5 rounded-[14px] border border-dashed border-border px-[18px] py-3.5 text-[13px] text-foreground-muted">
      <span aria-hidden>ⓘ</span>
      <span>
        This article contains affiliate links. If you buy through them, we may earn a commission at no extra cost to you. It
        never changes our scores.{" "}
        <Link href={href} className="underline">
          Learn more
        </Link>
        .
      </span>
    </p>
  );
}

/** « Key takeaways » : l'essentiel en 4 points, pour les lecteurs pressés. */
export function KeyTakeaways({ items, title = "Key takeaways" }: { items: { label: string; text: string }[]; title?: string }) {
  return (
    <div className={cn("not-prose mb-2.5 px-[26px] py-6", panel)}>
      <h2 className="mb-2.5 text-[15px] font-semibold text-foreground">{title}</h2>
      <ul className="vd-check-list vd-check-list--dot space-y-1.5 text-[15px]">
        {items.map((item) => (
          <li key={item.label}>
            <strong className="font-semibold text-foreground">{item.label}:</strong> {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Capture d'écran avec légende. Sans `src` : vignette dégradée de remplacement. */
export function Screenshot({ src, alt, caption }: { src?: string; alt: string; caption: string }) {
  return (
    <figure className="not-prose my-7">
      <div className="vd-thumb grid aspect-video place-items-center overflow-hidden rounded-card border border-border text-[13px] text-[#7a86ad]">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} width={1280} height={720} loading="lazy" decoding="async" className="size-full object-cover" />
        ) : (
          alt
        )}
      </div>
      <figcaption className="mt-2.5 text-center text-[13px] text-foreground-muted">{caption}</figcaption>
    </figure>
  );
}

/** Détail de la note : une ligne par critère, barres animées à l'apparition. */
export function ScoreBreakdown({ ratings }: { ratings: { label: string; score: number }[] }) {
  return (
    <Reveal className={cn("vd-animate-bars not-prose my-[22px] px-[22px] py-2", panel)}>
      <dl>
        {ratings.map((rating) => (
          <div
            key={rating.label}
            className="grid grid-cols-[110px_1fr_34px] items-center gap-3.5 border-b border-border py-3 text-[15px] last:border-0 sm:grid-cols-[150px_1fr_40px]"
          >
            <dt>{rating.label}</dt>
            <dd className="contents">
              <ScoreBar score={rating.score} className="w-auto" />
              <b className="text-right text-foreground">{rating.score.toFixed(1)}</b>
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

/** Deux colonnes ✓ / ✕ : « Great for / Not for » ou « What we like / What could be better ». */
export function CheckColumns({
  good,
  bad,
}: {
  good: { title: string; items: string[] };
  bad: { title: string; items: string[] };
}) {
  return (
    <div className="not-prose my-6 grid gap-3.5 sm:grid-cols-2">
      {[
        { ...good, tone: "good" as const },
        { ...bad, tone: "bad" as const },
      ].map((col) => (
        <div key={col.tone} className={cn("p-[22px]", panel)}>
          <h3 className={cn("mb-2.5 text-[15px] font-semibold", col.tone === "good" ? "text-success" : "text-danger")}>{col.title}</h3>
          <ul className={cn("vd-check-list space-y-1.5 text-[15px]", col.tone === "good" ? "vd-check-list--good" : "vd-check-list--bad")}>
            {col.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Encart d'incitation au milieu de l'article (halo bleu). */
export function Callout({ title, text, cta }: { title: string; text: string; cta: { label: string; href: string } }) {
  return (
    <div className="not-prose vd-callout-glow my-[34px] rounded-3xl border border-[rgb(120_150_255/.3)] p-[30px]">
      <h3 className="mb-2.5 text-[21px] font-medium tracking-[-.02em] text-foreground">{title}</h3>
      <p className="mb-[18px]">{text}</p>
      <AffiliateLink href={cta.href} variant="primary">
        {cta.label}
      </AffiliateLink>
    </div>
  );
}

/** « How we tested » : rappel de la méthode, avec lien vers la page dédiée. */
export function MethodNote({ children, href = "/how-we-test/" }: { children: React.ReactNode; href?: string }) {
  return (
    <div className={cn("not-prose my-[22px] flex gap-4 p-[22px] text-[15px] [&>svg]:mt-0.5 [&>svg]:size-[26px] [&>svg]:flex-none [&>svg]:text-accent", panel)}>
      <FlaskIcon />
      <p>
        <strong className="font-semibold text-foreground">How we tested:</strong> {children}{" "}
        <Link href={href} className="text-accent underline-offset-4 hover:underline">
          See our full method
        </Link>
        .
      </p>
    </div>
  );
}

/** Verdict final : 2–3 phrases + CTA d'affiliation + lien vers la comparaison. */
export function FinalVerdict({
  children,
  cta,
  compareHref = "#compare",
}: {
  children: React.ReactNode;
  cta: { label: string; href: string };
  compareHref?: string;
}) {
  return (
    <div
      className="not-prose my-[22px] rounded-3xl border border-[rgb(120_150_255/.3)] p-[30px]"
      style={{ background: "var(--gradient-panel-diag)" }}
    >
      <div className="mb-[18px]">{children}</div>
      <div className="flex flex-wrap gap-2.5">
        <AffiliateLink href={cta.href}>{cta.label}</AffiliateLink>
        <a href={compareHref} className={buttonVariants({ variant: "ghost" })}>
          Compare alternatives
        </a>
      </div>
    </div>
  );
}

/** FAQ en <details>. Garder le même texte que le JSON-LD FAQPage. */
export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="not-prose vd-faq">
      {items.map((item) => (
        <details key={item.question} className="border-b border-border py-4">
          <summary className="font-medium text-foreground">{item.question}</summary>
          <p className="mt-2.5 text-[15px] text-foreground-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** Dates de publication et de mise à jour, en bas d'article. */
export function ArticleDates({ published, updated }: { published: { iso: string; label: string }; updated: { iso: string; label: string } }) {
  return (
    <p className="not-prose mt-4 text-[13px] text-foreground-muted">
      First published <time dateTime={published.iso}>{published.label}</time> · Last updated{" "}
      <time dateTime={updated.iso}>{updated.label}</time>
    </p>
  );
}

/** Bio de l'auteur (E-E-A-T). */
export function AuthorBio({ name, role, bio, href, avatar }: { name: string; role: string; bio: string; href: string; avatar?: string }) {
  return (
    <aside aria-labelledby="bio-title" className={cn("not-prose mt-[50px] flex flex-col gap-[18px] rounded-[22px] p-[26px] sm:flex-row", panel)}>
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatar} alt="" width={64} height={64} className="size-16 flex-none rounded-full object-cover" />
      ) : (
        <span aria-hidden className="size-16 flex-none rounded-full" style={{ background: "linear-gradient(135deg, var(--accent), var(--primary))" }} />
      )}
      <div>
        <h2 id="bio-title" className="mb-0.5 text-lg font-semibold text-foreground">
          {name}
        </h2>
        <p className="mb-2 text-[13px] text-accent">{role}</p>
        <p className="text-[15px] text-foreground-muted">
          {bio}{" "}
          <Link href={href} className="text-accent hover:underline">
            More about me
          </Link>
        </p>
      </div>
    </aside>
  );
}
