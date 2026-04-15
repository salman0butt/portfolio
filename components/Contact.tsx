'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Download,
  ExternalLink,
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
  {
    icon: Clock,
    label: 'Available for full-time remote positions',
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
  {
    icon: Mail,
    label: 'Send me an email',
    href: 'mailto:salman0butt@gmail.com',
  },
];

const languages = [
  'English (Professional)',
  'Urdu (Native)',
  'Punjabi (Native)',
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
          className="text-center mb-16"
        >
          <span className="section-label">GET IN TOUCH</span>
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] gradient-text mb-4">
            Let&apos;s Work Together
          </h2>
          <div className="section-divider mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I&apos;m open to remote opportunities worldwide. Let&apos;s build
            something great.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => {
              const content = (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-emerald-500" size={20} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
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
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="glass p-4 rounded-xl block hover:border-emerald-500/50 transition-colors"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="glass p-4 rounded-xl">{content}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Connect With Me */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white mb-4"
            >
              Connect With Me
            </motion.h3>

            <div className="space-y-3 mb-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass p-4 rounded-xl flex items-center gap-4 w-full hover:border-emerald-500/50 transition-colors group"
                >
                  <link.icon
                    className="text-emerald-500 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                    {link.label}
                  </span>
                  {link.href.startsWith('http') && (
                    <ExternalLink
                      size={16}
                      className="ml-auto text-gray-400 group-hover:text-emerald-500 transition-colors flex-shrink-0"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Download Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <a href="/Salman_Butt_Resume.pdf" download className="btn-primary inline-flex items-center justify-center gap-2 w-full"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] text-gray-900 dark:text-white mb-4">
            Languages
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <span key={lang} className="badge">
                {lang}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
