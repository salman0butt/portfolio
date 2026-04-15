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

interface SkillCategory {
  name: string;
  icon: LucideIcon;
  color: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    name: 'Frontend & Mobile',
    icon: Monitor,
    color: 'text-emerald-500',
    skills: [
      'React.js', 'Next.js', 'Vue.js', 'Nuxt.js', 'React Native', 'TypeScript',
      'JavaScript ES6+', 'jQuery', 'Tailwind CSS', 'Sass', 'Bootstrap', 'Redux',
      'Vuex', 'Figma', 'PWA', 'Leaflet.js',
    ],
  },
  {
    name: 'Backend',
    icon: Server,
    color: 'text-emerald-500',
    skills: [
      'Node.js', 'Express.js', 'NestJS', 'PHP', 'Laravel', 'CodeIgniter',
      'REST API', 'GraphQL', 'WebSockets', 'JWT', 'OAuth2', 'OOP',
      'Design Patterns', 'MVC', 'Backbone.js',
    ],
  },
  {
    name: 'Generative AI',
    icon: Brain,
    color: 'text-emerald-500',
    skills: [
      'LangChain', 'LangGraph', 'LangSmith', 'RAG Pipelines',
      'Vector DBs (Pinecone, Chroma, FAISS)', 'OpenAI API', 'Google ADK',
      'Prompt Engineering', 'Agentic AI', 'Multi-Agent Orchestration',
    ],
  },
  {
    name: 'System Design',
    icon: Network,
    color: 'text-blue-500',
    skills: [
      'Distributed Systems', 'Microservices', 'Event-Driven Architecture', 'CQRS',
      'Serverless', 'Load Balancing', 'Redis Caching', 'Sharding',
      'Fault Tolerance', 'CAP Theorem',
    ],
  },
  {
    name: 'Messaging & IoT',
    icon: Radio,
    color: 'text-blue-500',
    skills: [
      'Apache Kafka', 'RabbitMQ', 'MQTT', 'Socket.IO', 'gRPC', 'Pub/Sub',
      'Server-Sent Events', 'Multi-Tenancy SaaS',
    ],
  },
  {
    name: 'Databases',
    icon: Database,
    color: 'text-blue-500',
    skills: [
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'InfluxDB', 'Firebase',
      'SQL Server', 'Mongoose',
    ],
  },
  {
    name: 'DevOps & Cloud',
    icon: Cloud,
    color: 'text-amber-500',
    skills: [
      'Docker', 'Kubernetes', 'AWS (EC2, S3, Lambda, SQS, RDS)', 'Digital Ocean',
      'CI/CD', 'GitHub Actions', 'Linux', 'Nginx', 'PM2', 'SSH', 'Webpack',
    ],
  },
  {
    name: 'Integrations',
    icon: Plug,
    color: 'text-amber-500',
    skills: [
      'Stripe', 'PayPal', 'Paytabs', 'Braintree', 'Pusher', 'PostHog', 'GA4',
      'GTM', 'ShuftiPro (KYC)', 'Moralis (Web3)', 'WordPress', 'WooCommerce',
      'Cloudinary', 'Brevo',
    ],
  },
  {
    name: 'Testing',
    icon: TestTube,
    color: 'text-amber-500',
    skills: [
      'Jest', 'Cypress', 'PHPUnit', 'Laravel Dusk', 'TDD', 'BDD',
      'Unit Testing', 'Integration Testing', 'E2E Testing',
    ],
  },
  {
    name: 'Workflow & Tools',
    icon: GitBranch,
    color: 'text-amber-500',
    skills: [
      'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Postman', 'Insomnia',
      'Agile/Scrum', 'Jira', 'RBAC', 'Code Review',
    ],
  },
];

export default function Skills() {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <section id="skills" className="py-20 px-4 section-alt">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">EXPERTISE</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Technical Skills
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass rounded-2xl p-6 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4">
                <category.icon className={`w-8 h-8 ${category.color}`} />
              </div>

              {/* Category Name */}
              <h3 className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] text-slate-900 dark:text-white mb-4">
                {category.name}
              </h3>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {categories.length > 6 && (
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
              {showAll ? 'Show Less' : `Show All ${categories.length} Categories`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
