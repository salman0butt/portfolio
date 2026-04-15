'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Calendar, FolderGit2, Globe, Server, GraduationCap } from 'lucide-react';

const highlights = [
  'Multiple production platforms at Permission.io serving thousands of global users',
  '30-40% API response time improvement via query optimization & caching',
  'Built conversational AI agents with LangChain, LangGraph & Google ADK',
  'Real-time IoT pipelines: RabbitMQ, MQTT, InfluxDB at OffGrid Europe',
  'Multi-tenant SaaS ERP for Middle East retail businesses',
  '50+ projects delivered across USA, Germany, Norway, Czech Republic, Bahrain',
  '50+ WordPress & WooCommerce solutions for European clients',
  'Employee of the Year 2020 — Digital MedieXpert, Norway',
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
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
              Senior Full Stack Engineer with 7+ years of experience building scalable,
              high-performance web and mobile applications across IoT, SaaS ERP, and
              Generative AI platforms. Proven track record of improving API response times by
              30-40%, engineering 5+ production-grade platforms serving thousands of global users,
              and leading full-cycle delivery from architecture to production across teams in 5
              countries. Now specialising in Generative AI engineering — designing agentic systems,
              RAG pipelines, and LLM-powered platforms using LangChain, LangGraph, and LangSmith.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Strong System Design foundation covering distributed systems, microservices,
              event-driven architecture, Redis caching, load balancing, sharding, CQRS, and
              Kafka/RabbitMQ messaging at scale. Experienced in architecting multi-tenant SaaS
              platforms, real-time IoT data pipelines, and containerised deployments on Kubernetes.
              Also delivered 50+ WordPress &amp; WooCommerce solutions for European clients — from
              e-commerce stores and real estate portals to custom business applications with
              payment gateway integrations, RESTful APIs, and SEO-optimised themes.
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
