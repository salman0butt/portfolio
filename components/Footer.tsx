'use client';

import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-800 dark:text-gray-400 flex items-center gap-2 justify-center md:justify-start">
              Made with <Heart className="text-green-500 fill-green-500" size={16} /> using Next.js
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-500 mt-1">
              © {currentYear} Salman. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <a
              href="#about"
              className="text-gray-800 dark:text-gray-400 hover:text-green-500 transition-smooth"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-800 dark:text-gray-400 hover:text-green-500 transition-smooth"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="text-gray-800 dark:text-gray-400 hover:text-green-500 transition-smooth"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="text-gray-800 dark:text-gray-400 hover:text-green-500 transition-smooth"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
