import { 
  SiReact, SiTypescript, SiNodedotjs, SiExpress, SiMongodb, 
  SiDocker, SiLinux, SiPython, SiPostgresql, 
  SiRedis, SiTailwindcss, SiGit
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

interface TechItem {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const TECH_STACK: TechItem[] = [
  { name: 'React', icon: SiReact, color: 'text-cyan-400' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-400' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
  { name: 'Express', icon: SiExpress, color: 'text-gray-300' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-emerald-500' },
  { name: 'Docker', icon: SiDocker, color: 'text-blue-400' },
  { name: 'AWS', icon: FaAws, color: 'text-amber-400' },
  { name: 'Linux', icon: SiLinux, color: 'text-yellow-400' },
  { name: 'Python', icon: SiPython, color: 'text-blue-300' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-indigo-400' },
  { name: 'Redis', icon: SiRedis, color: 'text-red-500' },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: 'text-sky-400' },
  { name: 'Git', icon: SiGit, color: 'text-orange-500' },
]

export function TechStackMarquee() {
  return (
    <div className="py-8 border-y border-white/10 dark:border-gray-800/60 overflow-hidden relative bg-white/10 dark:bg-gray-900/20 backdrop-blur-md select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest">
          DEVELOPMENT STACK
        </span>
        <h2 className="text-3xl font-black tracking-tight mt-1 text-gray-900 dark:text-white">
          Tech Stack <span className="font-serif-italic font-normal text-[#FF6B4A] px-1">Worked With</span>
        </h2>
      </div>

      <div className="relative">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-white dark:from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-white dark:from-[#030712] to-transparent z-10 pointer-events-none" />

        <div className="flex space-x-8 animate-marquee whitespace-nowrap">
          {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={`${item.name}-${idx}`}
                className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-white/30 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/40 text-xs font-bold text-gray-800 dark:text-gray-200 transition-all hover:scale-105"
              >
                <Icon className={`text-base ${item.color}`} />
                <span className="font-mono tracking-wide">{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TechStackMarquee
