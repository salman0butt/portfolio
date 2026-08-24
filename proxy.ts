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

  // ChatGPT cannot send arbitrary headers from the custom MCP setup UI.
  // A valid disposable URL token is converted into the private bearer token,
  // then rewritten to the ChatGPT extension layer. The internal token never
  // appears in the public MCP URL.
  if (urlToken && expectedUrlToken && secureEqual(urlToken, expectedUrlToken)) {
    const internalToken = process.env.PORTFOLIO_MCP_TOKEN;

    if (!internalToken) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Authorization', `Bearer ${internalToken}`);

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = '/api/mcp-chatgpt';
    rewriteUrl.searchParams.delete('token');

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Preserve direct bearer-token authentication on /api/mcp for Cursor,
  // CLI clients, and other MCP clients that support custom headers.
  return NextResponse.next();
}

export const config = {
  matcher: '/api/mcp',
};
