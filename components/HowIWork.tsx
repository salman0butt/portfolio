'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Code2, GitBranch, TestTube, Rocket, Users, MessageSquare, Target, Layers } from 'lucide-react';

const methodology = [
  {
    phase: '01',
    title: 'Discovery & Planning',
    description: 'Understanding requirements, defining scope, and architecting the solution',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    activities: [
      'Requirements gathering and analysis',
      'Technical feasibility assessment',
      'Architecture design and documentation',
      'Technology stack selection',
      'Project timeline and milestone planning'
    ]
  },
  {
    phase: '02',
    title: 'Development & Implementation',
    description: 'Building scalable, maintainable solutions with clean code practices',
    icon: Code2,
    color: 'from-green-500 to-emerald-500',
    activities: [
      'Modular component development',
      'Following SOLID principles and design patterns',
      'Writing self-documenting, clean code',
      'Regular code commits with meaningful messages',
      'Continuous integration and automated builds'
    ]
  },
  {
    phase: '03',
    title: 'Testing & Quality Assurance',
    description: 'Ensuring reliability, performance, and security through rigorous testing',
    icon: TestTube,
    color: 'from-purple-500 to-pink-500',
    activities: [
      'Unit testing for critical business logic',
      'Integration testing for API endpoints',
      'Performance optimization and profiling',
      'Security vulnerability scanning',
      'Code review and peer feedback'
    ]
  },
  {
    phase: '04',
    title: 'Deployment & Monitoring',
    description: 'Smooth launches with continuous monitoring and rapid iteration',
    icon: Rocket,
    color: 'from-orange-500 to-red-500',
    activities: [
      'CI/CD pipeline setup and automation',
      'Containerization with Docker/Kubernetes',
      'Production deployment with zero downtime',
      'Performance monitoring and logging',
      'Post-launch support and optimization'
    ]
  }
];

const principles = [
  {
    title: 'Clean Code First',
    description: 'Writing maintainable, self-documenting code that follows industry best practices',
    icon: Code2,
    color: 'text-green-500'
  },
  {
    title: 'Scalability by Design',
    description: 'Architecting systems that grow with your business needs',
    icon: Layers,
    color: 'text-blue-500'
  },
  {
    title: 'Agile & Collaborative',
    description: 'Working in sprints with regular communication and feedback loops',
    icon: Users,
    color: 'text-purple-500'
  },
  {
    title: 'Version Control',
    description: 'Comprehensive Git workflow with meaningful commits and pull requests',
    icon: GitBranch,
    color: 'text-orange-500'
  },
  {
    title: 'Clear Communication',
    description: 'Regular updates, transparent progress tracking, and proactive problem-solving',
    icon: MessageSquare,
    color: 'text-cyan-500'
  },
  {
    title: 'Production Ready',
    description: 'Delivering tested, documented, and deployment-ready solutions',
    icon: Rocket,
    color: 'text-pink-500'
  }
];

const tools = [
  { name: 'Git & GitHub', category: 'Version Control', icon: '🔀' },
  { name: 'Docker & K8s', category: 'DevOps', icon: '🐳' },
  { name: 'Jira & Linear', category: 'Project Management', icon: '📋' },
  { name: 'Postman & Insomnia', category: 'API Testing', icon: '🔌' },
  { name: 'VS Code & WebStorm', category: 'IDE', icon: '💻' },
  { name: 'Figma', category: 'Design', icon: '🎨' },
  { name: 'Slack & Discord', category: 'Communication', icon: '💬' },
  { name: 'CI/CD Pipelines', category: 'Automation', icon: '⚙️' }
];

export default function HowIWork() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="how-i-work" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden bg-gradient-to-b from-transparent via-green-50/30 to-transparent dark:via-green-900/5">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">How I Work</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            My proven process for delivering high-quality software solutions from concept to production
          </p>
        </motion.div>

        {/* Development Process */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            Development Process
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methodology.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass p-6 rounded-2xl hover:shadow-xl hover:shadow-green-500/10 transition-smooth relative overflow-hidden group"
              >
                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${phase.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`}></div>

                <div className="relative z-10">
                  {/* Phase number and icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-6xl font-bold bg-gradient-to-br ${phase.color} bg-clip-text text-transparent`}>
                      {phase.phase}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 bg-gradient-to-br ${phase.color} rounded-xl`}
                    >
                      <phase.icon className="text-white" size={28} />
                    </motion.div>
                  </div>

                  {/* Title and description */}
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors">
                    {phase.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {phase.description}
                  </p>

                  {/* Activities */}
                  <div className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <motion.div
                        key={activity}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 + idx * 0.05 }}
                        className="flex items-start gap-2 text-sm text-gray-800 dark:text-gray-400"
                      >
                        <span className="text-green-500 mt-0.5">▹</span>
                        <span>{activity}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            Core Principles
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-xl hover:shadow-lg hover:shadow-green-500/10 transition-smooth"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <principle.icon className={`${principle.color}`} size={32} />
                </motion.div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {principle.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            Tools & Workflow
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl hover:shadow-lg transition-smooth"
                >
                  <span className="text-3xl mb-2">{tool.icon}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {tool.name}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {tool.category}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
            Ready to bring your project to life with a proven workflow?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-smooth hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
          >
            <span>Start Your Project</span>
            <Rocket size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
