# Salman Butt — Engineering Portfolio

Personal engineering portfolio for Salman Butt, focused on senior full-stack and AI engineering work, production ownership, architecture, and measurable outcomes.

**Live site:** https://salman-butt.vercel.app

## Positioning

The portfolio is structured for recruiters and engineering leaders around a proof-first flow:

1. Senior full-stack + AI positioning
2. Selected engineering case studies
3. Impact-led production experience
4. Evidence-based technical expertise
5. Recommendations from teammates and managers
6. Engineering approach and background
7. Direct contact and resume actions

## Tech stack

- **Framework:** Next.js 16
- **UI:** React 19
- **Language:** TypeScript 6
- **Styling:** Tailwind CSS 4
- **Motion:** Framer Motion
- **Icons:** Lucide React
- **Testing:** Playwright
- **Linting:** ESLint 9 with Next.js flat config
- **Deployment:** Vercel

## Main sections

- `components/Hero.tsx` — positioning, proof points, resume/work CTAs
- `components/Projects.tsx` — selected mini case studies with challenge, ownership, and outcomes
- `components/Experience.tsx` — impact-first career timeline
- `components/Skills.tsx` — capability groups backed by shipped work instead of percentage ratings
- `components/Testimonials.tsx` — selected professional recommendations
- `components/About.tsx` — engineering principles, recognition, and education
- `components/Contact.tsx` — recruiter-focused contact actions
- `components/Navbar.tsx` / `components/Footer.tsx` — navigation and supporting links

SEO and discovery metadata live in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`.

## Local development

### Requirements

- Node.js 22+
- npm

### Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run build
npm run test:e2e
```

Pull requests to `main` run validation for linting, a production build, and Chromium smoke tests. Vercel also creates a deployment preview for connected branches and pull requests.

The Playwright smoke suite verifies the primary recruiter flow, major page sections, theme toggling, the selected-work CTA, resume download link, and contact CTA.

## Deployment

Production is deployed through Vercel from `main`.

The app intentionally uses the standard Next.js server build for Vercel rather than requiring a static `out/` export.

## Rollback

The senior-portfolio redesign was developed outside `main` and squash-merged after validation. The repository also preserves the pre-redesign snapshot branch:

```text
backup/pre-portfolio-enhancement-2026-07-30
```

Baseline commit:

```text
8895f352f642302e4f4413c7c964f943a7ef4a14
```

This keeps the original portfolio state available independently of later changes.
