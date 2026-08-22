'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, Code, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from './icons';

const stats = [
  { value: '7+', label: 'Years shipping', icon: Briefcase },
  { value: '50+', label: 'Projects delivered', icon: Code },
  { value: '5', label: 'Countries', icon: Globe },
  { value: '30–40%', label: 'API improvement', icon: Zap },
];

const architecture = [
  ['Next.js product', 'React · TypeScript'],
  ['Agent / API layer', 'Node.js · Python'],
  ['LangGraph orchestration', 'Tools · memory · HITL'],
  ['RAG + data', 'PostgreSQL · pgvector'],
  ['Observability', 'LangSmith · evals'],
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-24">
      <div className="hero-gradient" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            Senior Full Stack &amp; Generative AI Engineer
          </div>
          <h1 className="max-w-4xl font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.06] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl dark:text-white">
            I build production AI systems and scalable products that survive real users.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            From agentic workflows, RAG and observability to distributed SaaS, Web3 and real-time IoT infrastructure — I work across product, architecture and delivery.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#projects" className="btn-primary inline-flex items-center gap-2">
              View Case Studies <ArrowRight size={17} />
            </Link>
            <Link href="/blog" className="btn-secondary">Read Engineering Blog</Link>
            <a href="/Salman_Butt_Resume.pdf" download className="btn-secondary">Download Resume</a>
          </div>

          <div className="mt-7 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="https://github.com/salman0butt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-emerald-500"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/salman0butt/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-emerald-500"><Linkedin size={20} /></a>
            <span className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
            <span>Remote worldwide</span>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-xl border border-gray-200 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2"><Icon size={15} className="text-emerald-500" /><strong className="text-lg text-gray-950 dark:text-white">{stat.value}</strong></div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="relative">
          <div className="absolute -inset-8 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 p-5 shadow-2xl dark:border-white/10">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">System view</p>
                <h2 className="mt-1 text-sm font-semibold text-white">Production AI architecture</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">observable · resilient</span>
            </div>
            <div className="space-y-2.5">
              {architecture.map(([title, tech], index) => (
                <div key={title}>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <span className="text-sm font-semibold text-white">{title}</span>
                    <span className="text-xs text-gray-400">{tech}</span>
                  </div>
                  {index < architecture.length - 1 && <div className="mx-auto h-3 w-px bg-gradient-to-b from-emerald-400 to-emerald-400/20" />}
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-gray-400">
              <span className="rounded-lg bg-white/[0.04] px-2 py-2">Guardrails</span>
              <span className="rounded-lg bg-white/[0.04] px-2 py-2">Retries</span>
              <span className="rounded-lg bg-white/[0.04] px-2 py-2">Tracing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
