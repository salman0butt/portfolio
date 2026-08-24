# Salman Butt — Engineering Portfolio

Production portfolio for a **Senior Full-Stack & Generative AI Engineer**. The site is built as technical proof-of-work: measurable impact, engineering case studies, architecture decisions, public AI implementations, technical writing, and a Supabase-backed blog.

## Production

- Portfolio: https://salman-butt.vercel.app
- GitHub: https://github.com/salman0butt
- LinkedIn: https://www.linkedin.com/in/salman0butt/

## What the portfolio demonstrates

### Senior product engineering

- End-to-end ownership across frontend, backend, data, integrations, deployment and production debugging
- Case studies for Generative AI, Web3, IoT and multi-tenant SaaS systems
- Explicit constraints, trade-offs, architecture, outcomes and lessons instead of technology-only project cards
- Quantified production evidence including API latency improvement and multi-tenant adoption

### Production Generative AI

- LangGraph state and orchestration
- Tool/function calling and MCP
- RAG, embeddings and vector retrieval
- Human-in-the-loop and permission boundaries
- Checkpointing, retries, timeouts and recovery patterns
- Tracing, evaluation, latency and token-awareness
- Links to inspect public AI/MCP repositories directly

### Frontend quality

- Next.js 16 + React 19 + TypeScript
- Responsive dark/light UI
- Semantic navigation and page structure
- Reduced-motion support and keyboard-focus states
- SEO-friendly project and article routes
- Desktop + mobile Playwright smoke coverage

## Main routes

```text
/
├── #projects
├── #ai-engineering
├── #experience
├── #skills
├── #testimonials
└── #contact

/projects/[slug]
/blog
/blog/[slug]
/sitemap.xml
/robots.txt
/opengraph-image
```

## Tech stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript 6 |
| Styling | Tailwind CSS 4, custom CSS |
| Motion | Framer Motion with reduced-motion handling |
| Icons | Lucide React |
| Blog data | Supabase REST API with published-row access |
| Blog media | Versioned assets under `public/blog-images/`, delivered by Vercel |
| SEO | Next.js Metadata API, dynamic sitemap, robots, Open Graph image, Person + BlogPosting JSON-LD |
| Testing | ESLint, TypeScript, Playwright desktop/mobile smoke tests |
| Deployment | Vercel production + GitHub pull-request validation |

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Supabase blog configuration

Copy the environment template and add the public Supabase credentials:

```bash
cp .env.example .env.local
```

Required variables:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Run `supabase/blogs.sql` in the Supabase SQL editor before publishing posts. A secret/service-role key is not used by the public portfolio runtime and must never be exposed to the browser.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Or run the static checks together:

```bash
npm run check
```

The GitHub Actions quality workflow runs linting, type checking, production build, and Playwright tests on pull requests and `main`.

## Content architecture

### Case studies

Case-study data lives in `lib/projects.ts` and is rendered through `components/CaseStudyPage.tsx`. Each flagship project includes:

- problem and operating context
- personal ownership
- scale and constraints
- system flow
- technical decisions
- trade-offs
- outcomes
- lessons
- public proof where disclosure is possible

### Blog

Blog records are read from Supabase through `lib/blogs.ts`. Published articles use `/blog/[slug]` so every article has server-generated metadata, canonical URLs, Open Graph data and `BlogPosting` structured data.

The public site is intentionally read-only. ChatGPT-assisted publishing uses the connected Supabase tool for article data and the connected GitHub tool for versioned media under `public/blog-images/<slug>/`; Vercel deploys those media/code changes. This avoids exposing a privileged publishing endpoint on the public portfolio.

See `docs/CHATGPT_PUBLISHING.md` for create/update/delete, custom publication dates, and media workflows.

## Deployment

Vercel is the canonical production deployment. Repository changes should land through a pull request so the quality workflow and Vercel preview can be reviewed before merge.

## Privacy and proprietary work

Employer/client source code is not published. Case studies explain architecture and outcomes at a level that demonstrates engineering judgment without exposing proprietary code, customer data or credentials.
