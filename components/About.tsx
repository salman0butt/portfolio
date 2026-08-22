import { CheckCircle, GraduationCap } from 'lucide-react';

const principles = [
  ['Ownership over tickets', 'I prefer understanding the user and system problem, then carrying the solution through implementation, release and follow-up.'],
  ['Production over demos', 'Performance, failure modes, permissions, observability and maintainability are part of the feature — not cleanup for later.'],
  ['Simple systems first', 'I use SOLID, DRY and KISS pragmatically, refactor fragile areas in small steps, and avoid complexity that does not buy us something.'],
  ['Fast feedback loops', 'Ship small, measure impact, learn from users and production data, then repeat.'],
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="section-label">HOW I WORK</p>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">Senior engineering is judgment, not just more code.</h2>
            <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-400">Over 7+ years I’ve worked across SaaS, IoT, enterprise JavaScript, Web3 and Generative AI. The common thread is end-to-end ownership: turning ambiguous requirements into systems teams can operate and extend.</p>
            <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
              <div className="flex items-center gap-3"><GraduationCap size={21} className="text-emerald-500" /><div><p className="font-bold text-gray-950 dark:text-white">BSc Computer Science</p><p className="text-sm text-gray-500 dark:text-gray-400">University of the Punjab · Lahore · 2015–2019</p></div></div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035]">
                <CheckCircle size={20} className="text-emerald-500" />
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
