import Link from "next/link";
import { buttonVariants } from "@/design-system/components";
import { PageHeader, SiteShell, wrap } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <PageHeader eyebrow="404" title="This page" muted="does not exist." description="The link may be broken, or the page was moved." />
      <div className={`${wrap} flex flex-wrap gap-2.5 pb-[110px]`}>
        <Link href="/" className={buttonVariants()}>
          Back to home
        </Link>
        <Link href="/reviews/" className={buttonVariants({ variant: "ghost" })}>
          Browse reviews
        </Link>
      </div>
    </SiteShell>
  );
}
