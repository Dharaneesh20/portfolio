import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSpinner, FaCodeBranch, FaClock } from 'react-icons/fa'
import { getCurrentlyBuilding } from '../../services/api'

interface CurrentlyBuildingData {
  title: string
  description: string
  progress: number
  statusBadge: string
  moduleName: string
  targetRelease: string
  isActive?: boolean
}

export function CurrentlyBuildingCard() {
  const [data, setData] = useState<CurrentlyBuildingData>({
    title: 'SCOPE — AI Context Optimization Engine',
    description: 'High-performance prompt compression & context pruning engine designed for LLM agent memory reduction.',
    progress: 82,
    statusBadge: 'Active Labs',
    moduleName: 'Memory Engine',
    targetRelease: 'Q4 2026',
    isActive: true
  })

  useEffect(() => {
    getCurrentlyBuilding()
      .then(res => {
        if (res.data) {
          setData(res.data)
        }
      })
      .catch(err => console.error('Failed to fetch Currently Building info:', err))
  }, [])

  if (data.isActive === false) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card relative overflow-hidden group border border-[#FF6B4A]/30 dark:border-[#FF6B4A]/20"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B4A] via-purple-500 to-blue-500" />

      <div className="space-y-4">
        {/* Header Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B4A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6B4A]" />
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF6B4A]">
              CURRENTLY BUILDING
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center space-x-1">
            <FaSpinner className="animate-spin text-[9px]" />
            <span>{data.statusBadge || 'Active Labs'}</span>
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-snug">
            {data.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-mono font-semibold text-gray-700 dark:text-gray-300">
            <span>Build Progress</span>
            <span className="text-[#FF6B4A]">{data.progress}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${data.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#FF6B4A] via-indigo-500 to-blue-500 rounded-full shadow-sm"
            />
          </div>
        </div>

        {/* Meta Info */}
        <div className="pt-2 border-t border-gray-150 dark:border-gray-800/60 grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <FaCodeBranch className="text-blue-500" />
            <span>Module: {data.moduleName || 'Memory Engine'}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <FaClock className="text-purple-400" />
            <span>Target: {data.targetRelease || 'Q4 2026'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CurrentlyBuildingCard
