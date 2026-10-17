import type { Metadata } from "next";
import { ListingTemplate } from "@/components/templates/listing";
import { postsByType } from "@/content/posts";

const description = "Side-by-side SaaS comparisons and “best of” rankings, built from the same hands-on tests.";

export const metadata: Metadata = {
  title: "SaaS Comparisons & Rankings",
  description,
  alternates: { canonical: "/comparisons/" },
  openGraph: { url: "/comparisons/" },
};

export default function ComparisonsPage() {
  return (
    <ListingTemplate
      eyebrow="Comparisons"
      title="Side by side."
      muted="So you can pick fast."
      description={description}
      path="/comparisons/"
      posts={postsByType("comparison", "guide")}
    />
  );
}
