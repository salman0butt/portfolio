'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock3, Link as LinkIcon } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import MarkdownContent, { headingId } from '@/components/blog/MarkdownContent';
import { BlogPost, estimateReadTime, getBlogDate } from '@/lib/blogs';

const dateFormatter = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' });

function extractHeadings(content: string) {
  return content.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (!match) return [];
    const text = match[2].replace(/\*\*|`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    return [{ id: headingId(match[2]), text, level: match[1].length }];
  });
}

export default function BlogPostView({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headings = useMemo(() => extractHeadings(post.content).filter((heading) => heading.level >= 2), [post.content]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const publishedDate = getBlogDate(post);
  const readTime = estimateReadTime(post.content);

  return (
    <article className="mx-auto max-w-6xl">
      <div className="fixed inset-x-0 top-16 z-40 h-0.5 bg-transparent" aria-hidden="true"><div className="h-full bg-emerald-500 transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
      <Link href="/blog" className="mb-8 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-gray-600 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-gray-400 dark:hover:text-emerald-300"><ArrowLeft size={16} aria-hidden="true" /> Back to all articles</Link>

      <header className="max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          {post.category && <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">{post.category}</span>}
          <time dateTime={publishedDate}>{dateFormatter.format(new Date(publishedDate))}</time><span aria-hidden="true">•</span><span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" /> {readTime} min read</span>
        </div>
        <h1 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl dark:text-white">{post.title}</h1>
        {post.excerpt && <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">{post.excerpt}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => <span key={tag} className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-400">#{tag}</span>)}
          <button type="button" onClick={copyLink} className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-gray-700 dark:text-gray-400"><LinkIcon size={13} aria-hidden="true" /> {copied ? 'Link copied' : 'Copy link'}</button>
        </div>
      </header>

      {post.cover_image_url && (
        <div className="relative mt-10 aspect-[16/9] max-h-[560px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={post.cover_image_url}
            alt={`Cover image for ${post.title}`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1152px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="max-w-3xl border-t border-gray-200 pt-4 dark:border-gray-800"><MarkdownContent content={post.content} /></div>
        {headings.length > 0 && <aside className="hidden lg:block"><div className="sticky top-24 rounded-2xl border border-gray-200 p-5 dark:border-white/10"><p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">On this page</p><nav aria-label="Article table of contents" className="mt-4 space-y-2.5">{headings.map((heading) => <a key={`${heading.id}-${heading.text}`} href={`#${heading.id}`} className={`block text-sm leading-5 text-gray-600 transition-colors hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-300 ${heading.level === 3 ? 'pl-3' : ''}`}>{heading.text}</a>)}</nav></div></aside>}
      </div>

      {related.length > 0 && <section className="mt-16 border-t border-gray-200 pt-10 dark:border-white/10"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">KEEP READING</p><h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">Related engineering notes</h2></div><div className="grid gap-5 md:grid-cols-3">{related.map((item) => <BlogCard key={item.id} post={item} compact />)}</div></section>}
    </article>
  );
}
