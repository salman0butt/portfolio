import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostView from '@/components/blog/BlogPostView';
import { type BlogPost, getBlogDate, getPublishedPostBySlug, getPublishedPosts } from '@/lib/blogs';

const getPost = cache((slug: string) => getPublishedPostBySlug(slug));

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    if (!post) return { title: 'Article not found', robots: { index: false, follow: false } };

    const publishedTime = getBlogDate(post);
    return {
      title: post.title,
      description: post.excerpt || post.title,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: {
        title: post.title,
        description: post.excerpt || post.title,
        type: 'article',
        url: `/blog/${post.slug}`,
        publishedTime,
        modifiedTime: post.updated_at,
        images: post.cover_image_url ? [{ url: post.cover_image_url }] : [{ url: '/opengraph-image' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.title,
        images: post.cover_image_url ? [post.cover_image_url] : ['/opengraph-image'],
      },
    };
  } catch {
    return { title: 'Engineering article', robots: { index: false, follow: false } };
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: BlogPost | null = null;
  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  let related: BlogPost[] = [];
  try {
    const posts = await getPublishedPosts(12);
    const sameCategory = posts.filter((item) => item.slug !== post.slug && item.category === post.category);
    const others = posts.filter((item) => item.slug !== post.slug && item.category !== post.category);
    related = [...sameCategory, ...others].slice(0, 3);
  } catch {
    related = [];
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url || 'https://salman-butt.vercel.app/opengraph-image',
    datePublished: getBlogDate(post),
    dateModified: post.updated_at,
    mainEntityOfPage: `https://salman-butt.vercel.app/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Salman Butt',
      url: 'https://salman-butt.vercel.app',
    },
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="pb-20 pt-28 sm:pb-24 sm:pt-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <div className="px-4 sm:px-6 lg:px-8">
          <BlogPostView post={post} related={related} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
