export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getAuthorizationServer() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '');
  return url ? `${url}/auth/v1` : null;
}

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const authorizationServer = getAuthorizationServer();

  if (!authorizationServer) {
    return Response.json({ error: 'Supabase URL is not configured' }, { status: 500 });
  }

  return Response.json({
    resource: `${origin}/api/mcp-oauth`,
    authorization_servers: [authorizationServer],
    scopes_supported: ['email'],
    bearer_methods_supported: ['header'],
    resource_name: 'Portfolio MCP',
  }, {
    headers: {
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
