import { timingSafeEqual } from 'node:crypto';
import { POST as mcpPost } from '../../mcp-streamable/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function secureEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function corsHeaders() {
  return {
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type, mcp-protocol-version, mcp-method, mcp-name',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

function methodNotAllowed() {
  return new Response(null, {
    status: 405,
    headers: { ...corsHeaders(), Allow: 'POST, OPTIONS' },
  });
}

export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const expectedUrlToken = process.env.PORTFOLIO_MCP_URL_TOKEN;
  const internalToken = process.env.PORTFOLIO_MCP_TOKEN;

  if (!expectedUrlToken || !internalToken || !secureEqual(token, expectedUrlToken)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  const headers = new Headers(request.headers);
  headers.set('Authorization', `Bearer ${internalToken}`);

  return mcpPost(new Request(request, { headers }));
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export const GET = methodNotAllowed;
export const DELETE = methodNotAllowed;
