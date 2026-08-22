const groups = [
  {
    label: 'Production expertise',
    description: 'Technologies I have used deeply across shipped products.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Laravel', 'PHP', 'PostgreSQL', 'MySQL'],
  },
  {
    label: 'Generative AI',
    description: 'Building AI workflows as production software rather than isolated demos.',
    skills: ['LangChain', 'LangGraph', 'LangSmith', 'RAG', 'Agents', 'Tool Calling', 'Google ADK', 'OpenAI APIs', 'Evals'],
  },
  {
    label: 'Architecture & data',
    description: 'Patterns and infrastructure used for scalable, real-time and multi-tenant systems.',
    skills: ['Microservices', 'Event-driven systems', 'Redis', 'RabbitMQ', 'MQTT', 'WebSockets', 'InfluxDB', 'MongoDB', 'Multi-tenancy'],
  },
  {
    label: 'Delivery & quality',
    description: 'The engineering practices around the code.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Jest', 'Cypress', 'Playwright', 'CI/CD', 'Observability'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-label">ENGINEERING EXPERTISE</p>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">Evidence over arbitrary proficiency percentages.</h2>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">The case studies and experience above show where these technologies were actually used.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {groups.map((group) => (
            <article key={group.label} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035]">
              <h3 className="text-lg font-bold text-gray-950 dark:text-white">{group.label}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{group.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => <span key={skill} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
