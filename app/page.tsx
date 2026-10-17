import {
  Banner,
  CategoryCard,
  ComparisonTable,
  DealCard,
  Hero,
  HowWeTest,
  JsonLd,
  NewsletterCta,
  SectionHeading,
  TopicMarquee,
  buttonVariants,
} from "@/design-system/components";
import { organization, website } from "@/design-system/lib/seo";
import { subscribe } from "./actions";
import { PostCardFor, categoryIcons } from "@/components/posts";
import { SiteShell, wrap } from "@/components/site-shell";
import { slot } from "@/content/banners";
import { categories } from "@/content/categories";
import { deals } from "@/content/deals";
import { announcement, crmComparison, heroStats, popular, testSteps, topics } from "@/content/home";
import { postsByCategory, posts } from "@/content/posts";
import { site } from "@/content/site";

export const metadata = {
  title: { absolute: "Virdico — Honest SaaS Reviews, Comparisons & Deals" },
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Virdico — Honest SaaS Reviews, Comparisons & Deals" },
};

const section = "py-20 sm:py-[110px]";
const sectionTight = "pb-20 sm:pb-[110px]";

function ViewAll({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className={buttonVariants({ variant: "ghost" })}>
      {label} →
    </a>
  );
}

export default function HomePage() {
  const featured = posts.find((p) => p.meta.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const compact = rest.slice(0, 3);
  const grid = rest.slice(3, 6);

  return (
    <SiteShell>
      <JsonLd data={[organization(site), website(site)]} />

      <Hero
        announcement={announcement}
        title={
          <>
            Turn software
            <br />
            into <span className="vd-text-gradient">momentum</span>
          </>
        }
        description="We test SaaS tools hands-on and compare them side by side, so you pick the right software for your business — without wasting a single trial."
        search={{ action: "/search/", placeholder: "Search a tool, e.g. email marketing…" }}
        popular={popular}
        stats={heroStats}
        next="categories"
      />

      <TopicMarquee topics={topics} />

      <section id="categories" aria-labelledby="cat-title" className={section}>
        <div className={wrap}>
          <SectionHeading
            id="cat-title"
            eyebrow="Categories"
            title="Find the right tool"
            muted="for every part of your business."
            action={<ViewAll href="/categories/" label="All categories" />}
          />
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, i) => (
              <CategoryCard
                key={category.slug}
                index={i}
                href={`/${category.slug}/`}
                icon={categoryIcons[category.icon]}
                name={category.name}
                count={postsByCategory(category.slug).length}
                countLabel={postsByCategory(category.slug).length === 1 ? "guide" : "guides"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bannière 1 — Leaderboard : bande de la page d'accueil */}
      <div className={`${wrap} ${sectionTight}`}>
        <Banner size="wide" creative={slot("homeWide")} />
      </div>

      <section id="reviews" aria-labelledby="rev-title" className={sectionTight}>
        <div className={wrap}>
          <SectionHeading
            id="rev-title"
            eyebrow="Latest reviews"
            title="Tested by hand."
            muted="Rated with numbers."
            action={<ViewAll href="/reviews/" label="All reviews" />}
          />
          <div className="grid gap-[18px] min-[900px]:grid-cols-[minmax(0,1fr)_160px]">
            <div className="grid gap-[18px]">
              <div className="grid gap-[18px] lg:grid-cols-[1.35fr_1fr]">
                <PostCardFor post={featured} variant="featured" withDate />
                <div className="grid gap-[18px]">
                  {compact.map((post, i) => (
                    <PostCardFor key={post.meta.slug} post={post} variant="compact" index={i + 1} />
                  ))}
                </div>
              </div>
              {/* Bannière 4 — In-feed : entre les articles de la grille */}
              <Banner size="flow" creative={slot("homeFlow")} />
              <div className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
                {grid.map((post, i) => (
                  <PostCardFor key={post.meta.slug} post={post} index={i} />
                ))}
              </div>
              {/* Bannière 6 — Mobile mid : sous la grille, mobile uniquement */}
              <Banner size="mobile-mid" creative={slot("homeMobileMid")} />
            </div>
            {/* Bannière 2 — Skyscraper : colonne latérale desktop, collante */}
            <Banner size="sky" creative={slot("homeSky")} />
          </div>
        </div>
      </section>

      <section id="compare" aria-labelledby="cmp-title" className={sectionTight}>
        <div className={wrap}>
          <SectionHeading
            id="cmp-title"
            eyebrow="Quick comparison"
            title="Best CRM tools"
            muted="at a glance."
            action={<ViewAll href="/best-crm-software/" label="Full comparison" />}
          />
          <ComparisonTable caption="Scores from our hands-on tests. Last updated October 2026." rows={crmComparison} />
        </div>
      </section>

      <section id="how" aria-labelledby="how-title" className={sectionTight}>
        <div className={wrap}>
          <SectionHeading
            id="how-title"
            eyebrow="How we test"
            title="No copy-paste reviews."
            muted="Every tool gets real work."
            action={<ViewAll href="/how-we-test/" label="Our method" />}
          />
          <HowWeTest steps={testSteps} />
        </div>
      </section>

      <section id="deals" aria-labelledby="deal-title" className={sectionTight}>
        <div className={wrap}>
          <SectionHeading
            id="deal-title"
            eyebrow="Deals"
            title="Save on the tools"
            muted="you already need."
            action={<ViewAll href="/deals/" label="All deals" />}
          />
          <div className="grid gap-[18px] lg:grid-cols-3">
            {deals.slice(0, 3).map((deal, i) => (
              <DealCard key={deal.suffix} index={i} {...deal} />
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" aria-labelledby="nl-title" className={sectionTight}>
        <div className={wrap}>
          <NewsletterCta onSubscribe={subscribe} />
        </div>
      </section>
    </SiteShell>
  );
}
