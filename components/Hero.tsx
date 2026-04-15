'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Briefcase, Code, Globe, Zap } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const floatingBadges = [
  {
    label: '7+ Years',
    icon: Briefcase,
    position: '-top-6 -left-10',
    delay: 0,
  },
  {
    label: '50+ Projects',
    icon: Code,
    position: '-top-6 -right-10',
    delay: 0.2,
  },
  {
    label: '5 Countries',
    icon: Globe,
    position: '-bottom-6 -left-10',
    delay: 0.4,
  },
  {
    label: '30-40% Faster APIs',
    icon: Zap,
    position: '-bottom-6 -right-10',
    delay: 0.6,
  },
];

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Text content */}
          <motion.div
            className="flex-1 lg:max-w-[60%] text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Availability badge */}
            <motion.div variants={item} className="inline-flex items-center gap-2 mb-6">
              <span className="badge">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                Available for Remote Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Salman Butt
            </motion.h1>

            {/* Typed subtitle */}
            <motion.div
              variants={item}
              className="text-xl md:text-2xl font-medium text-emerald-500 mb-6 min-h-[2.5rem]"
            >
              <TypeAnimation
                sequence={[
                  'Senior Full Stack Engineer',
                  2000,
                  'Generative AI Engineer',
                  2000,
                  'IoT Systems Builder',
                  2000,
                  'Microservices Specialist',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              I build products that scale, systems that hold, and AI that actually works.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={item}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
            >
              <a href="#projects" className="btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn-secondary">
                Get In Touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={item}
              className="flex justify-center lg:justify-start gap-4"
            >
              <a
                href="https://github.com/salman0butt"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-hover p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/salman0butt/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-hover p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="mailto:salman0butt@gmail.com"
                className="icon-hover p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right side - Avatar card with floating badges */}
          <motion.div
            className="hidden lg:flex flex-1 justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main avatar card */}
              <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                <span className="font-[family-name:var(--font-space-grotesk)] text-8xl font-bold text-white/90">
                  SB
                </span>
              </div>

              {/* Floating stat badges */}
              {floatingBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    className={`absolute ${badge.position} ${i % 2 === 0 ? 'animate-float' : ''}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + badge.delay }}
                  >
                    <div className="glass flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      <Icon size={16} className="text-emerald-500" />
                      {badge.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
