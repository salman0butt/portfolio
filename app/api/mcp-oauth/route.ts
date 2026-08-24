import { timingSafeEqual } from 'node:crypto';
import { POST as corePost } from '../mcp/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function jsonHeaders() {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, content-type, mcp-protocol-version, mcp-method, mcp-name',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
  };
}

function secureEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '');
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const adminEmail = process.env.PORTFOLIO_MCP_ADMIN_EMAIL?.trim().toLowerCase();

  if (!url || !publishableKey) return null;
  return { url, publishableKey, adminEmail };
}

function hasOAuthClientClaim(token: string) {
  try {
    const payload = token.split('.')[1];
    if (!payload) return false;
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Record<string, unknown>;
    return typeof claims.client_id === 'string' && claims.client_id.length > 0;
  } catch {
    return false;
  }
}

async function validateOAuthToken(token: string) {
  const config = getSupabaseConfig();
  if (!config?.adminEmail) return false;
  if (!hasOAuthClientClaim(token)) return false;

  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      apikey: config.publishableKey,
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) return false;
  const user = await response.json() as { email?: string };
  return user.email?.trim().toLowerCase() === config.adminEmail;
}

function resourceMetadataUrl(request: Request) {
  const origin = new URL(request.url).origin;
  return `${origin}/.well-known/oauth-protected-resource/api/mcp-oauth`;
}

function unauthorized(request: Request) {
  const metadata = resourceMetadataUrl(request);
  return new Response(JSON.stringify({ error: 'invalid_token', error_description: 'OAuth authentication required' }), {
    status: 401,
    headers: {
      ...jsonHeaders(),
      'WWW-Authenticate': `Bearer resource_metadata="${metadata}"`,
    },
  });
}

export async function POST(request: Request) {
  const value = request.headers.get('authorization');
  if (!value?.startsWith('Bearer ')) return unauthorized(request);

  const token = value.slice(7);
  const internalToken = process.env.PORTFOLIO_MCP_TOKEN;

  // Preserve the original private bearer-token workflow for CLI/debug use.
  if (internalToken && secureEqual(token, internalToken)) {
    return corePost(request);
  }

  if (!(await validateOAuthToken(token))) return unauthorized(request);
  if (!internalToken) {
    return new Response(JSON.stringify({ error: 'server_configuration_error', error_description: 'PORTFOLIO_MCP_TOKEN is not configured' }), {
      status: 500,
      headers: jsonHeaders(),
    });
  }

  // The existing MCP implementation remains private. After validating the OAuth
  // token, replace it with the internal server token before invoking the core handler.
  const headers = new Headers(request.headers);
  headers.set('Authorization', `Bearer ${internalToken}`);
  return corePost(new Request(request, { headers }));
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: jsonHeaders() });
}

export function GET(request: Request) {
  return new Response(JSON.stringify({
    name: 'salman-portfolio-mcp',
    status: 'ready',
    endpoint: '/api/mcp-oauth',
    authentication: 'OAuth 2.1 via Supabase Auth',
    resource_metadata: resourceMetadataUrl(request),
  }), { status: 200, headers: jsonHeaders() });
}
