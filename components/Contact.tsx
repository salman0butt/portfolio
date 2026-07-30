'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Download, ExternalLink, Send } from 'lucide-react';
import { Github, Linkedin } from './icons';

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'salman0butt@gmail.com',
    href: 'mailto:salman0butt@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/salman0butt',
    href: 'https://www.linkedin.com/in/salman0butt/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/salman0butt',
    href: 'https://github.com/salman0butt',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 section-alt">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass rounded-3xl p-7 md:p-10 lg:p-12 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-9 lg:gap-12 items-start">
            <div>
              <span className="section-label">LET&apos;S WORK TOGETHER</span>
              <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white mb-5">
                Looking for an engineer who can own the whole problem?
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
                I&apos;m open to senior full-stack and AI engineering opportunities where I can
                contribute across product, architecture, implementation, and production reliability.
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-7">
                <MapPin size={17} className="text-emerald-500 shrink-0" />
                <span>Based in Pakistan · Open to remote teams worldwide</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:salman0butt@gmail.com"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <Send size={17} />
                  Start a conversation
                </a>
                <a
                  href="/Salman_Butt_Resume.pdf"
                  download
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <Download size={17} />
                  Download resume
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-500 mb-3">
                Best ways to reach me
              </p>
              <div className="space-y-3">
                {links.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.025] p-4 flex items-center gap-4 group hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <link.icon className="text-emerald-500" size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">
                        {link.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {link.value}
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="ml-auto text-gray-400 group-hover:text-emerald-500 transition-colors shrink-0"
                    />
                  </motion.a>
                ))}
              </div>

              <div className="mt-4 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/10 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                  Open to full-time remote opportunities
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
