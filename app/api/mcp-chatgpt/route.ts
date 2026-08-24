import { POST as corePost } from '../mcp/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type JsonRpcId = string | number | null;

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: Record<string, unknown>;
};

type ToolDefinition = {
  name?: string;
  title?: string;
  description?: string;
  inputSchema?: {
    type?: string;
    properties?: Record<string, unknown>;
    required?: string[];
    additionalProperties?: boolean;
    [key: string]: unknown;
  };
  annotations?: Record<string, boolean>;
  [key: string]: unknown;
};

type ToolResult = {
  content?: Array<{ type: string; text?: string }>;
  structuredContent?: unknown;
  isError?: boolean;
  [key: string]: unknown;
};

type JsonRpcResponse = {
  jsonrpc?: string;
  id?: JsonRpcId;
  result?: {
    tools?: ToolDefinition[];
    [key: string]: unknown;
  } | ToolResult;
  error?: unknown;
};

const DATE_SCHEMA = {
  type: 'string',
  description: 'Custom article publication date/time in ISO 8601 format, for example 2026-08-20 or 2026-08-20T10:30:00+05:00. Used as the date displayed by the portfolio for published articles.',
};

const REPLACE_IMAGE_TOOL: ToolDefinition = {
  name: 'replace_blog_image',
  title: 'Replace blog image',
  description: 'Replace an existing blog image at the same Storage path with new image bytes and return the public URL.',
  inputSchema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'Existing object path such as scalable-nodejs-apis/cover.webp' },
      content_type: { type: 'string', enum: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'] },
      base64: { type: 'string', minLength: 1 },
    },
    required: ['path', 'content_type', 'base64'],
    additionalProperties: false,
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
};

function jsonHeaders() {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, content-type, mcp-protocol-version, mcp-method, mcp-name',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
  };
}

function jsonRpcResult(id: JsonRpcId | undefined, result: unknown, status = 200) {
  return new Response(JSON.stringify({ jsonrpc: '2.0', id: id ?? null, result }), {
    status,
    headers: jsonHeaders(),
  });
}

function toolSuccess(data: unknown): ToolResult {
  return {
    content: [{ type: 'text', text: typeof data === 'string' ? data : JSON.stringify(data, null, 2) }],
    structuredContent: typeof data === 'object' && data !== null ? data : { value: data },
    isError: false,
  };
}

function toolFailure(error: unknown): ToolResult {
  const message = error instanceof Error ? error.message : 'Unknown tool error';
  return {
    content: [{ type: 'text', text: message }],
    isError: true,
  };
}

function requireSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '');
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url) throw new Error('SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL is not configured.');
  if (!secretKey) throw new Error('SUPABASE_SECRET_KEY is not configured.');

  return { url, secretKey };
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const { url, secretKey } = requireSupabaseConfig();
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

function normalizePublishedAt(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error('published_at must be a non-empty ISO 8601 date or datetime string.');
  }

  const raw = value.trim();
  const date = /^\d{4}-\d{2}-\d{2}$/.test(raw)
    ? new Date(`${raw}T00:00:00.000Z`)
    : new Date(raw);

  if (Number.isNaN(date.getTime())) {
    throw new Error('published_at must be a valid ISO 8601 date or datetime.');
  }

  return date.toISOString();
}

async function patchPublishedAt(slugValue: unknown, publishedAtValue: unknown) {
  if (typeof slugValue !== 'string' || !slugValue.trim()) {
    throw new Error('slug must be a non-empty string.');
  }

  const slug = slugValue.trim();
  const publishedAt = normalizePublishedAt(publishedAtValue);
  const params = new URLSearchParams({ slug: `eq.${slug}`, select: '*' });

  const response = await supabaseFetch(`/rest/v1/blogs?${params.toString()}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ published_at: publishedAt }),
  });

  const rows = (await response.json()) as Array<Record<string, unknown>>;
  if (!rows[0]) throw new Error(`Blog post not found: ${slug}`);
  return rows[0];
}

function clonePayload(payload: JsonRpcRequest): JsonRpcRequest {
  return JSON.parse(JSON.stringify(payload)) as JsonRpcRequest;
}

function stripPublishedAt(payload: JsonRpcRequest) {
  const forwarded = clonePayload(payload);
  const args = forwarded.params?.arguments;

  if (typeof args === 'object' && args !== null && 'published_at' in (args as Record<string, unknown>)) {
    delete (args as Record<string, unknown>).published_at;
  }

  return forwarded;
}

async function callCore(request: Request, payload: JsonRpcRequest) {
  return corePost(new Request(request.url, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify(payload),
  }));
}

async function parseCoreResponse(response: Response) {
  const body = (await response.json()) as JsonRpcResponse;
  return { response, body };
}

function augmentToolDefinitions(tools: ToolDefinition[]) {
  const updated = tools.map((tool) => {
    if (!tool.inputSchema?.properties) return tool;

    if (tool.name === 'create_blog_post') {
      return {
        ...tool,
        description: 'Create a portfolio article. Defaults to an unpublished draft. If published=true, published_at may set a custom displayed publication date.',
        inputSchema: {
          ...tool.inputSchema,
          properties: {
            ...tool.inputSchema.properties,
            published_at: DATE_SCHEMA,
          },
        },
      };
    }

    if (tool.name === 'update_blog_post') {
      return {
        ...tool,
        description: 'Update article content, metadata, slug, cover image URL, featured state, or custom publication date.',
        inputSchema: {
          ...tool.inputSchema,
          properties: {
            ...tool.inputSchema.properties,
            published_at: DATE_SCHEMA,
          },
        },
      };
    }

    if (tool.name === 'publish_blog_post') {
      return {
        ...tool,
        description: 'Publish an existing draft. Optionally set a custom publication date with published_at; otherwise the database uses the current time.',
        inputSchema: {
          ...tool.inputSchema,
          properties: {
            ...tool.inputSchema.properties,
            published_at: DATE_SCHEMA,
          },
        },
      };
    }

    if (tool.name === 'delete_blog_post') {
      return {
        ...tool,
        description: 'Permanently delete an article by slug. Blog images remain independently manageable through delete_blog_image.',
      };
    }

    if (tool.name === 'upload_blog_image') {
      return {
        ...tool,
        description: 'Upload a new blog image. Use replace_blog_image when intentionally replacing an existing image at the same path.',
      };
    }

    return tool;
  });

  const withoutOldReplacement = updated.filter((tool) => tool.name !== 'replace_blog_image');
  const deleteIndex = withoutOldReplacement.findIndex((tool) => tool.name === 'delete_blog_image');

  if (deleteIndex >= 0) {
    withoutOldReplacement.splice(deleteIndex, 0, REPLACE_IMAGE_TOOL);
  } else {
    withoutOldReplacement.push(REPLACE_IMAGE_TOOL);
  }

  return withoutOldReplacement;
}

async function handleToolsList(request: Request, payload: JsonRpcRequest) {
  const { response, body } = await parseCoreResponse(await callCore(request, payload));

  if (!response.ok || body.error || !body.result || !('tools' in body.result)) {
    return new Response(JSON.stringify(body), { status: response.status, headers: jsonHeaders() });
  }

  const result = body.result as { tools?: ToolDefinition[]; [key: string]: unknown };
  return jsonRpcResult(payload.id, {
    ...result,
    tools: augmentToolDefinitions(result.tools ?? []),
  });
}

async function handleReplaceImage(request: Request, payload: JsonRpcRequest, args: Record<string, unknown>) {
  const forwarded = clonePayload(payload);
  if (!forwarded.params) forwarded.params = {};
  forwarded.params.name = 'upload_blog_image';
  forwarded.params.arguments = {
    ...args,
    upsert: true,
  };

  return callCore(request, forwarded);
}

async function handleDateAwareTool(request: Request, payload: JsonRpcRequest, name: string, args: Record<string, unknown>) {
  const publishedAt = args.published_at;
  const forwarded = stripPublishedAt(payload);
  const { response, body } = await parseCoreResponse(await callCore(request, forwarded));

  if (!response.ok || body.error) {
    return new Response(JSON.stringify(body), { status: response.status, headers: jsonHeaders() });
  }

  const toolResult = body.result as ToolResult | undefined;
  if (toolResult?.isError || publishedAt === undefined) {
    return jsonRpcResult(payload.id, toolResult ?? {});
  }

  const currentSlug = typeof args.slug === 'string' ? args.slug : undefined;
  const createdSlug = typeof args.slug === 'string' ? args.slug : undefined;
  const finalSlug = name === 'update_blog_post' && typeof args.new_slug === 'string'
    ? args.new_slug
    : currentSlug ?? createdSlug;

  if (!finalSlug) {
    return jsonRpcResult(payload.id, toolFailure(new Error('Unable to determine article slug for published_at update.')));
  }

  if (name === 'create_blog_post' && args.published !== true) {
    return jsonRpcResult(payload.id, toolFailure(new Error('Custom published_at is only stored for published articles. Create the draft first, then pass published_at to publish_blog_post when publishing.')));
  }

  try {
    const updatedPost = await patchPublishedAt(finalSlug, publishedAt);
    return jsonRpcResult(payload.id, toolSuccess(updatedPost));
  } catch (error) {
    return jsonRpcResult(payload.id, toolFailure(error));
  }
}

export async function POST(request: Request) {
  let payload: JsonRpcRequest;

  try {
    payload = (await request.json()) as JsonRpcRequest;
  } catch {
    return new Response(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }), {
      status: 400,
      headers: jsonHeaders(),
    });
  }

  if (payload.method === 'tools/list') {
    return handleToolsList(request, payload);
  }

  if (payload.method === 'tools/call') {
    const name = typeof payload.params?.name === 'string' ? payload.params.name : '';
    const args = typeof payload.params?.arguments === 'object' && payload.params.arguments !== null
      ? payload.params.arguments as Record<string, unknown>
      : {};

    if (name === 'replace_blog_image') {
      return handleReplaceImage(request, payload, args);
    }

    if (
      (name === 'create_blog_post' || name === 'update_blog_post' || name === 'publish_blog_post') &&
      args.published_at !== undefined
    ) {
      return handleDateAwareTool(request, payload, name, args);
    }
  }

  return callCore(request, payload);
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: jsonHeaders() });
}

export function GET() {
  return new Response(JSON.stringify({
    name: 'salman-portfolio-mcp-chatgpt',
    status: 'ready',
    endpoint: '/api/mcp',
    features: [
      'custom published_at dates',
      'update/delete articles',
      'upload/replace/delete images',
    ],
  }), { status: 200, headers: jsonHeaders() });
}
