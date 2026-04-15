'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Server,
  Brain,
  Network,
  Radio,
  Database,
  Cloud,
  Plug,
  TestTube,
  GitBranch,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillCategory {
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  barColor: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    name: 'Frontend & Mobile',
    icon: Monitor,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    barColor: 'bg-emerald-500',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'Next.js', level: 93 },
      { name: 'TypeScript / JavaScript', level: 95 },
      { name: 'Vue.js / Nuxt.js', level: 88 },
      { name: 'React Native', level: 80 },
      { name: 'Tailwind / Sass / Bootstrap', level: 92 },
      { name: 'Redux / Vuex', level: 85 },
    ],
  },
  {
    name: 'Backend',
    icon: Server,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    barColor: 'bg-emerald-500',
    skills: [
      { name: 'Node.js / Express.js / NestJS', level: 95 },
      { name: 'PHP / Laravel', level: 92 },
      { name: 'REST API / GraphQL', level: 93 },
      { name: 'WebSockets / Socket.IO', level: 88 },
      { name: 'JWT / OAuth2', level: 90 },
      { name: 'WordPress / WooCommerce', level: 90 },
    ],
  },
  {
    name: 'Generative AI',
    icon: Brain,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    barColor: 'bg-emerald-500',
    skills: [
      { name: 'LangChain / LangGraph', level: 88 },
      { name: 'LangSmith / Observability', level: 85 },
      { name: 'RAG Pipelines / Vector DBs', level: 85 },
      { name: 'OpenAI API / Google ADK', level: 88 },
      { name: 'Prompt Engineering', level: 90 },
      { name: 'Multi-Agent Orchestration', level: 82 },
    ],
  },
  {
    name: 'System Design & Architecture',
    icon: Network,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    barColor: 'bg-blue-500',
    skills: [
      { name: 'Microservices / Event-Driven', level: 90 },
      { name: 'CQRS / Serverless', level: 85 },
      { name: 'Distributed Systems', level: 85 },
      { name: 'Redis Caching / Sharding', level: 88 },
      { name: 'Multi-Tenancy SaaS', level: 92 },
      { name: 'Load Balancing / Fault Tolerance', level: 83 },
    ],
  },
  {
    name: 'Messaging & IoT',
    icon: Radio,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    barColor: 'bg-blue-500',
    skills: [
      { name: 'RabbitMQ / Kafka', level: 88 },
      { name: 'MQTT / Pub-Sub', level: 85 },
      { name: 'Socket.IO / SSE / gRPC', level: 87 },
    ],
  },
  {
    name: 'Databases',
    icon: Database,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    barColor: 'bg-blue-500',
    skills: [
      { name: 'PostgreSQL / MySQL', level: 93 },
      { name: 'MongoDB / Mongoose', level: 92 },
      { name: 'Redis', level: 88 },
      { name: 'InfluxDB / Firebase', level: 82 },
    ],
  },
  {
    name: 'DevOps & Cloud',
    icon: Cloud,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    barColor: 'bg-amber-500',
    skills: [
      { name: 'Docker / Kubernetes', level: 85 },
      { name: 'AWS (EC2, S3, Lambda, RDS)', level: 85 },
      { name: 'CI/CD / GitHub Actions', level: 88 },
      { name: 'Linux / Nginx / PM2', level: 90 },
    ],
  },
  {
    name: 'Integrations & Payments',
    icon: Plug,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    barColor: 'bg-amber-500',
    skills: [
      { name: 'Stripe / PayPal / Braintree', level: 90 },
      { name: 'Moralis (Web3) / ShuftiPro (KYC)', level: 82 },
      { name: 'PostHog / GA4 / GTM', level: 85 },
      { name: 'Cloudinary / AWS S3', level: 88 },
    ],
  },
  {
    name: 'Testing & Quality',
    icon: TestTube,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    barColor: 'bg-amber-500',
    skills: [
      { name: 'Jest / Cypress', level: 88 },
      { name: 'PHPUnit / Laravel Dusk', level: 85 },
      { name: 'TDD / BDD / E2E', level: 85 },
    ],
  },
  {
    name: 'Workflow & Tools',
    icon: GitBranch,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    barColor: 'bg-amber-500',
    skills: [
      { name: 'Git / GitHub / GitLab', level: 95 },
      { name: 'Agile / Scrum / Jira', level: 90 },
      { name: 'Postman / Insomnia', level: 92 },
      { name: 'Code Review / RBAC', level: 88 },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const active = categories[activeTab];

  return (
    <section id="skills" className="py-20 px-4 section-alt">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">EXPERTISE</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Technical Skills
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Interactive Skills Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6"
        >
          {/* Left: Category tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium whitespace-nowrap transition-all duration-300 shrink-0 ${
                    i === activeTab
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'glass hover:border-gray-300 dark:hover:border-white/20 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Icon size={18} className={i === activeTab ? 'text-white' : cat.color} />
                  <span className="hidden md:inline">{cat.name}</span>
                  <span className="md:hidden">{cat.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Skill bars */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${active.bgColor}`}>
                <active.icon size={22} className={active.color} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white">
                  {active.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {active.skills.length} skills &middot; Avg {Math.round(active.skills.reduce((a, b) => a + b.level, 0) / active.skills.length)}% proficiency
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {active.skills.map((skill, i) => (
                <motion.div
                  key={`${activeTab}-${skill.name}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${active.barColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tech cloud summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-4 uppercase tracking-wider font-medium">
            Full technology stack
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {[
              'React', 'Next.js', 'Vue.js', 'Node.js', 'NestJS', 'TypeScript', 'PHP', 'Laravel',
              'Python', 'WordPress', 'WooCommerce', 'React Native',
              'LangChain', 'LangGraph', 'LangSmith', 'OpenAI API', 'Google ADK',
              'PostgreSQL', 'MongoDB', 'Redis', 'InfluxDB', 'Firebase',
              'Docker', 'Kubernetes', 'AWS', 'RabbitMQ', 'Kafka', 'MQTT',
              'GraphQL', 'REST API', 'Socket.IO', 'Stripe', 'Git',
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
