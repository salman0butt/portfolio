'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  Github,
  Linkedin,
  Mail,
  Briefcase,
  Code,
  Globe,
  Zap,
  ChevronDown,
} from 'lucide-react';

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

const stats = [
  { value: '7+', label: 'Years', icon: Briefcase },
  { value: '50+', label: 'Projects', icon: Code },
  { value: '5', label: 'Countries', icon: Globe },
  { value: '40%', label: 'Faster APIs', icon: Zap },
];

export default function Hero() {
  return (
    <section id="hero" className="relative pt-28 pb-16 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="hero-gradient" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left side - Text content */}
          <motion.div
            className="flex-1 md:max-w-[60%] text-center md:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Section label */}
            <motion.span variants={item} className="section-label">
              SENIOR FULL STACK &amp; GENAI ENGINEER
            </motion.span>

            {/* Name with avatar */}
            <motion.div variants={item} className="flex items-center gap-4 justify-center md:justify-start mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shadow-emerald-500/20 shrink-0">
                SB
              </div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Salman Butt
              </h1>
            </motion.div>

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
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto md:mx-0"
            >
              I build products that scale, systems that hold, and AI that
              actually works.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={item}
              className="flex flex-wrap justify-center md:justify-start gap-4 mb-8"
            >
              <a href="#projects" className="btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn-secondary">
                Get In Touch
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={item}
              className="grid grid-cols-4 gap-2 md:gap-3 mb-8"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass rounded-xl px-2 py-3 md:px-4 md:py-4 text-center"
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Icon size={14} className="text-emerald-500" />
                      <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={item}
              className="flex justify-center md:justify-start gap-4"
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

          {/* Right side - Code terminal mockup */}
          <motion.div
            className="hidden md:flex flex-1 justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="code-terminal w-full max-w-md">
              {/* Terminal bar */}
              <div className="code-terminal-bar">
                <div
                  className="code-terminal-dot"
                  style={{ background: '#ef4444' }}
                />
                <div
                  className="code-terminal-dot"
                  style={{ background: '#eab308' }}
                />
                <div
                  className="code-terminal-dot"
                  style={{ background: '#22c55e' }}
                />
                <span className="ml-3 text-xs text-gray-400 font-mono">
                  salman.ts
                </span>
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                <div>
                  <span className="text-violet-400">const</span>{' '}
                  <span className="text-sky-400">salman</span>{' '}
                  <span className="text-gray-400">=</span>{' '}
                  <span className="text-gray-400">{'{'}</span>
                </div>
                <div className="pl-6">
                  <span className="text-sky-400">role</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-emerald-400">
                    &quot;Senior Full Stack &amp; GenAI Engineer&quot;
                  </span>
                  <span className="text-gray-400">,</span>
                </div>
                <div className="pl-6">
                  <span className="text-sky-400">experience</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-emerald-400">
                    &quot;7+ years&quot;
                  </span>
                  <span className="text-gray-400">,</span>
                </div>
                <div className="pl-6">
                  <span className="text-sky-400">projects</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-emerald-400">
                    &quot;50+&quot;
                  </span>
                  <span className="text-gray-400">,</span>
                </div>
                <div className="pl-6">
                  <span className="text-sky-400">countries</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-amber-400">5</span>
                  <span className="text-gray-400">,</span>
                </div>
                <div className="pl-6">
                  <span className="text-sky-400">faster_apis</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-emerald-400">
                    &quot;30-40%&quot;
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">{'}'}</span>
                  <span className="text-gray-400">;</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <a
          href="#about"
          className="text-gray-400 dark:text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} className="animate-scroll-down" />
        </a>
      </motion.div>
    </section>
  );
}
