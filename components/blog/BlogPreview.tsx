'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import { BlogPost, getPublishedPosts } from '@/lib/blogs';

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let active = true;

    getPublishedPosts(3)
      .then((data) => {
        if (active) setPosts(data);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Writing</p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-gray-950 sm:text-4xl dark:text-white">
              Latest from the blog
            </h2>
            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
              Practical notes on full-stack engineering, system design, AI, and lessons from production systems.
            </p>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
            View all articles
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
