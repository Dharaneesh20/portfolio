import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getInsights, resolveImage } from '../services/api'
import { 
  FaAward, 
  FaBookOpen, 
  FaCodeBranch, 
  FaCertificate, 
  FaPenFancy, 
  FaBriefcase, 
  FaCalendarAlt, 
  FaTimes, 
  FaExternalLinkAlt, 
  FaArrowRight 
} from 'react-icons/fa'
import { trackContentView, trackClick } from '../utils/analytics'
import ImageModal from '../components/ImageModal'
import LiquidGlassBackground from '../components/ambient/LiquidGlassBackground'



interface Insight {
  _id: string
  title: string
  summary: string
  content?: string
  date: string
  type: 'achievement' | 'learning' | 'project-update' | 'certification' | 'writeup' | 'career' | 'event'
  tags: string[]
  externalLink?: string
  coverImage?: string
}

// Full mock data matching Dharaneesh's multi-domain expertise
const FALLBACK_INSIGHTS: Insight[] = [
  {
    _id: 'mock-1',
    title: 'Deep Dive into OWASP Top 10 & VAPT Practices',
    summary: 'Exploring web application security, penetration testing methodologies, and securing MERN stack endpoints against SQLi and XSS.',
    content: `Over the past few weeks, I have been studying Vulnerability Assessment and Penetration Testing (VAPT). I focused on common web application exploits outlined in the OWASP Top 10.\n\nI practiced identifying vulnerabilities like Broken Access Control and Injection flaws in a controlled local lab environment, and implemented security headers and sanitization in my Node/Express APIs. Understanding security profiles allows me to write safer cloud-integrated code and protect database operations.`,
    date: new Date('2026-07-01').toISOString(),
    type: 'learning',
    tags: ['Cybersecurity', 'VAPT', 'OWASP', 'MERN Stack'],
    coverImage: ''
  },
  {
    _id: 'mock-2',
    title: 'Shipped ERP Platform Update: Automated Inventory Alerts',
    summary: 'Implemented automated email and SMS notification triggers for low stock thresholds using serverless cron triggers and AWS SES.',
    content: `Successfully shipped a major feature update to our React-based ERP dashboard.\n\nBy hooking AWS Lambda and SES to our MongoDB change streams, inventory level drops now trigger instant notifications to suppliers. This has improved processing efficiency significantly, reducing order latency by 25%.`,
    date: new Date('2026-06-25').toISOString(),
    type: 'project-update',
    tags: ['ERP Systems', 'AWS', 'Full-Stack', 'MongoDB'],
    coverImage: ''
  },
  {
    _id: 'mock-3',
    title: 'Completed CCNA Training & Cisco Labs',
    summary: 'Built and simulated enterprise routing & switching topologies in Cisco Packet Tracer, mastering OSPF, VLANs, and ACLs.',
    content: `To deepen my networking fundamentals, I completed a rigorous CCNA preparation course.\n\nI designed and troubleshooted networks containing subnets, redundant switches, and secure gateways. Understanding packet flow from the physical layer to application layer has greatly improved how I design cloud VPC structures and secure routing tables.`,
    date: new Date('2026-06-10').toISOString(),
    type: 'certification',
    tags: ['Networking', 'Cisco', 'Infrastructure', 'Security'],
    coverImage: ''
  },
  {
    _id: 'mock-4',
    title: 'Joined TechCorp as Cloud & Full-Stack Intern',
    summary: 'Excited to join the cloud engineering team to build scalable workflows, serverless APIs, and manage multi-region AWS services.',
    content: `Started my internship journey with a focus on MERN stack development and AWS cloud deployments.\n\nLooking forward to tackling high-traffic applications, writing production-grade code, and learning industry-standard DevOps tools.`,
    date: new Date('2026-05-15').toISOString(),
    type: 'career',
    tags: ['Career', 'Internship', 'Cloud', 'Full-Stack'],
    coverImage: ''
  },
  {
    _id: 'mock-5',
    title: 'Automated Log Management with Bash Scripting',
    summary: 'Created a background automation utility that rotates and backs up server logs to AWS S3, reducing local disk waste by 30%.',
    content: `A simple yet effective scripting utility written in Bash. It runs daily as a Cron job on Linux instances, compresses log files, uploads them to an S3 bucket with Glacier transitions, and clears old entries. This saves hosting costs and ensures clean monitoring logs.`,
    date: new Date('2026-04-20').toISOString(),
    type: 'learning',
    tags: ['Automation', 'Bash', 'AWS S3', 'Scripting'],
    coverImage: ''
  }
]

const INSIGHT_TYPE_METADATA = {
  all: { label: 'All Updates', icon: FaBookOpen, color: 'bg-primary-light/10 text-primary-light dark:bg-primary-dark/10 dark:text-primary-dark' },
  learning: { label: 'Learning', icon: FaBookOpen, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  'project-update': { label: 'Projects', icon: FaCodeBranch, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  certification: { label: 'Certifications', icon: FaCertificate, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  achievement: { label: 'Milestones', icon: FaAward, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  writeup: { label: 'Writeups', icon: FaPenFancy, color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
  career: { label: 'Career', icon: FaBriefcase, color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
  event: { label: 'Events', icon: FaCalendarAlt, color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400' }
}

const Insights = () => {
  const [insights, setInsights] = useState<Insight[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null)
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null)


  useEffect(() => {
    fetchInsights()
    trackContentView('insights_page', 'insights_list', 'Insights List')
  }, [])

  const fetchInsights = async () => {
    try {
      const response = await getInsights()
      if (response.data && response.data.length > 0) {
        const unified = response.data.map((item: any) => ({
          ...item,
          type: item.category || item.type || 'learning',
          summary: item.excerpt || item.summary || '',
          date: item.publishedAt || item.date || new Date().toISOString()
        }))
        setInsights(unified)
      } else {
        setInsights(FALLBACK_INSIGHTS)
      }
    } catch (error) {
      console.error('Error fetching insights, utilizing fallback data:', error)
      setInsights(FALLBACK_INSIGHTS)
    } finally {
      setLoading(false)
    }
  }


  const filteredInsights = insights.filter((item) => {
    if (filter === 'all') return true
    return item.type === filter
  })

  // Set the first item as the featured item if filtering "all"
  const featuredInsight = filter === 'all' && filteredInsights.length > 0 ? filteredInsights[0] : null
  const timelineInsights = featuredInsight ? filteredInsights.slice(1) : filteredInsights

  const getIcon = (type: keyof typeof INSIGHT_TYPE_METADATA) => {
    const meta = INSIGHT_TYPE_METADATA[type] || INSIGHT_TYPE_METADATA.learning
    const Icon = meta.icon
    return <Icon className="text-xl" />
  }

  const getBadgeStyles = (type: keyof typeof INSIGHT_TYPE_METADATA) => {
    const meta = INSIGHT_TYPE_METADATA[type] || INSIGHT_TYPE_METADATA.learning
    return meta.color
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
          <p className="text-gray-550 dark:text-gray-450 font-medium">Loading updates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080d1a] text-gray-900 dark:text-gray-150 py-12 relative overflow-hidden transition-colors duration-300">
      <LiquidGlassBackground variant="insights" />


      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-light/10 text-primary-light dark:bg-primary-dark/10 dark:text-primary-dark tracking-wide uppercase">
              Activity & Log
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-4">
              Insights & Professional Feed
            </h1>
            <p className="text-gray-650 dark:text-gray-400 text-base md:text-lg">
              A chronological feed of certificates earned, security learning, systems shipping updates, and technical notes.
            </p>
          </motion.div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {Object.entries(INSIGHT_TYPE_METADATA).map(([key, value]) => {
            const Icon = value.icon
            const isSelected = filter === key
            return (
              <button
                key={key}
                onClick={() => {
                  setFilter(key)
                  trackClick(`Filter - ${key}`, 'button', { category: key })
                }}
                className={`flex items-center justify-center space-x-2 px-4 py-2 h-10 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900 shadow-md scale-105'
                    : 'bg-white border-gray-200 text-gray-600 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="text-base" />
                <span className="whitespace-nowrap">{value.label}</span>
              </button>
            )
          })}
        </div>


        {/* Empty State */}
        {filteredInsights.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No updates found in this category.</p>
            <button
              onClick={() => setFilter('all')}
              className="text-primary-light dark:text-primary-dark font-semibold hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Featured Insight (Highlight Card) */}
        {featuredInsight && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="relative group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 grid md:grid-cols-12">
              {(featuredInsight.coverImage || featuredInsight.image) && (
                <div
                  className="md:col-span-4 relative overflow-hidden cursor-pointer h-48 md:h-full min-h-[200px]"
                  onClick={() => setSelectedImage({
                    url: resolveImage(featuredInsight.coverImage || featuredInsight.image),
                    title: featuredInsight.title
                  })}
                >
                  <img
                    src={resolveImage(featuredInsight.coverImage || featuredInsight.image)}
                    alt={featuredInsight.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded">View Image</span>
                  </div>
                </div>
              )}
              <div className={`${(featuredInsight.coverImage || featuredInsight.image) ? 'md:col-span-8' : 'md:col-span-12'} p-8 md:p-10 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeStyles(featuredInsight.type)}`}>
                      {getIcon(featuredInsight.type)}
                      <span>{INSIGHT_TYPE_METADATA[featuredInsight.type]?.label || featuredInsight.type}</span>
                    </span>
                    <span className="text-sm text-gray-400 dark:text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-1.5" />
                      {formatDate(featuredInsight.date)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                    {featuredInsight.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-6 leading-relaxed">
                    {featuredInsight.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {featuredInsight.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-350 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    {featuredInsight.externalLink && (
                      <a
                        href={featuredInsight.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary-light dark:hover:text-primary-dark flex items-center text-sm font-medium transition-colors"
                      >
                        Link <FaExternalLinkAlt className="ml-1.5 text-xs" />
                      </a>
                    )}
                    {featuredInsight.content && (
                      <button
                        onClick={() => setSelectedInsight(featuredInsight)}
                        className="flex items-center text-primary-light dark:text-primary-dark hover:underline font-bold text-sm"
                      >
                        Read Full Post <FaArrowRight className="ml-1.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline List of Remaining Insights */}
        {timelineInsights.length > 0 && (
          <div className="relative border-l border-gray-200 dark:border-gray-800 ml-4 md:ml-6 pl-6 md:pl-10 space-y-12">
            {timelineInsights.map((insight, index) => (
              <motion.div
                key={insight._id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.4) }}
                className="relative"
              >
                {/* Timeline Icon Node */}
                <div className="absolute -left-[39px] md:-left-[55px] top-1.5 w-7 h-7 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-sm">
                  {getIcon(insight.type)}
                </div>

                {/* Insight Card */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-250/60 dark:border-gray-800/80 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <span className={`self-start flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeStyles(insight.type)}`}>
                      <span>{INSIGHT_TYPE_METADATA[insight.type]?.label || insight.type}</span>
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-550 flex items-center">
                      <FaCalendarAlt className="mr-1.5" />
                      {formatDate(insight.date)}
                    </span>
                  </div>

                  {(insight.coverImage || insight.image) && (
                    <div
                      className="relative cursor-pointer group overflow-hidden rounded-lg mb-4 border border-gray-200 dark:border-gray-800 max-w-md"
                      onClick={() => setSelectedImage({
                        url: resolveImage(insight.coverImage || insight.image),
                        title: insight.title
                      })}
                    >
                      <img
                        src={resolveImage(insight.coverImage || insight.image)}
                        alt={insight.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold bg-black/60 px-2 py-1 rounded">View Image</span>
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {insight.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50 dark:border-gray-850">
                    <div className="flex flex-wrap gap-1.5">
                      {insight.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[11px] bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4">
                      {insight.externalLink && (
                        <a
                          href={insight.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-primary-light dark:hover:text-primary-dark flex items-center text-xs font-semibold transition-colors"
                        >
                          Link <FaExternalLinkAlt className="ml-1 text-[10px]" />
                        </a>
                      )}
                      {insight.content && (
                        <button
                          onClick={() => setSelectedInsight(insight)}
                          className="text-primary-light dark:text-primary-dark hover:underline font-bold text-xs"
                        >
                          Read More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Read More Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInsight(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-850">
                <div className="flex items-center space-x-2">
                  <span className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeStyles(selectedInsight.type)}`}>
                    {getIcon(selectedInsight.type)}
                    <span>{INSIGHT_TYPE_METADATA[selectedInsight.type]?.label || selectedInsight.type}</span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-450">{formatDate(selectedInsight.date)}</span>
                </div>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="p-1 rounded-full hover:bg-gray-205 dark:hover:bg-gray-800 transition-colors"
                >
                  <FaTimes className="text-lg text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-4 flex-grow">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                  {selectedInsight.title}
                </h3>
                <div className="prose dark:prose-invert max-w-none text-gray-650 dark:text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {selectedInsight.content || selectedInsight.summary}
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  {selectedInsight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-350 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              {selectedInsight.externalLink && (
                <div className="p-4 bg-gray-50 dark:bg-gray-850 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                  <a
                    href={selectedInsight.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-primary-light text-white dark:bg-primary-dark dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <span>View Reference Link</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ''}
        title={selectedImage?.title || ''}
      />
    </div>
  )
}


export default Insights
