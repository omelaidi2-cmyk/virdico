import type { MetadataRoute } from "next";
import { categories } from "@/content/categories";
import { pages } from "@/content/pages";
import { posts } from "@/content/posts";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = posts[0]?.meta.updated;
  const url = (path: string) => `${SITE_URL}${path}`;

  return [
    { url: url("/"), lastModified: latest, changeFrequency: "daily", priority: 1 },
    ...["/reviews/", "/comparisons/", "/categories/", "/deals/"].map((path) => ({
      url: url(path),
      lastModified: latest,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({ url: url(`/${p.meta.slug}/`), lastModified: p.meta.updated, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...categories.map((c) => ({ url: url(`/${c.slug}/`), lastModified: latest, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...pages.map((p) => ({ url: url(`/${p.meta.slug}/`), lastModified: p.meta.updated, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
