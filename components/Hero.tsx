'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 md:py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="badge">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available for opportunities
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-slate-900 dark:text-white"
            >
              Hi, I&apos;m <span className="gradient-text">Salman</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-300 mb-4 md:mb-6 min-h-[2.5rem] md:min-h-[3rem]"
            >
              <TypeAnimation
                sequence={[
                  'Principal Full-Stack Engineer',
                  2000,
                  'Web3 & AI Solutions Architect',
                  2000,
                  'IoT Systems Expert',
                  2000,
                  'Microservices Specialist',
                  2000,
                  'Performance Optimization Leader',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 dark:text-slate-400 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Building <span className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">enterprise-grade systems</span> that drive measurable business impact. Proven track record of <span className="font-semibold text-green-600 dark:text-green-400 whitespace-nowrap">40% performance gains</span>, <span className="font-semibold text-green-600 dark:text-green-400 whitespace-nowrap">10M+ data points</span> processed daily, and <span className="font-semibold text-green-600 dark:text-green-400">100+ successful</span> projects across Web3, AI, and IoT.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-10"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <span>View My Work</span>
                <ArrowDown size={16} className="flex-shrink-0" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary inline-flex items-center justify-center"
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
                { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border-2 border-slate-200 dark:border-slate-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 icon-hover"
                  aria-label={label}
                >
                  <Icon size={22} className="text-slate-600 dark:text-slate-400" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-sm px-8 sm:px-4">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-green-200 dark:bg-green-900/30 rounded-full blur-3xl opacity-50 -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-emerald-200 dark:bg-emerald-900/30 rounded-full blur-3xl opacity-50 -z-10"></div>

              {/* Main card */}
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-green-500/20">
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className="text-6xl sm:text-8xl md:text-9xl font-bold text-white drop-shadow-2xl mb-2 sm:mb-4">
                        S
                      </div>
                      <div className="text-white/90 text-sm sm:text-lg md:text-xl font-semibold px-2">
                        Full-Stack Developer
                      </div>
                    </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute top-2 right-2 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 badge shadow-lg text-xs md:text-sm whitespace-nowrap z-10"
                >
                  <span>🏆</span>
                  <span>7+ Years</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-2 left-2 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6 badge shadow-lg text-xs md:text-sm whitespace-nowrap z-10"
                >
                  <span>⚡</span>
                  <span>100+ Projects</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-green-500 transition-colors"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
