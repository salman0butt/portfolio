import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle, Gauge, GitBranch, LockKeyhole, Network, Scale } from 'lucide-react';
import type { CaseStudy } from '@/lib/projects';

function SystemFlow({ steps }: { steps: string[] }) {
  return (
    <div className="mt-7 overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 p-5 shadow-xl dark:border-white/10 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">Request → processing → state → response</p>
          <p className="mt-1 text-sm font-semibold text-white">System boundary and data flow</p>
        </div>
        <div className="flex gap-2 text-[10px] font-semibold text-gray-400">
          <span className="rounded-full border border-white/10 px-2 py-1">sync</span>
          <span className="rounded-full border border-white/10 px-2 py-1">async where needed</span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step} className="relative">
            <div className="min-h-24 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-300">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">{index === 0 ? 'entry' : index === steps.length - 1 ? 'delivery' : 'system'}</span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-gray-100">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex h-7 items-center justify-center text-emerald-400 md:absolute md:-right-5 md:top-1/2 md:z-10 md:h-auto md:-translate-y-1/2">
                <ArrowDown size={17} className="md:hidden" aria-hidden="true" />
                <ArrowRight size={17} className="hidden md:block" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-2 text-center text-[10px] font-semibold text-gray-400 sm:grid-cols-3">
        <span className="rounded-xl border border-white/10 bg-black/10 px-3 py-2">Application boundaries</span>
        <span className="rounded-xl border border-white/10 bg-black/10 px-3 py-2">Failure-aware integration</span>
        <span className="rounded-xl border border-white/10 bg-black/10 px-3 py-2">Observable production path</span>
      </div>
    </div>
  );
}

export default function CaseStudyPage({ project }: { project: CaseStudy }) {
  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-gray-600 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-gray-400 dark:hover:text-emerald-300"><ArrowLeft size={16} aria-hidden="true" /> Back to selected work</Link>

        <header className="mt-8 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{project.category} · Engineering case study</p>
          <h1 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl dark:text-white">{project.title}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">{project.summary}</p>
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/[0.07]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800 dark:text-emerald-300">Selected impact</p>
            <p className="mt-2 text-base font-semibold leading-7 text-gray-900 dark:text-white">{project.impact}</p>
          </div>
        </header>

        <section className="mt-12" aria-labelledby="scale-heading">
          <div className="flex items-center gap-3"><Gauge size={20} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" /><h2 id="scale-heading" className="text-lg font-bold text-gray-950 dark:text-white">Scale & operating context</h2></div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {project.scale.map((item) => <div key={item} className="rounded-2xl border border-gray-200 bg-white p-5 text-sm leading-6 text-gray-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-gray-300">{item}</div>)}
          </div>
        </section>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <section>
            <p className="section-label">THE PROBLEM</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">Challenge & constraints</h2>
            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">{project.challenge}</p>
            <ul className="mt-6 space-y-3">
              {project.constraints.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-gray-600 dark:text-gray-400"><LockKeyhole size={17} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />{item}</li>)}
            </ul>
          </section>
          <aside className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035]">
            <p className="text-sm font-bold text-gray-950 dark:text-white">My ownership</p>
            <ul className="mt-4 space-y-3">{project.role.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-gray-600 dark:text-gray-400"><CheckCircle size={17} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />{item}</li>)}</ul>
          </aside>
        </div>

        <section className="mt-16">
          <div className="flex items-center gap-3"><Network className="text-emerald-600 dark:text-emerald-400" size={22} aria-hidden="true" /><div><p className="section-label">ARCHITECTURE</p><h2 className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">System flow</h2></div></div>
          <SystemFlow steps={project.architecture} />
        </section>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <section>
            <div className="flex items-center gap-3"><GitBranch size={20} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" /><p className="section-label">TECHNICAL DECISIONS</p></div>
            <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">Why the system was built this way</h2>
            <div className="mt-5 space-y-3">{project.decisions.map((decision) => <div key={decision} className="rounded-xl border border-gray-200 p-4 text-sm leading-6 text-gray-600 dark:border-white/10 dark:text-gray-400">{decision}</div>)}</div>
          </section>
          <section>
            <div className="flex items-center gap-3"><Scale size={20} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" /><p className="section-label">TRADE-OFFS</p></div>
            <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">What the choices cost</h2>
            <div className="mt-5 space-y-3">{project.tradeoffs.map((item) => <div key={item} className="rounded-xl bg-amber-50/70 p-4 text-sm leading-6 text-gray-700 dark:bg-amber-500/[0.055] dark:text-gray-300">{item}</div>)}</div>
          </section>
        </div>

        <section className="mt-16">
          <p className="section-label">OUTCOMES</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">What shipped</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">{project.outcomes.map((outcome) => <div key={outcome} className="flex gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-6 text-gray-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-gray-300"><CheckCircle size={18} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />{outcome}</div>)}</div>
        </section>

        <section className="mt-16 rounded-3xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.025] sm:p-8">
          <p className="section-label">LESSONS</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">What I would carry into the next system</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{project.lessons.map((lesson, index) => <div key={lesson} className="rounded-2xl bg-gray-50 p-5 dark:bg-white/[0.035]"><p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">0{index + 1}</p><p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">{lesson}</p></div>)}</div>
        </section>

        {(project.proof?.length || project.confidentiality) && (
          <section className="mt-16">
            <p className="section-label">PROOF & CONTEXT</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">What can be inspected publicly</h2>
            {project.confidentiality && <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-400">{project.confidentiality}</p>}
            {project.proof?.length ? <div className="mt-6 grid gap-4 md:grid-cols-2">{project.proof.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-emerald-500/30"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-gray-950 dark:text-white">{item.label}</h3><ArrowUpRight size={17} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /></div><p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.note}</p></a>)}</div> : null}
          </section>
        )}

        <section className="mt-16 border-t border-gray-200 pt-10 dark:border-white/10">
          <p className="text-sm font-bold text-gray-950 dark:text-white">Technology used</p>
          <div className="mt-4 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">{tech}</span>)}</div>
        </section>

        <div className="mt-16 rounded-3xl bg-gray-950 p-7 text-white sm:p-9">
          <p className="text-sm font-semibold text-emerald-400">Looking for end-to-end engineering ownership?</p>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold">Let’s talk about the product, architecture and production constraints—not just the framework.</h2>
          <a href="mailto:salman0butt@gmail.com" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600">Start a conversation <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </article>
  );
}
