'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const navLinks = [
  { label: 'Work', href: '/#projects' },
  { label: 'AI', href: '/#ai-engineering' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Expertise', href: '/#skills' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

function ThemeIcons() {
  return (
    <>
      <Sun size={18} className="hidden dark:block" aria-hidden="true" />
      <Moon size={18} className="block dark:hidden" aria-hidden="true" />
    </>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav aria-label="Primary navigation" className={`fixed inset-x-0 top-0 z-50 navbar-blur transition-shadow duration-300 motion-reduce:transition-none ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/#hero" className="group flex items-center gap-2 rounded-lg" onClick={closeMenu}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">SB</span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-gray-900 dark:text-white">Salman Butt</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-md text-sm font-medium text-gray-600 transition-colors hover:text-emerald-700 dark:text-gray-300 dark:hover:text-emerald-300">
                {link.label}
              </Link>
            ))}
            <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
              <ThemeIcons />
            </button>
            <a href="mailto:salman0butt@gmail.com" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-colors hover:bg-emerald-700">
              Hire Me
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="rounded-lg p-2 text-gray-600 dark:text-gray-300">
              <ThemeIcons />
            </button>
            <button type="button" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-navigation" className="rounded-lg p-2 text-gray-600 dark:text-gray-300">
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="border-t border-gray-200 bg-white px-4 py-4 shadow-xl dark:border-gray-800 dark:bg-gray-950 lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-emerald-300">
                  {link.label}
                </Link>
              ))}
              <a href="mailto:salman0butt@gmail.com" onClick={closeMenu} className="mt-2 rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white">Hire Me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
