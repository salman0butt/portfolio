import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Article moved',
  robots: { index: false, follow: true },
};

export default async function LegacyBlogPostPage({ searchParams }: { searchParams: Promise<{ slug?: string | string[] }> }) {
  const params = await searchParams;
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  redirect(slug ? `/blog/${encodeURIComponent(slug)}` : '/blog');
}
