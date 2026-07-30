'use client';

import { motion } from 'framer-motion';
import { CheckCircle, GraduationCap, Trophy } from 'lucide-react';

const principles = [
  {
    title: 'Own the problem, not just the ticket',
    text: 'I work from product intent through architecture, implementation, rollout, and follow-up instead of treating frontend, backend, and infrastructure as separate hand-offs.',
  },
  {
    title: 'Design for failure and change',
    text: 'I prefer explicit boundaries, observable workflows, predictable state, and simple recovery paths so systems remain understandable when integrations fail or requirements evolve.',
  },
  {
    title: 'Measure before optimising',
    text: 'Performance work starts with evidence. At Permission.io, query and API investigation led to roughly 30–40% latency improvements instead of speculative rewrites.',
  },
  {
    title: 'Keep complexity proportional',
    text: 'I use queues, caches, agents, microservices, and distributed patterns when the workload earns them — and keep the architecture simpler when it does not.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="section-label">ABOUT</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            How I approach engineering
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start mb-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
              I&apos;m a senior full-stack engineer with 7+ years of experience building
              production software across SaaS, AI, enterprise web applications, Web3,
              e-commerce, and IoT systems.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              My strongest work sits where product engineering meets systems thinking:
              shaping a usable frontend, designing APIs and data flows, integrating external
              services, handling asynchronous work, and making the result observable and
              maintainable in production.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              More recently, that same approach has extended into AI engineering — agent
              orchestration, tool calling, RAG, structured outputs, memory, guardrails, and
              evaluation-friendly workflows rather than one-off prompt demos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((principle, index) => (
              <motion.article
                key={principle.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="glass rounded-2xl p-5"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500 mb-3" />
                <h3 className="text-base font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {principle.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 flex items-start gap-4"
          >
            <div className="p-3 bg-amber-500/10 rounded-xl shrink-0">
              <Trophy className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400 mb-1">
                Recognition
              </p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Employee of the Year 2020
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Digital MedieXpert (DMX) — recognised during a three-year period delivering production projects for European clients.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 flex items-start gap-4"
          >
            <div className="p-3 bg-emerald-500/10 rounded-xl shrink-0">
              <GraduationCap className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                Education
              </p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                BS Computer Science
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                University of the Punjab, Lahore · 2015–2019
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Data Structures &amp; Algorithms · Databases · OOP · Networks · AI · Software Engineering
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
