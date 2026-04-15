'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github } from 'lucide-react';

const projects = [
  {
    title: 'Conversational AI Agent Platform',
    gradient: 'from-emerald-500 to-teal-500',
    category: 'Generative AI',
    tech: [
      'React', 'TypeScript', 'Node.js', 'Express.js', 'Python',
      'LangChain', 'LangGraph', 'LangSmith', 'Google ADK', 'Firebase',
    ],
    highlights: [
      'Architected a full ChatGPT-style conversational AI with multi-turn context retention and real-time dialogue',
      'Python-based AI engine using Google ADK orchestrating LangChain agents with LangGraph state machines',
      'LangSmith observability for production monitoring',
    ],
  },
  {
    title: 'Permission ASK Platform — Web3 Earnings & Search Engine',
    gradient: 'from-blue-500 to-purple-500',
    category: 'Web3',
    tech: [
      'React', 'NestJS', 'Node.js', 'Moralis', 'Firebase',
      'ShuftiPro', 'Brevo', 'RabbitMQ', 'PostgreSQL', 'Redis',
    ],
    highlights: [
      'Unified platform combining search engine interactions, referral mechanics, and Web3 wallet integration',
      'Users earn ASK tokens through referrals and search activity',
      'Integrated Moralis (Web3), ShuftiPro (KYC), Firebase, CAPTCHA for security',
    ],
  },
  {
    title: 'OffGrid IoT Monitoring & Device Control System',
    gradient: 'from-orange-500 to-red-500',
    category: 'IoT',
    tech: [
      'Node.js', 'Express.js', 'Laravel', 'Vue.js', 'React.js',
      'RabbitMQ', 'MQTT', 'InfluxDB', 'MongoDB', 'PostgreSQL',
    ],
    highlights: [
      'End-to-end IoT software for embedded devices in remote off-grid solar energy installations',
      'Real-time data pipelines using InfluxDB for time-series analytics and RabbitMQ/MQTT for device communication',
      'Interactive dashboards with live charts and device control interfaces',
    ],
  },
  {
    title: 'MindManager — Corel Corporation',
    gradient: 'from-violet-500 to-indigo-500',
    category: 'Enterprise',
    tech: [
      'JavaScript', 'Backbone.js', 'Joint.js', 'Node.js', 'MySQL', 'Docker',
    ],
    highlights: [
      'Large-scale enterprise mind mapping application used by global corporations',
      'Built with pure JavaScript, Joint.js, and Backbone.js',
      'Developed feature modules, resolved complex rendering bugs, improved performance for large diagrams',
    ],
  },
  {
    title: 'Switcher Multi-Tenant SaaS ERP & POS',
    gradient: 'from-cyan-500 to-blue-500',
    category: 'SaaS',
    tech: [
      'Laravel', 'Vue.js', 'MySQL', 'MongoDB', 'Socket.IO',
      'Redis', 'AWS S3', 'Kubernetes',
    ],
    highlights: [
      'Full multi-tenant SaaS ERP for retail and service businesses across the Middle East',
      'Real-time POS with Socket.IO, multi-attribute products, inventory tracking, and payment processing',
      'Modular, scalable, single-instance multi-tenancy model',
    ],
  },
  {
    title: 'CodeSync — Real-Time Collaborative Code Editor',
    gradient: 'from-pink-500 to-rose-500',
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

export default function Projects() {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">PORTFOLIO</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Key Projects
          </h2>
          <div className="section-divider" />
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-2">
            Production platforms and systems I&apos;ve architected and built
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group"
            >
              {/* Gradient header strip */}
              <div className={`h-2 rounded-t-2xl bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6 relative">
                {/* Category badge */}
                <span className="absolute top-4 right-4 badge">
                  {project.category}
                </span>

                {/* Project name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-24 mb-4 font-[family-name:var(--font-space-grotesk)]">
                  {project.title}
                </h3>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
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

                {/* GitHub link */}
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
      </div>
    </section>
  );
}
