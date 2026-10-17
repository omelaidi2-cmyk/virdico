import type { Metadata } from "next";
import { PillForm, SearchIcon } from "@/design-system/components";
import { PostGrid } from "@/components/posts";
import { PageHeader, SiteShell, wrap } from "@/components/site-shell";
import { searchPosts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const results = searchPosts(q);

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search reviews"}
        description={q ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "Find a tool, a category or a comparison."}
      />
      <div className={`${wrap} pb-20 sm:pb-[110px]`}>
        <PillForm
          action="/search/"
          method="get"
          role="search"
          icon={<SearchIcon />}
          label="Search reviews"
          input={{ id: "q", name: "q", type: "search", defaultValue: q, placeholder: "Search a tool, e.g. email marketing…", autoComplete: "off" }}
          submitLabel="Search"
          className="mb-12 max-w-[560px]"
        />
        {q && results.length === 0 && (
          <p className="rounded-card border border-border bg-panel p-8 text-foreground-muted">
            No results. Try a category like “CRM”, “VPN” or “hosting”.
          </p>
        )}
        {results.length > 0 && <PostGrid posts={results} flow={false} mobileMid={false} />}
      </div>
    </SiteShell>
  );
}
