'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer className="bg-gray-900 text-gray-400">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left column - Name and socials */}
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-2">
              Salman Butt
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Senior Full Stack & GenAI Engineer
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/salman0butt"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-hover p-2 rounded-lg hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/salman0butt/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-hover p-2 rounded-lg hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:salman0butt@gmail.com"
                className="icon-hover p-2 rounded-lg hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Middle column - Quick links */}
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
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

          {/* Right column - Get in touch */}
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <a
              href="mailto:salman0butt@gmail.com"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors break-all"
            >
              salman0butt@gmail.com
            </a>
            <p className="text-sm text-gray-500 mt-3">
              Open to remote opportunities worldwide
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Salman Butt. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
