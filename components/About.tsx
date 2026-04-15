'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Calendar, FolderGit2, Globe, Server, GraduationCap } from 'lucide-react';

const highlights = [
  'Multiple production platforms at Permission.io serving thousands of global users',
  '30-40% API response time improvement via query optimization & caching',
  'Built conversational AI agents with LangChain, LangGraph & Google ADK',
  'Real-time IoT pipelines: RabbitMQ, MQTT, InfluxDB at OffGrid Europe',
  'Multi-tenant SaaS ERP using Laravel REST API & Vue.js for Middle East businesses',
  '50+ full-stack projects: Laravel, WordPress, WooCommerce, Node.js across 5 countries',
  'Deep PHP/Laravel expertise: REST APIs, multi-tenancy, payment gateways, admin panels',
  'Employee of the Year 2020 — Digital MedieXpert (DMX), Norway',
];

const stats = [
  { value: '7+', label: 'Years Experience', icon: Calendar },
  { value: '50+', label: 'Projects Delivered', icon: FolderGit2 },
  { value: '5', label: 'Countries', icon: Globe },
  { value: '30-40%', label: 'Faster APIs', icon: Server },
];

export default function About() {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">ABOUT ME</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            About Me
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 mb-16">
          {/* Left Column — Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
              I&apos;ve spent 7+ years shipping production systems across 5 countries — from
              multi-tenant SaaS ERPs and real-time IoT platforms to AI-powered conversational
              agents used by thousands. My sweet spot is the intersection of scalable backend
              architecture and cutting-edge GenAI integration, using LangChain, LangGraph,
              LangSmith, and modern cloud infrastructure. I&apos;ve improved API response times
              by 30-40%, delivered 50+ projects, and earned Employee of the Year for consistent
              on-time delivery.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Strong System Design foundation — distributed systems, microservices, event-driven
              architecture, Redis caching, CQRS, and Kafka/RabbitMQ messaging at scale. Deep
              PHP/Laravel expertise: architected multi-tenant SaaS platforms, built 5+ complex
              Laravel applications with REST APIs, and delivered 50+ WordPress &amp; WooCommerce
              solutions for European clients — e-commerce stores, real estate portals, and custom
              business applications with payment gateways, admin panels, and SEO-optimised themes.
              Also experienced with containerised Kubernetes deployments and CI/CD pipelines.
            </p>
          </motion.div>

          {/* Right Column — Key Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-slate-900 dark:text-white mb-4">
              Key Highlights
            </h3>
            <ul className="space-y-3">
              {highlights.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.07 }}
                  className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-7 h-7 text-emerald-500 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-emerald-500" />
            <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-slate-900 dark:text-white">
              Education
            </h3>
          </div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            Bachelor of Science — Computer Science
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            University of the Punjab | Lahore, Pakistan | 2015 - 2019
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Data Structures &amp; Algorithms, Database Systems, OOP, Computer Networks, AI, Software Engineering
          </p>
        </motion.div>
      </div>
    </section>
  );
}
