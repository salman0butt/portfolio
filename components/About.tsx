import { CheckCircle, GraduationCap } from 'lucide-react';

const principles = [
  ['Ownership over tickets', 'I start with the user and system problem, then carry the solution through architecture, implementation, release, observability and follow-up.'],
  ['Production over demos', 'Performance, failure modes, permissions, logging, tests and maintainability are part of the feature—not cleanup for later.'],
  ['Simple systems first', 'I use SOLID, DRY and KISS pragmatically, modernize fragile areas in small steps, and avoid distributed complexity unless the trade-off is justified.'],
  ['Evidence over assumptions', 'Profile the bottleneck, inspect production traces, measure the result, and use those signals to decide what to change next.'],
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="section-label">ENGINEERING JUDGMENT</p>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">Senior engineering is judgment, not just more code.</h2>
            <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-400">Across 7+ years in SaaS, IoT, enterprise JavaScript, Web3 and Generative AI, the common thread has been end-to-end ownership: turning ambiguous product requirements into systems teams can operate, debug and extend.</p>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">That has included performance investigations, architecture decisions, real-time and asynchronous workflows, legacy codebases, third-party integrations, mentoring and production delivery across distributed teams.</p>
            <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
              <div className="flex items-center gap-3"><GraduationCap size={21} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" /><div><p className="font-bold text-gray-950 dark:text-white">BSc Computer Science</p><p className="text-sm text-gray-500 dark:text-gray-400">University of the Punjab · Lahore · 2015–2019</p></div></div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035]">
                <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-gray-950 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
