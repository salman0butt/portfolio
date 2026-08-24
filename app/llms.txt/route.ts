import { getPublishedPosts } from '@/lib/blogs';

const siteUrl = 'https://salman-butt.vercel.app';

export async function GET() {
  let posts = [];
  try {
    posts = await getPublishedPosts(100);
  } catch {
    posts = [];
  }

  const articleLines = posts.map((post) => {
    const category = post.category ? ` — ${post.category}` : '';
    const summary = post.excerpt ? `: ${post.excerpt}` : '';
    return `- [${post.title}](${siteUrl}/blog/${post.slug})${category}${summary}`;
  });

  const body = [
    '# Salman Butt — Senior Full-Stack & Generative AI Engineer',
    '',
    '> Production engineering portfolio and technical writing covering full-stack systems, TypeScript, JavaScript, Python, system design, reliability, Generative AI, AI agents and workflow automation.',
    '',
    '## Primary pages',
    `- [Portfolio](${siteUrl})`,
    `- [Engineering Blog](${siteUrl}/blog)`,
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    `- [RSS Feed](${siteUrl}/feed.xml)`,
    `- [Full AI-readable articles](${siteUrl}/llms-full.txt)`,
    '',
    '## Engineering articles',
    ...(articleLines.length > 0 ? articleLines : ['- No published articles are currently available.']),
    '',
    '## Topics',
    '- Senior software engineering and production ownership',
    '- TypeScript, JavaScript and Python implementation patterns',
    '- React, Next.js and Node.js',
    '- System design, APIs, databases, caching and distributed systems',
    '- Reliability, observability, performance and application security',
    '- Generative AI, RAG, LangGraph, AI agents and AI automation',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
