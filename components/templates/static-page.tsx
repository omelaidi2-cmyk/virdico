import { JsonLd, Prose } from "@/design-system/components";
import { breadcrumbs, organization } from "@/design-system/lib/seo";
import { PageHeader, SiteShell } from "@/components/site-shell";
import { formatDate, site } from "@/content/site";
import type { PageMeta } from "@/content/types";

/** Page éditoriale simple (À propos, méthode, mentions légales…). */
export function StaticPageTemplate({ meta, Content }: { meta: PageMeta; Content: React.ComponentType }) {
  return (
    <SiteShell>
      <JsonLd
        data={[
          organization(site),
          breadcrumbs(site, [
            { name: "Home", path: "/" },
            { name: meta.title, path: `/${meta.slug}/` },
          ]),
        ]}
      />
      <PageHeader eyebrow={meta.eyebrow} title={meta.title} description={meta.description} />
      <div className="mx-auto max-w-[760px] px-4 pt-6 pb-[100px] sm:px-5">
        <Prose>
          <Content />
          {meta.updated && (
            <p className="not-prose mt-10 text-[13px] text-foreground-muted">
              Last updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
            </p>
          )}
        </Prose>
      </div>
    </SiteShell>
  );
}
