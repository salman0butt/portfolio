import { expect, test } from '@playwright/test';

const MODERN_PROTOCOL = '2026-07-28';
const LEGACY_PROTOCOL = '2025-06-18';
const QUERY_MCP_URL = '/api/mcp?token=playwright-url-mcp-token';
const PATH_MCP_URL = '/api/mcp/playwright-url-mcp-token';

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

function parseSseJson(text: string) {
  const dataLine = text
    .split(/\r?\n/)
    .find((line) => line.startsWith('data:'));

  if (!dataLine) throw new Error(`Missing SSE data event: ${text.slice(0, 300)}`);
  return JSON.parse(dataLine.slice(5).trim());
}

test.describe('Portfolio MCP', () => {
  test('supports standard MCP initialize on the stable path-token URL', async ({ request }) => {
    const response = await request.post(PATH_MCP_URL, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
      },
      data: {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: LEGACY_PROTOCOL,
          capabilities: {},
          clientInfo: { name: 'playwright-chatgpt-init', version: '1.0.0' },
        },
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['access-control-allow-origin']).toBe('*');
    expect(response.headers()['content-type']).toContain('text/event-stream');

    const body = parseSseJson(await response.text());
    expect(body.jsonrpc).toBe('2.0');
    expect(body.result.protocolVersion).toBe(LEGACY_PROTOCOL);
    expect(body.result.serverInfo.name).toBe('salman-portfolio-mcp');
    expect(body.result.capabilities.tools).toBeDefined();
  });

  test('supports current MCP discovery as JSON through the path-token endpoint', async ({ request }) => {
    const response = await request.post(PATH_MCP_URL, {
      headers: modernHeaders('server/discover'),
      data: {
        jsonrpc: '2.0',
        id: 'discover-1',
        method: 'server/discover',
        params: { _meta: meta() },
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['access-control-allow-origin']).toBe('*');

    const body = await response.json();
    expect(body.jsonrpc).toBe('2.0');
    expect(body.result.resultType).toBe('complete');
    expect(body.result.supportedVersions).toContain(MODERN_PROTOCOL);
    expect(body.result.capabilities.tools).toMatchObject({ listChanged: true });
    expect(body.result.ttlMs).toBe(0);
    expect(body.result.cacheScope).toBe('private');
    expect(body.result._meta['io.modelcontextprotocol/serverInfo'].name).toBe('salman-portfolio-mcp');
  });

  test('lists the complete portfolio tool catalog over the path-token endpoint', async ({ request }) => {
    const response = await request.post(PATH_MCP_URL, {
      headers: modernHeaders('tools/list'),
      data: {
        jsonrpc: '2.0',
        id: 'tools-1',
        method: 'tools/list',
        params: { _meta: meta() },
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    expect(body.result.resultType).toBe('complete');

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

  test('keeps query-token compatibility for existing clients', async ({ request }) => {
    const response = await request.post(QUERY_MCP_URL, {
      headers: modernHeaders('tools/list'),
      data: {
        jsonrpc: '2.0',
        id: 'query-tools-1',
        method: 'tools/list',
        params: { _meta: meta() },
      },
    });

    expect(response.ok()).toBeTruthy();
  });

  test('exposes ChatGPT-compatible MCP preflight headers', async ({ request }) => {
    const response = await request.fetch(PATH_MCP_URL, {
      method: 'OPTIONS',
      headers: { Origin: 'https://chatgpt.com' },
    });

    expect(response.status()).toBe(204);
    expect(response.headers()['access-control-allow-origin']).toBe('*');
    const allowed = response.headers()['access-control-allow-headers'];
    expect(allowed).toContain('accept');
    expect(allowed).toContain('mcp-method');
    expect(allowed).toContain('mcp-name');
    expect(allowed).toContain('last-event-id');
    expect(response.headers()['access-control-allow-methods']).toContain('DELETE');
  });
});
