'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Sparkles, Send, Calendar } from 'lucide-react';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'salman.dev@example.com',
      link: 'mailto:salman.dev@example.com',
      description: 'Best way to reach me'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (234) 567-8900',
      link: 'tel:+12345678900',
      description: 'Available Mon-Fri, 9AM-6PM'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Remote / Global',
      link: null,
      description: 'Open to remote opportunities'
    },
    {
      icon: Calendar,
      label: 'Availability',
      value: 'Open for opportunities',
      link: null,
      description: 'Ready to start immediately'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/yourusername',
      color: 'hover:bg-gray-800 dark:hover:bg-gray-700'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:bg-blue-600'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      url: 'https://twitter.com/yourusername',
      color: 'hover:bg-sky-500'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Let&apos;s Work Together</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            I&apos;m available for <span className="font-semibold text-gray-900 dark:text-white">freelance projects</span>, <span className="font-semibold text-gray-900 dark:text-white">full-time opportunities</span>, and <span className="font-semibold text-gray-900 dark:text-white">consulting work</span>. Let&apos;s create something amazing!
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              {method.link ? (
                <a
                  href={method.link}
                  className="glass p-5 md:p-6 rounded-2xl flex items-start gap-3 md:gap-4 hover:shadow-xl hover:shadow-green-500/10 transition-smooth block"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-2.5 md:p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500 transition-smooth flex-shrink-0"
                  >
                    <method.icon className="text-green-600 group-hover:text-white transition-smooth" size={20} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-800 dark:text-gray-400 mb-1">{method.label}</p>
                    <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 break-all">{method.value}</p>
                    <p className="text-xs md:text-sm text-gray-700 dark:text-gray-500">{method.description}</p>
                  </div>
                  <Send className="text-green-500 opacity-0 group-hover:opacity-100 transition-smooth flex-shrink-0 hidden sm:block" size={18} />
                </a>
              ) : (
                <div className="glass p-5 md:p-6 rounded-2xl flex items-start gap-3 md:gap-4 hover:shadow-lg transition-smooth">
                  <div className="p-2.5 md:p-3 bg-green-500/10 rounded-xl flex-shrink-0">
                    <method.icon className="text-green-600" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm text-gray-800 dark:text-gray-400 mb-1">{method.label}</p>
                    <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1">{method.value}</p>
                    <p className="text-xs md:text-sm text-gray-700 dark:text-gray-500">{method.description}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass p-6 md:p-8 rounded-2xl max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Connect With Me
            </h3>
            <p className="text-gray-800 dark:text-gray-400">
              Follow me on social media or reach out directly
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 glass rounded-xl hover:text-white transition-smooth ${social.color}`}
                aria-label={social.label}
              >
                <social.icon size={28} />
              </motion.a>
            ))}
          </div>

          {/* Quick Contact CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:salman.dev@example.com"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              <span>Send Email</span>
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
