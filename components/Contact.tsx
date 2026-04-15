'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Download,
  ExternalLink,
  Send,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'salman0butt@gmail.com',
    href: 'mailto:salman0butt@gmail.com',
  },
  {
    icon: Phone,
    label: '+92 315 108 3526',
    href: 'tel:+923151083526',
  },
  {
    icon: MapPin,
    label: 'Pakistan — Open to Remote Worldwide',
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: 'github.com/salman0butt',
    href: 'https://github.com/salman0butt',
  },
  {
    icon: Linkedin,
    label: 'linkedin.com/in/salman0butt',
    href: 'https://www.linkedin.com/in/salman0butt/',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 section-alt">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">GET IN TOUCH</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Let&apos;s Work Together
          </h2>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Looking for a Senior Full Stack or GenAI Engineer? I&apos;m available
            for remote opportunities worldwide. Let&apos;s talk.
          </p>
        </motion.div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
        >
          <a
            href="mailto:salman0butt@gmail.com"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <Send size={18} />
            <span>Hire Me — Send an Email</span>
          </a>
          <a
            href="/Salman_Butt_Resume.pdf"
            download
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <Download size={18} />
            <span>Download Resume</span>
          </a>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Contact Info */}
          <div className="space-y-3">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white mb-3"
            >
              Contact Info
            </motion.h3>
            {contactInfo.map((item, index) => {
              const content = (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="text-emerald-500" size={18} />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
              );

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="glass p-4 rounded-xl block hover:border-emerald-500/50"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="glass p-4 rounded-xl opacity-80">{content}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Connect */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white mb-3"
            >
              Connect With Me
            </motion.h3>

            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="glass p-4 rounded-xl flex items-center gap-4 w-full hover:border-emerald-500/50 group"
                >
                  <link.icon className="text-emerald-500 shrink-0" size={18} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {link.label}
                  </span>
                  <ExternalLink
                    size={14}
                    className="ml-auto text-gray-400 group-hover:text-emerald-500 transition-colors shrink-0"
                  />
                </motion.a>
              ))}
            </div>

            {/* Availability note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/10"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                Available for full-time remote positions
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
