import Link from "next/link";
import {
  AlternativesBox,
  ArticleDates,
  ArticleHero,
  ArticleLayout,
  ArticleSidebar,
  AuthorBio,
  Banner,
  DealBox,
  Disclosure,
  JsonLd,
  KeyTakeaways,
  MobileToc,
  NewsletterInline,
  Prose,
  QuickFacts,
  ReadingProgress,
  ShareBar,
  StickyCta,
  TableOfContents,
  VerdictCard,
} from "@/design-system/components";
import { breadcrumbs, faq, organization, review } from "@/design-system/lib/seo";
import { subscribe } from "@/app/actions";
import { PostCardFor } from "@/components/posts";
import { SiteShell, wrap } from "@/components/site-shell";
import { authors } from "@/content/authors";
import { slot } from "@/content/banners";
import { getCategory } from "@/content/categories";
import { posts, relatedPosts } from "@/content/posts";
import { formatDate, site, SITE_URL } from "@/content/site";
import type { Post } from "@/content/types";
import { slugify } from "@/lib/slugify";

/** Encadré « Popular » de la colonne latérale des guides. */
function PopularBox({ exclude }: { exclude: string }) {
  const items = posts.filter((p) => p.meta.slug !== exclude).slice(0, 5);
  return (
    <div className="rounded-[20px] border border-border bg-panel p-[22px]">
      <h2 className="mb-3.5 text-xs font-semibold uppercase tracking-[.16em] text-accent">Popular</h2>
      <ul>
        {items.map((p) => (
          <li key={p.meta.slug} className="border-b border-border py-2.5 text-sm last:border-0">
            <Link href={`/${p.meta.slug}/`} className="hover:text-foreground">
              {p.meta.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Titre avec la partie `highlight` en dégradé. */
function HighlightedTitle({ title, highlight }: { title: string; highlight?: string }) {
  const i = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || i < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <span className="vd-text-gradient">{highlight}</span>
      {title.slice(i + highlight.length)}
    </>
  );
}

/**
 * Page d'article. Bannières : box (sidebar, sous le sommaire) + inline (<InlinePromo /> dans le MDX) + sticky.
 * Les tests (type « review ») ajoutent le verdict, la fiche rapide, l'offre et la barre CTA mobile.
 */
export function ArticleTemplate({ post }: { post: Post }) {
  const { meta, Content } = post;
  const r = meta.review;
  const author = authors[meta.author];
  const category = getCategory(meta.category);
  const url = `${SITE_URL}/${meta.slug}/`;
  const toc = meta.toc.map((label) => ({ id: slugify(label), label }));
  const published = { iso: meta.published, label: formatDate(meta.published) };
  const updated = { iso: meta.updated, label: formatDate(meta.updated) };

  const jsonLd: object[] = [
    organization(site),
    breadcrumbs(site, [
      { name: "Home", path: "/" },
      { name: category?.name ?? meta.category, path: `/${meta.category}/` },
      { name: meta.title, path: `/${meta.slug}/` },
    ]),
  ];
  if (r && meta.score !== undefined) {
    jsonLd.push(
      review(site, {
        path: `/${meta.slug}/`,
        title: meta.title,
        published: meta.published,
        modified: meta.updated,
        author: { name: author.name, path: author.href },
        tool: { name: r.tool, os: r.os, price: r.price },
        score: meta.score,
        pros: r.pros,
        cons: r.cons,
      }),
    );
  } else {
    jsonLd.push({
      "@type": "Article",
      headline: meta.title,
      description: meta.description,
      datePublished: meta.published,
      dateModified: meta.updated,
      author: { "@type": "Person", name: author.name, url: `${SITE_URL}${author.href}` },
      publisher: { "@id": `${SITE_URL}/#org` },
      mainEntityOfPage: url,
    });
  }
  if (meta.faq?.length) jsonLd.push(faq(meta.faq));

  const box = <Banner size="box" creative={slot("articleBox")} />;

  return (
    <SiteShell
      headerCta={r ? { label: `Try ${r.tool} free`, href: r.affiliateUrl, sponsored: true } : undefined}
      before={<ReadingProgress targetId="article" />}
      after={
        r && meta.score !== undefined ? (
          <StickyCta tool={r.tool} score={meta.score} note={r.ctaNote.split(" · ")[0]} href={r.affiliateUrl} targetId="article" />
        ) : undefined
      }
      raisedBackToTop={Boolean(r)}
    >
      <JsonLd data={jsonLd} />

      <ArticleHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: category?.short ?? meta.category, href: `/${meta.category}/` }, { label: meta.title }]}
        category={category?.name ?? meta.category}
        title={<HighlightedTitle title={meta.title} highlight={meta.highlight} />}
        lead={meta.description}
        author={{ name: author.name, href: author.href, avatar: author.avatar }}
        updated={updated}
        readingTime={meta.readingTime}
        trust={meta.trust}
      />

      {r && meta.score !== undefined && (
        <div className={wrap}>
          <VerdictCard
            score={meta.score}
            title={r.verdictTitle}
            summary={r.verdictSummary}
            cta={{ label: `Try ${r.tool} free →`, href: r.affiliateUrl, note: r.ctaNote }}
          />
        </div>
      )}

      <ArticleLayout>
        {/* Colonne gauche (≥ 1101px) : sommaire + bannière box en dessous */}
        <div className="hidden self-start 2xl:sticky 2xl:top-[100px] 2xl:grid 2xl:gap-6">
          <TableOfContents items={toc} />
          {box}
        </div>

        <Prose id="article">
          <MobileToc items={toc} />
          <Disclosure />
          {meta.takeaways && <KeyTakeaways items={meta.takeaways} />}
          <Content />
          <ShareBar url={url} title={meta.title} />
          <ArticleDates published={published} updated={updated} />
          <AuthorBio name={author.name} role={author.role} bio={author.bio} href={author.href} avatar={author.avatar} />
          <NewsletterInline onSubscribe={subscribe} />
        </Prose>

        <ArticleSidebar label={r ? `${r.tool} summary` : "Article sidebar"}>
          {r && (
            <QuickFacts facts={r.quickFacts} cta={{ label: `Try ${r.tool} free`, href: r.affiliateUrl }} />
          )}
          {/* 768–1100px : la box passe dans la colonne de droite (le sommaire latéral est masqué) */}
          <div className="2xl:hidden">{box}</div>
          {r?.deal && <DealBox {...r.deal} />}
          {r && <AlternativesBox items={r.alternatives} />}
          {!r && <PopularBox exclude={meta.slug} />}
        </ArticleSidebar>
      </ArticleLayout>

      <section aria-labelledby="rel-title" className="vd-no-print pb-[100px]">
        <div className={wrap}>
          <h2 id="rel-title" className="mb-7 text-[clamp(1.75rem,3.6vw,2.625rem)] font-light tracking-[-.035em]">
            Keep reading
          </h2>
          <div className="grid gap-[18px] lg:grid-cols-3">
            {relatedPosts(meta).map((p, i) => (
              <PostCardFor key={p.meta.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
