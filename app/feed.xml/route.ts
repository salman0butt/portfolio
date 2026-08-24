import { type BlogPost, getBlogDate, getPublishedPosts } from '@/lib/blogs';

const siteUrl = 'https://salman-butt.vercel.app';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  let posts: BlogPost[] = [];
  try {
    posts = await getPublishedPosts(100);
  } catch {
    posts = [];
  }

  const items = posts.map((post) => {
    const url = `${siteUrl}/blog/${post.slug}`;
    return `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <description>${escapeXml(post.excerpt || post.title)}</description>
        <pubDate>${new Date(getBlogDate(post)).toUTCString()}</pubDate>
        ${post.category ? `<category>${escapeXml(post.category)}</category>` : ''}
      </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Salman Butt Engineering Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Production engineering notes on full-stack systems, TypeScript, JavaScript, Python, system design and Generative AI.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
