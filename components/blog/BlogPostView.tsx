'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock3 } from 'lucide-react';
import MarkdownContent from '@/components/blog/MarkdownContent';
import { BlogPost, estimateReadTime, getBlogDate, getPublishedPostBySlug } from '@/lib/blogs';

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export default function BlogPostView() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug')?.trim() ?? '';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setFailed(false);

    if (!slug) {
      setFailed(true);
      setLoading(false);
      return () => {
        active = false;
      };
    }

    getPublishedPostBySlug(slug)
      .then((data) => {
        if (!active) return;
        if (!data) setFailed(true);
        setPost(data);
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const previousTitle = document.title;
    document.title = `${post.title} — Salman Butt`;

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = post.excerpt || post.title;

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) {
        description.content = previousDescription;
      }
    };
  }, [post]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="mb-6 h-5 w-28 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-12 w-full rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-4 h-7 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-10 h-80 rounded-2xl bg-gray-200 dark:bg-gray-800" />
      </div>
    );
  }

  if (failed || !post) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900/70">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white">Article not found</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">This article may be unpublished, removed, or the link may be incorrect.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to blog
        </Link>
      </div>
    );
  }

  const publishedDate = getBlogDate(post);
  const readTime = estimateReadTime(post.content);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url || undefined,
    datePublished: publishedDate,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: 'Salman Butt',
    },
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to all articles
      </Link>

      <header>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          {post.category && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              {post.category}
            </span>
          )}
          <time dateTime={publishedDate}>{dateFormatter.format(new Date(publishedDate))}</time>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" /> {readTime} min read</span>
        </div>

        <h1 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl dark:text-white">
          {post.title}
        </h1>

        {post.excerpt && <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">{post.excerpt}</p>}

        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.cover_image_url && (
        <img src={post.cover_image_url} alt="" className="mt-10 max-h-[520px] w-full rounded-2xl border border-gray-200 object-cover shadow-sm dark:border-gray-800" />
      )}

      <div className="mt-10 border-t border-gray-200 pt-4 dark:border-gray-800">
        <MarkdownContent content={post.content} />
      </div>
    </article>
  );
}
