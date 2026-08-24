# Portfolio MCP

The portfolio exposes a private Model Context Protocol endpoint at `/api/mcp` for managing engineering blog content and blog media.

## What it can do

- List all posts, published posts, or drafts
- Fetch a post by slug
- Create draft or published posts
- Update article content and metadata
- Publish and unpublish posts
- Delete posts
- Upload blog images to Supabase Storage
- Delete blog images
- Build public image URLs

The public Next.js application remains read-only. MCP writes happen only on the server with a Supabase secret key.

## Required Vercel environment variables

Set these for Production and Preview as appropriate:

```bash
SUPABASE_SECRET_KEY=sb_secret_...
SUPABASE_BLOG_BUCKET=blog-images
PORTFOLIO_MCP_TOKEN=<long-random-internal-token>
PORTFOLIO_MCP_URL_TOKEN=<different-long-random-chatgpt-token>
```

`NEXT_PUBLIC_SUPABASE_URL` is already used by the portfolio and is reused by the MCP endpoint. All MCP secrets must remain server-side and must never be prefixed with `NEXT_PUBLIC_`.

Use two different random tokens:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run it twice: one value for `PORTFOLIO_MCP_TOKEN`, and a different value for `PORTFOLIO_MCP_URL_TOKEN`.

`PORTFOLIO_MCP_TOKEN` is the internal bearer token used by the core MCP route. `PORTFOLIO_MCP_URL_TOKEN` is a disposable ChatGPT connection token that the Next.js proxy validates and converts to the internal bearer header. The internal token therefore never appears in the URL.

## Endpoint

Production:

```text
https://salman-butt.vercel.app/api/mcp
```

The endpoint implements stateless Streamable HTTP JSON-RPC compatible with MCP protocol `2025-06-18`.

### ChatGPT

ChatGPT's custom MCP form does not provide an arbitrary HTTP header field, so connect with the URL token and choose **No Auth**:

```text
https://salman-butt.vercel.app/api/mcp?token=YOUR_PORTFOLIO_MCP_URL_TOKEN
```

The root `proxy.ts` only matches `/api/mcp`. If the query token matches `PORTFOLIO_MCP_URL_TOKEN`, it injects the private internal bearer token into the request before the MCP route runs.

Because URL query parameters can appear in infrastructure/request logs, treat `PORTFOLIO_MCP_URL_TOKEN` as disposable and rotate it if it is exposed. Do not reuse `PORTFOLIO_MCP_TOKEN` as the URL token.

### Clients that support custom headers

Cursor, CLI clients, and other MCP clients can continue using the private bearer-token flow:

```http
Authorization: Bearer <PORTFOLIO_MCP_TOKEN>
```

Cursor example:

```json
{
  "mcpServers": {
    "portfolio": {
      "url": "https://salman-butt.vercel.app/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_PORTFOLIO_MCP_TOKEN"
      }
    }
  }
}
```

Do not commit either real token to a repository.

## Blog image bucket

The MCP uses a public Supabase Storage bucket named `blog-images` by default. Public access is intentional because portfolio visitors need to load article images. Upload/delete operations still require the server-side secret key.

Recommended layout:

```text
blog-images/
  scalable-nodejs-apis/
    cover.webp
    architecture.webp
  production-rag-systems/
    cover.webp
    pipeline.webp
```

The MCP limits each image upload to 5 MB and only accepts PNG, JPEG, WebP, GIF, and AVIF.

## Publishing workflow

Recommended workflow for AI clients:

1. Create the article with `published=false`.
2. Upload cover/diagram images.
3. Update the article with the returned image URLs.
4. Review the final Markdown and metadata.
5. Call `publish_blog_post` only after explicit user approval/request.

The server instructions also tell MCP clients to prefer this draft-first workflow.

## Security notes

- The public portfolio keeps its existing anonymous/read-only Supabase access.
- Direct MCP requests are rejected unless the bearer token matches `PORTFOLIO_MCP_TOKEN`.
- ChatGPT URL-token requests are accepted only when `token` matches `PORTFOLIO_MCP_URL_TOKEN`, then converted internally to bearer authentication.
- The Supabase secret key exists only in Vercel server environment variables.
- Secret keys bypass RLS, so the MCP deliberately exposes only portfolio blog operations instead of arbitrary SQL/database tools.
- Image paths are sanitized and file size/type are restricted.
- Destructive tools are marked as destructive in MCP tool metadata so compatible clients can request confirmation.
