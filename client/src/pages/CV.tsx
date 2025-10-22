import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCV } from '../services/api'
import { FaBriefcase, FaGraduationCap, FaCode, FaAward, FaDownload } from 'react-icons/fa'

interface Experience {
  title: string
  company: string
  period: string
  description: string[]
}

interface Education {
  degree: string
  institution: string
  year: string
}

interface Skill {
  category: string
  items: string[]
}

interface CVData {
  name: string
  title: string
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  achievements: string[]
}

const CV = () => {
  const [cvData, setCvData] = useState<CVData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCV()
  }, [])

  const fetchCV = async () => {
    try {
      const response = await getCV()
      setCvData(response.data)
    } catch (error) {
      console.error('Error fetching CV:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    )
  }

  if (!cvData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          CV data not available.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-bold mb-2">{cvData.name}</h1>
            <p className="text-2xl text-primary-light dark:text-primary-dark mb-4">
              {cvData.title}
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <FaDownload className="mr-2" />
            Download CV
          </button>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          {cvData.summary}
        </p>
      </motion.div>

      {/* Experience */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <FaBriefcase className="mr-3 text-primary-light dark:text-primary-dark" />
          Experience
        </h2>
        <div className="space-y-6">
          {cvData.experience.map((exp, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="text-primary-light dark:text-primary-dark font-semibold">
                {exp.company}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {exp.period}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <FaGraduationCap className="mr-3 text-primary-light dark:text-primary-dark" />
          Education
        </h2>
        <div className="space-y-4">
          {cvData.education.map((edu, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-bold">{edu.degree}</h3>
              <p className="text-primary-light dark:text-primary-dark">
                {edu.institution}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <FaCode className="mr-3 text-primary-light dark:text-primary-dark" />
          Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {cvData.skills.map((skillSet, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-bold mb-3">{skillSet.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillSet.items.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <FaAward className="mr-3 text-primary-light dark:text-primary-dark" />
          Achievements
        </h2>
        <div className="card">
          <ul className="space-y-3">
            {cvData.achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start text-gray-600 dark:text-gray-400"
              >
                <span className="text-primary-light dark:text-primary-dark mr-3 mt-1">
                  ✓
                </span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </div>
  )
}

export default CV
