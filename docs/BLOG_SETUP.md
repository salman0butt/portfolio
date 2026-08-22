# Supabase Blog Setup

The portfolio blog is intentionally built with Supabase's REST API and the public anon key, so there is no extra client dependency and no service-role secret in the browser.

## 1. Create the database table

In your Supabase project, open **SQL Editor**, paste the contents of `supabase/blogs.sql`, and run it once.

The script creates:

- `blogs` table
- unique slugs
- published/draft state
- featured posts
- category and tags
- automatic `published_at` / `updated_at` timestamps
- Row Level Security so anonymous visitors can read **published posts only**

## 2. Add environment variables

Add these to your deployment environment:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Use the **anon / publishable key only**. Never add the Supabase `service_role` key to this repository or any `NEXT_PUBLIC_*` variable.

### Vercel

Add both variables in **Project Settings -> Environment Variables**, then redeploy once so Next.js can bake the public values into the frontend bundle.

### GitHub Pages

Add repository Actions secrets named:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The deployment workflow passes these into the static build.

## 3. Create blog posts

Use **Supabase -> Table Editor -> blogs**. The important fields are:

| Field | Purpose |
| --- | --- |
| `title` | Article title |
| `slug` | URL-safe slug, e.g. `building-ai-agents-with-langgraph` |
| `excerpt` | Short card/search description |
| `content` | Article body in Markdown-style text |
| `cover_image_url` | Optional public image URL |
| `category` | Optional category such as `AI` or `Engineering` |
| `tags` | PostgreSQL text array |
| `featured` | Featured articles appear first |
| `published` | Only `true` posts are visible publicly |

`published_at`, `created_at`, and `updated_at` are handled automatically.

## Supported article formatting

The renderer supports:

- `#`, `##`, `###` headings
- paragraphs
- **bold** text
- inline `code`
- Markdown links
- bullet and numbered lists
- blockquotes
- fenced code blocks

## Routes

- `/blog` — searchable/filterable blog index
- `/blog/post?slug=your-post-slug` — article page

The query-based article route is deliberate: it keeps new Supabase posts immediately available even when the portfolio is deployed as a static GitHub Pages export. No rebuild is needed for each new article.
