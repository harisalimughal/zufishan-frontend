import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@nexora/ui",
    "@nexora/hooks",
    "@nexora/types",
    "@nexora/utils"
  ]
};

export default nextConfig;
