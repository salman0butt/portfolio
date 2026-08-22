import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostView from '@/components/blog/BlogPostView';

export const metadata: Metadata = {
  title: 'Blog article — Salman Butt',
  description: 'Engineering article by Salman Butt.',
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="mx-auto h-96 max-w-3xl animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-900" />}>
            <BlogPostView />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
