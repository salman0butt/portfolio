export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  summary: string;
  impact: string;
  challenge: string;
  role: string[];
  outcomes: string[];
  decisions: string[];
  architecture: string[];
  tech: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'conversational-ai-platform',
    category: 'Generative AI',
    title: 'Conversational AI Agent Platform',
    shortTitle: 'AI Agent Platform',
    summary: 'A production conversational system combining multi-turn context, agent orchestration, real-time streaming, tool use and production observability.',
    impact: 'Production-grade agent orchestration with tracing, stateful workflows and real-time responses.',
    challenge: 'Move beyond a single prompt-response integration and build an AI workflow that could preserve context, coordinate tools, stream responses and remain observable when things fail.',
    role: ['Full-stack product engineering', 'Agent workflow architecture', 'Backend integration', 'Observability and production debugging'],
    outcomes: ['Multi-turn conversation state and reusable workflow orchestration', 'Streaming responses for a faster product experience', 'LangSmith traces for latency, token usage and conversation quality', 'Clear separation between product UI, orchestration and AI/tool layers'],
    decisions: ['Use graph-based orchestration for explicit state and workflow control', 'Keep tool execution behind typed application boundaries instead of prompt-only logic', 'Treat observability as a production requirement, not a debugging add-on', 'Design the AI layer so models and tools can evolve independently'],
    architecture: ['React / Next.js product interface', 'Node.js and Python application services', 'LangChain + LangGraph orchestration', 'Google ADK / model and tool integrations', 'Firebase / application data', 'LangSmith tracing and observability'],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'LangChain', 'LangGraph', 'LangSmith', 'Google ADK', 'Firebase'],
  },
  {
    slug: 'permission-ask',
    category: 'Web3 · Platform',
    title: 'Permission ASK — Web3 Earnings & Search Platform',
    shortTitle: 'Permission ASK',
    summary: 'A multi-service consumer platform combining search interactions, referral mechanics, token operations, identity verification and Web3 wallet flows.',
    impact: 'Served thousands of users while production API work reduced response times by roughly 30–40%.',
    challenge: 'Coordinate conventional web product flows with token balances, withdrawals, KYC, anti-bot controls and asynchronous processing while keeping the user experience responsive.',
    role: ['Frontend and backend feature ownership', 'API performance investigation', 'Third-party integration', 'Production reliability'],
    outcomes: ['Improved API performance by removing expensive data-access bottlenecks', 'Built secure token issuance, withdrawal and balance flows', 'Integrated KYC, messaging, Web3 data and anti-bot services', 'Supported production traffic across multiple platform capabilities'],
    decisions: ['Profile real endpoints before optimizing', 'Use asynchronous processing where user requests should not wait on downstream work', 'Separate wallet/token concerns from presentation logic', 'Use external identity and Web3 providers behind application-level services'],
    architecture: ['Next.js / React experience', 'NestJS / Node.js services', 'PostgreSQL + Redis', 'RabbitMQ asynchronous processing', 'Moralis Web3 integration', 'ShuftiPro KYC + messaging services'],
    tech: ['React', 'Next.js', 'NestJS', 'Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Moralis', 'Firebase', 'ShuftiPro'],
  },
  {
    slug: 'offgrid-iot',
    category: 'IoT · Real-time',
    title: 'OffGrid IoT Monitoring & Device Control',
    shortTitle: 'OffGrid IoT',
    summary: 'Real-time software for monitoring telemetry and controlling distributed solar-energy devices in remote environments.',
    impact: 'End-to-end telemetry, dashboards, analytics, alerts and remote device-control workflows.',
    challenge: 'Ingest continuous device telemetry, make recent state visible to operators, store time-series data efficiently and support remote control without treating IoT as a normal CRUD application.',
    role: ['System architecture', 'Dashboard engineering', 'Backend and messaging', 'Device-control workflows'],
    outcomes: ['Real-time monitoring dashboards for distributed installations', 'High-throughput telemetry pipeline using MQTT and RabbitMQ', 'Time-series analytics backed by InfluxDB', 'Alerting and remote device-control capabilities'],
    decisions: ['Use MQTT for device-oriented pub/sub communication', 'Keep telemetry transport decoupled with message queues', 'Store time-series workloads in a database designed for them', 'Separate operational device state from historical analytics'],
    architecture: ['Embedded / remote devices', 'MQTT device communication', 'RabbitMQ processing', 'Node.js / Laravel services', 'InfluxDB time-series storage', 'Next.js monitoring dashboard'],
    tech: ['Next.js', 'React', 'Node.js', 'Laravel', 'RabbitMQ', 'MQTT', 'InfluxDB', 'MongoDB', 'PostgreSQL'],
  },
  {
    slug: 'multi-tenant-saas-erp',
    category: 'SaaS · ERP',
    title: 'Switcher Multi-Tenant SaaS ERP & POS',
    shortTitle: 'Multi-Tenant ERP',
    summary: 'A multi-tenant ERP and POS platform built from scratch for retail and service businesses across the Middle East.',
    impact: 'Onboarded 50+ businesses on a shared multi-tenant platform.',
    challenge: 'Build one product that could safely isolate tenant data while supporting inventory, complex products, real-time orders, payments and business operations.',
    role: ['Platform architecture', 'Laravel API development', 'Vue.js product engineering', 'Deployment and mentoring'],
    outcomes: ['50+ businesses onboarded on a single platform', 'Real-time POS and order tracking with Socket.IO', 'Inventory and multi-attribute product management', 'Stripe / PayPal integration and cloud media workflows'],
    decisions: ['Model tenancy as a platform concern from the start', 'Use a REST API boundary between the product and backend', 'Add Redis where caching materially reduces repeated work', 'Use real-time events only for flows that benefit from them'],
    architecture: ['Vue.js single-page application', 'Laravel REST API', 'Multi-tenant application layer', 'MySQL + Redis', 'Socket.IO real-time events', 'AWS S3 / Cloudinary + payments'],
    tech: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Redis', 'Socket.IO', 'AWS S3', 'Kubernetes', 'Stripe', 'PayPal'],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
