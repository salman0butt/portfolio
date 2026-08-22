'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, Code, Globe, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin } from './icons';

const stats = [
  { value: '7+', label: 'Years shipping', icon: Briefcase },
  { value: '50+', label: 'Projects delivered', icon: Code },
  { value: '5', label: 'Countries & markets', icon: Globe },
  { value: '~500→300ms', label: 'API latency', icon: Zap },
];

function ArchitectureVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gray-950 p-4 shadow-2xl sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">System view</p>
          <h2 className="mt-1 text-sm font-semibold text-white">Production AI product architecture</h2>
        </div>
        <span className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300 sm:inline-flex">
          state · tools · evals
        </span>
      </div>

      <svg
        viewBox="0 0 700 555"
        role="img"
        aria-labelledby="hero-architecture-title hero-architecture-desc"
        className="h-auto w-full"
      >
        <title id="hero-architecture-title">Production AI architecture diagram</title>
        <desc id="hero-architecture-desc">
          A product interface calls an application API. The API coordinates LangGraph state and tools, retrieval and data services, guarded external systems, and observability and evaluation.
        </desc>
        <defs>
          <marker id="hero-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
          </marker>
          <linearGradient id="hero-panel" x1="0" x2="1">
            <stop offset="0" stopColor="#111827" />
            <stop offset="1" stopColor="#0b1220" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="#34d399" strokeOpacity="0.7" strokeWidth="2" markerEnd="url(#hero-arrow)">
          <path d="M350 92 V145" />
          <path d="M350 237 V270 H160 V305" />
          <path d="M350 237 V305" />
          <path d="M350 237 V270 H590 V305" />
          <path d="M160 395 V440 H350" />
          <path d="M400 395 V440" />
          <path d="M590 395 V440 H350" />
        </g>

        <g>
          <rect x="205" y="20" width="290" height="72" rx="17" fill="url(#hero-panel)" stroke="#334155" />
          <circle cx="238" cy="56" r="11" fill="#10b981" fillOpacity="0.2" stroke="#34d399" />
          <path d="M233 56h10M238 51v10" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" />
          <text x="350" y="50" fill="#f8fafc" fontSize="16" fontWeight="700" textAnchor="middle">Product interface</text>
          <text x="350" y="72" fill="#94a3b8" fontSize="11.5" textAnchor="middle">Next.js · React · TypeScript · streaming UI</text>
        </g>

        <g>
          <rect x="190" y="145" width="320" height="92" rx="18" fill="#0f172a" stroke="#10b981" strokeOpacity="0.55" />
          <text x="350" y="174" fill="#6ee7b7" fontSize="11" fontWeight="700" letterSpacing="1.4" textAnchor="middle">APPLICATION BOUNDARY</text>
          <text x="350" y="201" fill="#f8fafc" fontSize="17" fontWeight="700" textAnchor="middle">API + orchestration layer</text>
          <text x="350" y="222" fill="#94a3b8" fontSize="11.5" textAnchor="middle">Node.js · Python</text>
        </g>

        <g>
          <rect x="40" y="305" width="240" height="90" rx="16" fill="#0f172a" stroke="#334155" />
          <text x="160" y="334" fill="#f8fafc" fontSize="14.5" fontWeight="700" textAnchor="middle">Agent state &amp; workflow</text>
          <text x="160" y="357" fill="#94a3b8" fontSize="10.8" textAnchor="middle">LangGraph · checkpoints · HITL</text>
          <text x="160" y="375" fill="#94a3b8" fontSize="10.8" textAnchor="middle">typed tool execution</text>
        </g>

        <g>
          <rect x="300" y="305" width="200" height="90" rx="16" fill="#0f172a" stroke="#334155" />
          <text x="400" y="334" fill="#f8fafc" fontSize="14.5" fontWeight="700" textAnchor="middle">Retrieval &amp; data</text>
          <text x="400" y="357" fill="#94a3b8" fontSize="10.8" textAnchor="middle">Postgres · vectors · cache</text>
          <text x="400" y="375" fill="#94a3b8" fontSize="10.8" textAnchor="middle">grounded context</text>
        </g>

        <g>
          <rect x="520" y="305" width="140" height="90" rx="16" fill="#0f172a" stroke="#334155" />
          <text x="590" y="334" fill="#f8fafc" fontSize="14.5" fontWeight="700" textAnchor="middle">Tools</text>
          <text x="590" y="357" fill="#94a3b8" fontSize="10.8" textAnchor="middle">MCP · APIs</text>
          <text x="590" y="375" fill="#94a3b8" fontSize="10.8" textAnchor="middle">permissions</text>
        </g>

        <g>
          <rect x="135" y="440" width="430" height="92" rx="18" fill="#07130f" stroke="#10b981" strokeOpacity="0.45" />
          <text x="350" y="469" fill="#6ee7b7" fontSize="11" fontWeight="700" letterSpacing="1.4" textAnchor="middle">PRODUCTION FEEDBACK LOOP</text>
          <text x="350" y="495" fill="#f8fafc" fontSize="14.5" fontWeight="700" textAnchor="middle">Tracing · evaluations · latency</text>
          <text x="350" y="516" fill="#f8fafc" fontSize="14.5" fontWeight="700" textAnchor="middle">token cost · recovery</text>
        </g>

        <g fill="#94a3b8" fontSize="10">
          <text x="362" y="124">request / stream</text>
          <text x="78" y="292">state</text>
          <text x="365" y="292">context</text>
          <text x="601" y="292">actions</text>
        </g>
      </svg>

      <div className="mt-2 grid grid-cols-1 gap-2 text-center text-[10px] font-semibold text-gray-400 sm:grid-cols-3">
        <span className="rounded-lg border border-white/10 bg-white/[0.035] px-2 py-2">Guardrails</span>
        <span className="rounded-lg border border-white/10 bg-white/[0.035] px-2 py-2">Retries &amp; timeouts</span>
        <span className="rounded-lg border border-white/10 bg-white/[0.035] px-2 py-2">RBAC / ABAC</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const initialLeft = reduceMotion ? false : { opacity: 0, y: 24 };
  const initialRight = reduceMotion ? false : { opacity: 0, x: 30 };

  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-24">
      <div className="hero-gradient" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.03fr_.97fr] lg:px-8">
        <motion.div initial={initialLeft} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.5 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            Senior Full Stack &amp; Generative AI Engineer
          </div>
          <h1 className="max-w-4xl font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.06] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl dark:text-white">
            I design and ship scalable product systems and production-grade AI agents.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            7+ years across SaaS, IoT, enterprise software, Web3 and Generative AI. I work across frontend, backend, data and AI—from architecture and implementation to production observability.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#projects" className="btn-primary inline-flex items-center gap-2">
              View Case Studies <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a href="/Salman_Butt_Resume.pdf" target="_blank" rel="noreferrer" className="btn-secondary">View Resume</a>
            <Link href="/blog" className="btn-secondary">Engineering Blog</Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="https://github.com/salman0butt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-md transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/salman0butt/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-md transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"><Linkedin size={20} /></a>
            <span className="h-4 w-px bg-gray-300 dark:bg-gray-700" aria-hidden="true" />
            <span>Pakistan · Remote worldwide</span>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-xl border border-gray-200 bg-white/75 p-3 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2"><Icon size={15} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" /><strong className="text-lg text-gray-950 dark:text-white">{stat.value}</strong></div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={initialRight} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.08 }} className="relative">
          <div className="absolute -inset-8 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden="true" />
          <div className="relative"><ArchitectureVisual /></div>
        </motion.div>
      </div>
    </section>
  );
}
