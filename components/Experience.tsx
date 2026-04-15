'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Trophy, TrendingUp, Globe } from 'lucide-react';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Permission.io',
    type: 'Full-time',
    period: 'Aug 2023 – Present',
    location: 'United States — Remote',
    description:
      'Reduced API latency by 30-40% and shipped multiple production platforms serving thousands of daily active users across Web3 and AI-powered products.',
    achievements: [
      'Resolved critical N+1 query bottlenecks, cutting API response times from ~500ms to ~300ms across all platform services',
      'Built a multi-agent conversational AI platform using LangChain, LangGraph, and Google ADK with real-time streaming',
      'Deployed containerised microservices on Kubernetes with zero-downtime rollouts and RabbitMQ async processing',
      'Developed Chrome browser extension with AI widgets, Web3 wallet ops, and secure content script communication',
    ],
    tech: ['React', 'Next.js', 'NestJS', 'TypeScript', 'LangChain', 'Kubernetes', 'RabbitMQ', 'PostgreSQL'],
  },
  {
    role: 'Senior Full Stack Developer',
    company: 'OffGrid Europe',
    type: 'Part-time · Concurrent',
    period: 'Jul 2023 – Jun 2024',
    location: 'Germany — Remote',
    description:
      'Architected real-time IoT monitoring software processing telemetry from embedded devices across distributed solar energy installations in remote environments.',
    achievements: [
      'Built high-throughput data pipelines: InfluxDB for time-series analytics, RabbitMQ/MQTT for device communication',
      'Developed Next.js dashboards with live charts, device status monitoring, and customisable alert systems',
      'Engineered device control systems for automation and remote management of distributed IoT hardware',
    ],
    tech: ['Next.js', 'React', 'Node.js', 'Laravel', 'RabbitMQ', 'MQTT', 'InfluxDB', 'PostgreSQL'],
  },
  {
    role: 'Full Stack JavaScript Engineer',
    company: 'client IO s.r.o. (Corel Corporation)',
    type: 'Full-time',
    period: 'Jun 2022 – May 2023',
    location: 'Prague, Czech Republic — Remote',
    description:
      'Contributed to MindManager — a large-scale enterprise mind mapping app used by global corporations — handling complex canvas rendering with 1000+ node diagrams.',
    achievements: [
      'Built responsive UI components and new feature modules for MindManager using pure JavaScript, Joint.js, and Backbone.js',
      'Developed features for AppMixer (workflow automation) and Joint.js/Rappid (diagramming framework for ETL/IT tools)',
      'Conducted daily code reviews, resolved complex rendering bugs, and maintained WCAG cross-browser compatibility',
    ],
    tech: ['JavaScript', 'Node.js', 'Backbone.js', 'Joint.js', 'Docker', 'MySQL', 'Git'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Switcher Solutions',
    type: 'Full-time',
    period: 'May 2021 – May 2022',
    location: 'Bahrain — Remote',
    description:
      'Architected a multi-tenant SaaS ERP from scratch, onboarding 50+ retail businesses across the Middle East on a single-instance platform.',
    achievements: [
      'Built the full ERP with Laravel REST API + Vue.js SPA: POS, inventory, multi-attribute products, and payment processing',
      'Integrated Stripe, PayPal, AWS S3, Cloudinary, and Socket.IO for real-time order tracking',
      'Mentored junior developers in Laravel and JavaScript; implemented TDD with Cypress, Jest, and PHPUnit',
    ],
    tech: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Socket.IO', 'Redis', 'AWS', 'Jest'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Digital MedieXpert (DMX)',
    type: 'Full-time',
    period: 'Jan 2018 – May 2021',
    location: 'Norway — Remote',
    badge: 'Employee of the Year 2020',
    description:
      'Single-handedly delivered 50+ production web projects for European clients — e-commerce stores, real estate portals, social networks, ERP systems, and a React Native mobile app.',
    achievements: [
      'Built 50+ WordPress/WooCommerce stores with custom themes, plugins, payment gateways (Stripe, PayPal), and SEO',
      'Developed 5+ complex Laravel applications: NorgsHandle (real estate portal), Koran (audio app), Eaksept (e-accounting)',
      'Built real-time features with Socket.IO/WebSockets and managed deployments on AWS, Heroku, and Digital Ocean',
    ],
    tech: ['Laravel', 'WordPress', 'WooCommerce', 'Vue.js', 'PHP', 'Node.js', 'React Native', 'MySQL'],
  },
];

const highlightItems = [
  { icon: Trophy, label: 'Employee of the Year 2020' },
  { icon: TrendingUp, label: '30-40% API Performance Boost' },
  { icon: Globe, label: '50+ Projects · 5 Countries' },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden section-alt">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">CAREER</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Work Experience
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-300" />

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-8 z-10">
                    <span className="block w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-16 lg:ml-0 lg:w-[calc(50%-2rem)] ${
                      isLeft ? 'lg:mr-auto lg:pr-4' : 'lg:ml-auto lg:pl-4'
                    }`}
                  >
                    <div className="glass p-6 rounded-2xl">
                      {/* Role — PRIMARY */}
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-[family-name:var(--font-space-grotesk)] mb-1">
                        {exp.role}
                      </h3>

                      {/* Company + type */}
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-1">
                        {exp.company}
                        <span className="text-gray-400 dark:text-gray-500 font-normal"> · {exp.type}</span>
                      </p>

                      {/* Date + location row */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                      </div>

                      {/* Award badge */}
                      {'badge' in exp && exp.badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold mb-3">
                          <Trophy size={12} />
                          {exp.badge}
                        </div>
                      )}

                      {/* Description — impact first */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2 mb-4">
                        {exp.achievements.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="text-emerald-500 mt-1 shrink-0 text-[10px]">&#9679;</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech pills — max 8 */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Highlights bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {highlightItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="glass p-4 rounded-xl flex items-center gap-3"
            >
              <div className="p-2.5 bg-emerald-500/10 rounded-lg shrink-0">
                <item.icon size={20} className="text-emerald-500" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
