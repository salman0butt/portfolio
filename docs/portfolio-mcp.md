# Portfolio MCP

The portfolio exposes one private MCP endpoint at `/api/mcp` for managing engineering articles and blog media.

## Architecture

```text
ChatGPT / MCP client
        |
        v
/api/mcp?token=...
        |
        v
URL-token or bearer-token guard
        |
        v
Vercel mcp-handler 2.x
        |
        v
MCP SDK v2
        |
        +--> Supabase blogs table
        |
        +--> Supabase blog-images bucket
```

The MCP transport is no longer hand-written. It uses Vercel's `mcp-handler` 2.x with MCP SDK v2, which natively supports the current MCP protocol and stateless 2025-era Streamable HTTP fallback.

There is exactly one MCP route. No proxy rewrite, custom `server/discover` implementation, compatibility route, or separate streamable wrapper is required.

## Required Vercel variables

```env
SUPABASE_SECRET_KEY=sb_secret_...
SUPABASE_BLOG_BUCKET=blog-images
PORTFOLIO_MCP_TOKEN=<long-random-internal-token>
PORTFOLIO_MCP_URL_TOKEN=<different-long-random-chatgpt-token>
```

The existing `NEXT_PUBLIC_SUPABASE_URL` provides the project URL. MCP secrets are server-side only.

Generate tokens with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run it twice and use different values for the internal bearer token and the disposable ChatGPT URL token.

## ChatGPT connection

Use:

```text
https://salman-butt.vercel.app/api/mcp?token=YOUR_PORTFOLIO_MCP_URL_TOKEN
```

Authentication in the ChatGPT form:

```text
No Auth
```

The `/api/mcp` route validates the query token directly and then passes the original request to the official MCP handler. There is no middleware/proxy rewrite between ChatGPT and the MCP transport.

Because query-string credentials can appear in logs, treat `PORTFOLIO_MCP_URL_TOKEN` as disposable and rotate it if exposed.

## Header-authenticated clients

Clients that can set headers may instead use:

```http
Authorization: Bearer <PORTFOLIO_MCP_TOKEN>
```

Both authentication methods expose the same tool catalog.

## Article tools

- `list_blog_posts`
- `get_blog_post`
- `create_blog_post`
- `update_blog_post`
- `publish_blog_post`
- `unpublish_blog_post`
- `delete_blog_post`

`create_blog_post`, `update_blog_post`, and `publish_blog_post` support `published_at` using an ISO 8601 date or datetime.

Examples:

```text
2026-08-20
2026-08-20T10:30:00+05:00
```

The portfolio displays `published_at`, and the same value is used by article SEO metadata.

The database clears `published_at` when a post is unpublished, so for a draft supply the desired custom date when publishing it.

## Image tools

- `upload_blog_image` — create a new object
- `replace_blog_image` — overwrite an existing object at the same path
- `delete_blog_image` — permanently remove an object
- `get_blog_image_url` — return its public URL

The default bucket is `blog-images`.

Recommended paths:

```text
scaling-nodejs-apis/cover.webp
scaling-nodejs-apis/architecture.webp
production-rag-systems/cover.webp
```

Uploads are limited to 5 MB and accept PNG, JPEG, WebP, GIF, and AVIF.

Deleting an article does not automatically delete its images. This prevents accidental removal of shared assets; image deletion is explicit.

## Recommended publishing workflow

1. Create a draft.
2. Upload cover/diagram images.
3. Update the draft with the returned image URLs.
4. Review content and metadata.
5. Publish with `publish_blog_post`, optionally providing a custom `published_at`.
6. Later update/delete the article or replace/delete its images as requested.

## Security

- Public portfolio reads remain restricted by Supabase RLS.
- MCP database/storage writes use the server-only Supabase secret key.
- The MCP does not expose arbitrary SQL.
- Image paths, types, and sizes are validated.
- Destructive article/image tools are marked destructive in MCP metadata.
- `PORTFOLIO_MCP_TOKEN` and `PORTFOLIO_MCP_URL_TOKEN` must never be committed.
