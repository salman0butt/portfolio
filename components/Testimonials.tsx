'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Linkedin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Vladimír Talaš',
    initials: 'VT',
    role: 'Connector Team Lead @ Appmixer',
    relationship: 'Direct Manager at client IO s.r.o.',
    date: 'February 2023',
    quote:
      'I worked with Salman for almost a year on the JavaScript project (app.mindmanager.com). Working with Salman was seamless and highly productive. He quickly became part of the team and was able to dive into the codebase with ease. He is pro-active and always completes tasks on time and with high quality.',
    linkedin: 'https://www.linkedin.com/in/salman0butt/',
  },
  {
    name: 'Thomas Bjørn',
    initials: 'TB',
    role: 'CEO & Founder @ Digital MedieXpert (DMX)',
    relationship: 'Director at DMX, Norway',
    date: 'May 2021',
    quote:
      'Salman was one of the most reliable engineers we had in 3+ years of working together. He single-handedly delivered 50+ WordPress and WooCommerce websites for our European clients — e-commerce stores, real estate portals, classified platforms — all production-ready with payment gateways, SEO, and responsive design. Beyond WordPress, he built 5+ complex Laravel applications and a cross-platform React Native mobile app. He earned Employee of the Year 2020 because he consistently delivered on time, mentored junior developers, and handled everything from architecture to deployment.',
    linkedin: 'https://www.linkedin.com/in/salman0butt/',
  },
  {
    name: 'Anas Nisar',
    initials: 'AN',
    role: 'Lead Software Engineer | Applied AI | Web3',
    relationship: 'Senior colleague at Permission.io',
    date: 'October 2025',
    quote:
      'Salman is dedicated engineer. He always finds a way to fulfill his duties through hard work and asking the right questions. He would be a valuable asset to any team looking for a solid Web Developer.',
    linkedin: 'https://www.linkedin.com/in/salman0butt/',
  },
  {
    name: 'Elijah Haastrup',
    initials: 'EH',
    role: 'Senior Software Engineer | Distributed Systems | FinTech & Cloud',
    relationship: 'Teammate at client IO s.r.o.',
    date: 'February 2023',
    quote:
      'He has deep understanding of JavaScript concepts. Learns really fast and always open to collaboration. He is very friendly and always approachable. Working with Salman on the MindManager project was a great experience — he picked up the complex Joint.js and Backbone.js codebase quickly, contributed meaningful features, and was always willing to help debug tricky rendering issues across the team.',
    linkedin: 'https://www.linkedin.com/in/salman0butt/',
  },
  {
    name: 'Ahmed Al-Farsi',
    initials: 'AF',
    role: 'Product Manager @ Switcher Solutions',
    relationship: 'Product Manager at Switcher Solutions, Bahrain',
    date: 'May 2022',
    quote:
      'Salman architected our entire multi-tenant SaaS ERP from the ground up using Laravel and Vue.js. He built a production-ready POS system with complex inventory management, payment integrations, and real-time features using Socket.IO. His deep understanding of PHP, Laravel, and database architecture was instrumental in scaling the platform across multiple business clients.',
    linkedin: 'https://www.linkedin.com/in/salman0butt/',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const current = testimonials[active];

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            What People Say
          </h2>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recommendations from colleagues and managers on LinkedIn
          </p>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8 md:p-12 mb-8 relative overflow-hidden"
        >
          {/* Large decorative quote */}
          <Quote
            className="absolute top-6 right-6 text-emerald-500/10"
            size={80}
            strokeWidth={1}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quote */}
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-8 max-w-4xl relative z-10">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg shadow-emerald-500/20">
                  {current.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {current.name}
                  </h4>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    {current.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                    {current.relationship} &middot; {current.date}
                  </p>
                </div>
                <a
                  href={current.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                  aria-label={`${current.name} LinkedIn`}
                >
                  <Linkedin size={22} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2 ml-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? 'bg-emerald-500 w-6'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
              {active + 1} / {testimonials.length}
            </span>
          </div>
        </motion.div>

        {/* Mini cards row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8"
        >
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={`glass rounded-xl p-4 text-center transition-all duration-300 cursor-pointer ${
                i === active
                  ? 'border-emerald-500 shadow-lg shadow-emerald-500/10'
                  : 'hover:border-gray-300 dark:hover:border-white/20'
              }`}
            >
              <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xs shrink-0 ${
                i === active
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                {t.initials}
              </div>
              <p className={`text-xs font-semibold truncate ${
                i === active
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {t.name}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                {t.relationship.split(' at ')[1] || t.relationship}
              </p>
            </button>
          ))}
        </motion.div>

        {/* LinkedIn Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="https://www.linkedin.com/in/salman0butt/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            View all recommendations on LinkedIn
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
