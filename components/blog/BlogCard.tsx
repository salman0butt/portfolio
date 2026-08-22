import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { BlogPost, estimateReadTime, getBlogDate } from '@/lib/blogs';

type BlogCardProps = {
  post: BlogPost;
  compact?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export default function BlogCard({ post, compact = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;
  const readTime = estimateReadTime(post.content);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/70">
      {post.cover_image_url && (
        <Link href={href} className={`block overflow-hidden bg-gray-100 dark:bg-gray-800 ${compact ? 'h-44' : 'h-52'}`}>
          <img
            src={post.cover_image_url}
            alt={`Cover image for ${post.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
          />
        </Link>
      )}

      <div className={compact ? 'p-5' : 'p-6'}>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
          {post.category && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
              {post.category}
            </span>
          )}
          <time dateTime={getBlogDate(post)}>{dateFormatter.format(new Date(getBlogDate(post)))}</time>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock3 size={13} aria-hidden="true" />
            {readTime} min read
          </span>
        </div>

        <h2 className={`${compact ? 'text-lg' : 'text-xl'} font-[family-name:var(--font-space-grotesk)] font-semibold leading-snug text-gray-950 dark:text-white`}>
          <Link href={href} className="rounded-sm transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:text-emerald-300">
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
        )}

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
        >
          Read article
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
