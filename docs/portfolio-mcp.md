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
PORTFOLIO_MCP_TOKEN=<long-random-token>
```

`NEXT_PUBLIC_SUPABASE_URL` is already used by the portfolio and is reused by the MCP endpoint. `SUPABASE_SECRET_KEY` and `PORTFOLIO_MCP_TOKEN` must never be prefixed with `NEXT_PUBLIC_`.

Create a dedicated Supabase secret key for this backend component rather than reusing a key from another server integration.

A strong bearer token can be generated locally with:

```bash
openssl rand -hex 32
```

## Endpoint

Production:

```text
https://salman-butt.vercel.app/api/mcp
```

The endpoint implements stateless Streamable HTTP JSON-RPC compatible with MCP protocol `2025-06-18`.

All MCP POST requests require:

```http
Authorization: Bearer <PORTFOLIO_MCP_TOKEN>
```

## Cursor example

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

Do not commit the real token to a repository.

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
- MCP requests are rejected unless the bearer token matches `PORTFOLIO_MCP_TOKEN`.
- The Supabase secret key exists only in Vercel server environment variables.
- Secret keys bypass RLS, so the MCP deliberately exposes only portfolio blog operations instead of arbitrary SQL/database tools.
- Image paths are sanitized and file size/type are restricted.
- Destructive tools are marked as destructive in MCP tool metadata so compatible clients can request confirmation.

## ChatGPT availability

As of August 2026, full custom MCP write/modify apps in ChatGPT are available on Business and Enterprise/Edu workspaces. The same remote MCP endpoint can be used by other Streamable HTTP MCP clients that support custom headers. Keep the server deployed even if the current ChatGPT plan cannot yet invoke its write tools directly.
