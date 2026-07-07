import { motion } from 'framer-motion'

interface LiquidGlassBackgroundProps {
  variant?: 'hero' | 'insights' | 'cta' | 'default'
}

export const LiquidGlassBackground = ({ variant = 'default' }: LiquidGlassBackgroundProps) => {
  const getOrbConfigs = () => {
    switch (variant) {
      case 'hero':
        return [
          {
            size: 'w-[32rem] h-[32rem] md:w-[48rem] md:h-[48rem]',
            color: 'from-blue-400/10 to-indigo-500/15 dark:from-blue-600/5 dark:to-indigo-600/8',
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            duration: 25,
            left: 'left-[2%]',
            top: 'top-[5%]'
          },
          {
            size: 'w-[36rem] h-[36rem] md:w-[52rem] md:h-[52rem]',
            color: 'from-purple-400/10 to-pink-500/10 dark:from-purple-600/5 dark:to-pink-600/5',
            x: [0, -30, 40, 0],
            y: [0, 40, -40, 0],
            duration: 30,
            right: 'right-[5%]',
            top: 'top-[10%]',
            delay: 2
          },
          {
            size: 'w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem]',
            color: 'from-emerald-400/10 to-teal-400/10 dark:from-emerald-600/5 dark:to-teal-600/5',
            x: [0, 30, -30, 0],
            y: [0, 50, -25, 0],
            duration: 22,
            left: 'left-[15%]',
            bottom: 'bottom-[10%]',
            delay: 4
          }
        ]
      case 'insights':
        return [
          {
            size: 'w-[36rem] h-[36rem] md:w-[48rem] md:h-[48rem]',
            color: 'from-emerald-400/8 to-teal-500/10 dark:from-emerald-600/3 dark:to-teal-600/5',
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            duration: 28,
            left: 'left-[5%]',
            top: 'top-[15%]'
          },
          {
            size: 'w-[36rem] h-[36rem] md:w-[50rem] md:h-[50rem]',
            color: 'from-blue-400/8 to-purple-400/8 dark:from-blue-600/3 dark:to-purple-600/3',
            x: [0, -25, 30, 0],
            y: [0, 30, -30, 0],
            duration: 32,
            right: 'right-[8%]',
            bottom: 'bottom-[10%]',
            delay: 2
          }
        ]
      case 'cta':
        return [
          {
            size: 'w-[32rem] h-[32rem] md:w-[45rem] md:h-[45rem]',
            color: 'from-blue-500/12 to-purple-500/12 dark:from-blue-600/5 dark:to-purple-600/5',
            x: [0, 40, -40, 0],
            y: [0, -30, 40, 0],
            duration: 20,
            left: 'left-[20%]',
            top: 'top-[5%]'
          }
        ]
      default:
        return [
          {
            size: 'w-[30rem] h-[30rem] md:w-[42rem] md:h-[42rem]',
            color: 'from-blue-400/8 to-indigo-400/8 dark:from-blue-600/3 dark:to-indigo-600/3',
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            duration: 28,
            left: 'left-[10%]',
            top: 'top-[15%]'
          }
        ]
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none w-full">
      {/* Subtle blueprint dot grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] w-full" />

      {/* Atmospheric Radial Color Blooms */}
      {getOrbConfigs().map((orb, index) => (
        <motion.div
          key={`orb-${index}`}
          animate={{
            x: orb.x,
            y: orb.y,
            scale: [1, 1.03, 0.97, 1],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay || 0
          }}
          className={`absolute rounded-full bg-gradient-to-tr ${orb.color} blur-[110px] md:blur-[160px] mix-blend-screen dark:mix-blend-normal ${orb.size} ${
            orb.left || ''
          } ${orb.right || ''} ${orb.top || ''} ${orb.bottom || ''}`}
        />
      ))}
    </div>
  )
}
export default LiquidGlassBackground
