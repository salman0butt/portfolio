'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Award, Trophy, CheckCircle2, Calendar } from 'lucide-react';

const certifications = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    credential: 'AWS-SA-2023-XXXXX',
    icon: '☁️',
    color: 'from-orange-500 to-amber-600',
    skills: ['Cloud Architecture', 'AWS Services', 'Scalability', 'Security']
  },
  {
    title: 'Node.js Application Development',
    issuer: 'OpenJS Foundation',
    date: '2022',
    credential: 'NODE-DEV-2022-XXXXX',
    icon: '🟢',
    color: 'from-green-600 to-emerald-600',
    skills: ['Node.js', 'Express', 'Microservices', 'REST APIs']
  },
  {
    title: 'Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    date: '2023',
    credential: 'CKA-2023-XXXXX',
    icon: '⎈',
    color: 'from-blue-600 to-cyan-600',
    skills: ['Kubernetes', 'Container Orchestration', 'DevOps', 'Cloud Native']
  },
  {
    title: 'React Professional Developer',
    issuer: 'Meta Blueprint',
    date: '2022',
    credential: 'META-REACT-2022-XXXXX',
    icon: '⚛️',
    color: 'from-cyan-500 to-blue-500',
    skills: ['React.js', 'Next.js', 'Hooks', 'Performance']
  }
];

const achievements = [
  {
    title: 'Performance Excellence Award',
    organization: 'Permission.io',
    year: '2024',
    description: 'Achieved 40% performance improvement through database optimization and microservices refactoring',
    icon: Trophy,
    color: 'text-yellow-500'
  },
  {
    title: 'Innovation in IoT Solutions',
    organization: 'OffgridEurope',
    year: '2024',
    description: 'Designed scalable IoT architecture processing 10M+ daily sensor readings with 99.5% uptime',
    icon: Award,
    color: 'text-blue-500'
  },
  {
    title: '100+ Projects Milestone',
    organization: 'Freelance & Contract Work',
    year: '2024',
    description: 'Successfully delivered over 100 projects across Web3, IoT, AI, and enterprise systems',
    icon: Trophy,
    color: 'text-green-500'
  },
  {
    title: 'Code Quality Champion',
    organization: 'Client.IO',
    year: '2023',
    description: 'Maintained highest code review ratings and mentored team on best practices and design patterns',
    icon: Award,
    color: 'text-purple-500'
  }
];

const expertise = [
  { area: 'Full-Stack Development', level: 'Expert', years: '7+', projects: '100+' },
  { area: 'Microservices Architecture', level: 'Advanced', years: '4+', projects: '15+' },
  { area: 'Web3 & Blockchain', level: 'Advanced', years: '2+', projects: '10+' },
  { area: 'IoT Solutions', level: 'Advanced', years: '2+', projects: '8+' },
  { area: 'AI Integration', level: 'Advanced', years: '2+', projects: '5+' },
  { area: 'DevOps & Cloud', level: 'Advanced', years: '4+', projects: '20+' }
];

export default function Certifications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certifications" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Certifications & Recognition</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            Professional certifications, industry recognition, and expertise validation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Certifications */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
            >
              <Award className="text-green-500" size={28} />
              Professional Certifications
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass p-5 rounded-xl hover:shadow-xl hover:shadow-green-500/10 transition-smooth relative overflow-hidden group"
                >
                  {/* Background gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`}></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{cert.icon}</div>
                      <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Calendar size={12} />
                        {cert.date}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-green-500 transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-3 font-mono">
                      ID: {cert.credential}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-green-500/10 text-green-700 dark:text-green-400 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
            >
              <Trophy className="text-green-500" size={28} />
              Professional Achievements
            </motion.h3>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="glass p-5 rounded-xl hover:shadow-lg hover:shadow-green-500/10 transition-smooth group"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 bg-green-500/10 rounded-xl flex-shrink-0"
                    >
                      <achievement.icon className={achievement.color} size={24} />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">
                          {achievement.title}
                        </h4>
                        <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold whitespace-nowrap">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">
                        {achievement.organization}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Expertise Summary */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
            >
              <CheckCircle2 className="text-green-500" size={28} />
              Expertise Areas
            </motion.h3>

            <div className="space-y-4 mb-8">
              {expertise.map((item, index) => (
                <motion.div
                  key={item.area}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass p-4 rounded-xl hover:shadow-lg hover:shadow-green-500/10 transition-smooth"
                >
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {item.area}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-500 text-white rounded text-xs font-semibold">
                      {item.level}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {item.years} years
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      • {item.projects} projects
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: item.level === 'Expert' ? '95%' : '85%' } : {}}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass p-6 rounded-xl"
            >
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
                Career Highlights
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Total Experience</span>
                  <span className="text-lg font-bold gradient-text">7+ Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Projects Delivered</span>
                  <span className="text-lg font-bold gradient-text">100+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Companies Worked</span>
                  <span className="text-lg font-bold gradient-text">10+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Technologies</span>
                  <span className="text-lg font-bold gradient-text">40+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Certification credentials can be verified upon request. Currently pursuing additional AWS and Google Cloud certifications.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
