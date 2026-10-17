import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/templates/article";
import { ListingTemplate } from "@/components/templates/listing";
import { StaticPageTemplate } from "@/components/templates/static-page";
import { authors } from "@/content/authors";
import { categories, getCategory } from "@/content/categories";
import { getPage, pages } from "@/content/pages";
import { getPost, posts, postsByCategory } from "@/content/posts";

/**
 * Une seule route pour toutes les URL de premier niveau :
 *   /toolname-review/  → article (content/posts)
 *   /crm/              → page catégorie (content/categories)
 *   /about/            → page statique (content/pages)
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [...posts.map((p) => p.meta.slug), ...categories.map((c) => c.slug), ...pages.map((p) => p.meta.slug)].map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug}/`;

  const post = getPost(slug);
  if (post) {
    const { meta } = post;
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical: path },
      authors: [{ name: authors[meta.author].name }],
      openGraph: {
        type: "article",
        url: path,
        title: meta.title,
        description: meta.description,
        publishedTime: meta.published,
        modifiedTime: meta.updated,
        section: getCategory(meta.category)?.name,
      },
    };
  }

  const category = getCategory(slug);
  if (category) {
    const title = `Best ${category.name} Software: Reviews & Comparisons`;
    return { title, description: category.description, alternates: { canonical: path }, openGraph: { url: path, title } };
  }

  const page = getPage(slug);
  if (page) {
    return { title: page.meta.title, description: page.meta.description, alternates: { canonical: path }, openGraph: { url: path } };
  }

  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  const post = getPost(slug);
  if (post) return <ArticleTemplate post={post} />;

  const category = getCategory(slug);
  if (category) {
    return (
      <ListingTemplate
        eyebrow="Category"
        title={category.name}
        muted="tested & compared."
        description={category.description}
        path={`/${slug}/`}
        posts={postsByCategory(slug)}
      />
    );
  }

  const page = getPage(slug);
  if (page) return <StaticPageTemplate meta={page.meta} Content={page.Content} />;

  notFound();
}
