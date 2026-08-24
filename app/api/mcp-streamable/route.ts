import { OPTIONS as mcpOptions, POST as mcpPost } from '../mcp-chatgpt/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = mcpPost;
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

// Stateless Streamable HTTP MCP servers must not return an ordinary JSON body
// for GET/DELETE transport probes. Returning 405 lets MCP clients correctly
// identify this as a POST-based stateless Streamable HTTP endpoint.
export const GET = methodNotAllowed;
export const DELETE = methodNotAllowed;
