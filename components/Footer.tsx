'use client';

import { Mail, ArrowUp, Send } from 'lucide-react';
import { Github, Linkedin } from './icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer className="relative bg-gray-950 text-gray-400 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
      >
        {/* Top CTA bar */}
        <div className="rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-800/60 border border-gray-700/50">
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-bold text-white mb-1">
              Interested in working together?
            </h3>
            <p className="text-sm text-gray-400">
              I&apos;m available for senior full-stack and GenAI engineering roles.
            </p>
          </div>
          <a
            href="mailto:salman0butt@gmail.com"
            className="btn-primary inline-flex items-center gap-2 shrink-0"
          >
            <Send size={16} />
            Let&apos;s Talk
          </a>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 - Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-white font-bold text-xs">
                SB
              </span>
              <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">
                Salman Butt
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Senior Full Stack &amp; GenAI Engineer with 7+ years building
              scalable systems across 5 countries.
            </p>
            <div className="flex gap-2">
              <a
                href="https://github.com/salman0butt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/salman0butt/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:salman0butt@gmail.com"
                className="p-2 rounded-lg bg-gray-800 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Col 2 - Navigation */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
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

          {/* Col 3 - Contact */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:salman0butt@gmail.com"
                  className="hover:text-emerald-400 transition-colors"
                >
                  salman0butt@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+923151083526"
                  className="hover:text-emerald-400 transition-colors"
                >
                  +92 315 108 3526
                </a>
              </li>
              <li className="text-gray-500">
                Pakistan — Remote Worldwide
              </li>
            </ul>
          </div>

          {/* Col 4 - Resources */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/Salman_Butt_Resume.pdf"
                  download
                  className="hover:text-emerald-400 transition-colors"
                >
                  Download Resume
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/salman0butt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  GitHub Profile
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/salman0butt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Salman Butt. All rights reserved.
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
      </motion.div>
    </footer>
  );
}
