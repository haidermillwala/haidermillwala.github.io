import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"]
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

export default withMDX(nextConfig);
