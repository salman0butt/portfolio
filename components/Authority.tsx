import Link from 'next/link';
import { ArrowRight, BookOpen, Code, ExternalLink } from 'lucide-react';
import { Github } from './icons';

const resources = [
  {
    title: 'Developer Handbook',
    eyebrow: 'Engineering knowledge',
    description: 'Deep notes across JavaScript, React, Next.js, TypeScript, testing, architecture and production engineering.',
    href: 'https://salman0butt.github.io/handbook/',
    external: true,
    icon: BookOpen,
    cta: 'Explore the handbook',
  },
  {
    title: 'Engineering Blog',
    eyebrow: 'Technical writing',
    description: 'Practical articles from building full-stack products, scalable systems and production Generative AI.',
    href: '/blog',
    external: false,
    icon: Code,
    cta: 'Read articles',
  },
  {
    title: 'GitHub',
    eyebrow: 'Code & open work',
    description: 'Browse repositories, experiments and implementation work across web applications and engineering projects.',
    href: 'https://github.com/salman0butt',
    external: true,
    icon: Github,
    cta: 'View GitHub',
  },
];

export default function Authority() {
  return (
    <section id="knowledge" className="section-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-label">ENGINEERING KNOWLEDGE</p>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">I document how I think, not only what I ship.</h2>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">Technical writing, reusable mental models and public code make engineering depth easier to evaluate.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {resources.map((resource) => {
            const Icon = resource.icon;
            const content = (
              <article className="group h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-emerald-500/30">
                <Icon size={22} className="text-emerald-500" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">{resource.eyebrow}</p>
                <h3 className="mt-2 text-xl font-bold text-gray-950 dark:text-white">{resource.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{resource.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{resource.cta} {resource.external ? <ExternalLink size={15} /> : <ArrowRight size={15} />}</span>
              </article>
            );
            return resource.external ? <a key={resource.title} href={resource.href} target="_blank" rel="noopener noreferrer">{content}</a> : <Link key={resource.title} href={resource.href}>{content}</Link>;
          })}
        </div>
      </div>
    </section>
  );
}
