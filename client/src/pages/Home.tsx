import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaAws, 
  FaReact, 
  FaNodeJs, 
  FaGithub, 
  FaExternalLinkAlt, 
  FaShieldAlt, 
  FaNetworkWired, 
  FaServer, 
  FaCode, 
  FaArrowRight, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaLock, 
  FaDatabase, 
  FaTasks
} from 'react-icons/fa'
import { SiMongodb, SiCisco } from 'react-icons/si'
import { getRecentProjects, getRecentCertifications, getRecentInsights, resolveImage, getKpis } from '../services/api'
import { trackClick } from '../utils/analytics'
import ImageModal from '../components/ImageModal'
import LiquidGlassBackground from '../components/ambient/LiquidGlassBackground'



// Reusable Glass Card Wrapper Component for layout consistency
const GlassCard = ({ children, className = '', delay = 0, hoverY = -5 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: hoverY }}
      className={`glass-card relative overflow-hidden p-6 ${className}`}
    >
      {/* Decorative inner light reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  )
}

const Home = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [certs, setCerts] = useState<any[]>([])
  const [insights, setInsights] = useState<any[]>([])
  const [kpis, setKpis] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null)
  
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [loadingCerts, setLoadingCerts] = useState(true)
  const [loadingInsights, setLoadingInsights] = useState(true)
  const [loadingKpis, setLoadingKpis] = useState(true)


  useEffect(() => {
    // Dynamic fetches from MongoDB
    getRecentProjects(3)
      .then(res => setProjects(res.data || []))
      .catch(err => console.error('Error loading projects:', err))
      .finally(() => setLoadingProjects(false))

    getRecentCertifications(3)
      .then(res => setCerts(res.data || []))
      .catch(err => console.error('Error loading certifications:', err))
      .finally(() => setLoadingCerts(false))

    getRecentInsights(3)
      .then(res => setInsights(res.data || []))
      .catch(err => console.error('Error loading insights:', err))
      .finally(() => setLoadingInsights(false))

    getKpis()
      .then(res => setKpis(res.data || []))
      .catch(err => console.error('Error loading KPIs:', err))
      .finally(() => setLoadingKpis(false))
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Domain descriptions focusing on learning and development (non-expert copy)
  const focusAreas = [
    {
      icon: FaReact,
      title: 'Full-Stack Development',
      desc: 'Building responsive MERN applications. Focused on user experience, state management, and reliable server architectures.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB']
    },
    {
      icon: FaAws,
      title: 'Cloud & Backend Systems',
      desc: 'Exploring foundational cloud services and deploying APIs. Learning Docker containerization and server resource setup.',
      tags: ['AWS', 'Docker', 'Linux', 'REST APIs']
    },
    {
      icon: FaTasks,
      title: 'Project Building & Automation',
      desc: 'Writing automation helpers and cron scripts. Designing tools to streamline file operations and daily routines.',
      tags: ['Python', 'Bash Scripting', 'Automation']
    },
    {
      icon: FaNetworkWired,
      title: 'Networking Exploration',
      desc: 'Enthusiastically learning routing, subnetting, and protocol basics. Simulating local topologies in Packet Tracer.',
      tags: ['Cisco Packet Tracer', 'VLANs', 'OSPF Basics']
    },
    {
      icon: FaLock,
      title: 'Security & VAPT Learning',
      desc: 'Studying web security vulnerabilities and security baselines. Testing local code targets against OWASP Top 10 vulnerabilities.',
      tags: ['Security Principles', 'OWASP Top 10', 'IP Security']
    },
    {
      icon: FaDatabase,
      title: 'Databases & Tooling',
      desc: 'Designing schema models and configuring database instances. Structuring MERN queries for efficient indexing.',
      tags: ['Mongoose', 'MongoDB Atlas', 'Indexing']
    }
  ]

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#080d1a] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      
      {/* Full-bleed atmospheric background spanning full viewport width */}
      <LiquidGlassBackground variant="hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* A. HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-16 pb-12">
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left side text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                <span>Open to Internships & Placements</span>
              </motion.div>

              <div className="space-y-3">
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-6xl font-black tracking-tight"
                >
                  Hi, I'm <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Dharaneesh RS</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1"
                >
                  {['MERN / Full-Stack', 'Cloud Enthusiast', 'Networking Learner', 'Security & VAPT Learner'].map((badge) => (
                    <span 
                      key={badge} 
                      className="px-3 py-1 rounded-full text-xs font-bold bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/20 dark:border-gray-800/40 text-gray-700 dark:text-gray-300 shadow-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </motion.div>
              </div>

              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl"
              >
                I am a student builder specializing in full-stack applications and backend systems. I enjoy exploring cloud servers, networking, and secure development practices.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto"
              >
                <Link
                  to="/projects"
                  onClick={() => trackClick('Hero - Projects', 'button')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] transition-all flex items-center justify-center group"
                >
                  <span>View Projects</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/experience"
                  onClick={() => trackClick('Hero - Experience', 'button')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/25 dark:border-gray-800/60 hover:border-white/40 dark:hover:border-gray-750 transition-colors shadow-sm flex items-center justify-center"
                >
                  View Experience
                </Link>
                <Link
                  to="/contact"
                  onClick={() => trackClick('Hero - Contact', 'button')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/25 dark:border-gray-800/60 hover:border-white/40 dark:hover:border-gray-750 transition-colors shadow-sm flex items-center justify-center"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>

            {/* Right side profile visual */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Frosted radial lights */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl animate-pulse" />
                
                {/* Floating glass badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-2 -left-2 md:-top-4 md:-left-4 z-20 p-2 md:p-3 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-800/40 shadow-lg"
                >
                  <FaReact className="text-xl md:text-2xl text-blue-400" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-1/2 -left-4 md:-left-8 z-20 p-2 md:p-3 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-800/40 shadow-lg"
                >
                  <SiMongodb className="text-xl md:text-2xl text-green-400" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 z-20 p-2 md:p-3 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-800/40 shadow-lg"
                >
                  <FaAws className="text-xl md:text-2xl text-[#FF9900]" />
                </motion.div>

                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/30 dark:border-gray-800/50 shadow-2xl z-10 bg-gray-900">
                  <img
                    src="/images/profile.jpg"
                    alt="Dharaneesh RS"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-center text-white">
                    <FaCode className="text-4xl text-blue-400 mb-2" />
                    <p className="font-bold text-lg">Dharaneesh RS</p>
                    <p className="text-xs text-gray-400">Full-Stack & Cloud Enthusiast</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>


        {/* B. SNAPSHOT METRICS SECTION */}
        <section className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loadingKpis ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-800/40 h-[140px] rounded-2xl" />
              ))
            ) : kpis.length === 0 ? (
              [
                { title: 'Projects Built', value: `${projects.length > 0 ? projects.length : 10}+`, subtitle: 'MERN & Full-stack apps' },
                { title: 'Certifications', value: `${certs.length > 0 ? certs.length : 8}+`, subtitle: 'AWS & technical courses' },
                { title: 'Insights Logged', value: `${insights.length > 0 ? insights.length : 12}+`, subtitle: 'Chronological learning log' },
                { title: 'Core Focus Areas', value: '3+', subtitle: 'Cloud · Network · Security' }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-800/40 p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center items-center min-h-[140px]"
                >
                  <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-gray-905 dark:text-gray-200 uppercase tracking-wider mt-1.5 leading-snug">
                    {stat.title}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-450 mt-1 font-medium whitespace-nowrap">
                    {stat.subtitle}
                  </p>
                </motion.div>
              ))
            ) : (
              kpis.map((kpi, idx) => {
                let displayValue = kpi.value;
                if (kpi.value.toLowerCase().includes('projects.length')) {
                  displayValue = `${projects.length > 0 ? projects.length : 10}+`;
                } else if (kpi.value.toLowerCase().includes('certs.length')) {
                  displayValue = `${certs.length > 0 ? certs.length : 8}+`;
                } else if (kpi.value.toLowerCase().includes('insights.length')) {
                  displayValue = `${insights.length > 0 ? insights.length : 12}+`;
                }

                return (
                  <motion.div
                    key={kpi._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-800/40 p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center items-center min-h-[140px]"
                  >
                    <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      {displayValue}
                    </p>
                    <p className="text-xs font-bold text-gray-905 dark:text-gray-200 uppercase tracking-wider mt-1.5 leading-snug">
                      {kpi.title}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-450 mt-1 font-medium whitespace-nowrap">
                      {kpi.subtitle}
                    </p>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        {/* C. CORE FOCUS / WHAT I WORK ON SECTION */}
        <section className="py-12 border-t border-white/10 dark:border-gray-850">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Core Engineering Focus</h2>
            <p className="text-gray-650 dark:text-gray-400">
              Areas of active study, engineering labs, and codebase construction. Honest exploration without overclaimed credentials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon
              return (
                <GlassCard key={area.title} delay={idx * 0.05}>
                  <div className="space-y-4">
                    <div className="inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <Icon className="text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{area.title}</h3>
                    <p className="text-gray-650 dark:text-gray-400 text-sm leading-relaxed min-h-[4rem]">
                      {area.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-150 dark:border-gray-800/60">
                      {area.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded bg-white/40 dark:bg-gray-850/60 border border-white/20 dark:border-gray-800/40 text-gray-550 dark:text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </section>

        {/* D. LATEST INSIGHTS SECTION */}
        <section className="py-12 border-t border-white/10 dark:border-gray-850">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">Engineering Journal</span>
              <h2 className="text-3xl font-black tracking-tight mt-1">Latest Insights</h2>
            </div>
            <Link
              to="/insights"
              className="inline-flex items-center space-x-2 text-emerald-500 dark:text-emerald-400 font-bold hover:underline"
            >
              <span>See Full Feed</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>

          {loadingInsights ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-800/40 h-56 rounded-2xl" />
              ))}
            </div>
          ) : insights.length === 0 ? (
            <div className="text-center py-10 bg-white/20 dark:bg-gray-900/20 rounded-2xl border border-white/10 dark:border-gray-800 p-6">
              <p className="text-gray-500">No insights logged. Log some updates in the Admin panel!</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Spotlight Insight Card */}
              {insights[0] && (
                <div className="lg:col-span-2">
                  <GlassCard delay={0} className="h-full flex flex-col justify-between" hoverY={-3}>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400 tracking-wider px-2.5 py-1 rounded bg-emerald-500/10">
                          {insights[0].category || 'learning'}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-550 flex items-center">
                          <FaCalendarAlt className="mr-1.5" />
                          {formatDate(insights[0].publishedAt || insights[0].date)}
                        </span>
                      </div>

                      {(insights[0].coverImage || insights[0].image) && (
                        <div
                          className="relative cursor-pointer group overflow-hidden rounded-xl border border-gray-250/60 dark:border-gray-800/40"
                          onClick={() => setSelectedImage({
                            url: resolveImage(insights[0].coverImage || insights[0].image),
                            title: insights[0].title
                          })}
                        >
                          <img
                            src={resolveImage(insights[0].coverImage || insights[0].image)}
                            alt={insights[0].title}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-102"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded">View Image</span>
                          </div>
                        </div>
                      )}

                      <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                        {insights[0].title}
                      </h3>
                      <p className="text-gray-650 dark:text-gray-400 text-sm leading-relaxed">
                        {insights[0].excerpt}
                      </p>
                    </div>

                    <div className="border-t border-white/10 dark:border-gray-800/60 pt-4 mt-6 flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-400">
                        {insights[0].readTime || '3 min read'}
                      </span>
                      <Link to="/insights" className="text-emerald-500 hover:underline inline-flex items-center">
                        Read Spotlight Update <FaArrowRight className="ml-1.5 text-[10px]" />
                      </Link>
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* Supporting Stacked Insights */}
              <div className="flex flex-col gap-6">
                {insights.slice(1, 3).map((ins, idx) => (
                  <GlassCard key={ins._id} delay={(idx + 1) * 0.05} className="flex-1 flex flex-col justify-between" hoverY={-3}>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] uppercase font-black text-emerald-600 dark:text-emerald-400 tracking-wider px-2 py-0.5 rounded bg-emerald-500/10">
                          {ins.category || 'learning'}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-550">
                          {formatDate(ins.publishedAt || ins.date)}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug">
                        {ins.title}
                      </h3>
                      <p className="text-gray-650 dark:text-gray-400 text-xs line-clamp-2">
                        {ins.excerpt}
                      </p>
                    </div>

                    <div className="border-t border-white/10 dark:border-gray-850 pt-2.5 mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-gray-400">
                        {ins.readTime || '3 min read'}
                      </span>
                      <Link to="/insights" className="font-bold text-emerald-500 hover:underline">
                        Read Update →
                      </Link>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* E. RECENT PROJECTS PREVIEW */}
        <section className="py-12 border-t border-white/10 dark:border-gray-850">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">Engineering builds</span>
              <h2 className="text-3xl font-black tracking-tight mt-1">Recent Projects</h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 text-blue-500 dark:text-blue-400 font-bold hover:underline"
            >
              <span>See More Projects</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {loadingProjects ? (
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-800/40 h-64 rounded-2xl" />
              ))
            ) : projects.length === 0 ? (
              <div className="col-span-3 text-center py-10 bg-white/20 dark:bg-gray-900/20 rounded-2xl border border-white/10 dark:border-gray-800 p-6">
                <p className="text-gray-500">No projects found. Add some in the Admin panel!</p>
              </div>
            ) : (
              projects.map((proj, idx) => (
                <GlassCard key={proj._id} delay={idx * 0.05}>
                  <div className="flex flex-col h-full justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          {proj.cloudProvider ? proj.cloudProvider.toUpperCase() : 'BUILD'}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold capitalize">
                          {proj.status || 'Live'}
                        </span>
                      </div>
                      
                      {(proj.imageUrl || proj.image) && (
                        <div
                          className="relative cursor-pointer group overflow-hidden rounded-lg mb-3 border border-gray-200 dark:border-gray-800"
                          onClick={() => setSelectedImage({
                            url: resolveImage(proj.imageUrl || proj.image),
                            title: proj.title
                          })}
                        >
                          <img
                            src={resolveImage(proj.imageUrl || proj.image)}
                            alt={proj.title}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold bg-black/60 px-2.5 py-1 rounded">View Image</span>
                          </div>
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{proj.title}</h3>
                      <p className="text-gray-650 dark:text-gray-400 text-xs md:text-sm line-clamp-3 leading-relaxed mt-2">
                        {proj.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {proj.technologies && proj.technologies.slice(0, 3).map((t: string) => (
                          <span key={t} className="px-2 py-0.5 text-[10px] bg-white/20 dark:bg-gray-800/50 rounded border border-white/10 dark:border-gray-800 text-gray-550 dark:text-gray-400">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 border-t border-white/10 dark:border-gray-800/60 pt-3 text-xs font-semibold">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <FaGithub className="mr-1.5" /> Source
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-500 hover:underline"
                          >
                            <FaExternalLinkAlt className="mr-1.5 text-[10px]" /> Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        </section>

        {/* F. RECENT CERTIFICATIONS SECTION */}
        <section className="py-12 border-t border-white/10 dark:border-gray-850">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest">Accreditation</span>
              <h2 className="text-3xl font-black tracking-tight mt-1">Recent Certifications</h2>
            </div>
            <Link
              to="/certifications"
              className="inline-flex items-center space-x-2 text-purple-500 dark:text-purple-400 font-bold hover:underline"
            >
              <span>See More Certifications</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {loadingCerts ? (
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-800/40 h-56 rounded-2xl" />
              ))
            ) : certs.length === 0 ? (
              <div className="col-span-3 text-center py-10 bg-white/20 dark:bg-gray-900/20 rounded-2xl border border-white/10 dark:border-gray-800 p-6">
                <p className="text-gray-500">No certifications found. Add some in the Admin panel!</p>
              </div>
            ) : (
              certs.map((cert, idx) => (
                <GlassCard key={cert._id} delay={idx * 0.05} className="flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-550 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {formatDate(cert.date)}
                      </span>
                    </div>

                    {(cert.imageUrl || cert.image) && (
                      <div
                        className="relative cursor-pointer group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
                        onClick={() => setSelectedImage({
                          url: resolveImage(cert.imageUrl || cert.image),
                          title: cert.title
                        })}
                      >
                        <img
                          src={resolveImage(cert.imageUrl || cert.image)}
                          alt={cert.title}
                          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold bg-black/60 px-2.5 py-1 rounded">View Certificate</span>
                        </div>
                      </div>
                    )}

                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{cert.title}</h3>
                    <p className="text-gray-650 dark:text-gray-400 text-xs line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 dark:border-gray-880/65 pt-3 mt-4 text-xs font-semibold">
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:underline inline-flex items-center"
                      >
                        Verify Credential <FaExternalLinkAlt className="ml-1 text-[9px]" />
                      </a>
                    )}
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        </section>

        {/* G. CONTACT CTA BANNER */}
        <section className="py-12">
          <motion.div

            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-3xl p-8 md:p-14 text-center border border-white/20 dark:border-gray-800/40 overflow-hidden shadow-xl"
          >
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Let's Build Something Together</h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                I am actively seeking internship opportunities and entry-level full-stack development roles. Let's discuss projects, networking simulation, or modern web integrations.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold px-8 py-3.5 rounded-xl hover:scale-105 transition-all shadow-md"
                >
                  Send Message
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ''}
        title={selectedImage?.title || ''}
      />
    </div>
  )
}

export default Home

