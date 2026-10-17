import type { ComponentType } from "react";
import type { Post, PostMeta } from "./types";

import * as toolnameReview from "./posts/toolname-review.mdx";
import * as bestCrm from "./posts/best-crm-software.mdx";
import * as bestEmail from "./posts/best-email-marketing.mdx";
import * as bestAi from "./posts/best-ai-writing-tools.mdx";
import * as bestVpn from "./posts/best-vpn.mdx";
import * as bestHosting from "./posts/best-web-hosting.mdx";
import * as builders from "./posts/website-builders-guide.mdx";
import * as chooseCrm from "./posts/how-to-choose-a-crm.mdx";
import * as toolnameVsB from "./posts/toolname-vs-tool-b.mdx";
import * as projectTools from "./posts/project-tools-remote-teams.mdx";

type MdxModule = { default: ComponentType; meta: PostMeta };

/** Nouvel article : créer content/posts/mon-slug.mdx (avec `export const meta`), puis l'importer ici. */
const modules = [
  toolnameReview,
  bestCrm,
  bestEmail,
  bestAi,
  bestVpn,
  bestHosting,
  builders,
  chooseCrm,
  toolnameVsB,
  projectTools,
] as unknown as MdxModule[];

/** Tous les articles, du plus récent au plus ancien (date de mise à jour). */
export const posts: Post[] = modules
  .map((m) => ({ meta: m.meta, Content: m.default }))
  .sort((a, b) => b.meta.updated.localeCompare(a.meta.updated));

export function getPost(slug: string) {
  return posts.find((p) => p.meta.slug === slug);
}

export function postsByCategory(category: string) {
  return posts.filter((p) => p.meta.category === category);
}

export function postsByType(...types: PostMeta["type"][]) {
  return posts.filter((p) => types.includes(p.meta.type));
}

export function relatedPosts(meta: PostMeta, count = 3) {
  const same = posts.filter((p) => p.meta.slug !== meta.slug && p.meta.category === meta.category);
  const others = posts.filter((p) => p.meta.slug !== meta.slug && p.meta.category !== meta.category);
  return [...same, ...others].slice(0, count);
}

export function searchPosts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return posts.filter(({ meta }) =>
    [meta.title, meta.description, meta.excerpt, meta.category, meta.review?.tool ?? ""].some((field) => field.toLowerCase().includes(q)),
  );
}
