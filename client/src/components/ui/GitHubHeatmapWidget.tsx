import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaCodeBranch, FaFolder, FaUsers } from 'react-icons/fa'

interface GitHubProfile {
  public_repos: number
  followers: number
  following: number
  bio?: string
}

export function GitHubHeatmapWidget() {
  const [profile, setProfile] = useState<GitHubProfile>({
    public_repos: 66,
    followers: 24,
    following: 21,
    bio: 'A Common Dev 😎'
  })

  useEffect(() => {
    fetch('https://api.github.com/users/Dharaneesh20')
      .then(res => res.json())
      .then(data => {
        if (data && data.public_repos !== undefined) {
          setProfile({
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            bio: data.bio
          })
        }
      })
      .catch(err => console.warn('Could not fetch GitHub user info:', err))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card relative overflow-hidden space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-150 dark:border-gray-800/60 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gray-900 text-white dark:bg-gray-800">
            <FaGithub className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span>GitHub Contribution Grid</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-mono">Live Sync</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">@Dharaneesh20 • {profile.bio || 'Continuous codebase construction'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono text-gray-600 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <FaFolder className="text-blue-500" />
            <span>Repos: <strong className="text-gray-900 dark:text-white">{profile.public_repos}</strong></span>
          </span>
          <span className="flex items-center space-x-1">
            <FaUsers className="text-purple-400" />
            <span>Followers: <strong className="text-gray-900 dark:text-white">{profile.followers}</strong></span>
          </span>
          <span className="flex items-center space-x-1">
            <FaCodeBranch className="text-emerald-400" />
            <span>Commits: <strong className="text-gray-900 dark:text-white">1,480+</strong></span>
          </span>
        </div>
      </div>

      {/* Real Live Contribution Graph SVG */}
      <div className="overflow-x-auto pb-2 scrollbar-none flex justify-center">
        <a 
          href="https://github.com/Dharaneesh20" 
          target="_blank" 
          rel="noopener noreferrer"
          className="min-w-[650px] w-full flex justify-center p-2 rounded-xl bg-gray-950/40 border border-gray-800/50 hover:border-blue-500/40 transition-colors"
        >
          <img
            src="https://ghchart.rshah.org/3b82f6/Dharaneesh20"
            alt="Dharaneesh20 GitHub Contributions"
            className="w-full h-auto filter brightness-110 contrast-125"
            onError={(e) => {
              // Fallback text if image fails to load
              (e.target as HTMLElement).style.display = 'none'
            }}
          />
        </a>
      </div>

      {/* Legend & Link */}
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400 pt-1">
        <a 
          href="https://github.com/Dharaneesh20" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-blue-400 underline transition-colors"
        >
          View live profile on github.com/Dharaneesh20 →
        </a>
        <div className="flex items-center space-x-1.5">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-xs bg-[#eeeeee] dark:bg-gray-800" />
          <div className="w-2.5 h-2.5 rounded-xs bg-[#9be9a8]" />
          <div className="w-2.5 h-2.5 rounded-xs bg-[#40c463]" />
          <div className="w-2.5 h-2.5 rounded-xs bg-[#30a14e]" />
          <div className="w-2.5 h-2.5 rounded-xs bg-[#216e39]" />
          <span>More</span>
        </div>
      </div>
    </motion.div>
  )
}

export default GitHubHeatmapWidget
