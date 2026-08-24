export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  category: string | null;
  tags: string[];
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const LOCAL_PUBLISHED_POSTS: BlogPost[] = [
  {
    id: 'local-senior-software-engineering-production',
    title: 'What Senior Software Engineering Really Means in Production',
    slug: 'what-senior-software-engineering-really-means-in-production',
    excerpt:
      'Senior engineering is less about writing more code and more about making better decisions: architecture, reliability, performance, security, delivery, and ownership across the full lifecycle.',
    content: `# What Senior Software Engineering Really Means in Production

Becoming a senior software engineer is not simply the point where you know more frameworks, write code faster, or can solve harder algorithm questions.

The biggest shift is responsibility.

A senior engineer is expected to understand the system around the code, make good trade-offs under imperfect information, reduce risk for the team, and help software remain useful long after the first release.

That changes how you approach almost every engineering problem.

## 1. Start with the problem, not the implementation

A common mistake is jumping directly from a requirement to a technical solution.

Senior engineers slow down just enough to understand the real problem:

- Who is affected?
- What is the business impact?
- Is this a correctness problem, a performance problem, or a product problem?
- What constraints already exist in the codebase?
- What is the smallest change that solves the problem safely?

This prevents teams from building technically impressive solutions for the wrong problem.

The goal is not maximum complexity. The goal is the simplest system that can reliably meet the requirements.

## 2. Own the full lifecycle

Writing a feature is only one part of software engineering.

Production ownership includes understanding what happens before and after the code is merged:

1. Clarify requirements and edge cases.
2. Design the change and identify affected systems.
3. Implement with maintainability in mind.
4. Test the behavior that matters.
5. Review security and failure scenarios.
6. Deploy safely.
7. Observe the result in production.
8. Improve the system based on real feedback.

A feature is not finished because it works on a developer laptop. It is finished when users can depend on it.

## 3. Architecture is mostly about boundaries

Good architecture is not about adding more layers, services, abstractions, or design patterns.

It is about creating clear boundaries so that one change does not unnecessarily affect ten other parts of the system.

In a modern full-stack application, I usually think about boundaries between:

- presentation and domain logic
- client and server responsibilities
- application code and external services
- synchronous and asynchronous workflows
- reads and writes
- authentication and authorization
- business logic and infrastructure

Clear boundaries make systems easier to test, replace, scale, and reason about.

They also make teams faster because developers can change one area with more confidence that they are not silently breaking another.

## 4. Performance work should begin with evidence

Performance optimization is one of the clearest places where senior judgment matters.

The wrong approach is to optimize whatever looks slow in the code.

The better approach is to measure the actual user path and find the bottleneck.

For a slow API, that might mean tracing:

- database query time
- external API calls
- repeated computations
- unnecessary serialization
- network latency
- sequential operations that could safely run in parallel
- missing indexes or poor query plans

The important lesson is that measurement comes before optimization.

A small change in the real bottleneck can produce a much larger impact than a major rewrite somewhere else.

## 5. Reliability requires designing for failure

Production systems fail in ways local development rarely shows.

Networks time out. APIs return unexpected responses. Users retry requests. Background jobs run twice. Deployments happen while requests are in flight. Databases become temporarily unavailable.

Senior engineering means assuming these failures will eventually happen and designing accordingly.

Useful patterns include:

- timeouts for external requests
- retries with backoff where retries are safe
- idempotency for operations that must not execute twice
- graceful degradation when optional dependencies fail
- structured logging and tracing
- health checks and meaningful monitoring
- clear error boundaries in the UI
- rollback-friendly deployments

Reliability is not a final QA step. It is an architectural property.

## 6. Security belongs inside the development process

Security should not be treated as something that is added after the product is complete.

Every feature introduces a trust boundary.

A senior engineer should routinely ask:

- Who is allowed to perform this action?
- Are we validating authorization on the server?
- Can this input be manipulated?
- Are secrets kept out of the client bundle and repository?
- Are database permissions more permissive than necessary?
- Could this endpoint expose another customer's data?
- Are logs accidentally recording sensitive information?

The most effective security improvements are often boring: least privilege, strict validation, safe defaults, dependency hygiene, and clear separation between public and privileged operations.

## 7. Tests should protect important behavior

More tests do not automatically mean better software.

The best tests protect the behavior the business and users rely on.

I prefer a balanced testing strategy:

- unit tests for isolated business rules
- integration tests for boundaries such as APIs and databases
- end-to-end tests for critical user journeys
- production monitoring for failures that tests cannot realistically reproduce

Tests should make refactoring safer, not make the codebase afraid to change.

When implementation details are heavily mocked, tests often become fragile. Testing observable behavior usually gives the team more confidence.

## 8. Senior engineers reduce complexity for other people

One of the most underrated senior skills is making difficult systems easier for the rest of the team to understand.

That includes:

- writing code with clear intent
- reviewing pull requests constructively
- documenting important architectural decisions
- explaining trade-offs instead of only giving answers
- helping teammates debug problems
- breaking large projects into deliverable stages
- identifying risk early

The strongest senior engineers create leverage. Their impact is visible not only in the code they write, but also in how effectively the whole team can work.

## 9. AI changes the workflow, not the engineering responsibility

AI coding tools can accelerate implementation, refactoring, test generation, research, and debugging.

I use AI as an engineering multiplier, but the responsibility for correctness still belongs to the engineer.

Generated code still needs the same questions:

- Does it match the actual requirement?
- Is the architecture appropriate for this codebase?
- Are there hidden security issues?
- Does it handle failure cases?
- Is the implementation maintainable?
- Do the tests prove the right behavior?

The value of AI increases as engineering judgment improves. Seniority becomes even more important because the bottleneck moves from producing code to evaluating decisions.

## 10. The real measure is production impact

A senior engineer should be able to connect technical work to outcomes.

That might mean:

- reducing API latency
- improving conversion on a critical workflow
- lowering infrastructure cost
- eliminating a recurring production incident
- improving deployment confidence
- making a codebase easier for new engineers to work in
- shipping a product capability that was previously too risky or expensive

The implementation matters, but the outcome matters more.

## Final thought

Senior software engineering is a combination of technical depth, product understanding, system thinking, communication, and ownership.

The question changes from:

"Can I build this feature?"

To:

"How should we build this so it is secure, maintainable, observable, performant, and useful to the people depending on it?"

That is the mindset I bring to full-stack, backend, frontend, and Generative AI systems: understand the real problem, choose the right trade-offs, ship carefully, and keep improving the system after it reaches production.`,
    cover_image_url: null,
    category: 'Software Engineering',
    tags: [
      'senior software engineer',
      'software architecture',
      'system design',
      'full-stack engineering',
      'production engineering',
      'performance',
      'security',
      'AI-assisted development',
    ],
    featured: true,
    published: true,
    published_at: '2026-08-24T06:52:00.000Z',
    created_at: '2026-08-24T06:52:00.000Z',
    updated_at: '2026-08-24T06:52:00.000Z',
  },
];

const BLOG_FIELDS = [
  'id',
  'title',
  'slug',
  'excerpt',
  'content',
  'cover_image_url',
  'category',
  'tags',
  'featured',
  'published',
  'published_at',
  'created_at',
  'updated_at',
].join(',');

type SupabaseConfig = {
  url: string;
  anonKey: string;
};

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function isBlogConfigured() {
  return getSupabaseConfig() !== null;
}

async function queryBlogs(params: URLSearchParams): Promise<BlogPost[]> {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error('Supabase blog credentials are not configured.');
  }

  const response = await fetch(`${config.url}/rest/v1/blogs?${params.toString()}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to load blog posts (${response.status}).`);
  }

  return (await response.json()) as BlogPost[];
}

function comparePosts(a: BlogPost, b: BlogPost) {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;

  const aDate = new Date(a.published_at ?? a.created_at).getTime();
  const bDate = new Date(b.published_at ?? b.created_at).getTime();
  return bDate - aDate;
}

export async function getPublishedPosts(limit = 100): Promise<BlogPost[]> {
  let remotePosts: BlogPost[] = [];

  if (isBlogConfigured()) {
    const params = new URLSearchParams();
    params.set('select', BLOG_FIELDS);
    params.set('published', 'eq.true');
    params.set('order', 'featured.desc,published_at.desc.nullslast,created_at.desc');
    params.set('limit', String(limit));

    try {
      remotePosts = await queryBlogs(params);
    } catch {
      remotePosts = [];
    }
  }

  const localSlugs = new Set(LOCAL_PUBLISHED_POSTS.map((post) => post.slug));
  return [...LOCAL_PUBLISHED_POSTS, ...remotePosts.filter((post) => !localSlugs.has(post.slug))]
    .sort(comparePosts)
    .slice(0, limit);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const localPost = LOCAL_PUBLISHED_POSTS.find((post) => post.slug === slug);
  if (localPost) return localPost;

  if (!isBlogConfigured()) return null;

  const params = new URLSearchParams();
  params.set('select', BLOG_FIELDS);
  params.set('published', 'eq.true');
  params.set('slug', `eq.${slug}`);
  params.set('limit', '1');

  const posts = await queryBlogs(params);
  return posts[0] ?? null;
}

export function getBlogDate(post: BlogPost) {
  return post.published_at ?? post.created_at;
}

export function estimateReadTime(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`\[\]()!-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 225));
}
