import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getGitHubStats } from '../services/api'
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaUsers,
  FaUserFriends,
  FaBook,
  FaMapMarkerAlt,
  FaLink,
  FaBuilding,
  FaTwitter,
  FaClock,
  FaExternalLinkAlt,
  FaEye,
  FaCalendarAlt,
} from 'react-icons/fa'

interface Repo {
  name: string
  description: string
  url: string
  homepage?: string
  stars: number
  forks: number
  watchers: number
  language?: string
  topics: string[]
  isForked: boolean
  updatedAt: string
}

interface GitHubStats {
  username: string
  name?: string
  bio?: string
  avatarUrl?: string
  profileUrl?: string
  company?: string
  location?: string
  blog?: string
  twitterUsername?: string
  publicRepos: number
  publicGists: number
  followers: number
  following: number
  totalStars: number
  totalForks: number
  topLanguages: { language: string; count: number }[]
  topRepos: Repo[]
  fetchedAt: string
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Svelte: '#ff3e00',
}

const getLanguageColor = (lang: string) =>
  LANGUAGE_COLORS[lang] || '#8b949e'

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const GitHub = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await getGitHubStats()
      setStats(res.data)
    } catch (err: any) {
      setError('Failed to load GitHub stats. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-light dark:border-primary-dark mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Fetching GitHub stats...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaGithub className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-red-500 text-lg">{error || 'No stats available.'}</p>
          <button
            onClick={fetchStats}
            className="mt-4 btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const maxLangCount = Math.max(...stats.topLanguages.map((l) => l.count), 1)

  const statCards = [
    { label: 'Repositories', value: stats.publicRepos, icon: FaBook, color: 'from-blue-500 to-cyan-500' },
    { label: 'Followers', value: stats.followers, icon: FaUsers, color: 'from-purple-500 to-pink-500' },
    { label: 'Following', value: stats.following, icon: FaUserFriends, color: 'from-indigo-500 to-blue-500' },
    { label: 'Total Stars', value: stats.totalStars, icon: FaStar, color: 'from-yellow-500 to-amber-500' },
    { label: 'Total Forks', value: stats.totalForks, icon: FaCodeBranch, color: 'from-green-500 to-teal-500' },
    { label: 'Gists', value: stats.publicGists, icon: FaBook, color: 'from-rose-500 to-red-500' },
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="section-title flex items-center justify-center gap-3">
          <FaGithub /> GitHub Stats
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Open-source activity and contributions for{' '}
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-light dark:text-primary-dark font-semibold hover:underline"
          >
            @{stats.username}
          </a>
        </p>
        {stats.fetchedAt && (
          <p className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-500 mt-2">
            <FaClock className="text-xs" />
            Last synced: {formatDate(stats.fetchedAt)}
          </p>
        )}
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card max-w-3xl mx-auto mb-12 flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        {stats.avatarUrl && (
          <img
            src={stats.avatarUrl}
            alt={stats.name || stats.username}
            className="w-28 h-28 rounded-full border-4 border-primary-light dark:border-primary-dark shadow-lg flex-shrink-0"
          />
        )}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-1">{stats.name || stats.username}</h2>
          <p className="text-primary-light dark:text-primary-dark font-medium mb-2">@{stats.username}</p>
          {stats.bio && <p className="text-gray-600 dark:text-gray-400 mb-4">{stats.bio}</p>}

          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600 dark:text-gray-400">
            {stats.location && (
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-red-500" />
                {stats.location}
              </span>
            )}
            {stats.company && (
              <span className="flex items-center gap-1">
                <FaBuilding className="text-blue-500" />
                {stats.company}
              </span>
            )}
            {stats.blog && (
              <a
                href={stats.blog.startsWith('http') ? stats.blog : `https://${stats.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary-light dark:hover:text-primary-dark"
              >
                <FaLink className="text-green-500" />
                Website
              </a>
            )}
            {stats.twitterUsername && (
              <a
                href={`https://twitter.com/${stats.twitterUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-400"
              >
                <FaTwitter className="text-blue-400" />
                @{stats.twitterUsername}
              </a>
            )}
            <a
              href={stats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-primary-light dark:text-primary-dark hover:underline"
            >
              <FaGithub />
              View Profile
            </a>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            className="card text-center relative overflow-hidden group hover:scale-105 transition-transform"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-15 transition-opacity`}
            />
            <div className="relative z-10">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
              >
                <card.icon className="text-white text-lg" />
              </div>
              <p className="text-2xl font-bold text-primary-light dark:text-primary-dark">{card.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        {/* Top Languages */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card"
        >
          <h2 className="text-xl font-bold mb-6">Top Languages</h2>
          <div className="space-y-4">
            {stats.topLanguages.map((lang, index) => (
              <motion.div
                key={lang.language}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: getLanguageColor(lang.language) }}
                    />
                    {lang.language}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {lang.count} repo{lang.count !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(lang.count / maxLangCount) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.06 }}
                    className="h-2.5 rounded-full"
                    style={{ backgroundColor: getLanguageColor(lang.language) }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activity Summary Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card flex flex-col gap-5"
        >
          <h2 className="text-xl font-bold">Activity Summary</h2>

          {/* Mini stat rows */}
          {[
            { label: 'Total Stars Earned', value: stats.totalStars, icon: FaStar, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
            { label: 'Total Forks', value: stats.totalForks, icon: FaCodeBranch, color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: 'Public Repositories', value: stats.publicRepos, icon: FaBook, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Followers', value: stats.followers, icon: FaUsers, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { label: 'Following', value: stats.following, icon: FaUserFriends, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
            { label: 'Public Gists', value: stats.publicGists, icon: FaEye, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${row.bg}`}>
                  <row.icon className={`text-sm ${row.color}`} />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{row.label}</span>
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">{row.value}</span>
            </motion.div>
          ))}

          {/* Language donut */}
          <div className="mt-2">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Language Breakdown</p>
            {/* Stacked bar */}
            <div className="flex h-4 w-full rounded-full overflow-hidden gap-0.5">
              {stats.topLanguages.slice(0, 6).map((lang) => (
                <motion.div
                  key={lang.language}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(lang.count / stats.topLanguages.slice(0, 6).reduce((s, l) => s + l.count, 0)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{ backgroundColor: getLanguageColor(lang.language) }}
                  title={`${lang.language}: ${lang.count} repos`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              {stats.topLanguages.slice(0, 6).map((lang) => (
                <span key={lang.language} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: getLanguageColor(lang.language) }} />
                  {lang.language}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Repository Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card mb-12"
      >
        <h2 className="text-xl font-bold mb-6">Recent Repository Activity</h2>
        <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-700/60">
          {[...stats.topRepos]
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 5)
            .map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="flex items-center justify-between py-4 group hover:bg-gray-50 dark:hover:bg-gray-800/40 px-2 -mx-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FaGithub className="text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-primary-light dark:text-primary-dark group-hover:underline truncate">{repo.name}</p>
                    {repo.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{repo.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                  {repo.language && (
                    <span className="hidden sm:flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />{repo.stars}
                  </span>
                  <span className="hidden sm:flex items-center gap-1">
                    <FaCalendarAlt className="text-gray-400" />
                    {formatDate(repo.updatedAt)}
                  </span>
                </div>
              </motion.a>
            ))}
        </div>
      </motion.div>

      {/* Top Repos */}
      {stats.topRepos && stats.topRepos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Top Repositories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.topRepos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="card group cursor-pointer hover:border-primary-light dark:hover:border-primary-dark border border-transparent transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FaGithub className="text-gray-500 text-lg flex-shrink-0" />
                    <h3 className="font-bold text-primary-light dark:text-primary-dark group-hover:underline truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <FaExternalLinkAlt className="text-gray-400 text-xs flex-shrink-0 mt-1" />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
                  {repo.description || 'No description provided.'}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-auto">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch className="text-gray-400" />
                    {repo.forks}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default GitHub
