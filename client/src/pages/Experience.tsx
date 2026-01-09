import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getExperiences } from '../services/api'
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaCertificate } from 'react-icons/fa'
import ImageModal from '../components/ImageModal'

interface Project {
  name: string
  description: string
}

interface Experience {
  _id: string
  company: string
  companyLogo?: string
  role: string
  duration: string
  location?: string
  certificateImage?: string
  certificateImageUrl?: string
  projects: Project[]
  techStack: string[]
  learningCurve?: string
  summary?: string
  type: 'internship' | 'full-time' | 'part-time' | 'contract'
  startDate?: string
  endDate?: string
  current: boolean
}

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await getExperiences()
      setExperiences(response.data)
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship':
        return 'bg-blue-500'
      case 'full-time':
        return 'bg-green-500'
      case 'part-time':
        return 'bg-yellow-500'
      case 'contract':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

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
        Professional Experience
      </motion.h1>

      <div className="max-w-5xl mx-auto mt-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp._id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="mb-12 relative"
          >
            {/* Timeline line */}
            {index !== experiences.length - 1 && (
              <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600 hidden md:block"></div>
            )}

            <div className="card relative">
              {/* Timeline dot */}
              <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-primary-light dark:bg-primary-dark border-4 border-white dark:border-gray-800 hidden md:block"></div>

              {/* Type badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${getTypeColor(exp.type)}`}>
                {exp.type.toUpperCase()}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Left column - Main info */}
                <div className="md:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    {exp.companyLogo && (
                      <img
                        src={exp.companyLogo}
                        alt={`${exp.company} logo`}
                        className="w-16 h-16 object-contain rounded-lg bg-white dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                      <p className="text-xl text-primary-light dark:text-primary-dark font-semibold mb-3">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-sm" />
                      <span>{exp.duration}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-sm" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Summary/Learning Curve */}
                  {(exp.summary || exp.learningCurve) && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-lg mb-2">Learning Experience</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {exp.summary || exp.learningCurve}
                      </p>
                    </div>
                  )}

                  {/* Projects */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <FaBriefcase />
                        Projects Worked On
                      </h4>
                      <div className="space-y-3">
                        {exp.projects.map((project, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"
                          >
                            <h5 className="font-semibold text-primary-light dark:text-primary-dark mb-1">
                              {project.name}
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {project.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {exp.techStack && exp.techStack.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right column - Certificate */}
                {(exp.certificateImageUrl || exp.certificateImage) && (
                  <div className="md:col-span-1">
                    <div className="sticky top-24">
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <FaCertificate />
                        Certificate
                      </h4>
                      <div
                        className="relative cursor-pointer group rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-primary-light dark:hover:border-primary-dark transition-all"
                        onClick={() =>
                          setSelectedImage({
                            url: exp.certificateImageUrl || exp.certificateImage || '',
                            title: `${exp.company} - ${exp.role} Certificate`,
                          })
                        }
                      >
                        <img
                          src={exp.certificateImageUrl || exp.certificateImage}
                          alt={`${exp.company} Certificate`}
                          className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to view
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-20">
          <FaBriefcase className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No experience added yet.
          </p>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ''}
        title={selectedImage?.title || ''}
      />
    </div>
  )
}

export default Experience
