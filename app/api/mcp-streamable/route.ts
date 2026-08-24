import { OPTIONS as mcpOptions, POST as mcpPost } from '../mcp-chatgpt/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODERN_PROTOCOL = '2026-07-28';
const SERVER_INFO = {
  name: 'salman-portfolio-mcp',
  version: '1.1.0',
  description: 'Manage portfolio engineering articles and blog images.',
};

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

type JsonRpcResponse = {
  jsonrpc?: string;
  id?: string | number | null;
  result?: Record<string, unknown>;
  error?: unknown;
};

function transportHeaders() {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, content-type, mcp-protocol-version, mcp-method, mcp-name',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

function resultMeta(existing: unknown) {
  const current = typeof existing === 'object' && existing !== null
    ? existing as Record<string, unknown>
    : {};

  return {
    ...current,
    'io.modelcontextprotocol/serverInfo': SERVER_INFO,
  };
}

function modernResult(method: string, result: Record<string, unknown>) {
  const cacheable = method === 'tools/list';

  return {
    resultType: 'complete',
    ...result,
    ...(cacheable ? { ttlMs: 0, cacheScope: 'private' } : {}),
    _meta: resultMeta(result._meta),
  };
}

function modernJsonRpcResult(id: JsonRpcRequest['id'], result: Record<string, unknown>) {
  return new Response(JSON.stringify({
    jsonrpc: '2.0',
    id: id ?? null,
    result,
  }), {
    status: 200,
    headers: {
      ...transportHeaders(),
      'MCP-Protocol-Version': MODERN_PROTOCOL,
    },
  });
}

function discover(request: JsonRpcRequest) {
  return modernJsonRpcResult(request.id, {
    resultType: 'complete',
    supportedVersions: [MODERN_PROTOCOL],
    capabilities: {
      tools: {},
    },
    instructions: 'Manage portfolio engineering blog posts and blog images. Prefer draft-first publishing; only publish or delete content when explicitly requested.',
    ttlMs: 0,
    cacheScope: 'private',
    _meta: {
      'io.modelcontextprotocol/serverInfo': SERVER_INFO,
    },
  });
}

function protocolFromEnvelope(payload: JsonRpcRequest) {
  const meta = payload.params?._meta;
  if (typeof meta !== 'object' || meta === null) return null;
  const value = (meta as Record<string, unknown>)['io.modelcontextprotocol/protocolVersion'];
  return typeof value === 'string' ? value : null;
}

function isModernRequest(request: Request, payload: JsonRpcRequest) {
  const headerVersion = request.headers.get('mcp-protocol-version');
  return headerVersion === MODERN_PROTOCOL || protocolFromEnvelope(payload) === MODERN_PROTOCOL;
}

async function modernPost(request: Request, payload: JsonRpcRequest) {
  if (payload.method === 'server/discover') {
    return discover(payload);
  }

  const response = await mcpPost(request);
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.toLowerCase().includes('application/json')) {
    return response;
  }

  let body: JsonRpcResponse;
  try {
    body = await response.json() as JsonRpcResponse;
  } catch {
    return response;
  }

  if (!response.ok || body.error || !body.result || typeof payload.method !== 'string') {
    return new Response(JSON.stringify(body), {
      status: response.status,
      headers: {
        ...transportHeaders(),
        'MCP-Protocol-Version': MODERN_PROTOCOL,
      },
    });
  }

  return modernJsonRpcResult(body.id ?? payload.id, modernResult(payload.method, body.result));
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return new Response(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32600, message: 'Content-Type must be application/json' },
    }), {
      status: 415,
      headers: transportHeaders(),
    });
  }

  let payload: JsonRpcRequest;
  try {
    payload = await request.clone().json() as JsonRpcRequest;
  } catch {
    return new Response(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32700, message: 'Parse error' },
    }), {
      status: 400,
      headers: transportHeaders(),
    });
  }

  if (isModernRequest(request, payload)) {
    return modernPost(request, payload);
  }

  // Keep the established 2025-era initialize/tools flow for older MCP clients.
  return mcpPost(request);
}

export const OPTIONS = mcpOptions;

function methodNotAllowed() {
  return new Response(null, {
    status: 405,
    headers: {
      Allow: 'POST, OPTIONS',
      'Cache-Control': 'no-store',
    },
  });
}

// This endpoint is stateless. Modern MCP removed GET/DELETE session operations,
// and the 2025 compatibility path intentionally does not maintain sessions.
export const GET = methodNotAllowed;
export const DELETE = methodNotAllowed;
