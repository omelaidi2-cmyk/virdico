import type { Metadata } from "next";
import { ListingTemplate } from "@/components/templates/listing";
import { posts } from "@/content/posts";

const description = "Every SaaS review and buying guide we have published, newest first. Tested by hand, rated with numbers.";

export const metadata: Metadata = {
  title: "All SaaS Reviews & Buying Guides",
  description,
  alternates: { canonical: "/reviews/" },
  openGraph: { url: "/reviews/" },
};

export default function ReviewsPage() {
  return <ListingTemplate eyebrow="Reviews" title="Tested by hand." muted="Rated with numbers." description={description} path="/reviews/" posts={posts} />;
}
