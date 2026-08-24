import { expect, test } from '@playwright/test';

const MODERN_PROTOCOL = '2026-07-28';
const MCP_URL = '/api/mcp?token=playwright-url-mcp-token';

function modernHeaders(method: string, name?: string) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
    'MCP-Protocol-Version': MODERN_PROTOCOL,
    'Mcp-Method': method,
    ...(name ? { 'Mcp-Name': name } : {}),
  };
}

function meta() {
  return {
    'io.modelcontextprotocol/protocolVersion': MODERN_PROTOCOL,
    'io.modelcontextprotocol/clientInfo': {
      name: 'playwright-chatgpt-smoke-test',
      version: '1.0.0',
    },
    'io.modelcontextprotocol/clientCapabilities': {},
  };
}

test.describe('Portfolio MCP', () => {
  test('supports the current MCP server/discover flow used by modern clients', async ({ request }) => {
    const response = await request.post(MCP_URL, {
      headers: modernHeaders('server/discover'),
      data: {
        jsonrpc: '2.0',
        id: 'discover-1',
        method: 'server/discover',
        params: { _meta: meta() },
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['mcp-protocol-version']).toBe(MODERN_PROTOCOL);

    const body = await response.json();
    expect(body.jsonrpc).toBe('2.0');
    expect(body.result.resultType).toBe('complete');
    expect(body.result.supportedVersions).toContain(MODERN_PROTOCOL);
    expect(body.result.capabilities.tools).toEqual({});
    expect(body.result.ttlMs).toBe(0);
    expect(body.result.cacheScope).toBe('private');
    expect(body.result._meta['io.modelcontextprotocol/serverInfo'].name).toBe('salman-portfolio-mcp');
  });

  test('lists the complete portfolio tool catalog over MCP 2026', async ({ request }) => {
    const response = await request.post(MCP_URL, {
      headers: modernHeaders('tools/list'),
      data: {
        jsonrpc: '2.0',
        id: 'tools-1',
        method: 'tools/list',
        params: { _meta: meta() },
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.result.resultType).toBe('complete');
    expect(body.result.ttlMs).toBe(0);
    expect(body.result.cacheScope).toBe('private');

    const names = body.result.tools.map((tool: { name: string }) => tool.name);
    expect(names).toEqual(expect.arrayContaining([
      'list_blog_posts',
      'get_blog_post',
      'create_blog_post',
      'update_blog_post',
      'publish_blog_post',
      'unpublish_blog_post',
      'delete_blog_post',
      'upload_blog_image',
      'replace_blog_image',
      'delete_blog_image',
      'get_blog_image_url',
    ]));
  });
});
