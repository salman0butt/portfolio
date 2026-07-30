'use client';

import { motion } from 'framer-motion';
import {
  Monitor,
  Server,
  Brain,
  Network,
  Database,
  Cloud,
} from 'lucide-react';

const categories = [
  {
    name: 'Frontend Engineering',
    icon: Monitor,
    depth: 'Core strength',
    summary: 'Production interfaces, design systems, data-heavy workflows, and performance-conscious frontend architecture.',
    tech: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Tailwind CSS', 'React Native'],
    evidence: 'Built enterprise UI, real-time dashboards, browser-extension experiences, SaaS frontends, and large interactive canvas workflows.',
  },
  {
    name: 'Backend & APIs',
    icon: Server,
    depth: 'Core strength',
    summary: 'API design, application services, authentication, integrations, background work, and performance optimisation.',
    tech: ['Node.js', 'NestJS', 'Express', 'Laravel', 'PHP', 'REST', 'GraphQL', 'OAuth2', 'JWT'],
    evidence: 'Reduced production API latency by 30–40%, built multi-tenant APIs, payment flows, Web3/KYC integrations, and async service workflows.',
  },
  {
    name: 'AI Engineering',
    icon: Brain,
    depth: 'Active production focus',
    summary: 'Agent workflows, retrieval, tool calling, state, structured outputs, guardrails, and observability for LLM systems.',
    tech: ['LangChain', 'LangGraph', 'LangSmith', 'RAG', 'Vector DBs', 'OpenAI API', 'Google ADK', 'Prompt Engineering'],
    evidence: 'Built multi-agent conversational systems plus public reference implementations with routing, tools, Pinecone retrieval, memory, and typed decisions.',
  },
  {
    name: 'Systems & Real-Time',
    icon: Network,
    depth: 'Production experience',
    summary: 'Event-driven services, messaging, caching, real-time communication, IoT telemetry, and multi-tenant platform design.',
    tech: ['RabbitMQ', 'MQTT', 'Kafka', 'Redis', 'Socket.IO', 'SSE', 'Microservices', 'Multi-Tenancy'],
    evidence: 'Designed IoT telemetry pipelines, real-time POS and monitoring flows, async platform processing, and cache-backed application services.',
  },
  {
    name: 'Data & Persistence',
    icon: Database,
    depth: 'Production experience',
    summary: 'Relational, document, time-series, cache, and managed persistence selected around access patterns and workload needs.',
    tech: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'InfluxDB', 'Firebase', 'Pinecone'],
    evidence: 'Worked across transactional SaaS data, Web3 platform state, time-series IoT telemetry, vector retrieval, and query optimisation.',
  },
  {
    name: 'Cloud, Delivery & Quality',
    icon: Cloud,
    depth: 'Production experience',
    summary: 'Containerised deployment, CI/CD, cloud infrastructure, testing, monitoring, and reliable release workflows.',
    tech: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Linux', 'Nginx', 'Jest', 'Cypress', 'Playwright', 'PHPUnit'],
    evidence: 'Shipped containerised services, zero-downtime deployment workflows, automated tests, browser E2E coverage, and production cloud deployments.',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 section-alt">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="section-label">TECHNICAL EXPERTISE</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Capabilities backed by shipped work
          </h2>
          <div className="section-divider" />
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            No arbitrary proficiency percentages. These are the areas I have used to build,
            debug, optimise, and operate real software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.article
                key={category.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 shrink-0">
                    <Icon size={22} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <span className="badge">{category.depth}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {category.summary}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {category.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
                    Evidence
                  </p>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {category.evidence}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-2xl p-5 md:p-6 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            I choose tools around constraints rather than novelty: data model, failure modes,
            latency, team ownership, deployment environment, maintainability, and the cost of
            operating the system after launch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
