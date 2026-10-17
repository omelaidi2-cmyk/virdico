/**
 * Exemple : page d'accueil (app/page.tsx), reconstruite à partir du template audité.
 * Remplacer les contenus marqués EDIT par les vraies données (CMS / MDX).
 */
import type { Metadata } from "next";
import {
  BackToTop,
  BoardIcon,
  BrowserIcon,
  CategoryCard,
  ChartIcon,
  ComparisonTable,
  CookieBanner,
  DealCard,
  Hero,
  HowWeTest,
  JsonLd,
  MailIcon,
  NewsletterCta,
  PostCard,
  SectionHeading,
  ServerIcon,
  ShieldIcon,
  SiteFooter,
  SiteHeader,
  SkipLink,
  SparkIcon,
  TopicMarquee,
  UsersIcon,
  buttonVariants,
} from "../components";
import { organization, website, type Site } from "../lib/seo";
import { subscribe } from "./actions";
import { footer, nav } from "./site-config";

const site: Site = {
  name: "Virdico",
  url: "https://virdico.com",
  logo: "/images/logo.png",
  sameAs: ["https://x.com/virdico", "https://www.facebook.com/virdico", "https://www.linkedin.com/company/virdico"],
};

export const metadata: Metadata = {
  title: "Virdico — Honest SaaS Reviews, Comparisons & Deals",
  description:
    "Virdico tests SaaS tools hands-on and compares them side by side — CRM, email marketing, AI, hosting and more — so you pick the right software, fast.",
  alternates: { canonical: "https://virdico.com/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    siteName: "Virdico",
    url: "https://virdico.com/",
    images: [{ url: "https://virdico.com/images/og-home.jpg", width: 1200, height: 630 }], // EDIT
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

const categories = [
  { href: "/crm/", icon: <UsersIcon />, name: "CRM & Sales", count: 42 },
  { href: "/email-marketing/", icon: <MailIcon />, name: "Email Marketing", count: 36 },
  { href: "/project-management/", icon: <BoardIcon />, name: "Project Management", count: 28 },
  { href: "/ai-tools/", icon: <SparkIcon />, name: "AI Tools", count: 51 },
  { href: "/website-builders/", icon: <BrowserIcon />, name: "Website Builders", count: 24 },
  { href: "/vpn/", icon: <ShieldIcon />, name: "VPN & Security", count: 19 },
  { href: "/accounting/", icon: <ChartIcon />, name: "Accounting", count: 17 },
  { href: "/web-hosting/", icon: <ServerIcon />, name: "Web Hosting", count: 22 },
];

const section = "py-20 sm:py-[110px]";
const wrap = "mx-auto max-w-content px-4 sm:px-5";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organization(site), website(site)]} />
      <SkipLink />
      <SiteHeader
        items={nav}
        current="/"
        mobileExtra={[{ label: "How we test", href: "#how" }]}
        cta={{ label: "Get the best deals", href: "#newsletter" }}
      />

      <main id="main">
        <Hero
          announcement={{ badge: "NEW", text: "2026 guide to the best CRM tools", href: "/best-crm-software/" }}
          title={
            <>
              Turn software
              <br />
              into <span className="vd-text-gradient">momentum</span>
            </>
          }
          description="We test SaaS tools hands-on and compare them side by side, so you pick the right software for your business — without wasting a single trial."
          search={{ action: "/search", placeholder: "Search a tool, e.g. email marketing…" }}
          popular={[
            { label: "CRM", href: "/best-crm-software/" },
            { label: "VPN", href: "/best-vpn/" },
            { label: "AI writing", href: "/best-ai-writing-tools/" },
            { label: "Hosting", href: "/best-web-hosting/" },
          ]}
          stats={[
            { value: 4.9, decimals: 1, label: "Reader rating" }, // EDIT : vrais chiffres
            { value: 320, suffix: "+", label: "Tools tested" },
            { value: 15, suffix: "k", label: "Monthly readers" },
          ]}
          next="categories"
        />

        <TopicMarquee topics={["CRM", "Email Marketing", "Project Management", "Website Builders", "VPN", "AI Writing", "Accounting", "Web Hosting"]} />

        <section id="categories" aria-labelledby="cat-title" className={section}>
          <div className={wrap}>
            <SectionHeading
              id="cat-title"
              eyebrow="Categories"
              title="Find the right tool"
              muted="for every part of your business."
              action={<a href="/categories/" className={buttonVariants({ variant: "ghost" })}>All categories →</a>}
            />
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, i) => (
                <CategoryCard key={category.href} index={i} {...category} />
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" aria-labelledby="rev-title" className={`${section} pt-0 sm:pt-0`}>
          <div className={wrap}>
            <SectionHeading
              id="rev-title"
              eyebrow="Latest reviews"
              title="Tested by hand."
              muted="Rated with numbers."
              action={<a href="/reviews/" className={buttonVariants({ variant: "ghost" })}>All reviews →</a>}
            />
            <div className="grid gap-[18px] lg:grid-cols-[1.35fr_1fr]">
              <PostCard
                variant="featured"
                href="/toolname-review/"
                badge="Editor's choice"
                score={9.2}
                category="CRM"
                readingTime="12 min read"
                updated={{ iso: "2026-10-15", label: "Updated Oct 15, 2026" }}
                title="ToolName Review 2026: is it the best CRM for small teams?"
                excerpt="We used it for 30 days with a real sales pipeline. Here is what works, what doesn't, and who should buy it."
              />
              <div className="grid gap-[18px]">
                <PostCard variant="compact" index={1} href="/best-email-marketing/" category="Email" readingTime="8 min" title="The 7 best email marketing tools for beginners" />
                <PostCard variant="compact" index={2} href="/best-ai-writing-tools/" category="AI" readingTime="10 min" title="Best AI writing assistants, tested on 50 real tasks" />
                <PostCard variant="compact" index={3} href="/best-vpn/" category="VPN" readingTime="6 min" title="Cheapest VPN that is actually fast in 2026" />
              </div>
            </div>
            <div className="mt-[18px] grid gap-[18px] lg:grid-cols-3">
              <PostCard index={0} href="/best-web-hosting/" score={8.8} category="Hosting" readingTime="9 min" title="Best web hosting for a new blog" excerpt="Speed tests, uptime and real prices after the promo ends." />
              <PostCard index={1} href="/project-tools/" score={9.0} category="Projects" readingTime="7 min" title="Project tools compared for remote teams" excerpt="Boards, timelines and automation, side by side." />
              <PostCard index={2} href="/website-builders/" score={8.5} category="Builders" readingTime="11 min" title="Website builders: which one to choose?" excerpt="From landing page to online store in one afternoon." />
            </div>
          </div>
        </section>

        <section id="compare" aria-labelledby="cmp-title" className={`${section} pt-0 sm:pt-0`}>
          <div className={wrap}>
            <SectionHeading
              id="cmp-title"
              eyebrow="Quick comparison"
              title="Best CRM tools"
              muted="at a glance."
              action={<a href="/best-crm-software/" className={buttonVariants({ variant: "ghost" })}>Full comparison →</a>}
            />
            {/* EDIT : liens d'affiliation */}
            <ComparisonTable
              caption="Scores from our hands-on tests. Last updated October 2026."
              rows={[
                { tool: "Tool A", label: "★ Top pick", bestFor: "Small teams", score: 9.2, freePlan: { available: true, label: "Yes" }, startsAt: "$15/mo", href: "#", top: true },
                { tool: "Tool B", label: "Best features", bestFor: "Growing sales teams", score: 8.8, freePlan: { available: false, label: "14-day trial" }, startsAt: "$29/mo", href: "#" },
                { tool: "Tool C", label: "Best budget", bestFor: "Freelancers", score: 8.1, freePlan: { available: true, label: "Yes" }, startsAt: "$9/mo", href: "#" },
              ]}
            />
          </div>
        </section>

        <section id="how" aria-labelledby="how-title" className={`${section} pt-0 sm:pt-0`}>
          <div className={wrap}>
            <SectionHeading
              id="how-title"
              eyebrow="How we test"
              title="No copy-paste reviews."
              muted="Every tool gets real work."
              action={<a href="/how-we-test/" className={buttonVariants({ variant: "ghost" })}>Our method →</a>}
            />
            <HowWeTest
              steps={[
                { title: "We sign up", text: "We create a real account and use the paid plan, like you would." },
                { title: "We use it for weeks", text: "Real projects, real data, for at least 14 days per tool." },
                { title: "We score it", text: "Ease of use, features, value and support — the same grid for every tool." },
                { title: "We update it", text: "Prices and features change. We re-check every review regularly." },
              ]}
            />
          </div>
        </section>

        <section id="deals" aria-labelledby="deal-title" className={`${section} pt-0 sm:pt-0`}>
          <div className={wrap}>
            <SectionHeading
              id="deal-title"
              eyebrow="Deals"
              title="Save on the tools"
              muted="you already need."
              action={<a href="/deals/" className={buttonVariants({ variant: "ghost" })}>All deals →</a>}
            />
            {/* EDIT : uniquement de vraies offres et de vrais codes */}
            <div className="grid gap-[18px] lg:grid-cols-3">
              <DealCard index={0} category="CRM" value="30%" suffix="off · Tool A" description="On the yearly Pro plan, for new customers." code="VIRDICO30" expires="Ends Oct 31, 2026" href="#" />
              <DealCard index={1} category="VPN" value="68%" suffix="off · Tool V" description="2-year plan + 3 extra months free." expires="Limited time" href="#" />
              <DealCard index={2} category="Hosting" value="$2.99" suffix="/mo · Tool H" description="Free domain for one year included." code="VIRDICO" expires="Ends Nov 30, 2026" href="#" />
            </div>
          </div>
        </section>

        <section id="newsletter" aria-labelledby="nl-title" className={`${section} pt-0 sm:pt-0`}>
          <div className={wrap}>
            <NewsletterCta onSubscribe={subscribe} />
          </div>
        </section>
      </main>

      <SiteFooter {...footer} />
      <CookieBanner />
      <BackToTop />
    </>
  );
}
