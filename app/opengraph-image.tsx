import { ImageResponse } from 'next/og';

export const alt = 'Salman Butt — Senior Full-Stack & Generative AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#07111f',
          color: '#f8fafc',
          padding: '68px 76px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: 999, background: 'rgba(16,185,129,.15)', right: -160, top: -180 }} />
        <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: 999, border: '1px solid rgba(52,211,153,.25)', right: 40, top: 84 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800 }}>SB</div>
            <div style={{ fontSize: 25, fontWeight: 750 }}>Salman Butt</div>
          </div>
          <div style={{ fontSize: 16, color: '#6ee7b7', letterSpacing: 2, fontWeight: 700 }}>ENGINEERING PORTFOLIO</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900, position: 'relative' }}>
          <div style={{ fontSize: 22, color: '#6ee7b7', fontWeight: 700 }}>Senior Full-Stack & Generative AI Engineer</div>
          <div style={{ fontSize: 58, lineHeight: 1.05, fontWeight: 800, letterSpacing: -2 }}>Scalable product systems. Production-grade AI agents.</div>
          <div style={{ fontSize: 24, lineHeight: 1.45, color: '#cbd5e1' }}>7+ years · SaaS · IoT · Web3 · React · Node.js · LangGraph · RAG</div>
        </div>

        <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
          {['50+ projects', '5 countries & markets', '~500→300ms API latency'].map((item) => (
            <div key={item} style={{ padding: '12px 18px', border: '1px solid rgba(148,163,184,.25)', borderRadius: 999, color: '#cbd5e1', fontSize: 17 }}>{item}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
