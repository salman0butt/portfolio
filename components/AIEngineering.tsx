import { ArrowUpRight, Brain, Database, Network, Server, TestTube, Workflow } from 'lucide-react';
import { Github } from './icons';

const capabilities = [
  { icon: Brain, title: 'Agentic systems', items: ['LangGraph state & routing', 'Tool / function calling', 'Multi-agent orchestration', 'Human-in-the-loop'] },
  { icon: Workflow, title: 'AI-powered automation', items: ['Business process automation', 'Event-driven AI workflows', 'Tool / API orchestration', 'Approval & exception paths'] },
  { icon: Database, title: 'RAG & knowledge', items: ['Embeddings + vector search', 'Chunking & retrieval pipelines', 'Grounding and citations', 'PostgreSQL / pgvector / Pinecone'] },
  { icon: Server, title: 'Reliability', items: ['Retries + timeouts', 'Checkpointing', 'Fallback paths', 'Idempotent tool execution'] },
  { icon: Network, title: 'Security & control', items: ['Tool-level permissions', 'RBAC / ABAC patterns', 'Prompt-injection boundaries', 'Risk-based approval flows'] },
  { icon: TestTube, title: 'Evaluation & ops', items: ['LangSmith tracing', 'Offline / online evaluation patterns', 'Latency + token tracking', 'Task-completion quality'] },
];

const publicProof = [
  {
    title: 'Multi-Agent RAG Support System',
    text: 'LangGraph routing, Zod structured outputs, ToolNode loops, Pinecone RAG, embeddings and checkpointed conversation state.',
    href: 'https://github.com/salman0butt/multi-agent-rag-support-system',
  },
  {
    title: 'MCP Client + Inspector UI',
    text: 'Local/remote MCP connections, live tool discovery, Express API, SSE streaming, React UI and an included test MCP server.',
    href: 'https://github.com/salman0butt/mcp-client',
  },
  {
    title: 'Research Agent',
    text: 'LangGraph research workflow with web search, revision, citations and swappable LLM providers.',
    href: 'https://github.com/salman0butt/research-agent',
  },
];

function AIWorkflowVisual() {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 p-4 shadow-xl dark:border-white/10 sm:p-5">
      <svg viewBox="0 0 720 430" role="img" aria-labelledby="ai-flow-title ai-flow-desc" className="h-auto w-full">
        <title id="ai-flow-title">Agentic AI execution and feedback loop</title>
        <desc id="ai-flow-desc">A user request enters an orchestrator, which routes between retrieval and tools, passes through policy and approval controls, then records traces and evaluations before returning a response.</desc>
        <defs>
          <marker id="ai-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#34d399" />
          </marker>
        </defs>

        <g fill="none" stroke="#34d399" strokeWidth="2" strokeOpacity="0.75" markerEnd="url(#ai-arrow)">
          <path d="M145 86 H260" />
          <path d="M460 86 H575" />
          <path d="M360 130 V188 H200 V232" />
          <path d="M360 130 V232" />
          <path d="M360 130 V188 H520 V232" />
          <path d="M200 306 V352 H360" />
          <path d="M360 306 V352" />
          <path d="M520 306 V352 H360" />
        </g>

        <g>
          <rect x="35" y="48" width="110" height="76" rx="16" fill="#111827" stroke="#334155" />
          <text x="90" y="79" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700">Request</text>
          <text x="90" y="101" textAnchor="middle" fill="#94a3b8" fontSize="10">intent + context</text>
        </g>

        <g>
          <rect x="260" y="38" width="200" height="92" rx="18" fill="#07130f" stroke="#10b981" strokeOpacity="0.65" />
          <text x="360" y="69" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700" letterSpacing="1.4">ORCHESTRATION</text>
          <text x="360" y="95" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="700">LangGraph state machine</text>
          <text x="360" y="114" textAnchor="middle" fill="#94a3b8" fontSize="10">routing · checkpoints · typed state</text>
        </g>

        <g>
          <rect x="575" y="48" width="110" height="76" rx="16" fill="#111827" stroke="#334155" />
          <text x="630" y="79" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700">Response</text>
          <text x="630" y="101" textAnchor="middle" fill="#94a3b8" fontSize="10">streamed output</text>
        </g>

        <g>
          <rect x="80" y="232" width="240" height="74" rx="16" fill="#0f172a" stroke="#334155" />
          <text x="100" y="260" fill="#f8fafc" fontSize="14" fontWeight="700">Retrieval</text>
          <text x="100" y="282" fill="#94a3b8" fontSize="10">embeddings · vector search · grounding</text>
        </g>

        <g>
          <rect x="335" y="232" width="170" height="74" rx="16" fill="#0f172a" stroke="#334155" />
          <text x="355" y="260" fill="#f8fafc" fontSize="14" fontWeight="700">Tools & MCP</text>
          <text x="355" y="282" fill="#94a3b8" fontSize="10">typed actions · APIs</text>
        </g>

        <g>
          <rect x="520" y="232" width="120" height="74" rx="16" fill="#0f172a" stroke="#334155" />
          <text x="580" y="260" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="700">Policy</text>
          <text x="580" y="282" textAnchor="middle" fill="#94a3b8" fontSize="10">RBAC · HITL</text>
        </g>

        <g>
          <rect x="150" y="352" width="420" height="54" rx="16" fill="#07130f" stroke="#10b981" strokeOpacity="0.55" />
          <text x="360" y="375" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700" letterSpacing="1.2">OBSERVE → EVALUATE → IMPROVE</text>
          <text x="360" y="393" textAnchor="middle" fill="#cbd5e1" fontSize="10">traces · failures · latency · tokens · groundedness · task completion</text>
        </g>
      </svg>
    </div>
  );
}

export default function AIEngineering() {
  return (
    <section id="ai-engineering" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="section-label">PRODUCTION AI &amp; AUTOMATION</p>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">AI is a system, not an API call.</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">I build AI-powered product systems and automated workflows where models can reason, retrieve context, call tools and APIs, trigger business processes, request human approval, recover from failures, and stay observable in production.</p>
        </div>

        <AIWorkflowVisual />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article key={capability.title} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.035]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10"><Icon size={20} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" /></div>
                <h3 className="mt-4 text-base font-bold text-gray-950 dark:text-white">{capability.title}</h3>
                <ul className="mt-4 space-y-2">
                  {capability.items.map((item) => <li key={item} className="flex gap-2 text-xs leading-5 text-gray-600 dark:text-gray-400"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />{item}</li>)}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/[0.025] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">PUBLIC ENGINEERING PROOF</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">Inspect the implementation, not just the keywords.</h3>
            </div>
            <a href="https://github.com/salman0butt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300"><Github size={17} aria-hidden="true" /> GitHub profile</a>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {publicProof.map((item) => (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-gray-950 dark:hover:border-emerald-500/30">
                <div className="flex items-start justify-between gap-3"><h4 className="font-bold text-gray-950 dark:text-white">{item.title}</h4><ArrowUpRight size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /></div>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.text}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
