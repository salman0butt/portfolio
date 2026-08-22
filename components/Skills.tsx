import type { LucideIcon } from 'lucide-react';
import {
  BrainCircuit,
  CloudCog,
  Code2,
  Database,
  GitBranch,
  Network,
  PlugZap,
  Radio,
  ServerCog,
  TestTube2,
} from 'lucide-react';

type SkillGroup = {
  label: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
};

const groups: SkillGroup[] = [
  {
    label: 'Frontend & Mobile',
    description: 'Modern web and mobile product engineering across multiple production stacks.',
    icon: Code2,
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Vue.js',
      'Nuxt.js',
      'React Native',
      'Tailwind CSS',
      'Sass',
      'Bootstrap',
      'Redux',
      'Vuex',
    ],
  },
  {
    label: 'Backend & APIs',
    description: 'Application services, APIs, authentication and backend product development.',
    icon: ServerCog,
    skills: [
      'Node.js',
      'Express.js',
      'NestJS',
      'PHP',
      'Laravel',
      'Python',
      'FastAPI',
      'REST APIs',
      'GraphQL',
      'WebSockets',
      'Socket.IO',
      'JWT',
      'OAuth2',
      'WordPress',
      'WooCommerce',
    ],
  },
  {
    label: 'Generative AI & Agents',
    description: 'Production AI workflows, retrieval, orchestration, evaluation and observability.',
    icon: BrainCircuit,
    skills: [
      'LangChain',
      'LangGraph',
      'LangSmith',
      'RAG Pipelines',
      'Vector Databases',
      'OpenAI API',
      'Google ADK',
      'Prompt Engineering',
      'Multi-Agent Orchestration',
      'Agents',
      'Tool Calling',
      'Evaluations',
      'Observability',
    ],
  },
  {
    label: 'System Design & Architecture',
    description: 'Patterns used to design scalable, maintainable and failure-aware production systems.',
    icon: Network,
    skills: [
      'System Design',
      'API Design',
      'Microservices',
      'Event-Driven Architecture',
      'CQRS',
      'Serverless',
      'Distributed Systems',
      'Redis Caching',
      'Sharding',
      'Multi-Tenant SaaS',
      'Load Balancing',
      'Fault Tolerance',
      'Performance Optimization',
      'Security Best Practices',
      'RBAC / ABAC',
    ],
  },
  {
    label: 'Messaging, Real-Time & IoT',
    description: 'Real-time communication, asynchronous processing and connected-device systems.',
    icon: Radio,
    skills: [
      'RabbitMQ',
      'Kafka',
      'MQTT',
      'Pub/Sub',
      'WebSockets',
      'Socket.IO',
      'SSE',
      'gRPC',
      'IoT Solutions',
    ],
  },
  {
    label: 'Databases & Data',
    description: 'Relational, document, cache, time-series and application data stores.',
    icon: Database,
    skills: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Mongoose',
      'Redis',
      'InfluxDB',
      'Firebase',
    ],
  },
  {
    label: 'DevOps & Cloud',
    description: 'Deployment, infrastructure, automation and operating production applications.',
    icon: CloudCog,
    skills: [
      'Docker',
      'Kubernetes',
      'AWS EC2',
      'AWS S3',
      'AWS Lambda',
      'AWS RDS',
      'CI/CD',
      'GitHub Actions',
      'Linux',
      'Nginx',
      'PM2',
    ],
  },
  {
    label: 'Integrations, Payments & Platforms',
    description: 'Third-party product integrations across payments, identity, analytics, media and Web3.',
    icon: PlugZap,
    skills: [
      'Stripe',
      'PayPal',
      'Braintree',
      'Moralis / Web3',
      'ShuftiPro / KYC',
      'PostHog',
      'GA4',
      'Google Tag Manager',
      'Cloudinary',
      'AWS S3',
      'Web3 / Blockchain',
    ],
  },
  {
    label: 'Testing & Quality',
    description: 'Automated testing and engineering practices that keep production changes safe.',
    icon: TestTube2,
    skills: [
      'Jest',
      'Cypress',
      'Playwright',
      'PHPUnit',
      'Laravel Dusk',
      'TDD',
      'BDD',
      'E2E Testing',
      'Code Review',
    ],
  },
  {
    label: 'Workflow & Engineering Tools',
    description: 'The collaboration, delivery and debugging tools used around day-to-day engineering.',
    icon: GitBranch,
    skills: [
      'Git',
      'GitHub',
      'GitLab',
      'Agile',
      'Scrum',
      'Jira',
      'Postman',
      'Insomnia',
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="section-label">TECHNICAL SKILLS</p>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
            Full-stack depth across product, AI and infrastructure.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
            This restores the complete technology set represented across earlier versions of my portfolio while keeping the current evidence-first approach: no arbitrary proficiency percentages, just the tools, platforms and engineering practices used across shipped work.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <article
                key={group.label}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-emerald-300 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-emerald-500/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Icon size={21} className="text-emerald-500" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-950 dark:text-white">{group.label}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
