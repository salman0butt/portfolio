import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/lib/projects';

export default function Projects() {
  return (
    <section id="projects" className="section-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-label">FLAGSHIP WORK</p>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">Case studies, not just technology badges.</h2>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">A selection of systems where I owned meaningful parts of architecture, implementation, reliability and delivery.</p>
          </div>
          <p className="max-w-md text-sm leading-6 text-gray-500 dark:text-gray-500">Each case study explains the problem, my ownership, architecture decisions and outcomes.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {caseStudies.map((project, index) => (
            <article key={project.slug} className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-emerald-500/30">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">{project.category}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-gray-950 dark:text-white">{project.shortTitle}</h3>
                </div>
                <span className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-gray-400">0{index + 1}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">{project.summary}</p>
              <div className="mt-5 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/[0.07]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">Impact</p>
                <p className="mt-1.5 text-sm font-medium leading-6 text-gray-800 dark:text-gray-200">{project.impact}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 7).map((tech) => <span key={tech} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-white/5 dark:text-gray-400">{tech}</span>)}
              </div>
              <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors group-hover:text-emerald-700 dark:text-emerald-400">
                View case study <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
