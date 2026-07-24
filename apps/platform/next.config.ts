import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  transpilePackages: [
    "@nexora/ui",
    "@nexora/hooks",
    "@nexora/types",
    "@nexora/utils"
  ]
};

export default nextConfig;
