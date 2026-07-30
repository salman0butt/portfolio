'use client';

import { motion } from 'framer-motion';
import { Quote, ExternalLink } from 'lucide-react';
import { Linkedin } from './icons';

const testimonials = [
  {
    name: 'Vladimír Talaš',
    initials: 'VT',
    role: 'Connector Team Lead @ Appmixer',
    relationship: 'Direct manager at client IO s.r.o.',
    quote:
      'I worked with Salman for almost a year on the JavaScript project (app.mindmanager.com). Working with Salman was seamless and highly productive. He quickly became part of the team and was able to dive into the codebase with ease. He is pro-active and always completes tasks on time and with high quality.',
  },
  {
    name: 'Anas Nisar',
    initials: 'AN',
    role: 'Lead Software Engineer · Applied AI · Web3',
    relationship: 'Senior colleague at Permission.io',
    quote:
      'Salman is dedicated engineer. He always finds a way to fulfill his duties through hard work and asking the right questions. He would be a valuable asset to any team looking for a solid Web Developer.',
  },
  {
    name: 'Elijah Haastrup',
    initials: 'EH',
    role: 'Senior Software Engineer · Distributed Systems',
    relationship: 'Teammate at client IO s.r.o.',
    quote:
      'He has deep understanding of JavaScript concepts. Learns really fast and always open to collaboration. He is very friendly and always approachable.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="section-label">SOCIAL PROOF</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            What teammates and managers say
          </h2>
          <div className="section-divider" />
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Selected recommendations from people I&apos;ve worked with directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              className="glass rounded-2xl p-6 flex flex-col"
            >
              <Quote size={28} className="text-emerald-500/50 mb-5" />
              <blockquote className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-6 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="pt-5 border-t border-gray-200 dark:border-white/10 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {testimonial.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                    {testimonial.relationship}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://www.linkedin.com/in/salman0butt/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors"
          >
            <Linkedin size={18} />
            View profile and recommendations on LinkedIn
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
