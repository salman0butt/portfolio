import type { NextConfig } from 'next';
import { resolve } from 'path';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/portfolio',
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/portfolio',
  }),
  images: {
    unoptimized: isGitHubPages,
  },
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root: resolve(__dirname),
  },
};

export default nextConfig;
