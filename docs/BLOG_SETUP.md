# Supabase Blog Setup

The portfolio blog is intentionally built with Supabase's REST API and the public publishable key, so there is no extra client dependency and no privileged server secret in the browser.

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
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Use the **publishable key only** for this public blog connection. Never add a Supabase secret key, legacy `service_role` key, or any other privileged credential to a `NEXT_PUBLIC_*` variable.

### Vercel

Add both variables in **Project Settings -> Environment Variables**, enable them for the environments you use, and redeploy so the new values are available to the Next.js deployment.

### GitHub Pages

If you deploy through GitHub Actions, add repository Actions secrets named:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

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
- fenced code blocks with copy support
- Markdown images and captions
- horizontally scrollable Markdown tables
- fenced `diagram` / `architecture` blocks
- synchronized TypeScript / JavaScript / Python code groups

### Switchable code groups

Use `:::code-group` to provide equivalent implementations. The reader's selected language is remembered and synchronized across all compatible examples in the article.

````md
:::code-group
```ts
const [profile, preferences] = await Promise.all([
  getProfile(userId),
  getPreferences(userId),
]);
```

```js
const [profile, preferences] = await Promise.all([
  getProfile(userId),
  getPreferences(userId),
]);
```

```py
import asyncio

profile, preferences = await asyncio.gather(
    get_profile(user_id),
    get_preferences(user_id),
)
```
:::
````

### Architecture diagrams

```md
```diagram
title: Request path
Browser -> Next.js | request
Next.js -> Application service | validated intent
Application service -> PostgreSQL | durable state
```
```

## SEO and AI discovery

Published posts are included in or exposed through:

- `/sitemap.xml` — search-engine discovery using real `updated_at` timestamps
- `/robots.txt` — public crawler policy
- `/feed.xml` — RSS feed
- `/llms.txt` — concise AI-agent discovery index
- `/llms-full.txt` — AI-readable full-text article export
- per-article canonical metadata
- Open Graph / Twitter metadata with article-specific generated social cards
- `Blog`, `BlogPosting`, `TechArticle` and `BreadcrumbList` structured data

The `/blog` index receives its initial published posts on the server so article links and summaries are present in the HTML returned to crawlers instead of appearing only after client-side JavaScript runs.

## Routes

- `/blog` — searchable/filterable blog index
- `/blog/[slug]` — canonical article page

Published content is loaded from Supabase at runtime, so article content remains database-driven rather than being hard-coded into the Next.js bundle.
