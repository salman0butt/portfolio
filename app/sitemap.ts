import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/blogs';

const siteUrl = 'https://salman-butt.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap[number] = {
    url: siteUrl,
    changeFrequency: 'monthly',
    priority: 1,
  };

  try {
    const posts = await getPublishedPosts(100);
    const latestUpdatedAt = posts.reduce<Date | undefined>((latest, post) => {
      const updated = new Date(post.updated_at);
      return !latest || updated > latest ? updated : latest;
    }, undefined);

    return [
      home,
      {
        url: `${siteUrl}/blog`,
        ...(latestUpdatedAt ? { lastModified: latestUpdatedAt } : {}),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      ...posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'monthly' as const,
        priority: post.featured ? 0.85 : 0.75,
      })),
    ];
  } catch {
    return [
      home,
      { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.9 },
    ];
  }
}
