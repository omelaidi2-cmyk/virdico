import type { Metadata } from "next";
import { CategoryCard } from "@/design-system/components";
import { categoryIcons } from "@/components/posts";
import { PageHeader, SiteShell, wrap } from "@/components/site-shell";
import { categories } from "@/content/categories";
import { postsByCategory } from "@/content/posts";

export const metadata: Metadata = {
  title: "SaaS Categories",
  description: "Browse SaaS reviews by category: CRM, email marketing, project management, AI tools, website builders, VPN, accounting and web hosting.",
  alternates: { canonical: "/categories/" },
  openGraph: { url: "/categories/" },
};

export default function CategoriesPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Categories"
        title="Find the right tool"
        muted="for every part of your business."
        description="Pick a category to see our reviews, rankings and comparisons."
      />
      <div className={`${wrap} pb-20 sm:pb-[110px]`}>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => {
            const count = postsByCategory(category.slug).length;
            return (
              <CategoryCard
                key={category.slug}
                index={i}
                href={`/${category.slug}/`}
                icon={categoryIcons[category.icon]}
                name={category.name}
                count={count}
                countLabel={count === 1 ? "guide" : "guides"}
              />
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
