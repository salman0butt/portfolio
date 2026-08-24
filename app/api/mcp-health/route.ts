export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  const checks = {
    internal_token: Boolean(process.env.PORTFOLIO_MCP_TOKEN),
    url_token: Boolean(process.env.PORTFOLIO_MCP_URL_TOKEN),
    supabase_secret: Boolean(process.env.SUPABASE_SECRET_KEY),
    supabase_url: Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
    blog_bucket: Boolean(process.env.SUPABASE_BLOG_BUCKET || 'blog-images'),
  };

  const ready = Object.values(checks).every(Boolean);

  return Response.json(
    {
      status: ready ? 'ready' : 'degraded',
      checks,
    },
    {
      status: ready ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
