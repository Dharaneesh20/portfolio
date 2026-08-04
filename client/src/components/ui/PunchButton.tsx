import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFistRaised, FaFire, FaTrophy } from 'react-icons/fa'

interface Particle {
  id: number
  x: number
  y: number
  text: string
}

export function PunchButton() {
  const [totalPunches, setTotalPunches] = useState<number>(() => {
    const saved = localStorage.getItem('portfolio_punch_count')
    return saved ? parseInt(saved, 10) : 1337
  })

  const [userPunches, setUserPunches] = useState<number>(() => {
    const saved = localStorage.getItem('portfolio_user_punch_count')
    return saved ? parseInt(saved, 10) : 0
  })

  const [particles, setParticles] = useState<Particle[]>([])
  const [isBruhMode, setIsBruhMode] = useState(false)
  const [clickTimestamps, setClickTimestamps] = useState<number[]>([])

  useEffect(() => {
    localStorage.setItem('portfolio_punch_count', totalPunches.toString())
    localStorage.setItem('portfolio_user_punch_count', userPunches.toString())
  }, [totalPunches, userPunches])

  const handlePunch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now()
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Update punch counts
    setTotalPunches(prev => prev + 1)
    setUserPunches(prev => prev + 1)

    // Check click frequency for spam detection
    const recentClicks = [...clickTimestamps.filter(t => now - t < 1500), now]
    setClickTimestamps(recentClicks)

    let floatText = "+1 👊"
    if (recentClicks.length >= 5 || isBruhMode) {
      setIsBruhMode(true)
      const spamPhrases = ["BRUH! 👊", "POW! 💥", "CHILL! 🔥", "BOOM! ⚡", "COMBO! 🥊", "BRUH! 😤", "HAMMER! 🔨"]
      floatText = spamPhrases[Math.floor(Math.random() * spamPhrases.length)]
    }

    // Add floating particle
    const newParticle: Particle = {
      id: Math.random(),
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 20 - 10),
      text: floatText
    }

    setParticles(prev => [...prev.slice(-10), newParticle])
  }

  const getRankBadge = () => {
    if (userPunches === 0) return { label: 'Untested Novice', color: 'text-gray-400', icon: FaFistRaised }
    if (userPunches < 5) return { label: 'Warm-Up Boxer 🥊', color: 'text-blue-400', icon: FaFistRaised }
    if (userPunches < 15) return { label: 'Combo Striker ⚡', color: 'text-yellow-400', icon: FaFire }
    if (userPunches < 30) return { label: 'Furious Fists! 🔥', color: 'text-orange-500', icon: FaFire }
    if (userPunches < 60) return { label: 'BRUH SPAMMER! 👊💥', color: 'text-red-500 font-extrabold animate-pulse', icon: FaFistRaised }
    return { label: 'ULTIMATE SPAM GOD 👑', color: 'text-purple-400 font-black animate-bounce', icon: FaTrophy }
  }

  const badge = getRankBadge()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 max-w-4xl mx-auto text-center"
    >
      <div className="relative bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-800/80 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
        
        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <span className="inline-block text-xs font-mono font-bold tracking-widest text-[#FF6B4A] uppercase px-3 py-1 rounded-full bg-[#FF6B4A]/10 border border-[#FF6B4A]/20">
            Interactive Easter Egg
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            If you came this far, <span className="font-serif-italic font-normal text-[#FF6B4A] px-1">push your count!</span>
          </h3>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            Made it to the bottom of the contact page? Smash the punch button below to add your count!
          </p>

          {/* Main Punch Button */}
          <div className="pt-6 relative inline-block">
            <motion.button
              whileHover={{ scale: 1.06, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.88, rotate: Math.random() > 0.5 ? -8 : 8 }}
              onClick={handlePunch}
              className={`relative z-10 px-8 py-5 rounded-2xl font-black text-lg sm:text-xl text-white shadow-xl transition-all flex items-center justify-center space-x-3 mx-auto select-none cursor-pointer ${
                isBruhMode
                  ? 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 shadow-red-500/30'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-blue-500/30'
              }`}
            >
              <FaFistRaised className="text-2xl sm:text-3xl animate-bounce" />
              <span>{isBruhMode ? "PUNCH AGAIN! 👊" : "PUNCH ME! 🥊"}</span>
            </motion.button>

            {/* Floating Particles */}
            <AnimatePresence>
              {particles.map(p => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8, x: p.x }}
                  animate={{ opacity: 0, y: -70, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute pointer-events-none text-base sm:text-lg font-black text-[#FF6B4A] drop-shadow-[0_0_10px_rgba(255,107,74,0.8)] z-20 whitespace-nowrap"
                  style={{ left: `calc(50% + ${p.x}px)`, top: '10px' }}
                >
                  {p.text}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Spam / Bruh Notification Banner */}
          {isBruhMode && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs sm:text-sm font-black tracking-wide"
            >
              <span>BRUH! You spamming that punch button? Respect! 👊🔥</span>
            </motion.div>
          )}

          {/* Punch Counter Stats */}
          <div className="pt-6 grid grid-cols-2 gap-4 max-w-xs mx-auto text-center border-t border-white/10 dark:border-gray-800/80">
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white font-mono">{totalPunches.toLocaleString()}</p>
              <p className="text-[11px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">Total Visitor Punches</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#FF6B4A] font-mono">{userPunches}</p>
              <p className="text-[11px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">Your Punches</p>
            </div>
          </div>

          {/* Rank Badge */}
          {userPunches > 0 && (
            <div className="pt-2">
              <span className={`inline-flex items-center space-x-1 text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 dark:bg-gray-800/50 ${badge.color}`}>
                <badge.icon className="mr-1" />
                <span>Rank: {badge.label}</span>
              </span>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  )
}

export default PunchButton
