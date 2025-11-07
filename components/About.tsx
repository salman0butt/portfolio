'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Cloud, Sparkles } from 'lucide-react';

const skills = [
  {
    category: 'Frontend Development',
    icon: Code2,
    technologies: ['React.js', 'Next.js', 'Vue.js', 'VueX', 'TypeScript', 'JavaScript (ES6+)', 'Redux', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3', 'jQuery', 'Ajax', 'Framer Motion']
  },
  {
    category: 'Backend Development',
    icon: Database,
    technologies: ['Node.js', 'Express.js', 'Nest.js', 'Laravel', 'PHP', 'Python', 'WordPress', 'FastAPI', 'RESTful APIs', 'GraphQL', 'Microservices']
  },
  {
    category: 'Databases & Storage',
    icon: Database,
    technologies: ['MySQL', 'MongoDB', 'PostgreSQL', 'InfluxDB', 'Firebase', 'Redis', 'Mongoose', 'Time-Series Data', 'Database Architecture']
  },
  {
    category: 'Web3 & Blockchain',
    icon: Cloud,
    technologies: ['Web3.js', 'Moralis', 'Wallet Integration', 'Smart Contracts', 'Token Economics', 'KYC Integration (Shufti Pro)', 'Blockchain APIs']
  },
  {
    category: 'AI & Machine Learning',
    icon: Code2,
    technologies: ['Google ADK', 'OpenAI Integration', 'Conversational AI', 'Context Management', 'Python AI Engine', 'Natural Language Processing']
  },
  {
    category: 'IoT & Real-Time Systems',
    icon: Database,
    technologies: ['IoT Device Integration', 'Real-Time Data Pipelines', 'MQTT', 'Device Control Systems', 'Embedded Software', 'Sensor Data Processing']
  },
  {
    category: 'DevOps & Cloud',
    icon: Cloud,
    technologies: ['Docker', 'Kubernetes (kubectl)', 'CI/CD Pipelines', 'Git', 'GitHub Actions', 'AWS', 'Cloud Deployment', 'Containerization']
  },
  {
    category: 'Message Queues & Real-Time',
    icon: Code2,
    technologies: ['RabbitMQ', 'Socket.io', 'WebSockets', 'Event-Driven Architecture', 'Asynchronous Processing', 'Real-Time Communication']
  },
  {
    category: 'Testing & Quality',
    icon: Database,
    technologies: ['Unit Testing', 'Integration Testing', 'TDD', 'Code Review', 'Performance Optimization', 'Security Compliance', 'N+1 Query Resolution']
  },
  {
    category: 'Tools & Frameworks',
    icon: Cloud,
    technologies: ['Backbone.js', 'Joint.js', 'Underscore.js', 'Lodash', 'FFMPEG', 'PostHog', 'Google Analytics (GA4)', 'GTM', 'Brevo', 'CAPTCHA']
  },
  {
    category: 'Architecture & Patterns',
    icon: Code2,
    technologies: ['Microservices', 'Multi-Tenancy', 'SaaS Architecture', 'Design Patterns', 'SOLID Principles', 'Clean Code', 'API Design', 'MVC', 'MVVM']
  },
  {
    category: 'Methodologies',
    icon: Database,
    technologies: ['Agile/Scrum', 'Sprint Planning', 'Daily Stand-ups', 'Code Review', 'Backlog Grooming', 'SDLC', 'Version Control (Git)', 'Documentation']
  }
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">About Me</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-900 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            Senior Full Stack Web Developer with 7+ years of experience designing and building <span className="font-semibold text-gray-900 dark:text-white">scalable</span>, <span className="font-semibold text-gray-900 dark:text-white">maintainable</span>,
            and <span className="font-semibold text-gray-900 dark:text-white">production-ready</span> applications across Web3, IoT, AI, and enterprise systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-green-500">My Philosophy</h3>
              <p className="text-gray-900 dark:text-gray-300 leading-relaxed mb-4">
                I specialize in writing <span className="font-semibold">clean, reusable, and well-documented code</span> following industry best practices,
                coding standards, and design patterns. My approach focuses on building <span className="font-semibold">scalable, maintainable, and production-ready</span> solutions that enhance user
                experience, reduce technical debt, and ensure long-term reliability.
              </p>
              <p className="text-gray-900 dark:text-gray-300 leading-relaxed">
                Expert in full-stack development with <span className="font-semibold">MERN/MEVN stacks</span>, proficient in PHP, Laravel, WordPress, JavaScript (ES6+), Node.js, Express, Nest.js, React.js, Vue.js,
                TypeScript, MySQL, MongoDB, PostgreSQL, and more. Strong expertise in <span className="font-semibold">API development, microservices architecture, database optimization,
                performance tuning, and security compliance</span>.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-green-500">What I Do</h3>
              <ul className="space-y-3 text-gray-900 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 font-bold">▹</span>
                  <span>Build <span className="font-semibold">production-ready</span> Web3, AI-driven, and IoT applications with modern frameworks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 font-bold">▹</span>
                  <span>Design <span className="font-semibold">scalable microservices</span> and RESTful APIs with Express.js, Nest.js, and Laravel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 font-bold">▹</span>
                  <span>Implement <span className="font-semibold">CI/CD pipelines</span>, containerization (Docker/Kubernetes), and modern DevOps workflows</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 font-bold">▹</span>
                  <span>Optimize database performance, resolve N+1 queries, and ensure <span className="font-semibold">security compliance</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 font-bold">▹</span>
                  <span>Deliver <span className="font-semibold">maintainable codebases</span> following SOLID principles and design patterns</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + skillIndex * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass p-5 rounded-xl hover:shadow-lg hover:shadow-green-500/10 transition-smooth group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-smooth"
                  >
                    <skill.icon size={20} className="text-green-600 group-hover:text-white" />
                  </motion.div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + skillIndex * 0.05 + techIndex * 0.02 }}
                      whileHover={{ scale: 1.15, y: -2 }}
                      className="px-2 py-0.5 bg-green-500/10 text-green-800 dark:text-green-400 rounded-md text-xs font-medium hover:bg-green-500 hover:text-white transition-smooth cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Years Experience', value: '7+' },
            { label: 'Projects Delivered', value: '100+' },
            { label: 'Technologies Mastered', value: '40+' },
            { label: 'Global Companies', value: '10+' }
          ].map((stat, statIndex) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + statIndex * 0.1 }}
              whileHover={{ scale: 1.08, y: -5 }}
              className="glass p-6 rounded-2xl text-center transition-smooth"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + statIndex * 0.1, type: "spring", stiffness: 200 }}
                className="text-4xl font-bold gradient-text mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-800 dark:text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
