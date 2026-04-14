'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Sparkles, TrendingUp } from 'lucide-react';

const skillsMatrix = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js / Next.js', level: 95, years: '5+' },
      { name: 'TypeScript', level: 92, years: '4+' },
      { name: 'Vue.js / Nuxt.js', level: 88, years: '4+' },
      { name: 'Tailwind / CSS', level: 90, years: '6+' },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js / Express', level: 95, years: '6+' },
      { name: 'NestJS', level: 90, years: '3+' },
      { name: 'Laravel / PHP', level: 88, years: '5+' },
      { name: 'Python / FastAPI', level: 82, years: '3+' },
    ]
  },
  {
    category: 'Database',
    skills: [
      { name: 'MongoDB', level: 92, years: '6+' },
      { name: 'PostgreSQL / MySQL', level: 90, years: '7+' },
      { name: 'Redis', level: 85, years: '4+' },
      { name: 'InfluxDB', level: 80, years: '2+' },
    ]
  },
  {
    category: 'DevOps & Cloud',
    skills: [
      { name: 'Docker / Kubernetes', level: 88, years: '4+' },
      { name: 'AWS / Cloud', level: 85, years: '3+' },
      { name: 'CI/CD Pipelines', level: 87, years: '5+' },
      { name: 'Git / GitHub', level: 95, years: '7+' },
    ]
  },
  {
    category: 'Specialized',
    skills: [
      { name: 'Web3 / Blockchain', level: 85, years: '2+' },
      { name: 'AI Integration', level: 80, years: '2+' },
      { name: 'IoT Solutions', level: 82, years: '2+' },
      { name: 'Microservices', level: 90, years: '4+' },
    ]
  },
  {
    category: 'Architecture',
    skills: [
      { name: 'System Design', level: 92, years: '6+' },
      { name: 'API Design', level: 95, years: '7+' },
      { name: 'Performance Optimization', level: 90, years: '6+' },
      { name: 'Security Best Practices', level: 88, years: '6+' },
    ]
  }
];

const getLevelColor = (level: number) => {
  if (level >= 90) return 'bg-green-500';
  if (level >= 80) return 'bg-blue-500';
  if (level >= 70) return 'bg-yellow-500';
  return 'bg-gray-500';
};

const getLevelBgColor = (level: number) => {
  if (level >= 90) return 'bg-green-500/10';
  if (level >= 80) return 'bg-blue-500/10';
  if (level >= 70) return 'bg-yellow-500/10';
  return 'bg-gray-500/10';
};

export default function SkillsMatrix() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills-matrix" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Technical Expertise</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            Proven proficiency levels based on years of production experience and delivered projects
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-800 dark:text-gray-300">Expert (90%+)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-800 dark:text-gray-300">Advanced (80-89%)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-800 dark:text-gray-300">Proficient (70-79%)</span>
          </div>
        </motion.div>

        {/* Skills Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsMatrix.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass p-6 rounded-2xl hover:shadow-xl hover:shadow-green-500/10 transition-smooth"
            >
              <div className="flex items-center gap-2 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-green-500/10 rounded-lg"
                >
                  <Code2 className="text-green-500" size={20} />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getLevelBgColor(skill.level)} ${getLevelColor(skill.level).replace('bg-', 'text-')}`}>
                          {skill.level}%
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <TrendingUp size={12} />
                          {skill.years}
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3, ease: "easeOut" }}
                        className={`absolute top-0 left-0 h-full ${getLevelColor(skill.level)} rounded-full`}
                      >
                        <motion.div
                          animate={{ x: [0, 100, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Languages', value: '8+', icon: Code2 },
            { label: 'Frameworks', value: '15+', icon: Code2 },
            { label: 'Tools', value: '25+', icon: Code2 },
            { label: 'Certifications', value: 'Multiple', icon: Code2 }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-4 rounded-xl text-center"
            >
              <stat.icon className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
