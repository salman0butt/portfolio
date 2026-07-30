'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Briefcase,
  Code,
  Zap,
  Download,
  ChevronDown,
} from 'lucide-react';
import { Github, Linkedin } from './icons';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const stats = [
  { value: '7+', label: 'Years in production', icon: Briefcase },
  { value: '30–40%', label: 'API latency reduced', icon: Zap },
  { value: '50+', label: 'Projects delivered', icon: Code },
  { value: '50+', label: 'Businesses onboarded', icon: Briefcase },
];

export default function Hero() {
  return (
    <section id="hero" className="relative pt-28 pb-16 overflow-hidden">
      <div className="hero-gradient" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-12 lg:gap-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={item}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                SB
              </div>
              <div className="text-left">
                <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-gray-900 dark:text-white">
                  Salman Butt
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Senior Full-Stack &amp; AI Engineer
                </p>
              </div>
            </motion.div>

            <motion.span variants={item} className="section-label">
              PRODUCTION SOFTWARE · AI SYSTEMS · PLATFORM ENGINEERING
            </motion.span>

            <motion.h1
              variants={item}
              className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
            >
              Building AI-powered products and the systems behind them.
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              I design and ship production software across TypeScript, React, Node.js,
              and modern AI infrastructure — from multi-agent workflows and RAG to
              multi-tenant SaaS and distributed real-time platforms.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-9"
            >
              <a href="#projects" className="btn-primary">
                View Selected Work
              </a>
              <a
                href="/Salman_Butt_Resume.pdf"
                download
                className="btn-secondary gap-2"
              >
                <Download size={17} />
                Resume
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 mb-8"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass rounded-xl px-3 py-4 text-left"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon size={14} className="text-emerald-500" />
                      <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[11px] md:text-xs leading-tight text-gray-500 dark:text-gray-400 font-medium">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              variants={item}
              className="flex items-center justify-center lg:justify-start gap-2"
            >
              <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                Find me on
              </span>
              <a
                href="https://github.com/salman0butt"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-hover p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/salman0butt/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-hover p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:salman0butt@gmail.com"
                className="icon-hover p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden md:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="code-terminal w-full max-w-lg">
              <div className="code-terminal-bar">
                <div className="code-terminal-dot" style={{ background: '#ef4444' }} />
                <div className="code-terminal-dot" style={{ background: '#eab308' }} />
                <div className="code-terminal-dot" style={{ background: '#22c55e' }} />
                <span className="ml-3 text-xs text-gray-400 font-mono">
                  engineering-profile.ts
                </span>
              </div>

              <div className="p-6 font-mono text-sm leading-7">
                <div>
                  <span className="text-violet-400">const</span>{' '}
                  <span className="text-sky-400">focus</span>{' '}
                  <span className="text-gray-400">= {'{'}</span>
                </div>
                {[
                  ['product', 'AI-powered SaaS'],
                  ['frontend', 'React / Next.js / TypeScript'],
                  ['backend', 'Node.js / NestJS / Laravel'],
                  ['ai', 'Agents / RAG / LangGraph'],
                  ['systems', 'Postgres / Redis / Messaging'],
                ].map(([key, value]) => (
                  <div className="pl-6" key={key}>
                    <span className="text-sky-400">{key}</span>
                    <span className="text-gray-400">: </span>
                    <span className="text-emerald-400">&quot;{value}&quot;</span>
                    <span className="text-gray-400">,</span>
                  </div>
                ))}
                <div>
                  <span className="text-gray-400">{'}'};</span>
                </div>
                <div className="mt-4 text-gray-500">
                  <span className="text-emerald-400">//</span> architecture to production
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <a
          href="#projects"
          className="text-gray-400 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          aria-label="Scroll to selected work"
        >
          <ChevronDown size={28} className="animate-scroll-down" />
        </a>
      </motion.div>
    </section>
  );
}
