'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import { BlogPost } from '@/lib/blogs';

export default function BlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(initialPosts.map((post) => post.category).filter((value): value is string => Boolean(value))))],
    [initialPosts],
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return initialPosts.filter((post) => {
      const inCategory = category === 'All' || post.category === category;
      const searchable = [post.title, post.excerpt, post.category ?? '', ...post.tags].join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      return inCategory && matchesQuery;
    });
  }, [initialPosts, query, category]);

  if (initialPosts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center sm:p-10 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">No published articles yet</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">New engineering notes and case studies will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                category === item
                  ? 'bg-emerald-500 text-white'
                  : 'border border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:text-emerald-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="relative block w-full lg:w-72 lg:shrink-0">
          <span className="sr-only">Search articles</span>
          <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </label>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} eager={index === 0} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-600 sm:p-10 dark:border-gray-700 dark:text-gray-400">
          No articles match your current filters.
        </div>
      )}
    </>
  );
}
