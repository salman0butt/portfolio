import { timingSafeEqual } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type JsonRpcId = string | number | null;

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: Record<string, unknown>;
};

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

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: Record<string, boolean>;
};

const SUPPORTED_PROTOCOL = '2025-06-18';
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const BLOG_FIELDS = 'id,title,slug,excerpt,content,cover_image_url,category,tags,featured,published,published_at,created_at,updated_at';
const ALLOWED_IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']);

const tools: ToolDefinition[] = [
  {
    name: 'list_blog_posts',
    title: 'List blog posts',
    description: 'List portfolio blog posts. Can return all posts, only published posts, or only drafts.',
    inputSchema: {
      type: 'object',
      properties: {
        state: { type: 'string', enum: ['all', 'published', 'draft'], default: 'all' },
        limit: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  {
    name: 'get_blog_post',
    title: 'Get blog post',
    description: 'Get one portfolio blog post by slug, including full Markdown content.',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', minLength: 1 } },
      required: ['slug'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  {
    name: 'create_blog_post',
    title: 'Create blog post',
    description: 'Create a portfolio article. Defaults to an unpublished draft unless published=true is explicitly supplied.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1, maxLength: 180 },
        slug: { type: 'string', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' },
        excerpt: { type: 'string' },
        content: { type: 'string' },
        cover_image_url: { type: ['string', 'null'] },
        category: { type: ['string', 'null'] },
        tags: { type: 'array', items: { type: 'string' }, default: [] },
        featured: { type: 'boolean', default: false },
        published: { type: 'boolean', default: false },
      },
      required: ['title', 'slug', 'excerpt', 'content'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false },
  },
  {
    name: 'update_blog_post',
    title: 'Update blog post',
    description: 'Update selected fields of an existing portfolio article identified by its current slug.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', minLength: 1 },
        title: { type: 'string', minLength: 1, maxLength: 180 },
        new_slug: { type: 'string', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' },
        excerpt: { type: 'string' },
        content: { type: 'string' },
        cover_image_url: { type: ['string', 'null'] },
        category: { type: ['string', 'null'] },
        tags: { type: 'array', items: { type: 'string' } },
        featured: { type: 'boolean' },
      },
      required: ['slug'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  },
  {
    name: 'publish_blog_post',
    title: 'Publish blog post',
    description: 'Publish an existing draft. The database trigger sets published_at when needed.',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', minLength: 1 } },
      required: ['slug'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  },
  {
    name: 'unpublish_blog_post',
    title: 'Unpublish blog post',
    description: 'Remove an article from the public blog while keeping its content in Supabase.',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', minLength: 1 } },
      required: ['slug'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  },
  {
    name: 'delete_blog_post',
    title: 'Delete blog post',
    description: 'Permanently delete a portfolio article by slug. This does not automatically remove images.',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', minLength: 1 } },
      required: ['slug'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true },
  },
  {
    name: 'upload_blog_image',
    title: 'Upload blog image',
    description: 'Upload a PNG, JPEG, WebP, GIF, or AVIF image (base64 encoded) to the public blog-images bucket and return its public URL.',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Object path such as scalable-nodejs-apis/cover.webp' },
        content_type: { type: 'string', enum: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'] },
        base64: { type: 'string', minLength: 1 },
        upsert: { type: 'boolean', default: false },
      },
      required: ['path', 'content_type', 'base64'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false },
  },
  {
    name: 'delete_blog_image',
    title: 'Delete blog image',
    description: 'Permanently delete one image from the blog-images bucket.',
    inputSchema: {
      type: 'object',
      properties: { path: { type: 'string', minLength: 1 } },
      required: ['path'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true },
  },
  {
    name: 'get_blog_image_url',
    title: 'Get blog image URL',
    description: 'Build the public URL for an object in the blog-images bucket.',
    inputSchema: {
      type: 'object',
      properties: { path: { type: 'string', minLength: 1 } },
      required: ['path'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
];

function jsonHeaders() {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, content-type, mcp-protocol-version, mcp-method, mcp-name',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

function jsonRpcResult(id: JsonRpcId | undefined, result: unknown, status = 200) {
  return new Response(JSON.stringify({ jsonrpc: '2.0', id: id ?? null, result }), { status, headers: jsonHeaders() });
}

function jsonRpcError(id: JsonRpcId | undefined, code: number, message: string, status = 200) {
  return new Response(JSON.stringify({ jsonrpc: '2.0', id: id ?? null, error: { code, message } }), { status, headers: jsonHeaders() });
}

function toolSuccess(data: unknown) {
  return {
    content: [{ type: 'text', text: typeof data === 'string' ? data : JSON.stringify(data, null, 2) }],
    structuredContent: typeof data === 'object' && data !== null ? data : { value: data },
    isError: false,
  };
}

function toolFailure(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown tool error';
  return { content: [{ type: 'text', text: message }], isError: true };
}

function secureEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function isAuthorized(request: Request) {
  const expected = process.env.PORTFOLIO_MCP_TOKEN;
  if (!expected) return false;
  const value = request.headers.get('authorization');
  if (!value?.startsWith('Bearer ')) return false;
  return secureEqual(value.slice(7), expected);
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

  const response = await fetch(`${url}${path}`, { ...init, headers, cache: 'no-store' });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${detail.slice(0, 500)}`);
  }
  return response;
}

function asString(value: unknown, name: string) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${name} must be a non-empty string.`);
  return value.trim();
}

function asBoolean(value: unknown, fallback?: boolean) {
  return typeof value === 'boolean' ? value : fallback;
}

function cleanTags(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean).slice(0, 30);
}

function normalizeObjectPath(value: unknown) {
  const raw = asString(value, 'path').replace(/^\/+|\/+$/g, '').replace(/\/{2,}/g, '/');
  const segments = raw.split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) throw new Error('Invalid storage path.');
  if (!/^[a-zA-Z0-9._/-]+$/.test(raw)) throw new Error('Storage path may only contain letters, numbers, dots, underscores, hyphens, and slashes.');
  return raw;
}

function encodeObjectPath(path: string) {
  return path.split('/').map(encodeURIComponent).join('/');
}

function publicImageUrl(path: string) {
  const { url, bucket } = requireConfig();
  return `${url}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodeObjectPath(path)}`;
}

async function listPosts(args: Record<string, unknown>) {
  const state = typeof args.state === 'string' ? args.state : 'all';
  const requestedLimit = typeof args.limit === 'number' ? Math.trunc(args.limit) : 50;
  const limit = Math.min(100, Math.max(1, requestedLimit));
  const params = new URLSearchParams({ select: BLOG_FIELDS, order: 'featured.desc,published_at.desc.nullslast,created_at.desc', limit: String(limit) });
  if (state === 'published') params.set('published', 'eq.true');
  if (state === 'draft') params.set('published', 'eq.false');
  const response = await supabaseFetch(`/rest/v1/blogs?${params.toString()}`);
  return (await response.json()) as BlogPost[];
}

async function getPost(slugValue: unknown) {
  const slug = asString(slugValue, 'slug');
  const params = new URLSearchParams({ select: BLOG_FIELDS, slug: `eq.${slug}`, limit: '1' });
  const response = await supabaseFetch(`/rest/v1/blogs?${params.toString()}`);
  const rows = (await response.json()) as BlogPost[];
  if (!rows[0]) throw new Error(`Blog post not found: ${slug}`);
  return rows[0];
}

async function createPost(args: Record<string, unknown>) {
  const payload = {
    title: asString(args.title, 'title'),
    slug: asString(args.slug, 'slug'),
    excerpt: typeof args.excerpt === 'string' ? args.excerpt : '',
    content: typeof args.content === 'string' ? args.content : '',
    cover_image_url: typeof args.cover_image_url === 'string' ? args.cover_image_url : null,
    category: typeof args.category === 'string' ? args.category : null,
    tags: cleanTags(args.tags),
    featured: asBoolean(args.featured, false),
    published: asBoolean(args.published, false),
  };

  const response = await supabaseFetch('/rest/v1/blogs?select=*', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify(payload),
  });
  const rows = (await response.json()) as BlogPost[];
  return rows[0];
}

async function patchPost(slugValue: unknown, patch: Record<string, unknown>) {
  const slug = asString(slugValue, 'slug');
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

async function updatePost(args: Record<string, unknown>) {
  const patch: Record<string, unknown> = {};
  if (typeof args.title === 'string') patch.title = args.title;
  if (typeof args.new_slug === 'string') patch.slug = args.new_slug;
  if (typeof args.excerpt === 'string') patch.excerpt = args.excerpt;
  if (typeof args.content === 'string') patch.content = args.content;
  if (args.cover_image_url === null || typeof args.cover_image_url === 'string') patch.cover_image_url = args.cover_image_url;
  if (args.category === null || typeof args.category === 'string') patch.category = args.category;
  if (Array.isArray(args.tags)) patch.tags = cleanTags(args.tags);
  if (typeof args.featured === 'boolean') patch.featured = args.featured;
  return patchPost(args.slug, patch);
}

async function deletePost(slugValue: unknown) {
  const slug = asString(slugValue, 'slug');
  await getPost(slug);
  const params = new URLSearchParams({ slug: `eq.${slug}` });
  await supabaseFetch(`/rest/v1/blogs?${params.toString()}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
  return { deleted: true, slug };
}

async function uploadImage(args: Record<string, unknown>) {
  const path = normalizeObjectPath(args.path);
  const contentType = asString(args.content_type, 'content_type').toLowerCase();
  if (!ALLOWED_IMAGE_TYPES.has(contentType)) throw new Error(`Unsupported image content type: ${contentType}`);
  const encoded = asString(args.base64, 'base64').replace(/^data:[^;]+;base64,/, '');
  const bytes = Buffer.from(encoded, 'base64');
  if (bytes.length === 0) throw new Error('Decoded image is empty.');
  if (bytes.length > MAX_IMAGE_BYTES) throw new Error('Image exceeds the 5 MB MCP upload limit.');

  const { bucket } = requireConfig();
  await supabaseFetch(`/storage/v1/object/${encodeURIComponent(bucket)}/${encodeObjectPath(path)}`, {
    method: 'POST',
    headers: { 'Content-Type': contentType, 'x-upsert': asBoolean(args.upsert, false) ? 'true' : 'false', 'Cache-Control': '3600' },
    body: new Uint8Array(bytes),
  });
  return { path, content_type: contentType, bytes: bytes.length, public_url: publicImageUrl(path) };
}

async function deleteImage(pathValue: unknown) {
  const path = normalizeObjectPath(pathValue);
  const { bucket } = requireConfig();
  const response = await supabaseFetch(`/storage/v1/object/${encodeURIComponent(bucket)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prefixes: [path] }),
  });
  const data = await response.json().catch(() => []);
  return { deleted: true, path, result: data };
}

async function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'list_blog_posts': return listPosts(args);
    case 'get_blog_post': return getPost(args.slug);
    case 'create_blog_post': return createPost(args);
    case 'update_blog_post': return updatePost(args);
    case 'publish_blog_post': return patchPost(args.slug, { published: true });
    case 'unpublish_blog_post': return patchPost(args.slug, { published: false });
    case 'delete_blog_post': return deletePost(args.slug);
    case 'upload_blog_image': return uploadImage(args);
    case 'delete_blog_image': return deleteImage(args.path);
    case 'get_blog_image_url': return { path: normalizeObjectPath(args.path), public_url: publicImageUrl(normalizeObjectPath(args.path)) };
    default: throw new Error(`Unknown tool: ${name}`);
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...jsonHeaders(), 'WWW-Authenticate': 'Bearer' } });
  }

  let payload: JsonRpcRequest;
  try {
    payload = (await request.json()) as JsonRpcRequest;
  } catch {
    return jsonRpcError(null, -32700, 'Parse error', 400);
  }

  if (payload.jsonrpc !== '2.0' || typeof payload.method !== 'string') return jsonRpcError(payload.id, -32600, 'Invalid Request');

  if (payload.method === 'notifications/initialized') return new Response(null, { status: 202, headers: jsonHeaders() });
  if (payload.method === 'ping') return jsonRpcResult(payload.id, {});

  if (payload.method === 'initialize') {
    return jsonRpcResult(payload.id, {
      protocolVersion: SUPPORTED_PROTOCOL,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: 'salman-portfolio-mcp', version: '1.0.0' },
      instructions: 'Manage Salman Butt portfolio engineering blog posts and blog images. Prefer creating drafts first and only publish when the user explicitly requests publication.',
    });
  }

  if (payload.method === 'tools/list') return jsonRpcResult(payload.id, { tools });

  if (payload.method === 'tools/call') {
    const params = payload.params ?? {};
    const name = typeof params.name === 'string' ? params.name : '';
    if (!name) return jsonRpcError(payload.id, -32602, 'Tool name is required.');
    const args = typeof params.arguments === 'object' && params.arguments !== null ? params.arguments as Record<string, unknown> : {};
    try {
      return jsonRpcResult(payload.id, toolSuccess(await callTool(name, args)));
    } catch (error) {
      return jsonRpcResult(payload.id, toolFailure(error));
    }
  }

  return jsonRpcError(payload.id, -32601, `Method not found: ${payload.method}`);
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: jsonHeaders() });
}

export function GET() {
  return new Response(JSON.stringify({
    name: 'salman-portfolio-mcp',
    status: 'ready',
    protocol: SUPPORTED_PROTOCOL,
    endpoint: '/api/mcp',
    authentication: 'Bearer token required',
  }), { status: 200, headers: jsonHeaders() });
}
