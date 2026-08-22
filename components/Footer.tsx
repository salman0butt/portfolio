import Link from 'next/link';
import { Mail, Send } from 'lucide-react';
import { Github, Linkedin } from './icons';

const quickLinks = [
  { label: 'Case Studies', href: '/#projects' },
  { label: 'AI Engineering', href: '/#ai-engineering' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Expertise', href: '/#skills' },
  { label: 'Blog', href: '/blog' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 text-gray-400">
      <div className="absolute left-1/2 top-0 h-px w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">OPEN TO SENIOR ENGINEERING ROLES</p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white sm:text-2xl">Need end-to-end ownership across product and AI?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">Senior Full-Stack · Generative AI · Remote worldwide</p>
          </div>
          <a href="mailto:salman0butt@gmail.com" className="btn-primary inline-flex shrink-0 items-center gap-2"><Send size={16} aria-hidden="true" /> Let&apos;s Talk</a>
        </div>

        <div className="mt-10 grid gap-8 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-xs font-bold text-white">SB</span>
              <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">Salman Butt</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">Senior Full-Stack &amp; Generative AI Engineer building scalable product systems, real-time platforms and production AI workflows.</p>
            <div className="mt-5 flex gap-2">
              <a href="https://github.com/salman0butt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg bg-white/5 p-2.5 transition-colors hover:bg-emerald-500/15 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"><Github size={17} /></a>
              <a href="https://www.linkedin.com/in/salman0butt/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg bg-white/5 p-2.5 transition-colors hover:bg-emerald-500/15 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"><Linkedin size={17} /></a>
              <a href="mailto:salman0butt@gmail.com" aria-label="Email" className="rounded-lg bg-white/5 p-2.5 transition-colors hover:bg-emerald-500/15 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"><Mail size={17} /></a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-sm transition-colors hover:text-emerald-300">{link.label}</Link></li>)}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">Hiring</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="/Salman_Butt_Resume.pdf" target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald-300">View résumé</a></li>
              <li><a href="mailto:salman0butt@gmail.com" className="transition-colors hover:text-emerald-300">Email me</a></li>
              <li className="text-gray-500">Pakistan · Remote worldwide</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-7 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Salman Butt. Built as engineering proof, not a template showcase.</p>
          <Link href="/#hero" className="transition-colors hover:text-emerald-300">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
