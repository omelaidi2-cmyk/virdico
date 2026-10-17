import { AffiliateLink } from "../ui/button";
import { Chip } from "../ui/chip";
import { CopyButton } from "../ui/copy-button";
import { Reveal } from "../ui/reveal";
import { cn } from "../../lib/cn";

export interface DealCardProps {
  category: string;
  /** « 30% », « $2.99 » */
  value: string;
  /** « off · Tool A », « /mo · Tool H » */
  suffix: string;
  description: string;
  /** Code promo ; absent = « No code needed » */
  code?: string;
  expires: string;
  href: string;
  index?: number;
}

/** Coupon : code copiable, date d'expiration, bouton bleu « Get deal ». */
export function DealCard({ category, value, suffix, description, code, expires, href, index = 0 }: DealCardProps) {
  return (
    <Reveal delay={(index % 4) * 70} className="flex flex-col gap-3.5 overflow-hidden rounded-card border border-border bg-panel p-[26px]">
      <Chip className="self-start">{category}</Chip>
      <p className="text-[44px] font-light leading-none tracking-[-.04em]">
        {value}
        <span className="ml-1 text-base tracking-normal text-foreground-muted">{suffix}</span>
      </p>
      <p className="text-sm text-foreground-muted">{description}</p>
      <Coupon code={code} />
      <span className="text-xs text-highlight">{expires}</span>
      <AffiliateLink href={href}>Get deal</AffiliateLink>
    </Reveal>
  );
}

/** Capsule en pointillés avec le code et un bouton « Copy ». */
export function Coupon({ code, className }: { code?: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2.5 rounded-full border border-dashed border-[rgb(143_176_255/.45)] py-1.5 pr-1.5 pl-4 font-mono text-sm tracking-[.06em]",
        className,
      )}
    >
      <span>{code ?? "No code needed"}</span>
      {code ? (
        <CopyButton
          value={code}
          aria-label={`Copy code ${code}`}
          className="cursor-pointer rounded-full bg-[rgb(143_176_255/.12)] px-3.5 py-2 font-sans text-xs font-semibold tracking-normal transition-colors hover:bg-[rgb(143_176_255/.25)] [&.is-copied]:bg-success [&.is-copied]:text-background"
        >
          Copy
        </CopyButton>
      ) : (
        <span className="px-3.5 py-2 font-sans text-xs font-semibold tracking-normal text-success">Applied automatically</span>
      )}
    </div>
  );
}
