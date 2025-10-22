import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCodingProgress } from '../services/api'
import { FaCode, FaTrophy, FaStar, FaFire } from 'react-icons/fa'
import { SiLeetcode, SiHackerrank } from 'react-icons/si'

interface PlatformProgress {
  _id?: string
  platform: string
  username: string
  problemsSolved: number
  rank?: string
  rating?: number
  badges?: string[]
  streak?: number
  profileUrl: string
  stats?: {
    easy: number
    medium: number
    hard: number
  }
}

const CodingProgress = () => {
  const [progress, setProgress] = useState<PlatformProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgress()
  }, [])

  const fetchProgress = async () => {
    try {
      const response = await getCodingProgress()
      setProgress(response.data)
    } catch (error) {
      console.error('Error fetching coding progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'leetcode':
        return <SiLeetcode className="text-4xl text-orange-500" />
      case 'hackerrank':
        return <SiHackerrank className="text-4xl text-green-500" />
      case 'skillrack':
        return <FaCode className="text-4xl text-blue-500" />
      default:
        return <FaCode className="text-4xl text-purple-500" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'leetcode':
        return 'from-orange-500 to-yellow-500'
      case 'hackerrank':
        return 'from-green-500 to-teal-500'
      case 'skillrack':
        return 'from-blue-500 to-cyan-500'
      default:
        return 'from-purple-500 to-pink-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="section-title">Coding Platform Progress</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Tracking my journey across competitive programming platforms
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {progress.map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card relative overflow-hidden group hover:scale-105 transition-transform"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getPlatformColor(
                item.platform
              )} opacity-5 group-hover:opacity-10 transition-opacity`}
            />

            <div className="relative z-10">
              {/* Platform Icon and Name */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getPlatformIcon(item.platform)}
                  <h3 className="text-2xl font-bold">{item.platform}</h3>
                </div>
                {item.streak && item.streak > 0 && (
                  <div className="flex items-center space-x-1 text-orange-500">
                    <FaFire />
                    <span className="font-bold">{item.streak}</span>
                  </div>
                )}
              </div>

              {/* Username */}
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                @{item.username}
              </p>

              {/* Main Stats */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Problems Solved
                  </span>
                  <span className="text-2xl font-bold text-primary-light dark:text-primary-dark">
                    {item.problemsSolved}
                  </span>
                </div>

                {item.rating && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Rating</span>
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-500" />
                      <span className="font-bold">{item.rating}</span>
                    </div>
                  </div>
                )}

                {item.rank && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Rank</span>
                    <div className="flex items-center space-x-1">
                      <FaTrophy className="text-yellow-500" />
                      <span className="font-bold">{item.rank}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Difficulty Breakdown */}
              {item.stats && (
                <div className="mb-6 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    By Difficulty:
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400">Easy</span>
                    <span className="font-bold">{item.stats.easy}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-600 dark:text-yellow-400">
                      Medium
                    </span>
                    <span className="font-bold">{item.stats.medium}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-600 dark:text-red-400">Hard</span>
                    <span className="font-bold">{item.stats.hard}</span>
                  </div>
                </div>
              )}

              {/* Badges */}
              {item.badges && item.badges.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Badges:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.badges.map((badge, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-semibold bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* View Profile Link */}
              <a
                href={item.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-lg font-semibold bg-gradient-to-r ${getPlatformColor(
                  item.platform
                )} text-white hover:shadow-lg transition-all`}
              >
                View Profile →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {progress.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <FaCode className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No coding progress data available yet.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default CodingProgress
