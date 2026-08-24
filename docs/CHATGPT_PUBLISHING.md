# ChatGPT Portfolio Publishing Architecture

The portfolio intentionally does **not** expose a public write API or custom MCP endpoint.

## Architecture

```text
ChatGPT
├── Supabase connector ──> Portfolio / public.blogs
│   ├── create draft
│   ├── update article
│   ├── set custom published_at
│   ├── publish / unpublish
│   └── delete article
│
└── GitHub connector ──> salman0butt/portfolio
    ├── add blog images
    ├── replace blog images
    └── delete blog images
             │
             v
          Vercel
             │
             v
       public/blog-images/*

Next.js portfolio ──read only──> Supabase published posts
```

## Why this design

- Works with the connectors already available in ChatGPT.
- Keeps the public portfolio read-only.
- No service-role key, bearer token, OAuth server, or write endpoint is exposed by the website.
- Supabase remains the source of truth for article content and publication state.
- GitHub/Vercel provides versioned, reviewable image delivery.
- Article and image deletion remain separate so shared media is never removed accidentally.

## Article fields

The existing `blogs` table remains the source of truth. Publishing workflows should preserve these fields when present:

- `title`
- `slug`
- `excerpt`
- `content`
- `cover_image_url`
- `category`
- `tags`
- `featured`
- `published`
- `published_at`
- `created_at`
- `updated_at`

`published_at` accepts a custom timestamp. Store an ISO 8601 timestamp (for example `2026-08-20T10:30:00+05:00`) when the user asks for a custom article date.

## Image convention

Store article media under:

```text
public/blog-images/<article-slug>/
```

Recommended names:

```text
cover.webp
architecture.webp
flow-01.webp
example-01.webp
```

Use site-relative URLs in Supabase/Markdown:

```text
/blog-images/<article-slug>/cover.webp
```

Example Markdown:

```md
![Architecture diagram](/blog-images/scaling-nodejs-apis/architecture.webp)
```

## Safe publishing workflow

1. Search Supabase for the slug to avoid duplicates.
2. Create or update the article as a draft (`published = false`).
3. Generate/prepare images.
4. Add or replace images in `public/blog-images/<slug>/` through GitHub.
5. Let the GitHub change pass CI and deploy through Vercel.
6. Update the draft with the final image paths.
7. Review title, excerpt, content, tags, category, SEO presentation, links, and code blocks.
8. Publish by setting `published = true` and the requested `published_at`.
9. Verify the live `/blog/<slug>` page.

## Updating

### Article

Update the matching Supabase row by `slug`. Preserve unspecified fields. If the slug changes, update image paths/Markdown references where required.

### Image

Replace the file at the same GitHub path when the URL should stay stable. Use a new filename when browser/CDN cache invalidation is important, then update the article reference.

## Deleting

### Article

Delete the Supabase row by exact slug only after confirming the target article.

### Images

Delete files from `public/blog-images/<slug>/` separately. Do not automatically delete images when deleting an article because assets may be reused.

## Security rules

- Keep Supabase RLS public access read-only and limited to published posts.
- Do not add anonymous/authenticated public write policies for blog publishing.
- Do not add Supabase secret/service-role keys to `NEXT_PUBLIC_*` variables.
- Do not expose publishing tokens in URLs.
- Publishing writes should happen through the user's connected Supabase/GitHub tools, not through the public portfolio runtime.
