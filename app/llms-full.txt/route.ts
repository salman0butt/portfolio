import { type BlogPost, getBlogDate, getPublishedPosts } from '@/lib/blogs';

const siteUrl = 'https://salman-butt.vercel.app';

export async function GET() {
  let posts: BlogPost[] = [];
  try {
    posts = await getPublishedPosts(100);
  } catch {
    posts = [];
  }

  const articles = posts.map((post) => [
    `# ${post.title}`,
    '',
    `Canonical URL: ${siteUrl}/blog/${post.slug}`,
    `Published: ${getBlogDate(post)}`,
    `Updated: ${post.updated_at}`,
    post.category ? `Category: ${post.category}` : '',
    post.tags.length ? `Tags: ${post.tags.join(', ')}` : '',
    '',
    post.excerpt,
    '',
    post.content,
    '',
    '---',
    '',
  ].filter(Boolean).join('\n')).join('\n');

  const body = [
    '# Salman Butt Engineering Blog — Full Text',
    '',
    `Source: ${siteUrl}/blog`,
    'Author: Salman Butt — Senior Full-Stack & Generative AI Engineer',
    '',
    articles || 'No published articles are currently available.',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
