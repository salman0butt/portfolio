import { Brain, Database, Network, Server, TestTube } from 'lucide-react';

const capabilities = [
  { icon: Brain, title: 'Agentic systems', items: ['LangGraph workflows', 'Tool / function calling', 'Multi-agent orchestration', 'Human-in-the-loop'] },
  { icon: Database, title: 'RAG & knowledge', items: ['Embeddings + vector search', 'Retrieval pipelines', 'Grounding and citations', 'PostgreSQL / pgvector'] },
  { icon: Server, title: 'Reliability', items: ['Retries + timeouts', 'Checkpointing', 'Fallback paths', 'Idempotent tool execution'] },
  { icon: Network, title: 'Security & control', items: ['Tool-level permissions', 'RBAC / ABAC', 'Prompt-injection boundaries', 'Risk-based autonomy'] },
  { icon: TestTube, title: 'Evaluation & ops', items: ['LangSmith tracing', 'Offline / online evals', 'Latency + token tracking', 'Task-completion quality'] },
];

export default function AIEngineering() {
  return (
    <section id="ai-engineering" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="section-label">PRODUCTION AI ENGINEERING</p>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">AI is a system, not an API call.</h2>
            <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-400">I focus on the parts that make AI useful in production: state, tools, retrieval, permissions, recovery, evaluation and observability.</p>
            <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-950 p-5 dark:border-white/10">
              <div className="space-y-2 text-sm">
                {['Intent / product request', 'Agent orchestration', 'RAG + tools', 'Guardrails + permissions', 'Tracing + evals'].map((step, i) => (
                  <div key={step}>
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-medium text-gray-200">{step}</div>
                    {i < 4 && <div className="mx-auto h-2.5 w-px bg-emerald-500/60" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <article key={capability.title} className={`rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035] ${index === capabilities.length - 1 ? 'sm:col-span-2' : ''}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10"><Icon size={20} className="text-emerald-500" /></div>
                  <h3 className="mt-4 text-lg font-bold text-gray-950 dark:text-white">{capability.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {capability.items.map((item) => <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{item}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
