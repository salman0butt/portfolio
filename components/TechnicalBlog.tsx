'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, BookOpen, Clock, ArrowRight, TrendingUp, Code2 } from 'lucide-react';

const blogPosts = [
  {
    title: 'Scaling Web3 Applications: Lessons from Permission.io',
    excerpt: 'Deep dive into microservices architecture, RabbitMQ message queues, and Kubernetes orchestration for handling thousands of concurrent blockchain transactions.',
    category: 'Web3 & Architecture',
    readTime: '12 min',
    date: 'Jan 2025',
    tags: ['Web3', 'Microservices', 'Kubernetes', 'RabbitMQ'],
    gradient: 'from-green-500 to-emerald-600',
    views: '2.4K',
    featured: true
  },
  {
    title: 'Database Optimization: Eliminating N+1 Queries at Scale',
    excerpt: 'How I reduced API response times by 40% through strategic database indexing, query optimization, and implementing proper eager loading patterns.',
    category: 'Performance',
    readTime: '8 min',
    date: 'Dec 2024',
    tags: ['PostgreSQL', 'Performance', 'SQL', 'Optimization'],
    gradient: 'from-blue-500 to-cyan-600',
    views: '3.1K',
    featured: true
  },
  {
    title: 'Building Real-Time IoT Dashboards with InfluxDB',
    excerpt: 'Complete guide to designing time-series data pipelines for IoT applications, handling millions of sensor readings with sub-second latency.',
    category: 'IoT & Data',
    readTime: '15 min',
    date: 'Nov 2024',
    tags: ['IoT', 'InfluxDB', 'Real-time', 'React'],
    gradient: 'from-purple-500 to-pink-600',
    views: '1.8K',
    featured: true
  },
  {
    title: 'Clean Code Principles for Production-Ready React Apps',
    excerpt: 'Best practices for component architecture, state management, and TypeScript patterns that scale from MVP to enterprise.',
    category: 'React & TypeScript',
    readTime: '10 min',
    date: 'Oct 2024',
    tags: ['React', 'TypeScript', 'Clean Code', 'Best Practices'],
    gradient: 'from-cyan-500 to-blue-600',
    views: '4.2K',
    featured: false
  },
  {
    title: 'Multi-Tenant SaaS Architecture: Complete Guide',
    excerpt: 'Designing secure, scalable multi-tenant systems with Laravel, covering data isolation, performance, and security considerations.',
    category: 'Architecture & Security',
    readTime: '14 min',
    date: 'Sep 2024',
    tags: ['SaaS', 'Laravel', 'Architecture', 'Security'],
    gradient: 'from-orange-500 to-red-600',
    views: '2.7K',
    featured: false
  },
  {
    title: 'AI Integration in Modern Web Apps: Practical Examples',
    excerpt: 'Implementing conversational AI with Google ADK, context management, and real-time responses in production applications.',
    category: 'AI & Integration',
    readTime: '11 min',
    date: 'Aug 2024',
    tags: ['AI', 'Google ADK', 'Python', 'Integration'],
    gradient: 'from-indigo-500 to-purple-600',
    views: '3.5K',
    featured: false
  }
];

const topics = [
  { name: 'Full-Stack Development', count: 24, icon: Code2 },
  { name: 'System Architecture', count: 18, icon: TrendingUp },
  { name: 'Web3 & Blockchain', count: 12, icon: Code2 },
  { name: 'Performance Optimization', count: 15, icon: TrendingUp },
  { name: 'DevOps & Cloud', count: 10, icon: Code2 },
  { name: 'Best Practices', count: 20, icon: TrendingUp }
];

export default function TechnicalBlog() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="technical-blog" className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Technical Writing</h2>
            <Sparkles className="text-green-500" size={24} />
          </div>
          <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            Sharing knowledge through in-depth articles on software engineering, architecture, and best practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Blog Posts */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
            >
              <BookOpen className="text-green-500" size={28} />
              Featured Articles
            </motion.h3>

            <div className="space-y-6 mb-12">
              {blogPosts.filter(post => post.featured).map((post, index) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="glass p-6 rounded-2xl hover:shadow-xl hover:shadow-green-500/10 transition-smooth group relative overflow-hidden"
                >
                  {/* Background gradient */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`}></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 bg-gradient-to-r ${post.gradient} text-white rounded-full text-xs font-semibold`}>
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {post.date}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            👁️ {post.views}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-green-500/10 text-green-700 dark:text-green-400 rounded text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1, x: 5 }}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className="text-green-500" size={24} />
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Recent Posts */}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Recent Posts
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogPosts.filter(post => !post.featured).map((post, index) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="glass p-5 rounded-xl hover:shadow-lg hover:shadow-green-500/10 transition-smooth group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 bg-gradient-to-r ${post.gradient} text-white rounded text-xs font-semibold`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {post.date}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      👁️ {post.views}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass p-6 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="text-green-500" size={20} />
                Popular Topics
              </h3>
              <div className="space-y-3">
                {topics.map((topic, index) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg hover:shadow-md transition-smooth cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <topic.icon className="text-green-500" size={16} />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {topic.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
                      {topic.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass p-6 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Writing Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Total Articles</span>
                    <span className="text-lg font-bold gradient-text">50+</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: '85%' } : {}}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Total Views</span>
                    <span className="text-lg font-bold gradient-text">50K+</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: '75%' } : {}}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Avg. Read Time</span>
                    <span className="text-lg font-bold gradient-text">10 min</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="glass p-6 rounded-2xl text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
            >
              <BookOpen className="text-green-500 mx-auto mb-3" size={32} />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Get notified when I publish new technical articles
              </p>
              <button className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-sm transition-smooth hover:scale-105">
                Subscribe to Newsletter
              </button>
            </motion.div>
          </div>
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full hover:bg-green-500 hover:text-white transition-smooth border border-green-500/30 hover:border-green-500 font-semibold">
            <span>View All Articles</span>
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
