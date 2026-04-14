'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, TrendingUp, Users, Zap, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

const caseStudies = [
  {
    title: 'Permission.io: Scaling Web3 AI Platform',
    subtitle: 'Microservices Architecture for Crypto-Advertising Ecosystem',
    company: 'Permission.io',
    duration: '2023 - Present',
    role: 'Senior Software Engineer (Web3 & AI)',

    challenge: 'Permission.io needed to scale their Web3 advertising platform to handle thousands of concurrent users while integrating complex AI conversational agents, KYC compliance, and blockchain transactions across multiple products.',

    solution: [
      'Architected microservices infrastructure using Node.js, NestJS, and Kubernetes for horizontal scaling',
      'Implemented RabbitMQ message queues for asynchronous processing of blockchain transactions',
      'Built AI chat platform with Python, Google ADK, and context management for real-time conversations',
      'Integrated ShuftiPro KYC, Moralis Web3 APIs, and Firebase for compliance and authentication',
      'Optimized database queries, eliminated N+1 problems, reducing response times by 30-40%'
    ],

    results: [
      { label: 'User Base Growth', value: '5,000+', description: 'Active users across 5 products' },
      { label: 'Performance Improvement', value: '40%', description: 'Faster API response times' },
      { label: 'Products Shipped', value: '5+', description: 'AI, Extension, Connect, ASK, Admin' },
      { label: 'Uptime Achievement', value: '99.8%', description: 'System reliability maintained' }
    ],

    technologies: ['React', 'Next.js', 'Node.js', 'NestJS', 'Python', 'RabbitMQ', 'Kubernetes', 'Web3', 'Firebase', 'PostgreSQL'],

    impact: 'Enabled Permission.io to scale from MVP to production-grade platform serving thousands of users with complex Web3 and AI features, establishing foundation for future growth.',

    icon: Zap,
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'OffgridEurope: Real-Time IoT Monitoring System',
    subtitle: 'End-to-End IoT Solution for Renewable Energy',
    company: 'OffgridEurope',
    duration: '2023 - Present',
    role: 'Senior Full Stack Developer (IoT)',

    challenge: 'OffgridEurope required an enterprise IoT platform to monitor and control renewable energy installations across Europe, handling millions of data points daily from distributed embedded devices with real-time visualization and alerts.',

    solution: [
      'Designed time-series data pipeline with InfluxDB for efficient storage of sensor metrics',
      'Built real-time dashboards with React.js and Vue.js featuring custom data visualizations',
      'Implemented device control system with Node.js, Express, Laravel, and MQTT protocol',
      'Created data aggregation workers with RabbitMQ for processing high-frequency sensor data',
      'Developed alerting system with configurable thresholds and notification channels'
    ],

    results: [
      { label: 'Data Points Processed', value: '10M+', description: 'Daily sensor readings handled' },
      { label: 'Device Uptime', value: '99.5%', description: 'Monitoring system availability' },
      { label: 'Response Time', value: '<2s', description: 'Real-time dashboard updates' },
      { label: 'Energy Saved', value: '25%', description: 'Through optimization insights' }
    ],

    technologies: ['React', 'Vue.js', 'Node.js', 'Express', 'Laravel', 'InfluxDB', 'MongoDB', 'RabbitMQ', 'MQTT'],

    impact: 'Provided OffgridEurope with comprehensive IoT infrastructure enabling data-driven decisions, predictive maintenance, and 25% improvement in energy efficiency across installations.',

    icon: Database,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    title: 'Switcher ERP: Multi-Tenant SaaS Platform',
    subtitle: 'Scalable Point-of-Sale System for Enterprise',
    company: 'Switcher Solutions',
    duration: '2021 - 2022',
    role: 'Full Stack Developer',

    challenge: 'Build a complete multi-tenant ERP system from scratch to handle inventory, sales, customer management, and reporting for multiple businesses with strict data isolation and performance requirements.',

    solution: [
      'Architected multi-tenant database schema with Laravel ensuring complete data isolation',
      'Built comprehensive RESTful API with 80+ endpoints for all business operations',
      'Developed reactive Vue.js SPA with Vuex state management for complex UI workflows',
      'Implemented role-based access control (RBAC) with granular permissions system',
      'Created automated reporting engine with PDF generation and scheduled email delivery'
    ],

    results: [
      { label: 'Businesses Onboarded', value: '50+', description: 'Companies using the platform' },
      { label: 'Transactions Processed', value: '100K+', description: 'Monthly sales transactions' },
      { label: 'API Performance', value: '<100ms', description: 'Average response time' },
      { label: 'Cost Reduction', value: '60%', description: 'vs traditional ERP systems' }
    ],

    technologies: ['Laravel', 'PHP', 'Vue.js', 'Vuex', 'MySQL', 'Redis', 'RESTful APIs', 'JWT'],

    impact: 'Delivered production-ready ERP platform enabling small businesses to manage operations efficiently at 60% lower cost than traditional solutions, processing 100K+ monthly transactions.',

    icon: Users,
    color: 'from-purple-500 to-pink-600'
  }
];

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="case-studies" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden bg-gradient-to-b from-transparent via-green-50/30 to-transparent dark:via-green-900/5">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Case Studies</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            Deep dives into complex projects showcasing technical architecture, problem-solving, and measurable business impact
          </p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-green-500/10 transition-smooth"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${study.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 mb-3"
                      >
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <study.icon size={24} />
                        </div>
                        <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                          {study.duration}
                        </span>
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{study.title}</h3>
                      <p className="text-white/90 text-lg mb-2">{study.subtitle}</p>
                      <p className="text-white/80 text-sm">
                        <strong>{study.role}</strong> at {study.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Challenge */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 font-bold">!</span>
                    The Challenge
                  </h4>
                  <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 font-bold">→</span>
                    The Solution
                  </h4>
                  <div className="space-y-3">
                    {study.solution.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.4 + idx * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                        <span className="text-gray-800 dark:text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Results Grid */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="text-green-500" size={24} />
                    The Results
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.results.map((result, idx) => (
                      <motion.div
                        key={result.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.6 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl text-center border border-green-200/50 dark:border-green-700/50"
                      >
                        <div className="text-3xl font-bold gradient-text mb-1">{result.value}</div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{result.label}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{result.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.2 + 0.8 + idx * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold border border-green-500/20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-500">
                  <h4 className="text-sm font-bold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                    <Zap size={16} />
                    BUSINESS IMPACT
                  </h4>
                  <p className="text-gray-900 dark:text-gray-200 font-medium leading-relaxed">
                    {study.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Want to see detailed technical documentation or discuss a similar project?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-smooth hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
          >
            <span>Let&apos;s Discuss Your Project</span>
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
