import { GET as rootGet, POST as rootPost, OPTIONS as rootOptions } from '../route';

type RouteContext = {
  params: Promise<{ token: string }>;
};

async function withPathToken(
  request: Request,
  context: RouteContext,
  handler: (request: Request) => Promise<Response>,
) {
  const { token } = await context.params;
  const url = new URL(request.url);

  // ChatGPT connector setup may re-request/canonicalize a configured URL.
  // Putting the disposable connector token in the path makes it part of the
  // stable endpoint identity instead of relying on query-string preservation.
  url.pathname = '/api/mcp';
  url.searchParams.set('token', token);

  return handler(new Request(url, request));
}

export async function GET(request: Request, context: RouteContext) {
  return withPathToken(request, context, rootGet);
}

export async function POST(request: Request, context: RouteContext) {
  return withPathToken(request, context, rootPost);
}

export function OPTIONS() {
  return rootOptions();
}
