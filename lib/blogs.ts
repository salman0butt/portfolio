export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string | null;
  tags: string[];
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const BLOG_FIELDS = [
  'id',
  'title',
  'slug',
  'excerpt',
  'content',
  'cover_image_url',
  'category',
  'tags',
  'featured',
  'published',
  'published_at',
  'created_at',
  'updated_at',
].join(',');

type SupabaseConfig = {
  url: string;
  anonKey: string;
};

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function isBlogConfigured() {
  return getSupabaseConfig() !== null;
}

async function queryBlogs(params: URLSearchParams): Promise<BlogPost[]> {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error('Supabase blog credentials are not configured.');
  }

  const response = await fetch(`${config.url}/rest/v1/blogs?${params.toString()}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to load blog posts (${response.status}).`);
  }

  return (await response.json()) as BlogPost[];
}

export async function getPublishedPosts(limit = 100): Promise<BlogPost[]> {
  const params = new URLSearchParams();
  params.set('select', BLOG_FIELDS);
  params.set('published', 'eq.true');
  params.set('order', 'featured.desc,published_at.desc.nullslast,created_at.desc');
  params.set('limit', String(limit));

  return queryBlogs(params);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const params = new URLSearchParams();
  params.set('select', BLOG_FIELDS);
  params.set('published', 'eq.true');
  params.set('slug', `eq.${slug}`);
  params.set('limit', '1');

  const posts = await queryBlogs(params);
  return posts[0] ?? null;
}

export function getBlogDate(post: BlogPost) {
  return post.published_at ?? post.created_at;
}

export function estimateReadTime(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`\[\]()!-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 225));
}
