import { timingSafeEqual } from 'node:crypto';
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const BLOG_FIELDS = 'id,title,slug,excerpt,content,cover_image_url,category,tags,featured,published,published_at,created_at,updated_at';
const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'] as const;
const ALLOWED_IMAGE_TYPES = new Set<string>(IMAGE_TYPES);

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase kebab-case slug.');

const publicationDateSchema = z
  .string()
  .min(1)
  .describe('ISO 8601 date or datetime, e.g. 2026-08-20 or 2026-08-20T10:30:00+05:00.');

type BlogPost = {
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

function secureEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function isAuthorized(request: Request) {
  const urlToken = new URL(request.url).searchParams.get('token');
  const expectedUrlToken = process.env.PORTFOLIO_MCP_URL_TOKEN;

  if (urlToken && expectedUrlToken && secureEqual(urlToken, expectedUrlToken)) {
    return true;
  }

  const auth = request.headers.get('authorization');
  const expectedBearer = process.env.PORTFOLIO_MCP_TOKEN;
  if (auth?.startsWith('Bearer ') && expectedBearer) {
    return secureEqual(auth.slice(7), expectedBearer);
  }

  return false;
}

function requireConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '');
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  const bucket = process.env.SUPABASE_BLOG_BUCKET || 'blog-images';

  if (!url) throw new Error('SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL is not configured.');
  if (!secretKey) throw new Error('SUPABASE_SECRET_KEY is not configured.');

  return { url, secretKey, bucket };
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const { url, secretKey } = requireConfig();
  const headers = new Headers(init.headers);
  headers.set('apikey', secretKey);
  headers.set('Authorization', `Bearer ${secretKey}`);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');

  const response = await fetch(`${url}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${detail.slice(0, 500)}`);
  }

  return response;
}

function cleanTags(value: string[]) {
  return value.map((item) => item.trim()).filter(Boolean).slice(0, 30);
}

function normalizePublishedAt(value: string) {
  const raw = value.trim();
  const date = /^\d{4}-\d{2}-\d{2}$/.test(raw)
    ? new Date(`${raw}T00:00:00.000Z`)
    : new Date(raw);

  if (Number.isNaN(date.getTime())) {
    throw new Error('published_at must be a valid ISO 8601 date or datetime.');
  }

  return date.toISOString();
}

function normalizeObjectPath(value: string) {
  const raw = value.trim().replace(/^\/+|\/+$/g, '').replace(/\/{2,}/g, '/');
  const segments = raw.split('/');

  if (!raw || segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    throw new Error('Invalid storage path.');
  }

  if (!/^[a-zA-Z0-9._/-]+$/.test(raw)) {
    throw new Error('Storage path may only contain letters, numbers, dots, underscores, hyphens, and slashes.');
  }

  return raw;
}

function encodeObjectPath(path: string) {
  return path.split('/').map(encodeURIComponent).join('/');
}

function publicImageUrl(path: string) {
  const { url, bucket } = requireConfig();
  return `${url}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodeObjectPath(path)}`;
}

async function listPosts(state: 'all' | 'published' | 'draft', limit: number) {
  const params = new URLSearchParams({
    select: BLOG_FIELDS,
    order: 'featured.desc,published_at.desc.nullslast,created_at.desc',
    limit: String(limit),
  });

  if (state === 'published') params.set('published', 'eq.true');
  if (state === 'draft') params.set('published', 'eq.false');

  const response = await supabaseFetch(`/rest/v1/blogs?${params.toString()}`);
  return (await response.json()) as BlogPost[];
}

async function getPost(slug: string) {
  const params = new URLSearchParams({ select: BLOG_FIELDS, slug: `eq.${slug}`, limit: '1' });
  const response = await supabaseFetch(`/rest/v1/blogs?${params.toString()}`);
  const rows = (await response.json()) as BlogPost[];

  if (!rows[0]) throw new Error(`Blog post not found: ${slug}`);
  return rows[0];
}

async function createPost(input: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url?: string | null;
  category?: string | null;
  tags: string[];
  featured: boolean;
  published: boolean;
  published_at?: string;
}) {
  const payload: Record<string, unknown> = {
    title: input.title.trim(),
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    cover_image_url: input.cover_image_url ?? null,
    category: input.category ?? null,
    tags: cleanTags(input.tags),
    featured: input.featured,
    published: input.published,
  };

  if (input.published_at) payload.published_at = normalizePublishedAt(input.published_at);

  const response = await supabaseFetch('/rest/v1/blogs?select=*', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  });

  const rows = (await response.json()) as BlogPost[];
  if (!rows[0]) throw new Error('Supabase did not return the created blog post.');
  return rows[0];
}

async function patchPost(slug: string, patch: Record<string, unknown>) {
  if (Object.keys(patch).length === 0) return getPost(slug);

  const params = new URLSearchParams({ slug: `eq.${slug}`, select: '*' });
  const response = await supabaseFetch(`/rest/v1/blogs?${params.toString()}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify(patch),
  });

  const rows = (await response.json()) as BlogPost[];
  if (!rows[0]) throw new Error(`Blog post not found: ${slug}`);
  return rows[0];
}

async function deletePost(slug: string) {
  await getPost(slug);
  const params = new URLSearchParams({ slug: `eq.${slug}` });

  await supabaseFetch(`/rest/v1/blogs?${params.toString()}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  });

  return { deleted: true, slug };
}

async function uploadImage(input: {
  path: string;
  content_type: (typeof IMAGE_TYPES)[number];
  base64: string;
  upsert: boolean;
}) {
  const path = normalizeObjectPath(input.path);
  const contentType = input.content_type.toLowerCase();

  if (!ALLOWED_IMAGE_TYPES.has(contentType)) {
    throw new Error(`Unsupported image content type: ${contentType}`);
  }

  const encoded = input.base64.replace(/^data:[^;]+;base64,/, '');
  const bytes = Buffer.from(encoded, 'base64');

  if (bytes.length === 0) throw new Error('Decoded image is empty.');
  if (bytes.length > MAX_IMAGE_BYTES) throw new Error('Image exceeds the 5 MB MCP upload limit.');

  const { bucket } = requireConfig();
  await supabaseFetch(`/storage/v1/object/${encodeURIComponent(bucket)}/${encodeObjectPath(path)}`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      'x-upsert': input.upsert ? 'true' : 'false',
      'Cache-Control': '3600',
    },
    body: new Uint8Array(bytes),
  });

  return {
    path,
    content_type: contentType,
    bytes: bytes.length,
    public_url: publicImageUrl(path),
  };
}

async function deleteImage(pathValue: string) {
  const path = normalizeObjectPath(pathValue);
  const { bucket } = requireConfig();
  const response = await supabaseFetch(`/storage/v1/object/${encodeURIComponent(bucket)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prefixes: [path] }),
  });

  const result = await response.json().catch(() => []);
  return { deleted: true, path, result };
}

function toolSuccess(data: unknown) {
  const structuredContent = Array.isArray(data)
    ? { items: data }
    : typeof data === 'object' && data !== null
      ? data as Record<string, unknown>
      : { value: data };

  return {
    content: [{ type: 'text' as const, text: typeof data === 'string' ? data : JSON.stringify(data, null, 2) }],
    structuredContent,
    isError: false,
  };
}

function toolFailure(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown tool error';
  return {
    content: [{ type: 'text' as const, text: message }],
    isError: true,
  };
}

async function runTool<T>(operation: () => Promise<T>) {
  try {
    return toolSuccess(await operation());
  } catch (error) {
    return toolFailure(error);
  }
}

const handler = createMcpHandler((server) => {
  server.registerTool(
    'list_blog_posts',
    {
      title: 'List blog posts',
      description: 'List portfolio blog posts, including drafts when requested.',
      inputSchema: z.object({
        state: z.enum(['all', 'published', 'draft']).default('all'),
        limit: z.number().int().min(1).max(100).default(50),
      }).strict(),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ state, limit }) => runTool(() => listPosts(state, limit)),
  );

  server.registerTool(
    'get_blog_post',
    {
      title: 'Get blog post',
      description: 'Get one portfolio blog post by slug, including its full Markdown content.',
      inputSchema: z.object({ slug: slugSchema }).strict(),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ slug }) => runTool(() => getPost(slug)),
  );

  server.registerTool(
    'create_blog_post',
    {
      title: 'Create blog post',
      description: 'Create a portfolio article. Defaults to a draft. Supports a custom publication date when published.',
      inputSchema: z.object({
        title: z.string().min(1).max(180),
        slug: slugSchema,
        excerpt: z.string(),
        content: z.string(),
        cover_image_url: z.string().nullable().optional(),
        category: z.string().nullable().optional(),
        tags: z.array(z.string()).max(30).default([]),
        featured: z.boolean().default(false),
        published: z.boolean().default(false),
        published_at: publicationDateSchema.optional(),
      }).strict(),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async (input) => runTool(() => createPost(input)),
  );

  server.registerTool(
    'update_blog_post',
    {
      title: 'Update blog post',
      description: 'Update an existing article, including content, metadata, slug, cover image URL, or custom publication date.',
      inputSchema: z.object({
        slug: slugSchema,
        title: z.string().min(1).max(180).optional(),
        new_slug: slugSchema.optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        cover_image_url: z.string().nullable().optional(),
        category: z.string().nullable().optional(),
        tags: z.array(z.string()).max(30).optional(),
        featured: z.boolean().optional(),
        published_at: publicationDateSchema.optional(),
      }).strict(),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ slug, new_slug, published_at, ...changes }) => runTool(async () => {
      const patch: Record<string, unknown> = { ...changes };
      if (new_slug) patch.slug = new_slug;
      if (changes.tags) patch.tags = cleanTags(changes.tags);
      if (published_at) patch.published_at = normalizePublishedAt(published_at);
      return patchPost(slug, patch);
    }),
  );

  server.registerTool(
    'publish_blog_post',
    {
      title: 'Publish blog post',
      description: 'Publish an existing draft, optionally using a custom publication date.',
      inputSchema: z.object({
        slug: slugSchema,
        published_at: publicationDateSchema.optional(),
      }).strict(),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ slug, published_at }) => runTool(() => patchPost(slug, {
      published: true,
      ...(published_at ? { published_at: normalizePublishedAt(published_at) } : {}),
    })),
  );

  server.registerTool(
    'unpublish_blog_post',
    {
      title: 'Unpublish blog post',
      description: 'Remove an article from the public blog while retaining it in Supabase.',
      inputSchema: z.object({ slug: slugSchema }).strict(),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ slug }) => runTool(() => patchPost(slug, { published: false })),
  );

  server.registerTool(
    'delete_blog_post',
    {
      title: 'Delete blog post',
      description: 'Permanently delete an article by slug. Images are managed separately.',
      inputSchema: z.object({ slug: slugSchema }).strict(),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ slug }) => runTool(() => deletePost(slug)),
  );

  server.registerTool(
    'upload_blog_image',
    {
      title: 'Upload blog image',
      description: 'Upload a new PNG, JPEG, WebP, GIF, or AVIF image to the public blog-images bucket.',
      inputSchema: z.object({
        path: z.string().min(1),
        content_type: z.enum(IMAGE_TYPES),
        base64: z.string().min(1),
      }).strict(),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async ({ path, content_type, base64 }) => runTool(() => uploadImage({ path, content_type, base64, upsert: false })),
  );

  server.registerTool(
    'replace_blog_image',
    {
      title: 'Replace blog image',
      description: 'Replace an existing blog image at the same Storage path.',
      inputSchema: z.object({
        path: z.string().min(1),
        content_type: z.enum(IMAGE_TYPES),
        base64: z.string().min(1),
      }).strict(),
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ path, content_type, base64 }) => runTool(() => uploadImage({ path, content_type, base64, upsert: true })),
  );

  server.registerTool(
    'delete_blog_image',
    {
      title: 'Delete blog image',
      description: 'Permanently delete one image from the blog-images bucket.',
      inputSchema: z.object({ path: z.string().min(1) }).strict(),
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ path }) => runTool(() => deleteImage(path)),
  );

  server.registerTool(
    'get_blog_image_url',
    {
      title: 'Get blog image URL',
      description: 'Return the public URL for an object in the blog-images bucket.',
      inputSchema: z.object({ path: z.string().min(1) }).strict(),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ path }) => runTool(async () => {
      const normalized = normalizeObjectPath(path);
      return { path: normalized, public_url: publicImageUrl(normalized) };
    }),
  );
}, {
  serverInfo: {
    name: 'salman-portfolio-mcp',
    version: '2.0.0',
  },
});

async function authenticatedHandler(request: Request) {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'WWW-Authenticate': 'Bearer',
      },
    });
  }

  return handler(request);
}

export { authenticatedHandler as GET, authenticatedHandler as POST };

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, content-type, mcp-protocol-version',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Cache-Control': 'no-store',
    },
  });
}
