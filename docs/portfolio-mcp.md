# Portfolio MCP

The portfolio exposes a private Model Context Protocol endpoint at `/api/mcp` for managing engineering blog content and blog media.

## What it can do

- List all posts, published posts, or drafts
- Fetch a post by slug
- Create draft or published posts
- Set a custom article publication date with `published_at`
- Update article title, slug, excerpt, Markdown content, cover image URL, category, tags, featured state, and publication date
- Publish and unpublish posts
- Permanently delete posts
- Upload new blog images to Supabase Storage
- Replace/update an existing blog image at the same Storage path
- Permanently delete blog images
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

The root `proxy.ts` only matches `/api/mcp`. It rewrites every MCP request through the extension layer. If the query token matches `PORTFOLIO_MCP_URL_TOKEN`, the proxy also injects the private internal bearer token before the MCP route runs. Header-authenticated MCP clients use the same complete tool set.

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

## Article dates

The `blogs` table already has a timezone-aware `published_at` column, and the public portfolio uses `published_at` as the displayed article date before falling back to `created_at`. The same value is also used for Open Graph `publishedTime` and structured-data `datePublished`.

ChatGPT can pass a custom date to `create_blog_post`, `update_blog_post`, or `publish_blog_post`:

```json
{
  "slug": "scaling-nodejs-apis",
  "published_at": "2026-08-20T10:30:00+05:00"
}
```

A date-only value is also supported:

```text
2026-08-20
```

For drafts, set the custom date when calling `publish_blog_post`. The database clears `published_at` while an article is unpublished, so a draft cannot retain a publication date until it is published.

## Article management tools

- `create_blog_post` — create a draft or published article
- `update_blog_post` — edit article content and metadata, including `published_at`
- `publish_blog_post` — publish a draft, optionally with a custom `published_at`
- `unpublish_blog_post` — remove a post from the public site without deleting it
- `delete_blog_post` — permanently delete the article row

Deleting an article does not automatically delete its Storage images. This is intentional so shared images are not accidentally removed. Use `delete_blog_image` explicitly for assets that should also be removed.

## Blog image bucket

The MCP uses a public Supabase Storage bucket named `blog-images` by default. Public access is intentional because portfolio visitors need to load article images. Upload, replace, and delete operations still require the server-side secret key.

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

Image tools:

- `upload_blog_image` — create a new image object
- `replace_blog_image` — overwrite/update an existing object at the same path
- `delete_blog_image` — permanently delete one image object
- `get_blog_image_url` — return the public URL for an object path

The MCP limits each image upload to 5 MB and only accepts PNG, JPEG, WebP, GIF, and AVIF.

## Publishing workflow

Recommended workflow for AI clients:

1. Create the article with `published=false`.
2. Upload cover/diagram images.
3. Update the article with the returned image URLs.
4. Review the final Markdown and metadata.
5. Call `publish_blog_post`, optionally with a custom `published_at`, only after explicit user approval/request.
6. Later use `update_blog_post`, `replace_blog_image`, `delete_blog_image`, or `delete_blog_post` when changes are requested.

The server instructions also tell MCP clients to prefer this draft-first workflow.

## Security notes

- The public portfolio keeps its existing anonymous/read-only Supabase access.
- Direct MCP requests are rejected unless the bearer token matches `PORTFOLIO_MCP_TOKEN`.
- ChatGPT URL-token requests are accepted only when `token` matches `PORTFOLIO_MCP_URL_TOKEN`, then converted internally to bearer authentication.
- The Supabase secret key exists only in Vercel server environment variables.
- Secret keys bypass RLS, so the MCP deliberately exposes only portfolio blog operations instead of arbitrary SQL/database tools.
- Image paths are sanitized and file size/type are restricted.
- Destructive tools are marked as destructive in MCP tool metadata so compatible clients can request confirmation.
