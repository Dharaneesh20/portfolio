import { FaAws, FaMicrosoft, FaRedhat, FaGithub } from 'react-icons/fa'
import { SiMongodb, SiKubernetes, SiGooglecloud, SiDocker, SiNvidia } from 'react-icons/si'
import { DiJava } from 'react-icons/di'

interface CloudLogoProps {
  provider: string
  size?: string
}

const CloudLogo = ({ provider, size = 'text-3xl' }: CloudLogoProps) => {
  const logos: { [key: string]: { icon: JSX.Element; color: string } } = {
    aws: {
      icon: <FaAws className={size} />,
      color: 'text-accent-aws',
    },
    azure: {
      icon: <FaMicrosoft className={size} />,
      color: 'text-accent-azure',
    },
    mongodb: {
      icon: <SiMongodb className={size} />,
      color: 'text-accent-mongodb',
    },
    redhat: {
      icon: <FaRedhat className={size} />,
      color: 'text-accent-redhat',
    },
    kubernetes: {
      icon: <SiKubernetes className={size} />,
      color: 'text-accent-kubernetes',
    },
    gcp: {
      icon: <SiGooglecloud className={size} />,
      color: 'text-blue-500',
    },
    docker: {
      icon: <SiDocker className={size} />,
      color: 'text-blue-400',
    },
    github: {
      icon: <FaGithub className={size} />,
      color: 'text-gray-800 dark:text-white',
    },
    ibm: {
      icon: <DiJava className={size} />,
      color: 'text-blue-600',
    },
    nvidia: {
      icon: <SiNvidia className={size} />,
      color: 'text-green-500',
    },
  }

  const providerKey = provider.toLowerCase()
  const logo = logos[providerKey]

  if (!logo) {
    return null
  }

  return (
    <div className={`${logo.color} transition-transform hover:scale-110`}>
      {logo.icon}
    </div>
  )
}

export default CloudLogo
