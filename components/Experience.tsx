'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Award, Sparkles, TrendingUp } from 'lucide-react';

const experiences = [
  {
    title: 'Software Engineer (Web3 & AI)',
    company: 'Permission.io (USA - Remote)',
    period: '10/2023 - Present',
    description: 'Core engineering team member building scalable Web3 applications and AI-driven integrations for advertising platforms.',
    achievements: [
      'Engineered 5+ products (Permission AI, Extension, Connect, ASK, Admin Portal) supporting thousands of users',
      'Resolved N+1 query issues, reducing database load and improving response time by 30-40%',
      'Built microservices with React, Next.js, Node.js, Nest.js, RabbitMQ, and Kubernetes',
      'Integrated KYC verification (Shufti Pro), PostHog, GA4, GTM for compliance and analytics'
    ]
  },
  {
    title: 'Senior Full Stack Developer (IoT)',
    company: 'OffgridEurope (Germany - Remote)',
    period: '10/2023 - Present',
    description: 'Developing IoT software solutions for renewable energy systems with real-time monitoring and device control.',
    achievements: [
      'Designed end-to-end IoT solutions for embedded devices in off-grid energy installations',
      'Built scalable data pipelines with InfluxDB, MongoDB, PostgreSQL for real-time analytics',
      'Developed interactive dashboards using React.js and Vue.js with custom visualizations',
      'Implemented device control systems with Node.js, Express.js, Laravel, and RabbitMQ'
    ]
  },
  {
    title: 'Full Stack JavaScript Engineer',
    company: 'Client.IO (Czech Republic)',
    period: '05/2022 - 05/2023',
    description: 'Agile team member working on Joint.js, App Mixer, and Mind Manager (Corel Corporation) products.',
    achievements: [
      'Developed features for enterprise mind mapping application using Pure JavaScript and Joint.js',
      'Fixed critical bugs and refactored legacy code for improved maintainability',
      'Collaborated in daily stand-ups, sprint planning, and code reviews'
    ]
  },
  {
    title: 'Full Stack Web Developer',
    company: 'Switcher Solutions ERP (Bahrain)',
    period: '05/2021 - 05/2022',
    description: 'Built multi-tenant SaaS ERP system with Laravel API backend and Vue.js SPA frontend.',
    achievements: [
      'Developed Point of Sale ERP solution with multi-tenancy architecture',
      'Implemented RESTful APIs handling complex business logic and reporting',
      'Created responsive Vue.js components for inventory, sales, and customer management'
    ]
  },
  {
    title: 'Full Stack Web Developer',
    company: 'Digital MedieXpert (Norway)',
    period: '03/2018 - 05/2021',
    description: 'Completed 50+ projects including e-commerce, real estate portals, and business web solutions.',
    achievements: [
      'Built NorgsHandle (Real Estate & Jobs Portal) with advanced search, filters, and maps',
      'Developed multiple e-commerce stores with cart, checkout, payments, and admin panels',
      'Created social networking website with posts, messaging, friend systems, and real-time features'
    ]
  }
];

const achievements = [
  {
    title: 'Web3 & AI Integration',
    organization: 'Permission.io',
    year: '2024',
    icon: Award
  },
  {
    title: 'IoT Solutions Expert',
    organization: 'OffgridEurope',
    year: '2024',
    icon: TrendingUp
  },
  {
    title: '100+ Projects Delivered',
    organization: 'Global Clients',
    year: '2018-2024',
    icon: Award
  },
  {
    title: 'Microservices Architecture',
    organization: 'Enterprise Systems',
    year: '2023',
    icon: TrendingUp
  }
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Experience & Achievements</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            My professional journey and notable accomplishments in the tech industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${index}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline line */}
                  {index !== experiences.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                      className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-green-300 origin-top"
                    ></motion.div>
                  )}

                  <div className="flex gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={inView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50"
                      >
                        <Briefcase className="text-white" size={24} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 glass p-6 rounded-2xl hover:shadow-xl hover:shadow-green-500/10 transition-smooth">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-green-500 font-semibold">{exp.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-800 dark:text-gray-300 mb-4">
                        {exp.description}
                      </p>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement) => (
                          <div
                            key={achievement}
                            className="flex items-start gap-2 text-sm text-gray-800 dark:text-gray-400"
                          >
                            <span className="text-green-500 mt-1">▹</span>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Notable Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="glass p-4 rounded-xl hover:shadow-lg hover:shadow-green-500/10 transition-smooth group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500 transition-smooth">
                        <achievement.icon
                          size={20}
                          className="text-green-500 group-hover:text-white transition-smooth"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-800 dark:text-gray-400">
                          {achievement.organization}
                        </p>
                        <span className="inline-block mt-2 text-xs text-green-500 font-semibold">
                          {achievement.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Download Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass p-6 rounded-xl text-center"
            >
              <h4 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                Want to know more?
              </h4>
              <a
                href="/resume.pdf"
                download
                className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-smooth hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
              >
                Download Resume
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
