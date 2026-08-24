import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';
import { getPublishedPosts } from '@/lib/blogs';

const siteUrl = 'https://salman-butt.vercel.app';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Engineering Blog',
  description: 'Practical engineering articles on production Generative AI, system design, React, Next.js, Node.js, Python, TypeScript, real-time systems and reliable software delivery.',
  keywords: [
    'software engineering blog',
    'senior software engineer',
    'TypeScript',
    'JavaScript',
    'Python',
    'Next.js',
    'Node.js',
    'system design',
    'Generative AI',
    'AI agents',
    'production engineering',
  ],
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Engineering Blog — Salman Butt',
    description: 'Production AI, TypeScript, Python, system design and full-stack engineering notes.',
    type: 'website',
    url: '/blog',
    siteName: 'Salman Butt — Engineering Portfolio',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Salman Butt Engineering Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Blog — Salman Butt',
    description: 'Production AI, TypeScript, Python, system design and full-stack engineering notes.',
    images: ['/opengraph-image'],
  },
};

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteUrl}/blog#blog`,
    url: `${siteUrl}/blog`,
    name: 'Salman Butt Engineering Blog',
    description: metadata.description,
    inLanguage: 'en',
    author: { '@type': 'Person', name: 'Salman Butt', url: siteUrl },
    blogPost: posts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.published_at ?? post.created_at,
      dateModified: post.updated_at,
    })),
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Engineering Blog', item: `${siteUrl}/blog` },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main id="main-content" className="pb-20 pt-24 sm:pb-24 sm:pt-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
        <div className="mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <header className="mb-10 grid min-w-0 gap-6 sm:mb-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,.55fr)] lg:items-end lg:gap-8">
            <div className="min-w-0 max-w-4xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm sm:tracking-[0.22em] dark:text-emerald-300">Engineering blog</p>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl dark:text-white">Notes from building real systems.</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8 dark:text-gray-400">Production lessons from full-stack development, scalable architecture, TypeScript, JavaScript, Python, Generative AI, real-time systems and the decisions behind software that has to keep working after launch.</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-600 sm:p-5 dark:border-white/10 dark:bg-white/[0.035] dark:text-gray-400"><strong className="block text-gray-950 dark:text-white">What you’ll find here</strong><span>Architecture breakdowns, debugging lessons, multi-language examples, implementation patterns, code and production trade-offs.</span></div>
          </header>
          <BlogList initialPosts={posts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
