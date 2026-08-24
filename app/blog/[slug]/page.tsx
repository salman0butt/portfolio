import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostView from '@/components/blog/BlogPostView';
import { type BlogPost, estimateReadTime, getBlogDate, getPublishedPostBySlug, getPublishedPosts } from '@/lib/blogs';

const siteUrl = 'https://salman-butt.vercel.app';
const getPost = cache((slug: string) => getPublishedPostBySlug(slug));

export const dynamic = 'force-dynamic';

function socialImage(post: BlogPost) {
  return `/api/og/blog?slug=${encodeURIComponent(post.slug)}`;
}

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    if (!post) return { title: 'Article not found', robots: { index: false, follow: false } };

    const publishedTime = getBlogDate(post);
    const image = socialImage(post);
    return {
      title: post.title,
      description: post.excerpt || post.title,
      keywords: [...post.tags, post.category ?? '', 'software engineering', 'production engineering'].filter(Boolean),
      authors: [{ name: 'Salman Butt', url: siteUrl }],
      creator: 'Salman Butt',
      category: post.category ?? 'Software Engineering',
      robots: { index: true, follow: true },
      alternates: { canonical: `/blog/${post.slug}`, types: { 'application/rss+xml': '/feed.xml' } },
      openGraph: {
        title: post.title,
        description: post.excerpt || post.title,
        type: 'article',
        url: `/blog/${post.slug}`,
        siteName: 'Salman Butt — Engineering Portfolio',
        publishedTime,
        modifiedTime: post.updated_at,
        authors: [siteUrl],
        section: post.category ?? 'Software Engineering',
        tags: post.tags,
        images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.title,
        images: [image],
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

  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['BlogPosting', 'TechArticle'],
    '@id': `${articleUrl}#article`,
    url: articleUrl,
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${socialImage(post)}`,
    datePublished: getBlogDate(post),
    dateModified: post.updated_at,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    articleSection: post.category ?? 'Software Engineering',
    keywords: post.tags.join(', '),
    wordCount: post.content.split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${estimateReadTime(post.content)}M`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Salman Butt',
      url: siteUrl,
      jobTitle: 'Senior Full-Stack & Generative AI Engineer',
      sameAs: ['https://github.com/salman0butt', 'https://www.linkedin.com/in/salman0butt/'],
    },
    publisher: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Salman Butt',
      url: siteUrl,
    },
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Engineering Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main id="main-content" className="pb-20 pt-24 sm:pb-24 sm:pt-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbStructuredData) }} />
        <div className="mx-auto w-full max-w-[1440px] min-w-0 px-4 sm:px-6 lg:px-8">
          <BlogPostView post={post} related={related} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
