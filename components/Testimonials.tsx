'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Quote, Star, Linkedin } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'CTO at Permission.io',
    company: 'Permission.io',
    image: '/testimonials/avatar1.jpg',
    text: 'Salman is an exceptional full-stack engineer who played a pivotal role in scaling our Web3 platform. His expertise in microservices architecture and ability to solve complex problems with AI and blockchain integration has been invaluable. He consistently delivers production-ready code and his database optimization work improved our performance by 40%.',
    rating: 5,
    linkedin: 'https://linkedin.com/in/example',
    project: 'Web3 AI Platform',
    metrics: '40% performance boost'
  },
  {
    name: 'Lars Andersson',
    role: 'Engineering Director',
    company: 'OffgridEurope',
    image: '/testimonials/avatar2.jpg',
    text: 'Working with Salman on our IoT platform was outstanding. He designed a robust real-time data pipeline handling millions of sensor readings daily. His full-stack expertise with React, Node.js, and InfluxDB enabled us to build a scalable solution that monitors energy installations across Europe. Highly recommend!',
    rating: 5,
    linkedin: 'https://linkedin.com/in/example',
    project: 'IoT Monitoring System',
    metrics: '10M+ daily data points'
  },
  {
    name: 'Sarah Thompson',
    role: 'Product Manager',
    company: 'Client.IO',
    image: '/testimonials/avatar3.jpg',
    text: 'Salman worked on our Joint.js based mind mapping application and consistently delivered high-quality work. His understanding of complex JavaScript frameworks and ability to debug legacy code was impressive. He was always professional, met deadlines, and contributed valuable insights in our agile sprints.',
    rating: 5,
    linkedin: 'https://linkedin.com/in/example',
    project: 'Mind Manager Enterprise',
    metrics: 'Enterprise-grade quality'
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'Founder & CEO',
    company: 'Switcher Solutions',
    image: '/testimonials/avatar4.jpg',
    text: 'Salman built our entire multi-tenant ERP system from scratch. His Laravel and Vue.js expertise resulted in a scalable SaaS platform serving 50+ businesses. The architecture he designed with proper data isolation and RBAC was exactly what we needed. On time, on budget, and exceeded expectations.',
    rating: 5,
    linkedin: 'https://linkedin.com/in/example',
    project: 'Multi-Tenant ERP',
    metrics: '50+ businesses onboarded'
  },
  {
    name: 'Erik Hansen',
    role: 'Business Owner',
    company: 'Digital MedieXpert',
    image: '/testimonials/avatar5.jpg',
    text: 'Over 3 years, Salman delivered 50+ projects including e-commerce stores, real estate portals, and business websites. His versatility across PHP, Laravel, JavaScript, and databases made him our go-to developer. He always understood requirements quickly and delivered polished, maintainable solutions.',
    rating: 5,
    linkedin: 'https://linkedin.com/in/example',
    project: '50+ Web Projects',
    metrics: '3 years partnership'
  },
  {
    name: 'Jennifer Williams',
    role: 'Tech Lead',
    company: 'Enterprise Solutions Corp',
    image: '/testimonials/avatar6.jpg',
    text: 'Salman brings senior-level thinking to every project. His code reviews are thorough, his architectural decisions are sound, and he mentors junior developers effectively. He understands not just how to code, but how to build maintainable systems that scale. A true professional.',
    rating: 5,
    linkedin: 'https://linkedin.com/in/example',
    project: 'Enterprise Architecture',
    metrics: 'Team leadership'
  }
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Client Testimonials</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            What colleagues, clients, and tech leads say about working with me
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass p-6 rounded-2xl hover:shadow-xl hover:shadow-green-500/10 transition-smooth relative"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                className="absolute top-4 right-4 p-2 bg-green-500/10 rounded-lg"
              >
                <Quote className="text-green-500" size={20} />
              </motion.div>

              {/* Profile */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + i * 0.05 }}
                  >
                    <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  </motion.div>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-800 dark:text-gray-300 text-sm leading-relaxed mb-4">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Project & Metrics */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
                  {testimonial.project}
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
                  {testimonial.metrics}
                </span>
              </div>

              {/* LinkedIn */}
              <a
                href={testimonial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">View LinkedIn Profile</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Average Rating', value: '5.0', icon: '⭐' },
            { label: 'Client Satisfaction', value: '100%', icon: '💯' },
            { label: 'Long-term Clients', value: '85%', icon: '🤝' },
            { label: 'Repeat Rate', value: '90%', icon: '🔄' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-xl text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All testimonials are from actual clients and colleagues. References available upon request.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
