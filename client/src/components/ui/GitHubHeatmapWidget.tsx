import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaFire, FaCodeBranch } from 'react-icons/fa'

export function GitHubHeatmapWidget() {
  // Generate stylized 52-week contribution grid (approx 52 columns x 7 rows)
  const weeks = useMemo(() => {
    const cols = 52
    const grid: number[][] = []
    for (let c = 0; c < cols; c++) {
      const col: number[] = []
      for (let r = 0; r < 7; r++) {
        // Pseudo-random realistic contribution levels (0 to 4)
        const rand = Math.random()
        if (rand > 0.82) col.push(4) // dark green/blue
        else if (rand > 0.65) col.push(3)
        else if (rand > 0.45) col.push(2)
        else if (rand > 0.25) col.push(1)
        else col.push(0)
      }
      grid.push(col)
    }
    return grid
  }, [])

  const getColorClass = (level: number) => {
    switch (level) {
      case 4: return 'bg-blue-500 shadow-xs shadow-blue-500/50'
      case 3: return 'bg-blue-600/80'
      case 2: return 'bg-indigo-600/60'
      case 1: return 'bg-indigo-900/40 dark:bg-indigo-950/60'
      default: return 'bg-gray-200 dark:bg-gray-800/40'
    }
  }

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
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-mono">52 Weeks</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">@Dharaneesh20 • Continuous codebase construction</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono text-gray-600 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <FaFire className="text-orange-500" />
            <span>Streak: <strong className="text-gray-900 dark:text-white">42 Days</strong></span>
          </span>
          <span className="flex items-center space-x-1">
            <FaCodeBranch className="text-blue-500" />
            <span>Total: <strong className="text-gray-900 dark:text-white">1,480+ Commits</strong></span>
          </span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex space-x-1 min-w-[650px] justify-between">
          {weeks.map((col, cIdx) => (
            <div key={cIdx} className="flex flex-col space-y-1">
              {col.map((level, rIdx) => (
                <div
                  key={rIdx}
                  className={`w-2.5 h-2.5 rounded-xs transition-all duration-200 hover:scale-125 ${getColorClass(level)}`}
                  title={`Level ${level} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400 pt-1">
        <span>Learn more on github.com/Dharaneesh20</span>
        <div className="flex items-center space-x-1.5">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-xs bg-gray-200 dark:bg-gray-800/40" />
          <div className="w-2.5 h-2.5 rounded-xs bg-indigo-900/40" />
          <div className="w-2.5 h-2.5 rounded-xs bg-indigo-600/60" />
          <div className="w-2.5 h-2.5 rounded-xs bg-blue-600/80" />
          <div className="w-2.5 h-2.5 rounded-xs bg-blue-500" />
          <span>More</span>
        </div>
      </div>
    </motion.div>
  )
}

export default GitHubHeatmapWidget
