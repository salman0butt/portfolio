import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getPublishedPostBySlug } from '@/lib/blogs';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug') ?? '';
  const post = slug ? await getPublishedPostBySlug(slug).catch(() => null) : null;
  const title = post?.title ?? 'Engineering Blog';
  const category = post?.category ?? 'Software Engineering';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#070d18',
          color: '#f8fafc',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: 26, color: '#6ee7b7' }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: '#10b981' }} />
          Salman Butt · Engineering Blog
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1050px' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#34d399' }}>{category}</div>
          <div style={{ fontSize: title.length > 70 ? 56 : 66, lineHeight: 1.08, fontWeight: 800, letterSpacing: '-0.035em' }}>{title}</div>
          <div style={{ fontSize: 26, lineHeight: 1.4, color: '#94a3b8' }}>Production engineering · TypeScript · JavaScript · Python · System design · Generative AI</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#cbd5e1' }}>
          <span>Senior Full-Stack & Generative AI Engineer</span>
          <span>salman-butt.vercel.app</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
