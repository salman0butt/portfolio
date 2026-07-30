'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Trophy } from 'lucide-react';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Permission.io',
    period: 'Aug 2023 – Present',
    location: 'United States · Remote',
    impact:
      'Building and improving production platforms across full-stack product work, Web3 flows, backend services, and AI-powered experiences.',
    outcomes: [
      'Investigated N+1 query bottlenecks and other hot paths, reducing representative API responses from roughly 500ms to roughly 300ms and improving key endpoints by about 30–40%.',
      'Shipped features across React/Next.js, NestJS, PostgreSQL, Redis, RabbitMQ, Kubernetes, browser-extension surfaces, third-party integrations, and conversational AI workflows.',
    ],
    tech: ['React', 'Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Kubernetes'],
  },
  {
    role: 'Senior Full Stack Developer',
    company: 'OffGrid Europe',
    period: 'Jul 2023 – Jun 2024',
    location: 'Germany · Remote · Part-time',
    impact:
      'Worked on software connecting distributed solar-energy hardware with monitoring, analytics, alerting, and remote-control workflows.',
    outcomes: [
      'Built telemetry and device-communication flows using RabbitMQ, MQTT, InfluxDB, Node.js/Laravel services, and relational persistence.',
      'Developed Next.js dashboards for live device status, time-series visualisation, operational alerts, and remote management actions.',
    ],
    tech: ['Next.js', 'Node.js', 'Laravel', 'RabbitMQ', 'MQTT', 'InfluxDB', 'PostgreSQL'],
  },
  {
    role: 'Full Stack JavaScript Engineer',
    company: 'client IO s.r.o. · Corel Corporation projects',
    period: 'Jun 2022 – May 2023',
    location: 'Prague, Czech Republic · Remote',
    impact:
      'Contributed to mature enterprise JavaScript products where correctness, rendering performance, accessibility, and safe change mattered at scale.',
    outcomes: [
      'Delivered features and fixes for MindManager using JavaScript, Backbone.js, and Joint.js, including complex canvas behaviour with large diagrams.',
      'Contributed to Appmixer and JointJS/Rappid-related work, participated in code review, and resolved cross-browser and rendering issues in established codebases.',
    ],
    tech: ['JavaScript', 'Backbone.js', 'Joint.js', 'Node.js', 'Docker', 'MySQL'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Switcher Solutions',
    period: 'May 2021 – May 2022',
    location: 'Bahrain · Remote',
    impact:
      'Architected and built a multi-tenant ERP/POS platform used by 50+ retail and service businesses across the Middle East.',
    outcomes: [
      'Built Laravel REST APIs and a Vue.js application covering POS, inventory, multi-attribute products, payments, media, and role-based workflows.',
      'Integrated Stripe, PayPal, AWS S3, Cloudinary, Socket.IO, Redis, automated testing, and deployment workflows while mentoring junior developers.',
    ],
    tech: ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'Socket.IO', 'AWS', 'Jest', 'Cypress'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Digital MedieXpert (DMX)',
    period: 'Jan 2018 – May 2021',
    location: 'Norway · Remote',
    badge: 'Employee of the Year 2020',
    impact:
      'Delivered a broad portfolio of production web projects for European clients, building the end-to-end ownership habits that still shape how I work today.',
    outcomes: [
      'Delivered 50+ WordPress/WooCommerce sites and 5+ Laravel applications spanning e-commerce, real estate, accounting, business portals, and custom integrations.',
      'Handled application development, payments, real-time features, responsive UI, SEO, admin tooling, deployments, maintenance, and client-driven iteration.',
    ],
    tech: ['Laravel', 'WordPress', 'WooCommerce', 'Vue.js', 'PHP', 'Node.js', 'React Native', 'MySQL'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-5" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="section-label">EXPERIENCE</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Selected production experience
          </h2>
          <div className="section-divider" />
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Roles where I owned meaningful engineering work across product, architecture,
            implementation, debugging, performance, and delivery.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-5 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500 via-emerald-400/60 to-transparent" />

          <div className="space-y-5">
            {experiences.map((exp, index) => (
              <motion.article
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.42, delay: index * 0.05 }}
                className="relative pl-11 md:pl-14"
              >
                <span className="absolute left-[11px] md:left-[15px] top-8 block w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15 z-10" />

                <div className="glass rounded-2xl p-6 md:p-7">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 md:text-right space-y-1">
                      <span className="flex md:justify-end items-center gap-1.5">
                        <Calendar size={13} />
                        {exp.period}
                      </span>
                      <span className="flex md:justify-end items-center gap-1.5">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {'badge' in exp && exp.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold mb-4">
                      <Trophy size={12} />
                      {exp.badge}
                    </div>
                  )}

                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                    {exp.impact}
                  </p>

                  <div className="space-y-2.5 mb-5">
                    {exp.outcomes.map((outcome) => (
                      <div
                        key={outcome}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-emerald-500 mt-1 shrink-0">●</span>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
