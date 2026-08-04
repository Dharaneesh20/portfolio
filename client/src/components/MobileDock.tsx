import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaHome,
  FaLaptopCode,
  FaBriefcase,
  FaAward,
  FaGithub,
  FaLightbulb,
  FaChartLine,
  FaAddressCard
} from 'react-icons/fa'
import { trackClick } from '../utils/analytics'

interface DockItem {
  name: string
  label: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

// Remapped CV into Contact option for optimal Apple Dock proportions & touch sizes
const dockItems: DockItem[] = [
  { name: 'Home', label: 'Home', path: '/', icon: FaHome },
  { name: 'Projects', label: 'Projects', path: '/projects', icon: FaLaptopCode },
  { name: 'Experience', label: 'Work', path: '/experience', icon: FaBriefcase },
  { name: 'Certifications', label: 'Certs', path: '/certifications', icon: FaAward },
  { name: 'GitHub', label: 'GitHub', path: '/github', icon: FaGithub },
  { name: 'Insights', label: 'Insights', path: '/insights', icon: FaLightbulb },
  { name: 'Coding Progress', label: 'Stats', path: '/coding-progress', icon: FaChartLine },
  { name: 'Contact & CV', label: 'Contact', path: '/contact', icon: FaAddressCard },
]

export const MobileDock = () => {
  const location = useLocation()
  const [activeRipple, setActiveRipple] = useState<string | null>(null)

  const handleDockClick = (path: string, name: string) => {
    setActiveRipple(path)
    trackClick(`MobileDock - ${name}`, 'navigation', { location: 'mobile_dock' })
    setTimeout(() => setActiveRipple(null), 600)
  }

  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-[460px] pointer-events-auto select-none">
      {/* Apple Liquid Glass Dock Container with standard iOS/macOS icon proportions */}
      <div className="relative bg-white/80 dark:bg-[#030712]/85 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_14px_45px_rgba(0,0,0,0.45)] rounded-3xl p-1.5 flex items-center justify-around w-full">
        
        {/* Subtle Liquid Surface Gloss */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent rounded-3xl pointer-events-none" />

        {dockItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/contact' && location.pathname === '/cv')
          const Icon = item.icon
          const isRippling = activeRipple === item.path

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleDockClick(item.path, item.name)}
              className="relative flex-1 min-w-[44px] sm:min-w-[52px] py-1.5 px-1 flex flex-col items-center justify-center rounded-2xl group transition-all duration-200"
            >
              {/* Liquid Water Drop Ripple Animation */}
              <AnimatePresence>
                {isRippling && (
                  <motion.span
                    initial={{ scale: 0.2, opacity: 0.95 }}
                    animate={{ scale: 2.3, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50 blur-xs pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Active Liquid Glass Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveDockPill"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 border border-blue-400/40 dark:border-blue-400/30 rounded-2xl shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}

              {/* Standard Sized Apple Icon & Readable Mini Label */}
              <motion.div
                whileHover={{ y: -4, scale: 1.15 }}
                whileTap={{ scale: 0.86 }}
                className="relative z-10 flex flex-col items-center justify-center w-full gap-0.5"
              >
                <div
                  className={`text-base sm:text-lg md:text-xl transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 drop-shadow-[0_2px_8px_rgba(59,130,246,0.5)]'
                      : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`}
                >
                  <Icon />
                </div>

                <span
                  className={`text-[8.5px] sm:text-[10px] font-bold tracking-tight truncate max-w-full text-center leading-none transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-300 font-extrabold'
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MobileDock
