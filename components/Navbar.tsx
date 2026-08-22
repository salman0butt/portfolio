'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Work', href: '/#projects' },
  { label: 'AI', href: '/#ai-engineering' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Expertise', href: '/#skills' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const useDark = stored !== 'light';
    setDark(useDark);
    document.documentElement.classList.toggle('dark', useDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 navbar-blur transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/#hero" className="group flex items-center gap-2" onClick={closeMenu}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">SB</span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-gray-900 dark:text-white">Salman Butt</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400">
                {link.label}
              </Link>
            ))}
            <button onClick={toggleTheme} aria-label="Toggle theme" className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="mailto:salman0butt@gmail.com" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-colors hover:bg-emerald-600">
              Hire Me
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="rounded-lg p-2 text-gray-600 dark:text-gray-300">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle menu" className="rounded-lg p-2 text-gray-600 dark:text-gray-300">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-gray-200 bg-white px-4 py-4 shadow-xl dark:border-gray-800 dark:bg-gray-950 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-emerald-600 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-emerald-400">
                  {link.label}
                </Link>
              ))}
              <a href="mailto:salman0butt@gmail.com" onClick={closeMenu} className="mt-2 rounded-lg bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white">Hire Me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
