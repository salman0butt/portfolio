export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const supabaseUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '');

  if (!supabaseUrl) {
    return Response.json({ error: 'Supabase URL is not configured' }, { status: 500 });
  }

  return Response.json({
    resource: `${origin}/api/mcp-oauth`,
    authorization_servers: [`${supabaseUrl}/auth/v1`],
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
