import type { Metadata } from "next";
import { DealCard, NewsletterCta } from "@/design-system/components";
import { subscribe } from "../actions";
import { PageHeader, SiteShell, wrap } from "@/components/site-shell";
import { deals } from "@/content/deals";

export const metadata: Metadata = {
  title: "SaaS Deals & Coupon Codes",
  description: "Exclusive SaaS discounts and coupon codes for CRM, VPN, hosting, email marketing and AI tools, checked by the Virdico team.",
  alternates: { canonical: "/deals/" },
  openGraph: { url: "/deals/" },
};

export default function DealsPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Deals"
        title="Save on the tools"
        muted="you already need."
        description="Exclusive discounts and coupon codes, checked by our team. Some links are affiliate links."
      />
      <div className={`${wrap} pb-20 sm:pb-[110px]`}>
        <div className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal, i) => (
            <DealCard key={deal.suffix} index={i} {...deal} />
          ))}
        </div>
        <div className="mt-20 sm:mt-[110px]">
          <NewsletterCta onSubscribe={subscribe} />
        </div>
      </div>
    </SiteShell>
  );
}
