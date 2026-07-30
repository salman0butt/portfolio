'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Briefcase } from 'lucide-react';
import { Github } from './icons';

const projects = [
  {
    title: 'Multi-Agent RAG Support System',
    category: 'AI Engineering · Public Reference Build',
    summary:
      'A production-style LangGraph support system that routes users between specialist agents, executes tools, retrieves grounded knowledge from Pinecone, and preserves multi-turn state.',
    challenge:
      'Design an agent architecture that stays extensible as teams and tools grow without turning routing, state, and tool execution into tightly coupled logic.',
    contribution:
      'Built structured-output routing with Zod, reusable agent/tool subgraphs, RAG ingestion and retrieval, persistent thread memory, streaming graph traversal, and guardrails on tool loops.',
    impact:
      'Demonstrates the patterns I use for reliable agent systems: explicit routing, typed decisions, isolated tool boundaries, grounded retrieval, memory, and observable execution paths.',
    tech: ['TypeScript', 'LangGraph', 'LangChain', 'Pinecone', 'Google Embeddings', 'Groq', 'Zod', 'Bun'],
    github: 'https://github.com/salman0butt/multi-agent-rag-support-system',
    architecture: ['Front Desk Router', 'Specialist Team', 'Tool / RAG', 'State + Response'],
  },
  {
    title: 'Permission ASK Platform',
    category: 'Production · Full-Stack / Web3 / AI',
    summary:
      'Production platform combining search, user rewards, referrals, wallet operations, identity verification, messaging, and AI-powered experiences.',
    challenge:
      'Keep user-facing flows responsive while coordinating data-heavy APIs, asynchronous work, third-party integrations, and security-sensitive token operations.',
    contribution:
      'Optimised backend queries and APIs, shipped React/Next.js and NestJS features, integrated Web3/KYC services, and worked with RabbitMQ, PostgreSQL, Redis, and Kubernetes-based services.',
    impact:
      'Reduced key API response times by roughly 30–40%, including resolving N+1 query bottlenecks that cut representative responses from about 500ms to about 300ms.',
    tech: ['React', 'Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Kubernetes'],
  },
  {
    title: 'OffGrid IoT Platform',
    category: 'Production · IoT / Real-Time Systems',
    summary:
      'Monitoring and control software for distributed solar-energy hardware, with live telemetry, analytics, alerts, and remote device operations.',
    challenge:
      'Move high-volume device telemetry through reliable pipelines while keeping dashboards useful for operators working with geographically distributed hardware.',
    contribution:
      'Built real-time data flows with RabbitMQ and MQTT, used InfluxDB for time-series workloads, and developed Next.js interfaces for device status, charts, alerts, and control workflows.',
    impact:
      'Created an end-to-end path from embedded-device events to operational dashboards and remote actions, designed around asynchronous communication and time-series data.',
    tech: ['Next.js', 'Node.js', 'Laravel', 'RabbitMQ', 'MQTT', 'InfluxDB', 'PostgreSQL'],
  },
  {
    title: 'Switcher Multi-Tenant ERP & POS',
    category: 'Production · SaaS Platform',
    summary:
      'Multi-tenant ERP and point-of-sale platform covering products, inventory, orders, payments, media, and real-time operational workflows.',
    challenge:
      'Build one platform that could serve many businesses while keeping tenant data isolated and supporting complex product/inventory behaviour and payment flows.',
    contribution:
      'Architected the Laravel REST API and Vue.js application, implemented POS and inventory features, integrated Stripe/PayPal, added Socket.IO workflows, caching, storage, and deployment automation.',
    impact:
      'Onboarded 50+ retail and service businesses across the Middle East on a shared SaaS platform.',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'Socket.IO', 'AWS', 'Kubernetes'],
  },
  {
    title: 'MindManager — Corel Corporation',
    category: 'Enterprise · Frontend Engineering',
    summary:
      'Enterprise mind-mapping software with complex interactive canvases and large diagrams used by teams and organisations worldwide.',
    challenge:
      'Safely evolve a mature JavaScript codebase with complex rendering behaviour, cross-browser requirements, and diagrams containing 1000+ nodes.',
    contribution:
      'Delivered UI features in JavaScript, Backbone.js and Joint.js, investigated rendering issues, reviewed code, and maintained accessibility and browser compatibility.',
    impact:
      'Contributed production features and reliability improvements in a large enterprise application where performance and regression risk mattered more than framework novelty.',
    tech: ['JavaScript', 'Backbone.js', 'Joint.js', 'Node.js', 'Docker', 'MySQL'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden section-alt">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-5" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="section-label">SELECTED WORK</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Engineering case studies
          </h2>
          <div className="section-divider" />
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A smaller set of projects chosen to show architecture, ownership, technical decisions,
            and measurable outcomes — not just a list of frameworks.
          </p>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.2) }}
              className={`glass rounded-2xl p-6 md:p-8 ${index === 0 ? 'border-emerald-500/30' : ''}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-7 lg:gap-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                    {project.summary}
                  </p>

                  {project.architecture && (
                    <div className="mb-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-2">
                        Architecture path
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {project.architecture.map((step, stepIndex) => (
                          <div className="flex items-center gap-2" key={step}>
                            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                              {step}
                            </span>
                            {stepIndex < project.architecture!.length - 1 && (
                              <span className="text-emerald-500" aria-hidden="true">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium border border-gray-200 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    ['Challenge', project.challenge],
                    ['What I owned', project.contribution],
                    ['Outcome', project.impact],
                  ].map(([label, text]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/70 dark:bg-white/[0.025] p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
                        {label}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {text}
                      </p>
                    </div>
                  ))}

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                      >
                        <Github size={17} />
                        View source &amp; architecture
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-500">
                        <Briefcase size={15} />
                        Proprietary production work — implementation details summarised here
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <a
            href="https://github.com/salman0butt?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors"
          >
            <Github size={17} />
            Browse additional public repositories
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
