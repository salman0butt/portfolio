import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Network } from 'lucide-react';
import type { CaseStudy } from '@/lib/projects';

export default function CaseStudyPage({ project }: { project: CaseStudy }) {
  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"><ArrowLeft size={16} /> Back to selected work</Link>
        <header className="mt-8 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">{project.category} · Case study</p>
          <h1 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl dark:text-white">{project.title}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{project.summary}</p>
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/[0.07]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Selected impact</p>
            <p className="mt-2 text-base font-semibold leading-7 text-gray-900 dark:text-white">{project.impact}</p>
          </div>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_.8fr]">
          <section>
            <p className="section-label">THE PROBLEM</p>
            <h2 className="mt-3 text-2xl font-bold text-gray-950 dark:text-white">Challenge</h2>
            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">{project.challenge}</p>
          </section>
          <aside className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035]">
            <p className="text-sm font-bold text-gray-950 dark:text-white">My ownership</p>
            <ul className="mt-4 space-y-3">{project.role.map((item) => <li key={item} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"><CheckCircle size={17} className="mt-0.5 shrink-0 text-emerald-500" />{item}</li>)}</ul>
          </aside>
        </div>

        <section className="mt-16">
          <div className="flex items-center gap-3"><Network className="text-emerald-500" size={22} /><div><p className="section-label">ARCHITECTURE</p><h2 className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">System flow</h2></div></div>
          <div className="mt-7 overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 p-5 dark:border-white/10">
            <div className="grid gap-2 md:grid-cols-3">
              {project.architecture.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center text-xs font-semibold leading-5 text-gray-200">{step}</div>
                  {index < project.architecture.length - 1 && <ArrowRight size={15} className="hidden shrink-0 text-emerald-400 md:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <section>
            <p className="section-label">TECHNICAL DECISIONS</p>
            <h2 className="mt-3 text-2xl font-bold text-gray-950 dark:text-white">Why the system was built this way</h2>
            <div className="mt-5 space-y-3">{project.decisions.map((decision) => <div key={decision} className="rounded-xl border border-gray-200 p-4 text-sm leading-6 text-gray-600 dark:border-white/10 dark:text-gray-400">{decision}</div>)}</div>
          </section>
          <section>
            <p className="section-label">OUTCOMES</p>
            <h2 className="mt-3 text-2xl font-bold text-gray-950 dark:text-white">What shipped</h2>
            <div className="mt-5 space-y-3">{project.outcomes.map((outcome) => <div key={outcome} className="flex gap-3 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700 dark:bg-white/[0.035] dark:text-gray-300"><CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-500" />{outcome}</div>)}</div>
          </section>
        </div>

        <section className="mt-16 border-t border-gray-200 pt-10 dark:border-white/10">
          <p className="text-sm font-bold text-gray-950 dark:text-white">Technology used</p>
          <div className="mt-4 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">{tech}</span>)}</div>
        </section>

        <div className="mt-16 rounded-2xl bg-gray-950 p-7 text-white sm:p-9">
          <p className="text-sm font-semibold text-emerald-400">Need this level of ownership on your team?</p>
          <h2 className="mt-2 text-2xl font-bold">Let’s talk about the engineering problem.</h2>
          <a href="mailto:salman0butt@gmail.com" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white">Start a conversation <ArrowRight size={16} /></a>
        </div>
      </div>
    </article>
  );
}
