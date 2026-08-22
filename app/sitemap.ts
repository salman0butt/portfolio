import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/blogs';

const siteUrl = 'https://salman-butt.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  try {
    const posts = await getPublishedPosts(100);
    return [
      ...staticRoutes,
      ...posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'monthly' as const,
        priority: post.featured ? 0.8 : 0.7,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
