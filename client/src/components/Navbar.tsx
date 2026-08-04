import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'
import { trackClick } from '../utils/analytics'
import MobileDock from './MobileDock'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'GitHub', path: '/github' },
    { name: 'Insights', path: '/insights' },
    { name: 'Coding Progress', path: '/coding-progress' },
    { name: 'CV', path: '/cv' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-800/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-black tracking-tight"
              >
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent font-black">
                  Dharaneesh R S
                </span>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => trackClick(`Nav - ${item.name}`, 'navigation', { location: 'desktop' })}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-blue-500/15 dark:bg-blue-500/20 border border-blue-500/30 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}

              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme()
                  trackClick('Theme Toggle', 'button', { theme: theme === 'light' ? 'dark' : 'light' })
                }}
                className="p-2 ml-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <FaMoon className="text-lg" />
                ) : (
                  <FaSun className="text-lg text-yellow-400" />
                )}
              </button>
            </div>

            {/* Mobile Header Theme Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <FaMoon className="text-lg" />
                ) : (
                  <FaSun className="text-lg text-yellow-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Apple Liquid Glass Mobile Dock (Mobile & Tablet devices only) */}
      <MobileDock />
    </>
  )
}

export default Navbar
