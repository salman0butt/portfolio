import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Blog — Salman Butt',
  description: 'Articles by Salman Butt on full-stack engineering, system design, Generative AI, React, Next.js, Node.js, and building production software.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Engineering Blog — Salman Butt',
    description: 'Practical articles on full-stack engineering, system design, and Generative AI.',
    type: 'website',
    url: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">Engineering blog</p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl dark:text-white">
              Notes from building real products
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Practical lessons from full-stack development, scalable systems, Generative AI, IoT, and shipping production software.
            </p>
          </header>

          <BlogList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
