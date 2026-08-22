'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock3, Link as LinkIcon } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import MarkdownContent, { headingId } from '@/components/blog/MarkdownContent';
import { BlogPost, estimateReadTime, getBlogDate, getPublishedPostBySlug, getPublishedPosts } from '@/lib/blogs';

const dateFormatter = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' });

function extractHeadings(content: string) {
  return content.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (!match) return [];
    const text = match[2].replace(/\*\*|`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    return [{ id: headingId(match[2]), text, level: match[1].length }];
  });
}

export default function BlogPostView() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug')?.trim() ?? '';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setFailed(false);
    if (!slug) { setFailed(true); setLoading(false); return () => { active = false; }; }

    Promise.all([getPublishedPostBySlug(slug), getPublishedPosts(8)])
      .then(([article, posts]) => {
        if (!active) return;
        if (!article) { setFailed(true); return; }
        setPost(article);
        const sameCategory = posts.filter((item) => item.slug !== article.slug && item.category === article.category);
        const others = posts.filter((item) => item.slug !== article.slug && item.category !== article.category);
        setRelated([...sameCategory, ...others].slice(0, 3));
      })
      .catch(() => { if (active) setFailed(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!post) return;
    const previousTitle = document.title;
    document.title = `${post.title} — Salman Butt`;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.appendChild(description); }
    description.content = post.excerpt || post.title;
    return () => { document.title = previousTitle; if (description && previousDescription !== undefined) description.content = previousDescription; };
  }, [post]);

  const headings = useMemo(() => post ? extractHeadings(post.content).filter((heading) => heading.level >= 2) : [], [post]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  if (loading) return <div className="mx-auto max-w-4xl animate-pulse"><div className="h-12 rounded bg-gray-200 dark:bg-gray-800" /><div className="mt-4 h-7 w-2/3 rounded bg-gray-200 dark:bg-gray-800" /><div className="mt-10 h-80 rounded-2xl bg-gray-200 dark:bg-gray-800" /></div>;

  if (failed || !post) return <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900/70"><h1 className="text-2xl font-bold text-gray-950 dark:text-white">Article not found</h1><p className="mt-3 text-gray-600 dark:text-gray-400">This article may be unpublished, removed, or the link may be incorrect.</p><Link href="/blog" className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400"><ArrowLeft size={16} /> Back to blog</Link></div>;

  const publishedDate = getBlogDate(post);
  const readTime = estimateReadTime(post.content);
  const structuredData = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.excerpt, image: post.cover_image_url || undefined, datePublished: publishedDate, dateModified: post.updated_at, author: { '@type': 'Person', name: 'Salman Butt' } };

  return (
    <article className="mx-auto max-w-6xl">
      <div className="fixed inset-x-0 top-16 z-40 h-0.5 bg-transparent"><div className="h-full bg-emerald-500 transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"><ArrowLeft size={16} /> Back to all articles</Link>

      <header className="max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          {post.category && <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">{post.category}</span>}
          <time dateTime={publishedDate}>{dateFormatter.format(new Date(publishedDate))}</time><span>•</span><span className="inline-flex items-center gap-1.5"><Clock3 size={15} /> {readTime} min read</span>
        </div>
        <h1 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl dark:text-white">{post.title}</h1>
        {post.excerpt && <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">{post.excerpt}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => <span key={tag} className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:text-gray-400">#{tag}</span>)}
          <button type="button" onClick={copyLink} className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-600 dark:border-gray-700 dark:text-gray-400"><LinkIcon size={13} /> {copied ? 'Link copied' : 'Copy link'}</button>
        </div>
      </header>

      {post.cover_image_url && <img src={post.cover_image_url} alt="" className="mt-10 max-h-[560px] w-full rounded-2xl border border-gray-200 object-cover shadow-sm dark:border-gray-800" />}

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="max-w-3xl border-t border-gray-200 pt-4 dark:border-gray-800"><MarkdownContent content={post.content} /></div>
        {headings.length > 0 && <aside className="hidden lg:block"><div className="sticky top-24 rounded-2xl border border-gray-200 p-5 dark:border-white/10"><p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">On this page</p><nav className="mt-4 space-y-2.5">{headings.map((heading) => <a key={`${heading.id}-${heading.text}`} href={`#${heading.id}`} className={`block text-sm leading-5 text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 ${heading.level === 3 ? 'pl-3' : ''}`}>{heading.text}</a>)}</nav></div></aside>}
      </div>

      {related.length > 0 && <section className="mt-16 border-t border-gray-200 pt-10 dark:border-white/10"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">KEEP READING</p><h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">Related engineering notes</h2></div><div className="grid gap-5 md:grid-cols-3">{related.map((item) => <BlogCard key={item.id} post={item} compact />)}</div></section>}
    </article>
  );
}
