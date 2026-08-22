export type ProofLink = {
  label: string;
  href: string;
  note: string;
};

export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  summary: string;
  impact: string;
  challenge: string;
  role: string[];
  scale: string[];
  constraints: string[];
  outcomes: string[];
  decisions: string[];
  tradeoffs: string[];
  architecture: string[];
  lessons: string[];
  tech: string[];
  proof?: ProofLink[];
  confidentiality?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'conversational-ai-platform',
    category: 'Generative AI',
    title: 'Conversational AI Agent Platform',
    shortTitle: 'AI Agent Platform',
    summary: 'A production conversational system combining multi-turn context, graph-based agent orchestration, real-time streaming, tool use and production observability.',
    impact: 'Production agent orchestration with explicit state, tracing, reusable workflows and real-time responses.',
    challenge: 'Move beyond a single prompt-response integration and build an AI workflow that could preserve context, coordinate tools, stream responses and remain observable when execution becomes non-deterministic.',
    role: ['Full-stack product engineering', 'Agent workflow architecture', 'Backend integration', 'Observability and production debugging'],
    scale: ['Production product workflow rather than a standalone demo', 'Multi-turn state across user conversations', 'Multiple model/tool boundaries across the application stack'],
    constraints: ['Responses needed to stream without hiding orchestration state from the application', 'Tools and models needed to evolve without coupling product UI to prompt implementation', 'Failures needed to be traceable across model, tool and application layers', 'Conversation state needed explicit lifecycle ownership rather than implicit prompt history'],
    outcomes: ['Multi-turn conversation state and reusable workflow orchestration', 'Streaming responses for a faster product experience', 'LangSmith traces for latency, token usage and conversation quality investigation', 'Clear separation between product UI, orchestration and AI/tool layers'],
    decisions: ['Use graph-based orchestration for explicit state and workflow control', 'Keep tool execution behind typed application boundaries instead of prompt-only logic', 'Treat observability as a production requirement, not a debugging add-on', 'Design the AI layer so models and tools can evolve independently'],
    tradeoffs: ['Graph orchestration adds structure and debugging surface area, but is justified when workflows have branches, tools and persistent state', 'Separating tool execution from prompts adds application code, but gives permissions, validation and error handling a real boundary', 'Tracing adds operational overhead, but shortens debugging cycles for non-deterministic failures'],
    architecture: ['Next.js product interface', 'Node.js / Python application services', 'LangGraph state & orchestration', 'Model + tool integrations', 'Application data / memory', 'LangSmith traces & evaluations'],
    lessons: ['Model quality is only one part of product quality; state, tool contracts and failure behavior are equally important', 'Explicit orchestration becomes valuable once a workflow needs branching, recovery or human approval', 'Observability should be designed before production incidents make it mandatory'],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'LangChain', 'LangGraph', 'LangSmith', 'Google ADK', 'Firebase'],
    proof: [
      {
        label: 'Multi-Agent RAG Support System',
        href: 'https://github.com/salman0butt/multi-agent-rag-support-system',
        note: 'Related public implementation showing LangGraph routing, structured outputs, RAG, ToolNode loops and checkpointed conversation state.',
      },
      {
        label: 'MCP Client + Inspector UI',
        href: 'https://github.com/salman0butt/mcp-client',
        note: 'Related public implementation showing local/remote MCP connections, tool discovery, SSE streaming and a React inspector UI.',
      },
    ],
    confidentiality: 'The production platform itself is proprietary. Public repositories above demonstrate related architecture patterns without exposing employer code or customer data.',
  },
  {
    slug: 'permission-ask',
    category: 'Web3 · Platform',
    title: 'Permission ASK — Web3 Earnings & Search Platform',
    shortTitle: 'Permission ASK',
    summary: 'A multi-service consumer platform combining search interactions, referral mechanics, token operations, identity verification and Web3 wallet flows.',
    impact: 'Served thousands of users while production API work reduced representative response times from roughly 500ms to 300ms.',
    challenge: 'Coordinate conventional web product flows with token balances, withdrawals, KYC, anti-bot controls and asynchronous processing while keeping the user experience responsive and production failures diagnosable.',
    role: ['Frontend and backend feature ownership', 'API performance investigation', 'Third-party integration', 'Production reliability'],
    scale: ['Thousands of users across production platform capabilities', 'Multiple external identity, messaging and Web3 integrations', 'Cross-service flows involving balances, withdrawals and asynchronous processing'],
    constraints: ['External KYC and Web3 providers could not be allowed to leak implementation complexity into the UI', 'User-facing requests should not block on work that could safely complete asynchronously', 'Performance work needed evidence from real endpoints rather than speculative optimization', 'Token and balance workflows required clear application boundaries'],
    outcomes: ['Reduced API response time by removing expensive data-access bottlenecks', 'Built token issuance, withdrawal and balance workflows', 'Integrated KYC, messaging, Web3 data and anti-bot services', 'Supported production traffic across multiple platform capabilities'],
    decisions: ['Profile real endpoints before optimizing', 'Use asynchronous processing where user requests should not wait on downstream work', 'Separate wallet/token concerns from presentation logic', 'Use external identity and Web3 providers behind application-level services'],
    tradeoffs: ['Asynchronous processing improves responsiveness but requires durable job state and clearer failure handling', 'Caching reduces repeated work but only helps when invalidation and data ownership are explicit', 'Third-party providers accelerate delivery but make adapter boundaries important for reliability and replacement'],
    architecture: ['Next.js / React experience', 'NestJS / Node.js services', 'PostgreSQL + Redis', 'RabbitMQ async processing', 'Web3 provider integration', 'KYC + messaging services'],
    lessons: ['Performance improvements are more credible when tied to a measured bottleneck and before/after behavior', 'External providers should sit behind application services so business rules remain owned by the product', 'Queue-based work is most useful when the user does not need to wait for downstream completion'],
    tech: ['React', 'Next.js', 'NestJS', 'Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Moralis', 'Firebase', 'ShuftiPro'],
    confidentiality: 'Employer source code is private, so this case study focuses on architecture, ownership and measurable production outcomes rather than proprietary implementation details.',
  },
  {
    slug: 'offgrid-iot',
    category: 'IoT · Real-time',
    title: 'OffGrid IoT Monitoring & Device Control',
    shortTitle: 'OffGrid IoT',
    summary: 'Real-time software for monitoring telemetry and controlling distributed solar-energy devices in remote environments.',
    impact: 'End-to-end telemetry, dashboards, analytics, alerts and remote device-control workflows for distributed installations.',
    challenge: 'Ingest continuous device telemetry, make recent state visible to operators, store time-series data efficiently and support remote control without treating IoT as a normal CRUD application.',
    role: ['System architecture', 'Dashboard engineering', 'Backend and messaging', 'Device-control workflows'],
    scale: ['Distributed solar-energy installations in remote environments', 'Continuous telemetry rather than request/response-only workloads', 'Operational state plus long-term time-series analytics'],
    constraints: ['Devices and networks can disconnect, so communication cannot assume a permanently reliable request path', 'Telemetry volume and query patterns differ from transactional application data', 'Operators need fresh state while historical analytics need efficient retention and aggregation', 'Remote commands need a clear separation from passive telemetry ingestion'],
    outcomes: ['Real-time monitoring dashboards for distributed installations', 'Telemetry pipeline using MQTT and RabbitMQ', 'Time-series analytics backed by InfluxDB', 'Alerting and remote device-control capabilities'],
    decisions: ['Use MQTT for device-oriented pub/sub communication', 'Keep telemetry transport decoupled with message queues', 'Store time-series workloads in a database designed for them', 'Separate operational device state from historical analytics'],
    tradeoffs: ['MQTT fits constrained device communication better than ordinary REST polling, but introduces connection and delivery semantics that must be handled deliberately', 'A dedicated time-series database adds operational complexity but matches telemetry retention and aggregation workloads better', 'Separating ingest, processing and presentation adds components while improving fault isolation and evolvability'],
    architecture: ['Embedded / remote devices', 'MQTT communication', 'RabbitMQ processing', 'Node.js / Laravel services', 'InfluxDB time-series storage', 'Next.js monitoring dashboard'],
    lessons: ['Real-time systems should model stale and disconnected state explicitly instead of pretending every device is online', 'Telemetry and business transactions have different storage/query shapes and should not be forced into the same model', 'Message boundaries make device pipelines easier to evolve and troubleshoot'],
    tech: ['Next.js', 'React', 'Node.js', 'Laravel', 'RabbitMQ', 'MQTT', 'InfluxDB', 'MongoDB', 'PostgreSQL'],
    confidentiality: 'The commercial implementation is not public; the case study documents the system shape and engineering decisions without exposing customer or device data.',
  },
  {
    slug: 'multi-tenant-saas-erp',
    category: 'SaaS · ERP',
    title: 'Switcher Multi-Tenant SaaS ERP & POS',
    shortTitle: 'Multi-Tenant ERP',
    summary: 'A multi-tenant ERP and POS platform built from scratch for retail and service businesses across the Middle East.',
    impact: 'Onboarded 50+ businesses on a shared multi-tenant platform.',
    challenge: 'Build one product that could isolate tenant data while supporting inventory, complex products, real-time orders, payments and daily business operations.',
    role: ['Platform architecture', 'Laravel API development', 'Vue.js product engineering', 'Deployment and mentoring'],
    scale: ['50+ businesses on one shared application platform', 'POS, inventory, products, payments and operational workflows in one product', 'Real-time order state across browser clients'],
    constraints: ['Tenant context needed to be treated as a platform concern across requests and data access', 'Inventory and order workflows needed consistent business rules across UI and API paths', 'Real-time events were valuable for selected workflows but not every screen needed a socket connection', 'Payment and media providers needed to remain replaceable integration concerns'],
    outcomes: ['50+ businesses onboarded on a single platform', 'Real-time POS and order tracking with Socket.IO', 'Inventory and multi-attribute product management', 'Stripe / PayPal integration and cloud media workflows'],
    decisions: ['Model tenancy as a platform concern from the start', 'Use a REST API boundary between the product and backend', 'Add Redis where caching materially reduces repeated work', 'Use real-time events only for flows that benefit from them'],
    tradeoffs: ['A shared multi-tenant application reduces operational duplication but requires disciplined tenant scoping throughout the backend', 'Caching improves repeated reads while adding invalidation responsibilities', 'Real-time transport improves selected operational flows but should not replace simpler request/response paths without a reason'],
    architecture: ['Vue.js single-page application', 'Laravel REST API', 'Tenant-aware application layer', 'MySQL + Redis', 'Socket.IO real-time events', 'Storage + payment integrations'],
    lessons: ['Multi-tenancy works best when tenant context is an architectural invariant instead of a feature added to individual queries', 'Not every interaction benefits from real-time infrastructure; use it where immediacy changes the product experience', 'Platform integrations stay maintainable when business logic does not depend directly on provider SDKs'],
    tech: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Redis', 'Socket.IO', 'AWS S3', 'Kubernetes', 'Stripe', 'PayPal'],
    confidentiality: 'Commercial source code is private. The case study focuses on the architecture and outcomes that can be discussed without exposing customer data.',
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
