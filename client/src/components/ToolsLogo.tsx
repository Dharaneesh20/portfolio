import { 
  FaGithub,
  FaDocker,
  FaAndroid,
  FaGitAlt
} from 'react-icons/fa'
import { 
  SiJenkins,
  SiVisualstudiocode,
  SiIntellijidea,
  SiPycharm,
  SiWebstorm,
  SiPostman,
  SiJira,
  SiSlack,
  SiTrello,
  SiNotion,
  SiFigma,
  SiGitlab,
  SiBitbucket,
  SiCircleci,
  SiTravisci,
  SiKubernetes,
  SiPrometheus,
  SiGrafana,
  SiElasticsearch,
  SiApachekafka,
  SiRabbitmq,
  SiNginx,
  SiApache
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

interface ToolsLogoProps {
  tool: string
  size?: string
  showLabel?: boolean
}

const ToolsLogo = ({ tool, size = 'text-2xl', showLabel = false }: ToolsLogoProps) => {
  const logos: { [key: string]: { icon: JSX.Element; color: string; label: string } } = {
    github: {
      icon: <FaGithub className={size} />,
      color: 'text-gray-900 dark:text-white',
      label: 'GitHub'
    },
    docker: {
      icon: <FaDocker className={size} />,
      color: 'text-blue-500',
      label: 'Docker'
    },
    jenkins: {
      icon: <SiJenkins className={size} />,
      color: 'text-red-600',
      label: 'Jenkins'
    },
    androidstudio: {
      icon: <FaAndroid className={size} />,
      color: 'text-green-600',
      label: 'Android Studio'
    },
    vscode: {
      icon: <VscVscode className={size} />,
      color: 'text-blue-600',
      label: 'VS Code'
    },
    intellijidea: {
      icon: <SiIntellijidea className={size} />,
      color: 'text-purple-600',
      label: 'IntelliJ IDEA'
    },
    pycharm: {
      icon: <SiPycharm className={size} />,
      color: 'text-green-600',
      label: 'PyCharm'
    },
    webstorm: {
      icon: <SiWebstorm className={size} />,
      color: 'text-blue-600',
      label: 'WebStorm'
    },
    postman: {
      icon: <SiPostman className={size} />,
      color: 'text-orange-600',
      label: 'Postman'
    },
    git: {
      icon: <FaGitAlt className={size} />,
      color: 'text-orange-600',
      label: 'Git'
    },
    gitlab: {
      icon: <SiGitlab className={size} />,
      color: 'text-orange-700',
      label: 'GitLab'
    },
    bitbucket: {
      icon: <SiBitbucket className={size} />,
      color: 'text-blue-700',
      label: 'Bitbucket'
    },
    jira: {
      icon: <SiJira className={size} />,
      color: 'text-blue-600',
      label: 'Jira'
    },
    slack: {
      icon: <SiSlack className={size} />,
      color: 'text-purple-600',
      label: 'Slack'
    },
    trello: {
      icon: <SiTrello className={size} />,
      color: 'text-blue-600',
      label: 'Trello'
    },
    notion: {
      icon: <SiNotion className={size} />,
      color: 'text-gray-900 dark:text-white',
      label: 'Notion'
    },
    figma: {
      icon: <SiFigma className={size} />,
      color: 'text-pink-600',
      label: 'Figma'
    },
    kubernetes: {
      icon: <SiKubernetes className={size} />,
      color: 'text-blue-600',
      label: 'Kubernetes'
    },
    circleci: {
      icon: <SiCircleci className={size} />,
      color: 'text-gray-900 dark:text-white',
      label: 'CircleCI'
    },
    travisci: {
      icon: <SiTravisci className={size} />,
      color: 'text-yellow-600',
      label: 'Travis CI'
    },
    prometheus: {
      icon: <SiPrometheus className={size} />,
      color: 'text-orange-600',
      label: 'Prometheus'
    },
    grafana: {
      icon: <SiGrafana className={size} />,
      color: 'text-orange-600',
      label: 'Grafana'
    },
    elasticsearch: {
      icon: <SiElasticsearch className={size} />,
      color: 'text-teal-600',
      label: 'Elasticsearch'
    },
    kafka: {
      icon: <SiApachekafka className={size} />,
      color: 'text-gray-900 dark:text-white',
      label: 'Apache Kafka'
    },
    apachekafka: {
      icon: <SiApachekafka className={size} />,
      color: 'text-gray-900 dark:text-white',
      label: 'Apache Kafka'
    },
    rabbitmq: {
      icon: <SiRabbitmq className={size} />,
      color: 'text-orange-600',
      label: 'RabbitMQ'
    },
    nginx: {
      icon: <SiNginx className={size} />,
      color: 'text-green-600',
      label: 'Nginx'
    },
    apache: {
      icon: <SiApache className={size} />,
      color: 'text-red-600',
      label: 'Apache'
    }
  }

  const toolKey = tool.toLowerCase().replace(/\s+/g, '').replace(/\./g, '').replace(/-/g, '')
  const logo = logos[toolKey]

  if (!logo) {
    // Fallback: show text if logo not found
    return (
      <div className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">
        {tool}
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

export default ToolsLogo
