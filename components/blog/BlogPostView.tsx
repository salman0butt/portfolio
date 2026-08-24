'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock3, Link as LinkIcon, UserRound } from 'lucide-react';
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

function TableOfContents({ headings }: { headings: ReturnType<typeof extractHeadings> }) {
  return (
    <nav aria-label="Article table of contents" className="mt-4 space-y-2.5">
      {headings.map((heading) => (
        <a
          key={`${heading.id}-${heading.text}`}
          href={`#${heading.id}`}
          className={`block break-words text-sm leading-5 text-gray-600 transition-colors hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-300 ${heading.level === 3 ? 'pl-3' : ''}`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
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
  const coverIsSvg = post.cover_image_url?.toLowerCase().split('?')[0].endsWith('.svg') ?? false;
  const publishedLabel = dateFormatter.format(new Date(publishedDate));
  const updatedLabel = dateFormatter.format(new Date(post.updated_at));
  const showUpdated = updatedLabel !== publishedLabel;

  return (
    <article className="mx-auto w-full max-w-7xl min-w-0">
      <div className="fixed inset-x-0 top-16 z-40 h-0.5 bg-transparent" aria-hidden="true"><div className="h-full bg-emerald-500 transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
      <Link href="/blog" className="mb-6 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-gray-600 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:mb-8 dark:text-gray-400 dark:hover:text-emerald-300"><ArrowLeft size={16} aria-hidden="true" /> Back to all articles</Link>

      <header className="min-w-0 max-w-4xl">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
          {post.category && <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">{post.category}</span>}
          <time dateTime={publishedDate}>{publishedLabel}</time><span aria-hidden="true">•</span><span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" /> {readTime} min read</span>
          {showUpdated && <><span aria-hidden="true" className="hidden sm:inline">•</span><span className="basis-full sm:basis-auto">Updated {updatedLabel}</span></>}
        </div>
        <h1 className="mt-5 break-words font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-[1.12] tracking-tight text-gray-950 sm:text-5xl sm:leading-tight dark:text-white">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8 dark:text-gray-300">{post.excerpt}</p>}
        <div className="mt-5 flex items-center gap-2 text-sm text-gray-600 sm:mt-6 dark:text-gray-400">
          <UserRound size={16} aria-hidden="true" />
          <span>By <strong className="font-semibold text-gray-900 dark:text-gray-200">Salman Butt</strong> · Senior Full-Stack & Generative AI Engineer</span>
        </div>
        <div className="mt-5 flex min-w-0 flex-wrap items-center gap-2 sm:mt-6">
          {post.tags.map((tag) => <span key={tag} className="max-w-full break-all rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-400">#{tag}</span>)}
          <button type="button" onClick={copyLink} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:ml-auto dark:border-gray-700 dark:text-gray-400"><LinkIcon size={13} aria-hidden="true" /> {copied ? 'Link copied' : 'Copy link'}</button>
        </div>
      </header>

      {post.cover_image_url && (
        <div className="relative mt-8 aspect-[16/9] w-full max-w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm sm:mt-10 sm:rounded-2xl dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={post.cover_image_url}
            alt={`Cover image for ${post.title}`}
            fill
            priority
            unoptimized={coverIsSvg}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1280px"
            className="object-cover"
          />
        </div>
      )}

      {headings.length > 0 && (
        <details className="mt-8 rounded-xl border border-gray-200 bg-gray-50/70 p-4 xl:hidden dark:border-white/10 dark:bg-white/[0.025]">
          <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-white">On this page</summary>
          <TableOfContents headings={headings} />
        </details>
      )}

      <div className="mt-8 grid min-w-0 gap-10 sm:mt-10 xl:grid-cols-[minmax(0,1fr)_260px] xl:gap-12">
        <div className="min-w-0 max-w-3xl border-t border-gray-200 pt-2 sm:pt-4 dark:border-gray-800"><MarkdownContent content={post.content} /></div>
        {headings.length > 0 && <aside className="hidden min-w-0 xl:block"><div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-gray-200 p-5 dark:border-white/10"><p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">On this page</p><TableOfContents headings={headings} /></div></aside>}
      </div>

      {related.length > 0 && <section className="mt-14 border-t border-gray-200 pt-8 sm:mt-16 sm:pt-10 dark:border-white/10"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">KEEP READING</p><h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">Related engineering notes</h2></div><div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <BlogCard key={item.id} post={item} compact />)}</div></section>}
    </article>
  );
}
