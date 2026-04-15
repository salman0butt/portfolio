'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, MapPin, Calendar, Trophy, TrendingUp, Globe } from 'lucide-react';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Permission.io',
    period: 'Aug 2023 – Present',
    location: 'United States — Remote',
    description:
      'Part of the core engineering team delivering Web3 and AI-driven products used by thousands of active users globally across 5+ platforms.',
    achievements: [
      'Engineered 5+ production platforms — Permission AI, Browser Extension, Permission Connect, Permission ASK, and Admin Portal',
      'Improved API response times by 30-40% by resolving N+1 query bottlenecks',
      'Built scalable microservices using React, Next.js, Node.js, NestJS, and RabbitMQ; deployed with Kubernetes',
      'Built a conversational AI agent platform using LangChain, LangGraph, LangSmith, and Google ADK',
      'Developed Chrome browser extension embedding AI widgets, Web3 wallet operations, and transactional flows',
    ],
    tech: [
      'React', 'Next.js', 'NestJS', 'Node.js', 'TypeScript', 'RabbitMQ',
      'Kubernetes', 'LangChain', 'LangGraph', 'Web3', 'MongoDB', 'PostgreSQL',
    ],
  },
  {
    role: 'Senior Full Stack Developer',
    company: 'OffGrid Europe',
    period: 'Jul 2023 – Jun 2024',
    location: 'Germany — Remote',
    description:
      'Built end-to-end IoT software for a German renewable energy company specialising in off-grid solar and mini-grid systems deployed in remote environments.',
    achievements: [
      'Designed and developed IoT software deployed on embedded devices for real-time data acquisition',
      'Built high-performance backend services using Node.js, Express.js, Laravel, and RabbitMQ',
      'Implemented MQTT-based messaging for real-time telemetry and remote device control',
      'Designed scalable data pipelines with InfluxDB, MongoDB, and PostgreSQL',
    ],
    tech: [
      'Next.js', 'React.js', 'Node.js', 'Express.js', 'Laravel', 'Vue.js',
      'RabbitMQ', 'MQTT', 'InfluxDB', 'MongoDB', 'PostgreSQL',
    ],
  },
  {
    role: 'Full Stack JavaScript Engineer',
    company: 'client IO s.r.o.',
    period: 'Jun 2022 – May 2023',
    location: 'Prague, Czech Republic — Remote',
    description:
      'Member of the product team building Joint.js, AppMixer, and MindManager (Corel Corporation) — enterprise-grade visual diagramming, workflow automation, and mind mapping platforms.',
    achievements: [
      'Built robust, responsive UI components for MindManager — a large-scale enterprise mind mapping application',
      'Developed features for AppMixer, a visual workflow automation platform',
      'Contributed to Joint.js/Rappid — a web-based diagramming framework used in ETL tools and IT architecture builders',
    ],
    tech: [
      'JavaScript', 'Node.js', 'Backbone.js', 'Joint.js', 'Lodash.js',
      'HTML5', 'CSS3', 'Git', 'WCAG',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Switcher Solutions',
    period: 'May 2021 – May 2022',
    location: 'Bahrain — Remote',
    description:
      'Built and maintained a multi-tenant SaaS ERP platform serving retail and service businesses across the Middle East.',
    achievements: [
      'Architected a modular multi-tenant SaaS ERP using Laravel REST API and Vue.js SPA',
      'Built a full-featured POS system with multi-attribute products, inventory, and payment integrations',
      'Mentored junior developers; implemented tests using Cypress, Jest, and PHPUnit with TDD',
    ],
    tech: [
      'Laravel', 'Vue.js', 'PHP', 'MySQL', 'MongoDB', 'Socket.IO',
      'AWS S3', 'Cypress', 'Jest',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Digital MedieXpert (DMX)',
    period: 'Jan 2018 – May 2021',
    location: 'Norway — Remote',
    description:
      'Delivered 50+ full-stack web projects for a Norwegian digital agency serving European clients.',
    achievements: [
      'Built diverse production apps: e-commerce, real estate portals, social networks, ERP systems',
      'Developed real-time features using Socket.IO and WebSockets',
      'Managed server deployments on AWS, Heroku, and Digital Ocean',
      'Awarded Employee of the Year 2020 for outstanding performance',
    ],
    tech: [
      'Laravel', 'Vue.js', 'PHP', 'WordPress', 'WooCommerce', 'Node.js',
      'MongoDB', 'MySQL', 'Socket.IO',
    ],
  },
];

const highlightItems = [
  {
    icon: Trophy,
    label: 'Employee of the Year 2020',
  },
  {
    icon: TrendingUp,
    label: '30-40% API Performance Boost',
  },
  {
    icon: Globe,
    label: '50+ Projects Across 5 Countries',
  },
];

export default function Experience() {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden section-alt">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">CAREER</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Work Experience
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line — center on lg, left on mobile */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-300" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${exp.company}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Green dot on the timeline */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-8 z-10">
                    <span className="block w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  </div>

                  {/* Card wrapper — alternating sides on lg */}
                  <div
                    className={`ml-16 lg:ml-0 lg:w-[calc(50%-2rem)] ${
                      isLeft ? 'lg:mr-auto lg:pr-4' : 'lg:ml-auto lg:pl-4'
                    }`}
                  >
                    <div className="glass p-6 rounded-2xl">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.company}
                        </h3>
                        <span className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap">
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                        <Briefcase size={14} />
                        {exp.role}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-3">
                        <MapPin size={14} />
                        {exp.location}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2 mb-4">
                        {exp.achievements.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-400"
                          >
                            <span className="text-emerald-500 mt-0.5 shrink-0">&#9655;</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium"
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

        {/* Achievements Highlight Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {highlightItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="glass p-5 rounded-2xl flex items-center gap-4 text-center sm:text-left"
            >
              <div className="p-3 bg-emerald-500/10 rounded-xl shrink-0">
                <item.icon size={24} className="text-emerald-500" />
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
