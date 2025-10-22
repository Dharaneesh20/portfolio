import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getProjects } from '../services/api'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import CloudLogo from '../components/CloudLogo'

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  cloudProvider?: string
  image?: string
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
  status: 'completed' | 'ongoing' | 'upcoming'
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await getProjects()
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true
    return project.status === filter
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        My Projects
      </motion.h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-12">
        {['all', 'completed', 'ongoing', 'upcoming'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === status
                ? 'bg-primary-light dark:bg-primary-dark text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card relative overflow-hidden"
          >
            {project.cloudProvider && (
              <div className="absolute top-4 right-4 z-10">
                <CloudLogo provider={project.cloudProvider} size="text-2xl" />
              </div>
            )}

            {(project.imageUrl || project.image) && (
              <img
                src={project.imageUrl || project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}

            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
              project.status === 'completed' ? 'bg-green-500' :
              project.status === 'ongoing' ? 'bg-yellow-500' :
              'bg-blue-500'
            } text-white`}>
              {project.status.toUpperCase()}
            </div>

            <h3 className="text-2xl font-bold mb-3 mt-8">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex space-x-4 mt-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-light dark:text-primary-dark hover:underline"
                >
                  <FaGithub className="mr-2" /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-light dark:text-primary-dark hover:underline"
                >
                  <FaExternalLinkAlt className="mr-2" /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No projects found in this category.
          </p>
        </div>
      )}
    </div>
  )
}

export default Projects
