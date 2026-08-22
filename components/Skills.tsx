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
  featured?: boolean;
};

const groups: SkillGroup[] = [
  {
    label: 'Core product stack',
    description: 'The technologies I reach for most often when owning product work end-to-end.',
    icon: Code2,
    featured: true,
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Laravel', 'PostgreSQL', 'Redis'],
  },
  {
    label: 'Generative AI, agents & automation',
    description: 'Production-oriented AI systems that combine reasoning, retrieval, tools, workflow automation, evaluation and observability.',
    icon: BrainCircuit,
    featured: true,
    skills: ['LangChain', 'LangGraph', 'LangSmith', 'RAG', 'MCP', 'AI Automation', 'Workflow Automation', 'Business Process Automation', 'Agentic Workflows', 'Event-Driven Automation', 'Tool Calling', 'Structured Outputs', 'Multi-Agent Systems', 'Human-in-the-loop', 'Evaluations', 'Observability', 'OpenAI API', 'Google ADK'],
  },
  {
    label: 'Backend & APIs',
    description: 'Application services, APIs, authentication and integrations across JavaScript, PHP and Python stacks.',
    icon: ServerCog,
    skills: ['Node.js', 'Express.js', 'NestJS', 'PHP', 'Laravel', 'Python', 'FastAPI', 'REST APIs', 'GraphQL', 'WebSockets', 'Socket.IO', 'JWT', 'OAuth2'],
  },
  {
    label: 'Frontend & mobile',
    description: 'Product interfaces across modern React/Vue stacks, enterprise JavaScript and mobile applications.',
    icon: Code2,
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Vue.js', 'Nuxt.js', 'React Native', 'Redux', 'Vuex', 'Tailwind CSS', 'Sass', 'Bootstrap'],
  },
  {
    label: 'Architecture & system design',
    description: 'Patterns used when reliability, scale, isolation and maintainability become product requirements.',
    icon: Network,
    featured: true,
    skills: ['System Design', 'API Design', 'Workflow Orchestration', 'Microservices', 'Event-Driven Architecture', 'Distributed Systems', 'Multi-Tenant SaaS', 'Caching', 'CQRS', 'Serverless', 'Load Balancing', 'Fault Tolerance', 'Performance Optimization', 'RBAC / ABAC'],
  },
  {
    label: 'Messaging, real-time & IoT',
    description: 'Asynchronous processing, device communication and real-time product experiences.',
    icon: Radio,
    skills: ['RabbitMQ', 'Kafka', 'MQTT', 'Pub/Sub', 'WebSockets', 'Socket.IO', 'SSE', 'gRPC', 'IoT Solutions'],
  },
  {
    label: 'Data',
    description: 'Relational, document, cache, time-series and vector-oriented application data.',
    icon: Database,
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Mongoose', 'Redis', 'InfluxDB', 'Firebase', 'Vector Databases', 'pgvector'],
  },
  {
    label: 'DevOps & cloud',
    description: 'Deploying and operating production applications with repeatable delivery workflows.',
    icon: CloudCog,
    skills: ['Docker', 'Kubernetes', 'AWS EC2', 'AWS S3', 'AWS Lambda', 'AWS RDS', 'CI/CD', 'GitHub Actions', 'Linux', 'Nginx', 'PM2'],
  },
  {
    label: 'Testing & quality',
    description: 'Automated checks and engineering practices used to keep production changes safe.',
    icon: TestTube2,
    skills: ['Jest', 'Cypress', 'Playwright', 'PHPUnit', 'Laravel Dusk', 'TDD', 'BDD', 'E2E Testing', 'Code Review'],
  },
  {
    label: 'Platforms & integrations',
    description: 'Payments, identity, analytics, media, Web3 and CMS integrations used in shipped products.',
    icon: PlugZap,
    skills: ['Stripe', 'PayPal', 'Braintree', 'Moralis / Web3', 'ShuftiPro / KYC', 'Cloudinary', 'AWS S3', 'PostHog', 'GA4', 'Google Tag Manager', 'WordPress', 'WooCommerce'],
  },
  {
    label: 'Engineering workflow',
    description: 'The collaboration, delivery and debugging tools around day-to-day engineering.',
    icon: GitBranch,
    skills: ['Git', 'GitHub', 'GitLab', 'Agile', 'Scrum', 'Jira', 'Postman', 'Insomnia'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="section-label">TECHNICAL EXPERTISE</p>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
              Full-stack depth, with production AI and automation on top.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
            Technologies and engineering practices I have used across production products, client platforms, real-time systems, AI applications and automated workflows. The case studies above show where the core stack was applied and why specific choices were made.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <article
                key={group.label}
                className={`rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/[0.035] ${
                  group.featured
                    ? 'border-emerald-200 shadow-sm dark:border-emerald-500/20'
                    : 'border-gray-200 dark:border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Icon size={21} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                  {group.featured && (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      Core
                    </span>
                  )}
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
