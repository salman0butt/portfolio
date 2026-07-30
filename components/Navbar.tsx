'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Expertise', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      setDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed top-0 left-0 right-0 z-50 navbar-blur transition-shadow duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 group" aria-label="Salman Butt home">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500 text-white font-bold text-sm">
              SB
            </span>
            <span className="font-[family-name:var(--font-space-grotesk)] font-semibold text-lg text-gray-900 dark:text-white">
              Salman Butt
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="mailto:salman0butt@gmail.com"
              className="ml-1 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20"
            >
              Let&apos;s Talk
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-16 right-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 md:hidden z-40"
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/Salman_Butt_Resume.pdf"
                download
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.04 }}
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800"
              >
                Resume
              </motion.a>
              <motion.a
                href="mailto:salman0butt@gmail.com"
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.04 }}
                className="mt-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-white text-center text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20"
              >
                Let&apos;s Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
