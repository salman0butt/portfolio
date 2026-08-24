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

  // If a valid ChatGPT URL token is present, convert it to the private bearer
  // token expected by the MCP route. The internal token never appears in the URL.
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

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Preserve normal bearer-token authentication for Cursor, CLI tools, etc.
  return NextResponse.next();
}

export const config = {
  matcher: '/api/mcp',
};
