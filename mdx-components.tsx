import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import {
  AffiliateLink,
  Banner,
  Callout,
  CheckColumns,
  ComparisonTable,
  Faq,
  FeatureComparison,
  FinalVerdict,
  MethodNote,
  PricingPlans,
  ScoreBreakdown,
  Screenshot,
} from "@/design-system/components";
import { slot } from "@/content/banners";
import { slugify, textOf } from "@/lib/slugify";

/** Bannière inline d'article (.rg-inline-promo) : <InlinePromo /> dans le MDX. */
function InlinePromo() {
  return <Banner size="inline" creative={slot("articleInline")} />;
}

function H2(props: ComponentPropsWithoutRef<"h2">) {
  return <h2 id={slugify(textOf(props.children))} {...props} />;
}

function H3(props: ComponentPropsWithoutRef<"h3">) {
  return <h3 id={slugify(textOf(props.children))} {...props} />;
}

/** Liens internes → navigation Next.js ; liens externes → nouvel onglet. */
function A({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  if (href.startsWith("#")) return <a href={href} {...props} />;
  return <a href={href} target="_blank" rel={props.rel ?? "noopener"} {...props} />;
}

/** Tableaux Markdown : défilement horizontal sur mobile. */
function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Table, scroll horizontally">
      <table {...props} />
    </div>
  );
}

const components: MDXComponents = {
  h2: H2,
  h3: H3,
  a: A,
  table: Table,
  AffiliateLink,
  Callout,
  CheckColumns,
  ComparisonTable,
  Faq,
  FeatureComparison,
  FinalVerdict,
  InlinePromo,
  MethodNote,
  PricingPlans,
  ScoreBreakdown,
  Screenshot,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return { ...inherited, ...components };
}
