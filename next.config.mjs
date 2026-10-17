import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  trailingSlash: true,
  poweredByHeader: false,
};

const withMDX = createMDX({
  options: { remarkPlugins: [remarkGfm] },
});

export default withMDX(nextConfig);
