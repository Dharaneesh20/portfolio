import { 
  SiFlask, 
  SiDjango, 
  SiNodedotjs, 
  SiVite, 
  SiReact, 
  SiNextdotjs,
  SiSpringboot,
  SiTerraform,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiTensorflow,
  SiPytorch,
  SiExpress,
  SiFastapi,
  SiAngular,
  SiVuedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiGraphql,
  SiFirebase,
  SiApachecassandra,
  SiSqlite
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { TbBrandReactNative } from 'react-icons/tb'

interface FrameworkLogoProps {
  framework: string
  size?: string
  showLabel?: boolean
}

const FrameworkLogo = ({ framework, size = 'text-2xl', showLabel = false }: FrameworkLogoProps) => {
  const logos: { [key: string]: { icon: JSX.Element; color: string; label: string } } = {
    flask: {
      icon: <SiFlask className={size} />,
      color: 'text-gray-800 dark:text-white',
      label: 'Flask'
    },
    django: {
      icon: <SiDjango className={size} />,
      color: 'text-green-700 dark:text-green-500',
      label: 'Django'
    },
    nodejs: {
      icon: <SiNodedotjs className={size} />,
      color: 'text-green-600',
      label: 'Node.js'
    },
    vite: {
      icon: <SiVite className={size} />,
      color: 'text-purple-600',
      label: 'Vite'
    },
    react: {
      icon: <SiReact className={size} />,
      color: 'text-blue-400',
      label: 'React'
    },
    reactnative: {
      icon: <TbBrandReactNative className={size} />,
      color: 'text-blue-500',
      label: 'React Native'
    },
    nextjs: {
      icon: <SiNextdotjs className={size} />,
      color: 'text-gray-900 dark:text-white',
      label: 'Next.js'
    },
    springboot: {
      icon: <SiSpringboot className={size} />,
      color: 'text-green-600',
      label: 'Spring Boot'
    },
    java: {
      icon: <FaJava className={size} />,
      color: 'text-red-600',
      label: 'Java'
    },
    javafx: {
      icon: <FaJava className={size} />,
      color: 'text-orange-600',
      label: 'JavaFX'
    },
    terraform: {
      icon: <SiTerraform className={size} />,
      color: 'text-purple-600',
      label: 'Terraform'
    },
    scikitlearn: {
      icon: <SiScikitlearn className={size} />,
      color: 'text-orange-500',
      label: 'Scikit-Learn'
    },
    pandas: {
      icon: <SiPandas className={size} />,
      color: 'text-blue-800 dark:text-blue-400',
      label: 'Pandas'
    },
    numpy: {
      icon: <SiNumpy className={size} />,
      color: 'text-blue-600',
      label: 'NumPy'
    },
    tensorflow: {
      icon: <SiTensorflow className={size} />,
      color: 'text-orange-600',
      label: 'TensorFlow'
    },
    pytorch: {
      icon: <SiPytorch className={size} />,
      color: 'text-red-600',
      label: 'PyTorch'
    },
    express: {
      icon: <SiExpress className={size} />,
      color: 'text-gray-800 dark:text-white',
      label: 'Express'
    },
    fastapi: {
      icon: <SiFastapi className={size} />,
      color: 'text-teal-600',
      label: 'FastAPI'
    },
    angular: {
      icon: <SiAngular className={size} />,
      color: 'text-red-600',
      label: 'Angular'
    },
    vue: {
      icon: <SiVuedotjs className={size} />,
      color: 'text-green-600',
      label: 'Vue.js'
    },
    tailwind: {
      icon: <SiTailwindcss className={size} />,
      color: 'text-cyan-500',
      label: 'Tailwind CSS'
    },
    bootstrap: {
      icon: <SiBootstrap className={size} />,
      color: 'text-purple-600',
      label: 'Bootstrap'
    },
    mongodb: {
      icon: <SiMongodb className={size} />,
      color: 'text-green-600',
      label: 'MongoDB'
    },
    postgresql: {
      icon: <SiPostgresql className={size} />,
      color: 'text-blue-700',
      label: 'PostgreSQL'
    },
    mysql: {
      icon: <SiMysql className={size} />,
      color: 'text-blue-600',
      label: 'MySQL'
    },
    redis: {
      icon: <SiRedis className={size} />,
      color: 'text-red-600',
      label: 'Redis'
    },
    graphql: {
      icon: <SiGraphql className={size} />,
      color: 'text-pink-600',
      label: 'GraphQL'
    },
    firebase: {
      icon: <SiFirebase className={size} />,
      color: 'text-yellow-600',
      label: 'Firebase'
    },
    mongodbatlas: {
      icon: <SiMongodb className={size} />,
      color: 'text-green-600',
      label: 'MongoDB Atlas'
    },
    cassandra: {
      icon: <SiApachecassandra className={size} />,
      color: 'text-blue-700',
      label: 'Apache Cassandra'
    },
    apachecassandra: {
      icon: <SiApachecassandra className={size} />,
      color: 'text-blue-700',
      label: 'Apache Cassandra'
    },
    sqlite: {
      icon: <SiSqlite className={size} />,
      color: 'text-blue-600',
      label: 'SQLite'
    }
  }

  const frameworkKey = framework.toLowerCase().replace(/\s+/g, '').replace(/\./g, '').replace(/-/g, '')
  const logo = logos[frameworkKey]

  if (!logo) {
    // Fallback: show text if logo not found
    return (
      <div className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">
        {framework}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`${logo.color} transition-transform hover:scale-110`} title={logo.label}>
        {logo.icon}
      </div>
      {showLabel && (
        <span className="text-sm font-medium">{logo.label}</span>
      )}
    </div>
  )
}

export default FrameworkLogo
