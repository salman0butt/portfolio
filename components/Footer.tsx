'use client';

import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './icons';

const quickLinks = [
  { label: 'Selected Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Expertise', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-400 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-7">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_0.8fr] gap-9 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500 text-white font-bold text-xs">
                SB
              </span>
              <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">
                Salman Butt
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md mb-5">
              Senior full-stack and AI engineer building production software across
              product interfaces, backend systems, agent workflows, data, and real-time infrastructure.
            </p>
            <div className="flex gap-2">
              <a
                href="https://github.com/salman0butt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-gray-800 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/salman0butt/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-gray-800 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="mailto:salman0butt@gmail.com"
                className="p-2.5 rounded-lg bg-gray-800 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
              Explore
            </h2>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
              Resources
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/Salman_Butt_Resume.pdf"
                  download
                  className="hover:text-emerald-400 transition-colors"
                >
                  Download resume
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/salman0butt?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Public repositories
                </a>
              </li>
              <li>
                <a
                  href="mailto:salman0butt@gmail.com"
                  className="hover:text-emerald-400 transition-colors"
                >
                  salman0butt@gmail.com
                </a>
              </li>
              <li className="text-gray-600">Pakistan · Remote worldwide</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Salman Butt. Built with Next.js and TypeScript.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-400 transition-colors"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
