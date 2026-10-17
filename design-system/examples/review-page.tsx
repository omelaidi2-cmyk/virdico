/**
 * Exemple : page de test d'un outil (app/[slug]/page.tsx), reconstruite à partir du template audité.
 * Dans le vrai site, les données viennent du frontmatter MDX ; le corps (« Overview », « Key features »…) du MDX.
 */
import type { Metadata } from "next";
import {
  AlternativesBox,
  ArticleDates,
  ArticleHero,
  ArticleLayout,
  ArticleSidebar,
  AuthorBio,
  BackToTop,
  Callout,
  CheckColumns,
  CookieBanner,
  DealBox,
  Disclosure,
  Faq,
  FeatureComparison,
  FinalVerdict,
  JsonLd,
  KeyTakeaways,
  MethodNote,
  MobileToc,
  NewsletterInline,
  PostCard,
  PricingPlans,
  Prose,
  QuickFacts,
  ReadingProgress,
  ScoreBreakdown,
  Screenshot,
  ShareBar,
  SiteFooter,
  SiteHeader,
  SkipLink,
  StickyCta,
  TableOfContents,
  VerdictCard,
} from "../components";
import { breadcrumbs, faq, organization, review, type Site } from "../lib/seo";
import { subscribe } from "./actions";
import { footer, nav } from "./site-config";

const site: Site = { name: "Virdico", url: "https://virdico.com", logo: "/images/logo.png" };
const AFFILIATE = "#"; // EDIT : lien d'affiliation de l'outil
const URL = "https://virdico.com/toolname-review/";

const data = {
  tool: "ToolName",
  score: 9.2,
  title: "ToolName Review 2026: Is It the Best CRM for Small Teams?",
  published: { iso: "2026-09-02", label: "Sep 2, 2026" },
  updated: { iso: "2026-10-15", label: "Oct 15, 2026" },
  author: { name: "Your Name", href: "/about/" }, // EDIT
  pros: ["Very easy to learn", "Generous free plan", "Strong automation"],
  cons: ["Basic reports on the free plan", "Limited integrations", "No phone support"],
  faq: [
    { question: "Is ToolName free?", answer: "Write your answer here." }, // EDIT : même texte visible et JSON-LD
    { question: "Is ToolName good for beginners?", answer: "Write your answer here." },
    { question: "What is the best alternative to ToolName?", answer: "Write your answer here." },
  ],
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Key features" },
  { id: "who", label: "Who it's for" },
  { id: "pros", label: "Pros & cons" },
  { id: "pricing", label: "Pricing" },
  { id: "compare", label: "ToolName vs others" },
  { id: "verdict-final", label: "Final verdict" },
  { id: "faq", label: "FAQ" },
];

export const metadata: Metadata = {
  title: `${data.title} — Virdico`,
  description: "Our hands-on ToolName review after 30 days: features, real pricing, pros and cons, alternatives, and who should use it.",
  alternates: { canonical: URL },
  authors: [{ name: data.author.name }],
  openGraph: {
    type: "article",
    url: URL,
    title: data.title,
    images: [{ url: "https://virdico.com/images/toolname-review-og.jpg", width: 1200, height: 630 }], // EDIT
    publishedTime: "2026-09-02T09:00:00+01:00",
    modifiedTime: "2026-10-15T09:00:00+01:00",
    section: "CRM",
  },
  twitter: { card: "summary_large_image" },
};

export default function ReviewPage() {
  return (
    <>
      <JsonLd
        data={[
          organization(site),
          breadcrumbs(site, [
            { name: "Home", path: "/" },
            { name: "CRM", path: "/crm/" },
            { name: "ToolName Review", path: "/toolname-review/" },
          ]),
          review(site, {
            path: "/toolname-review/",
            title: "ToolName Review 2026",
            published: data.published.iso,
            modified: data.updated.iso,
            author: { name: data.author.name, path: data.author.href },
            tool: { name: data.tool, os: "Web, iOS, Android", price: "15" },
            score: data.score,
            pros: data.pros,
            cons: data.cons,
          }),
          faq(data.faq),
        ]}
      />
      <SkipLink href="#content" />
      <ReadingProgress targetId="article" />
      <SiteHeader items={nav} current="/reviews/" cta={{ label: "Try ToolName free", href: AFFILIATE, sponsored: true }} />

      <main id="content">
        <ArticleHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "CRM", href: "/crm/" }, { label: "ToolName Review" }]}
          category="CRM & Sales"
          title={
            <>
              ToolName Review 2026: <span className="vd-text-gradient">the best CRM</span> for small teams?
            </>
          }
          lead="We used ToolName for 30 days with a real sales pipeline. Here is what works, what doesn't, how much it really costs, and who should use it."
          author={data.author}
          updated={data.updated}
          readingTime="12 min read"
          trust={["Tested for 30 days", "Paid plan used", "Prices checked Oct 2026"]}
        />

        <div className="mx-auto max-w-content px-4 sm:px-5">
          <VerdictCard
            score={data.score}
            title="Our verdict: best CRM for small teams"
            summary="Simple to set up, great automation and a generous free plan. The best pick for teams of 2–20 people who want a CRM they will actually use."
            cta={{ label: "Try ToolName free →", href: AFFILIATE, note: "Free plan · No credit card" }}
          />
        </div>

        <ArticleLayout>
          <TableOfContents items={toc} />

          <Prose id="article">
            <MobileToc items={toc} />
            <Disclosure />
            <KeyTakeaways
              items={[
                { label: "Best for", text: "small teams of 2–20 people." },
                { label: "Price", text: "free plan, paid plans from $15/user/month." },
                { label: "Standout", text: "easy setup and strong email automation." },
                { label: "Skip if", text: "you need advanced reports or 100+ integrations." },
              ]}
            />

            <h2 id="overview">Overview</h2>
            <p>Write your introduction here. Explain what the tool does, who it is for, and why your reader should keep reading.</p>
            <Screenshot alt="ToolName dashboard with sales pipeline" caption="ToolName dashboard during our test (October 2026)." />
            <ScoreBreakdown
              ratings={[
                { label: "Ease of use", score: 9.5 },
                { label: "Features", score: 9.0 },
                { label: "Value for money", score: 9.2 },
                { label: "Support", score: 8.8 },
              ]}
            />

            <h2 id="features">Key features</h2>
            <h3 id="f1">1. Visual sales pipeline</h3>
            <p>Describe the feature and what you liked when you tested it.</p>
            <h3 id="f2">2. Email automation</h3>
            <p>
              Describe the feature. Add a <a href={AFFILIATE} rel="sponsored nofollow noopener" target="_blank">link to the tool</a> where it
              fits naturally.
            </p>
            <Callout
              title="Want to test it yourself?"
              text="ToolName has a free plan. You can set up your first pipeline in about 10 minutes."
              cta={{ label: "Start free →", href: AFFILIATE }}
            />

            <h2 id="who">Who it&apos;s for</h2>
            <CheckColumns
              good={{ title: "Great for", items: ["Small sales teams", "Beginners to CRM", "Teams on a budget"] }}
              bad={{ title: "Not for", items: ["Large enterprises", "Advanced reporting needs", "Very custom workflows"] }}
            />

            <h2 id="pros">Pros &amp; cons</h2>
            <CheckColumns good={{ title: "What we like", items: data.pros }} bad={{ title: "What could be better", items: data.cons }} />

            <h2 id="pricing">Pricing</h2>
            <PricingPlans
              yearlySaving="save 20%"
              note="Prices checked on Oct 15, 2026. Taxes may apply."
              plans={[
                { name: "Free", price: { monthly: 0, yearly: 0 }, unit: "Up to 2 users", features: ["Pipeline", "1,000 contacts"], cta: { label: "Start free", href: AFFILIATE } },
                { name: "Pro", ribbon: "BEST VALUE", price: { monthly: 19, yearly: 15 }, unit: "per user / month", features: ["Email automation", "Unlimited contacts", "Reports"], cta: { label: "Get Pro", href: AFFILIATE } },
                { name: "Business", price: { monthly: 49, yearly: 39 }, unit: "per user / month", features: ["Advanced reports", "Roles & permissions", "Priority support"], cta: { label: "See plan", href: AFFILIATE } },
              ]}
            />

            <h2 id="compare">ToolName vs others</h2>
            <FeatureComparison
              caption="ToolName compared with Tool B and Tool C"
              tools={[
                { name: "ToolName", href: AFFILIATE, affiliate: true },
                { name: "Tool B", href: "/tool-b-review/" },
                { name: "Tool C", href: "/tool-c-review/" },
              ]}
              rows={[
                { label: "Our score", values: ["9.2", "8.8", "8.1"] },
                { label: "Free plan", values: [true, false, true] },
                { label: "Email automation", values: [true, true, false] },
                { label: "Starts at", values: ["$15/mo", "$29/mo", "$9/mo"] },
              ]}
            />
            <MethodNote>we used the Pro plan for 30 days with 3 team members, imported 500 contacts and ran 2 email campaigns.</MethodNote>

            <h2 id="verdict-final">Final verdict</h2>
            <FinalVerdict cta={{ label: "Try ToolName free →", href: AFFILIATE }}>
              <p>Write your final verdict here in 2–3 sentences. Say clearly who should buy it and who should look elsewhere.</p>
            </FinalVerdict>

            <h2 id="faq">FAQ</h2>
            <Faq items={data.faq} />

            <ShareBar url={URL} title={data.title} />
            <ArticleDates published={data.published} updated={data.updated} />
            <AuthorBio
              name={data.author.name}
              role="SaaS reviewer · Founder of Virdico"
              href="/about/"
              bio="Write a 2–3 line bio: your experience, how many tools you've tested, and why readers can trust you."
            />
            <NewsletterInline onSubscribe={subscribe} />
          </Prose>

          <ArticleSidebar label="ToolName summary">
            <QuickFacts
              facts={[
                { label: "Score", value: "9.2 / 10" },
                { label: "Free plan", value: "Yes" },
                { label: "Starting price", value: "$15/mo" },
                { label: "Best for", value: "Small teams" },
              ]}
              cta={{ label: "Try ToolName free", href: AFFILIATE }}
            />
            <DealBox value="30% off" text="the yearly Pro plan" code="VIRDICO30" href={AFFILIATE} />
            <AlternativesBox
              items={[
                { name: "Tool B", score: 8.8, href: "/tool-b-review/" },
                { name: "Tool C", score: 8.1, href: "/tool-c-review/" },
                { name: "Tool D", score: 7.9, href: "/tool-d-review/" },
              ]}
            />
          </ArticleSidebar>
        </ArticleLayout>

        <section aria-labelledby="rel-title" className="vd-no-print pb-[100px]">
          <div className="mx-auto max-w-content px-4 sm:px-5">
            <h2 id="rel-title" className="mb-7 text-[clamp(1.75rem,3.6vw,2.625rem)] font-light tracking-[-.035em]">
              Keep reading
            </h2>
            <div className="grid gap-[18px] lg:grid-cols-3">
              <PostCard index={0} href="/best-crm-software/" category="CRM" readingTime="9 min" title="Best CRM software for small businesses in 2026" />
              <PostCard index={1} href="/toolname-vs-tool-b/" category="Comparison" readingTime="7 min" title="ToolName vs Tool B: which one should you pick?" />
              <PostCard index={2} href="/best-email-marketing/" category="Email" readingTime="8 min" title="The 7 best email marketing tools for beginners" />
            </div>
          </div>
        </section>
      </main>

      <StickyCta tool={data.tool} score={data.score} note="Free plan available" href={AFFILIATE} targetId="article" />
      <SiteFooter {...footer} />
      <CookieBanner />
      <BackToTop href="#content" raised />
    </>
  );
}
