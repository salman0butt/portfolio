'use client';

import { motion } from 'framer-motion';
import { Quote, Linkedin, ExternalLink } from 'lucide-react';

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
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            What People Say
          </h2>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recommendations from colleagues and managers on LinkedIn
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass p-6 md:p-8 rounded-2xl relative flex flex-col justify-between"
            >
              {/* Quote Icon */}
              <div>
                <Quote
                  className="text-emerald-500/20 mb-4"
                  size={48}
                  strokeWidth={1.5}
                />

                {/* Quote Text */}
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Bottom: Avatar + Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {testimonial.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {testimonial.relationship} &middot; {testimonial.date}
                  </p>
                </div>

                {/* LinkedIn Icon */}
                <a
                  href={testimonial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex-shrink-0"
                  aria-label={`${testimonial.name} LinkedIn`}
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

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
