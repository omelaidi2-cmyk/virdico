import { Fragment } from "react";
import {
  Banner,
  BoardIcon,
  BrowserIcon,
  ChartIcon,
  MailIcon,
  PostCard,
  ServerIcon,
  ShieldIcon,
  SparkIcon,
  UsersIcon,
  type BannerCreative,
} from "@/design-system/components";
import type { Category } from "@/content/categories";
import { getCategory } from "@/content/categories";
import { formatDate } from "@/content/site";
import type { Post } from "@/content/types";

export const categoryIcons: Record<Category["icon"], React.ReactNode> = {
  users: <UsersIcon />,
  mail: <MailIcon />,
  board: <BoardIcon />,
  spark: <SparkIcon />,
  browser: <BrowserIcon />,
  shield: <ShieldIcon />,
  chart: <ChartIcon />,
  server: <ServerIcon />,
};

/** Carte d'article à partir des métadonnées MDX. */
export function PostCardFor({
  post,
  variant = "default",
  index = 0,
  withDate = false,
}: {
  post: Post;
  variant?: "featured" | "default" | "compact";
  index?: number;
  withDate?: boolean;
}) {
  const { meta } = post;
  return (
    <PostCard
      href={`/${meta.slug}/`}
      variant={variant}
      index={index}
      title={meta.title}
      excerpt={meta.excerpt}
      category={getCategory(meta.category)?.short ?? meta.category}
      readingTime={variant === "featured" ? meta.readingTime : meta.readingTime.replace(" read", "")}
      updated={withDate ? { iso: meta.updated, label: `Updated ${formatDate(meta.updated)}` } : undefined}
      score={meta.score}
      badge={variant === "featured" ? meta.badge : undefined}
    />
  );
}

/**
 * Grille d'articles avec bannière in-feed (blassa-flow) insérée après `flowAfter` cartes,
 * puis bannière mobile-mid sous la grille (mobile uniquement).
 */
export function PostGrid({
  posts,
  flow,
  flowAfter = 6,
  mobileMid,
}: {
  posts: Post[];
  flow?: BannerCreative | null | false;
  flowAfter?: number;
  mobileMid?: BannerCreative | null | false;
}) {
  const insertAt = Math.min(flowAfter, posts.length);
  return (
    <>
      <div className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Fragment key={post.meta.slug}>
            {flow !== false && i === insertAt && <Banner size="flow" creative={flow} />}
            <PostCardFor post={post} index={i} />
          </Fragment>
        ))}
        {flow !== false && insertAt === posts.length && <Banner size="flow" creative={flow} />}
      </div>
      {mobileMid !== false && <Banner size="mobile-mid" creative={mobileMid} className="mt-[18px]" />}
    </>
  );
}
