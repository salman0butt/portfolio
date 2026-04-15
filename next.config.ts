import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  turbopack: {
    root: resolve(__dirname),
  },
};

export default nextConfig;
