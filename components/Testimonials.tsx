'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

const testimonials = [
  {
    name: 'Vladimír Talaš',
    initials: 'VT',
    role: 'Connector Team Lead @ Appmixer',
    relationship: 'Direct manager at client IO s.r.o.',
    date: 'February 2023',
    quote: 'I worked with Salman for almost a year on the JavaScript project (app.mindmanager.com). Working with Salman was seamless and highly productive. He quickly became part of the team and was able to dive into the codebase with ease. He is pro-active and always completes tasks on time and with high quality.',
  },
  {
    name: 'Thomas Bjørn',
    initials: 'TB',
    role: 'CEO & Founder @ Digital MedieXpert',
    relationship: 'Director at DMX, Norway',
    date: 'May 2021',
    quote: 'Salman was one of the most reliable engineers we had in 3+ years of working together. He single-handedly delivered 50+ WordPress and WooCommerce websites for our European clients and also built complex Laravel applications and a cross-platform React Native mobile app. He earned Employee of the Year 2020 because he consistently delivered on time, mentored junior developers, and handled everything from architecture to deployment.',
  },
  {
    name: 'Elijah Haastrup',
    initials: 'EH',
    role: 'Senior Software Engineer',
    relationship: 'Teammate at client IO s.r.o.',
    date: 'February 2023',
    quote: 'He has deep understanding of JavaScript concepts. Learns really fast and always open to collaboration. He is very friendly and always approachable. Working with Salman on the MindManager project was a great experience.',
  },
  {
    name: 'Anas Nisar',
    initials: 'AN',
    role: 'Lead Software Engineer · Applied AI · Web3',
    relationship: 'Senior colleague at Permission.io',
    date: 'October 2025',
    quote: 'Salman is dedicated engineer. He always finds a way to fulfill his duties through hard work and asking the right questions. He would be a valuable asset to any team looking for a solid Web Developer.',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = testimonials[active];

  const prev = () => setActive((index) => (index === 0 ? testimonials.length - 1 : index - 1));
  const next = () => setActive((index) => (index === testimonials.length - 1 ? 0 : index + 1));

  return (
    <section id="testimonials" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-label">PEOPLE I WORKED WITH</p>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl dark:text-white">Recommendations from managers and teammates.</h2>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">Selected recommendations from professional relationships. I intentionally avoid linking each card to an unrelated profile URL; verification should be accurate, not decorative.</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.035] sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"><ShieldCheck size={15} aria-hidden="true" /> Professional recommendation</div>
            <Quote size={34} className="text-emerald-500/25" aria-hidden="true" />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
              className="mt-7"
            >
              <blockquote className="max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300 sm:text-xl">
                “{current.quote}”
              </blockquote>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-gray-200 pt-6 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">{current.initials}</div>
                  <div>
                    <p className="font-bold text-gray-950 dark:text-white">{current.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{current.role}</p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">{current.relationship} · {current.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={prev} aria-label="Previous recommendation" className="rounded-xl border border-gray-200 p-2.5 text-gray-600 transition-colors hover:border-emerald-300 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-white/10 dark:text-gray-300"><ChevronLeft size={18} aria-hidden="true" /></button>
                  <span className="min-w-12 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">{active + 1}/{testimonials.length}</span>
                  <button type="button" onClick={next} aria-label="Next recommendation" className="rounded-xl border border-gray-200 p-2.5 text-gray-600 transition-colors hover:border-emerald-300 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-white/10 dark:text-gray-300"><ChevronRight size={18} aria-hidden="true" /></button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
