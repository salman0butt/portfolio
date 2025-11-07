'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

const projects = [
  {
    title: 'Permission AI Platform',
    description: 'AI-driven conversational platform with chat agents, greeting flows, and context retention. Built with React, TypeScript, Node.js, Python, and Google ADK for real-time user interactions.',
    image: '/project1.jpg',
    tags: ['React', 'TypeScript', 'Node.js', 'Python', 'Google ADK', 'Tailwind'],
    liveUrl: 'https://permission.io',
    githubUrl: 'https://github.com/yourusername',
    highlights: ['Real-time AI responses', 'Context management', 'Thousands of users']
  },
  {
    title: 'Permission Browser Extension',
    description: 'Chrome extension with AI widgets, transactional operations, and Web3 wallet integration. Features background scripts, content scripts, and secure API communication.',
    image: '/project2.jpg',
    tags: ['JavaScript', 'Chrome APIs', 'Web3', 'Moralis', 'Firebase'],
    liveUrl: 'https://permission.io/extension',
    githubUrl: 'https://github.com/yourusername',
    highlights: ['Web3 integration', 'Secure transactions', 'Privacy-focused']
  },
  {
    title: 'Permission ASK & Search',
    description: 'Unified platform with search engine, referral mechanics, earnings module, and Web3 wallet integration. Built with TypeScript, NestJS, Firebase, and ShuftiPro KYC.',
    image: '/project3.jpg',
    tags: ['TypeScript', 'NestJS', 'Next.js', 'Web3', 'Firebase', 'ShuftiPro'],
    liveUrl: 'https://permission.io/ask',
    githubUrl: 'https://github.com/yourusername',
    highlights: ['Token rewards', 'KYC compliance', 'Real-time analytics']
  },
  {
    title: 'OffgridEurope IoT Platform',
    description: 'End-to-end IoT solution for renewable energy monitoring. Real-time data pipelines with InfluxDB, interactive dashboards with React/Vue, and device control systems.',
    image: '/project4.jpg',
    tags: ['React', 'Vue.js', 'Node.js', 'InfluxDB', 'MongoDB', 'RabbitMQ'],
    liveUrl: 'https://offgrideurope.com',
    githubUrl: 'https://github.com/yourusername',
    highlights: ['Real-time monitoring', 'Time-series data', 'Device automation']
  },
  {
    title: 'Mind Manager (Corel)',
    description: 'Enterprise mind mapping application built with Pure JavaScript, Joint.js, Backbone.js, Node.js, and MySQL. Dockerized for scalable deployment.',
    image: '/project5.jpg',
    tags: ['JavaScript', 'Joint.js', 'Backbone.js', 'Node.js', 'MySQL', 'Docker'],
    liveUrl: 'https://mindmanager.com',
    githubUrl: 'https://github.com/yourusername',
    highlights: ['Enterprise features', 'Visual mapping', 'Collaborative editing']
  },
  {
    title: 'NorgsHandle Portal',
    description: 'Real estate & jobs classified portal with advanced search, filters, maps, postal API, chat, notifications, and comprehensive admin panel built with Laravel.',
    image: '/project6.jpg',
    tags: ['Laravel', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap', 'Maps API'],
    liveUrl: 'https://norgshandle.no',
    githubUrl: 'https://github.com/yourusername',
    highlights: ['Advanced search', 'Real-time chat', 'Map integration']
  }
];

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Featured Projects</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            A showcase of my best work — from scalable web applications to innovative AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-green-500/20 transition-smooth"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600 overflow-hidden">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title.charAt(0)}
                </motion.div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-smooth"></div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-smooth"
                >
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-green-500 transition-smooth"
                  >
                    <ExternalLink size={20} className="text-white" />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-green-500 transition-smooth"
                  >
                    <Github size={20} className="text-white" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-green-500 transition-smooth">
                  {project.title}
                </h3>
                <p className="text-gray-800 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + tagIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-medium cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-1">
                  {project.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-400">
                      <span className="text-green-500">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full hover:bg-green-500 hover:text-white transition-smooth border border-green-500/30 hover:border-green-500"
          >
            <Github size={20} />
            <span className="font-semibold">View More on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
