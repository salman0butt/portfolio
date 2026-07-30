import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://salman-butt.vercel.app/sitemap.xml',
    host: 'https://salman-butt.vercel.app',
  };
}
