'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const projects = [
  {
    title: 'Conversational AI Agent Platform',
    gradient: 'from-emerald-500 to-teal-500',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
    category: 'Generative AI',
    tech: [
      'React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Python',
      'LangChain', 'LangGraph', 'LangSmith', 'Google ADK', 'Firebase',
    ],
    highlights: [
      'Designed a multi-agent conversational AI with multi-turn context retention, greeting flows, and real-time offer logic',
      'Python AI engine using Google ADK orchestrating LangChain agents via LangGraph state machines with streaming responses',
      'LangSmith observability tracking latency, token usage, and conversation quality in production',
    ],
  },
  {
    title: 'Permission ASK Platform — Web3 Earnings & Search Engine',
    gradient: 'from-blue-500 to-purple-500',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    category: 'Web3',
    tech: [
      'React', 'Next.js', 'NestJS', 'Node.js', 'Moralis', 'Firebase',
      'ShuftiPro', 'Brevo', 'RabbitMQ', 'PostgreSQL', 'Redis',
    ],
    highlights: [
      'Unified platform serving thousands of active users — search engine interactions, referral mechanics, and Web3 wallet integration',
      'Complex token issuance, withdrawal, and balance reconciliation flows with full transaction security',
      'Integrated Moralis (Web3), ShuftiPro (KYC), Firebase, Brevo, RabbitMQ, and CAPTCHA for bot protection',
    ],
  },
  {
    title: 'OffGrid IoT Monitoring & Device Control System',
    gradient: 'from-orange-500 to-red-500',
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    category: 'IoT',
    tech: [
      'Next.js', 'React.js', 'Node.js', 'Express.js', 'Laravel', 'Vue.js',
      'RabbitMQ', 'MQTT', 'InfluxDB', 'MongoDB', 'PostgreSQL',
    ],
    highlights: [
      'End-to-end IoT software processing real-time telemetry from embedded devices across distributed solar installations',
      'Next.js dashboard with server-side rendering for real-time device monitoring and analytics visualisations',
      'High-throughput data pipelines: InfluxDB for time-series analytics, RabbitMQ/MQTT for device communication at scale',
    ],
  },
  {
    title: 'MindManager — Corel Corporation',
    gradient: 'from-violet-500 to-indigo-500',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800',
    category: 'Enterprise',
    tech: [
      'JavaScript', 'Backbone.js', 'Joint.js', 'Node.js', 'MySQL', 'Docker',
    ],
    highlights: [
      'Large-scale enterprise mind mapping app used by global corporations — complex canvas rendering with 1000+ node diagrams',
      'Built with pure JavaScript, Joint.js, and Backbone.js — no frameworks, deep DOM and event system mastery',
      'Resolved complex rendering bugs, optimised canvas performance, and maintained cross-browser compatibility (WCAG)',
    ],
  },
  {
    title: 'Switcher Multi-Tenant SaaS ERP & POS',
    gradient: 'from-cyan-500 to-blue-500',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
    category: 'SaaS',
    tech: [
      'Laravel', 'Vue.js', 'MySQL', 'MongoDB', 'Socket.IO',
      'Redis', 'AWS S3', 'Kubernetes',
    ],
    highlights: [
      'Full multi-tenant SaaS ERP onboarding 50+ retail and service businesses across the Middle East on a single instance',
      'Real-time POS with Socket.IO, multi-attribute products, inventory tracking, and Stripe/PayPal payment processing',
      'Deployed on AWS with Kubernetes — zero-downtime rollouts, Redis caching, and automated CI/CD pipelines',
    ],
  },
  {
    title: 'CodeSync — Real-Time Collaborative Code Editor',
    gradient: 'from-pink-500 to-rose-500',
    badgeClass: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
    category: 'Real-Time',
    tech: [
      'React.js', 'Node.js', 'Express.js', 'Socket.IO', 'MongoDB',
    ],
    highlights: [
      'Real-time collaborative code editor for multiple users to share and edit code simultaneously',
      'WebSocket-based room management, cursor tracking, and conflict resolution',
    ],
  },
  {
    title: 'NorgsHandle — Real Estate & Jobs Portal',
    gradient: 'from-amber-500 to-orange-500',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
    category: 'Laravel',
    tech: [
      'Laravel', 'PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap', 'REST API', 'Postal API',
    ],
    highlights: [
      'Real estate & jobs classified portal with real-time chat, notifications, and advanced map-based search',
      'Postal API integration, favorites system, ad/banner management, and advanced admin panel',
      'Built with Laravel MVC, RESTful APIs, and responsive cross-browser design',
    ],
  },
  {
    title: 'E-Commerce Platform Suite — 50+ WordPress Projects',
    gradient: 'from-indigo-500 to-purple-500',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
    category: 'WordPress',
    tech: [
      'WordPress', 'WooCommerce', 'PHP', 'MySQL', 'JavaScript', 'jQuery', 'REST API', 'Stripe', 'PayPal',
    ],
    highlights: [
      'Delivered 50+ production WordPress & WooCommerce stores for European clients at DMX Norway',
      'E-commerce stores, car spare parts shops, social networks, and business portals with payment gateways',
      'Custom themes, plugins, SEO optimization, multi-category product management, and powerful admin panels',
    ],
  },
  {
    title: 'Eaksept — E-Accounting Web Application',
    gradient: 'from-teal-500 to-emerald-500',
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
    category: 'Laravel',
    tech: [
      'Laravel', 'PHP', 'Vue.js', 'MySQL', 'REST API', 'Bootstrap', 'jQuery',
    ],
    highlights: [
      'Full-featured e-accounting application for IT companies to manage resources and client contracts',
      'Contract proposal system, dynamic resource management, invoicing, and financial reporting',
      'Built with Laravel REST API backend and Vue.js frontend with role-based access control',
    ],
  },
];

const filters = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">PORTFOLIO</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Key Projects
          </h2>
          <div className="section-divider" />
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            Production platforms and systems I&apos;ve architected and built
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass rounded-2xl overflow-hidden group"
            >
              <div className={`h-2 rounded-t-2xl bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6 relative">
                <span className={`absolute top-4 right-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${project.badgeClass}`}>
                  {project.category}
                </span>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-24 mb-3 font-[family-name:var(--font-space-grotesk)]">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  {project.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-400"
                    >
                      <span className="text-emerald-500 mt-0.5 shrink-0">&#9655;</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://github.com/salman0butt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                  <Github size={16} />
                  <span>View on GitHub</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show All / Show Less */}
        {filtered.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary text-sm px-6 py-2"
            >
              {showAll ? 'Show Less' : `View All ${filtered.length} Projects`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
