import type { ComponentType } from "react";
import type { PageMeta } from "./types";

import * as about from "./pages/about.mdx";
import * as howWeTest from "./pages/how-we-test.mdx";
import * as contact from "./pages/contact.mdx";
import * as advertise from "./pages/advertise.mdx";
import * as disclosure from "./pages/affiliate-disclosure.mdx";
import * as privacy from "./pages/privacy-policy.mdx";
import * as terms from "./pages/terms.mdx";

type MdxModule = { default: ComponentType; meta: PageMeta };

export const pages = ([about, howWeTest, contact, advertise, disclosure, privacy, terms] as unknown as MdxModule[]).map((m) => ({
  meta: m.meta,
  Content: m.default,
}));

export function getPage(slug: string) {
  return pages.find((p) => p.meta.slug === slug);
}
