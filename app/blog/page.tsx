import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Engineering Blog',
  description: 'Practical engineering articles on production Generative AI, system design, React, Next.js, Node.js, real-time systems and shipping reliable software.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Engineering Blog — Salman Butt',
    description: 'Production AI, system design and full-stack engineering notes.',
    type: 'website',
    url: '/blog',
    images: [{ url: '/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Blog — Salman Butt',
    description: 'Production AI, system design and full-stack engineering notes.',
    images: ['/opengraph-image'],
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="pb-20 pt-28 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">Engineering blog</p>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl dark:text-white">Notes from building real systems.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">Production lessons from full-stack development, scalable architecture, Generative AI, real-time systems and the decisions behind software that has to keep working after launch.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-6 text-gray-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-gray-400"><strong className="block text-gray-950 dark:text-white">What you’ll find here</strong><span>Architecture breakdowns, debugging lessons, implementation patterns, code and production trade-offs.</span></div>
          </header>
          <BlogList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
