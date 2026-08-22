import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react';
import { Github, Linkedin } from './icons';

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 p-7 text-white shadow-2xl sm:p-10 lg:p-12 dark:border-white/10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">LET&apos;S WORK TOGETHER</p>
              <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Looking for a senior engineer who can own complex product systems end-to-end?</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300">I&apos;m open to Senior Full-Stack and Generative AI roles where product ownership, architecture, reliable delivery and production operations matter.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:salman0butt@gmail.com" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><Send size={17} aria-hidden="true" /> Email me</a>
                <a href="/Salman_Butt_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">View résumé <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-3 text-sm font-semibold"><MapPin size={17} className="text-emerald-400" aria-hidden="true" /> Pakistan · Remote worldwide</div>
                <p className="mt-2 text-xs leading-5 text-gray-400">Senior Full-Stack · Generative AI · Agentic systems</p>
              </div>
              <a href="mailto:salman0butt@gmail.com" className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                <div className="flex items-center gap-3 text-sm font-semibold"><Mail size={17} className="text-emerald-400" aria-hidden="true" /> salman0butt@gmail.com</div>
                <p className="mt-2 text-xs text-gray-400">Best way to start a conversation</p>
              </a>
              <div className="flex gap-2">
                <a href="https://github.com/salman0butt" target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><Github size={17} /> GitHub</a>
                <a href="https://www.linkedin.com/in/salman0butt/" target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><Linkedin size={17} /> LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
