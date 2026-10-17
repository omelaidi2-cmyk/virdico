import { Banner, JsonLd, NewsletterCta } from "@/design-system/components";
import { breadcrumbs, organization } from "@/design-system/lib/seo";
import { subscribe } from "@/app/actions";
import { PostGrid } from "@/components/posts";
import { PageHeader, SiteShell, wrap } from "@/components/site-shell";
import { slot } from "@/content/banners";
import { site } from "@/content/site";
import type { Post } from "@/content/types";

export interface ListingTemplateProps {
  eyebrow: string;
  title: string;
  muted?: string;
  description: string;
  path: string;
  posts: Post[];
  /** Contenu ajouté sous l'en-tête (filtres de catégories…) */
  children?: React.ReactNode;
}

/** Page de liste (Reviews, Comparisons, catégories). Bannières : wide + flow (in-feed) + mobile-mid + sticky. */
export function ListingTemplate({ eyebrow, title, muted, description, path, posts, children }: ListingTemplateProps) {
  return (
    <SiteShell>
      <JsonLd
        data={[
          organization(site),
          breadcrumbs(site, [
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
          {
            "@type": "CollectionPage",
            name: title,
            description,
            url: `${site.url}${path}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/${p.meta.slug}/` })),
            },
          },
        ]}
      />
      <PageHeader eyebrow={eyebrow} title={title} muted={muted} description={description} />

      <div className={`${wrap} pb-20 sm:pb-[110px]`}>
        {children}
        {/* Bannière 1 — Leaderboard */}
        <Banner size="wide" creative={slot("categoryWide")} className="mb-12" />

        {posts.length > 0 ? (
          <PostGrid posts={posts} flow={slot("categoryFlow")} flowAfter={3} mobileMid={slot("categoryMobileMid")} />
        ) : (
          <p className="rounded-card border border-border bg-panel p-8 text-foreground-muted">
            New guides are coming soon in this category.
          </p>
        )}

        <div className="mt-20 sm:mt-[110px]">
          <NewsletterCta onSubscribe={subscribe} />
        </div>
      </div>
    </SiteShell>
  );
}
