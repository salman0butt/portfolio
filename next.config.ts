import type { NextConfig } from "next";
import { resolve } from "path";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  ...(isGitHubPages && { output: 'export' }),
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  turbopack: {
    root: resolve(__dirname),
  },
};

export default nextConfig;
