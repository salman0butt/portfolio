import { timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';

function secureEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function proxy(request: NextRequest) {
  const urlToken = request.nextUrl.searchParams.get('token');
  const expectedUrlToken = process.env.PORTFOLIO_MCP_URL_TOKEN;
  const requestHeaders = new Headers(request.headers);

  // ChatGPT cannot send arbitrary headers from the custom MCP setup UI.
  // A valid disposable URL token is converted into the private bearer token.
  if (urlToken && expectedUrlToken && secureEqual(urlToken, expectedUrlToken)) {
    const internalToken = process.env.PORTFOLIO_MCP_TOKEN;

    if (!internalToken) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    requestHeaders.set('Authorization', `Bearer ${internalToken}`);
  }

  // Route every MCP request through the extension layer so both ChatGPT
  // URL-token clients and normal bearer-token clients see the same complete
  // tool set. The core MCP handler remains the final authentication boundary.
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = '/api/mcp-chatgpt';
  rewriteUrl.searchParams.delete('token');

  return NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/api/mcp',
};
