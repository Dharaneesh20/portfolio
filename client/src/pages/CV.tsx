import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCV } from '../services/api'
import { FaBriefcase, FaGraduationCap, FaCode, FaAward, FaDownload } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface Experience {
  title: string
  company: string
  period: string
  description: string[]
  logo?: string
  logoUrl?: string
}

interface Education {
  degree: string
  institution: string
  year: string
  logo?: string
  logoUrl?: string
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

  const handleDownloadCV = () => {
    if (!cvData) return

    try {
      // Create a formatted text version of the CV
      let cvText = `${cvData.name}\n${cvData.title}\n\n`
      cvText += `SUMMARY\n${cvData.summary}\n\n`
      
      if (cvData.experience && cvData.experience.length > 0) {
        cvText += `EXPERIENCE\n`
        cvData.experience.forEach((exp: Experience) => {
          cvText += `\n${exp.title} at ${exp.company}\n${exp.period}\n`
          exp.description.forEach((desc: string) => cvText += `• ${desc}\n`)
        })
        cvText += '\n'
      }
      
      if (cvData.education && cvData.education.length > 0) {
        cvText += `EDUCATION\n`
        cvData.education.forEach((edu: Education) => {
          cvText += `${edu.degree}\n${edu.institution}, ${edu.year}\n\n`
        })
      }
      
      if (cvData.skills && cvData.skills.length > 0) {
        cvText += `SKILLS\n`
        cvData.skills.forEach((skill: Skill) => {
          cvText += `${skill.category}: ${skill.items.join(', ')}\n`
        })
        cvText += '\n'
      }
      
      if (cvData.achievements && cvData.achievements.length > 0) {
        cvText += `ACHIEVEMENTS\n`
        cvData.achievements.forEach((achievement: string) => {
          cvText += `• ${achievement}\n`
        })
      }

      // Create and download the file
      const blob = new Blob([cvText], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${cvData.name.replace(/\s+/g, '_')}_CV.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success('CV downloaded successfully!')
    } catch (error) {
      console.error('Error downloading CV:', error)
      toast.error('Failed to download CV')
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
          <button className="btn-primary flex items-center" onClick={handleDownloadCV}>
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
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <p className="text-primary-light dark:text-primary-dark font-semibold">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {exp.period}
                  </p>
                </div>
                {(exp.logoUrl || exp.logo) && (
                  <img
                    src={exp.logoUrl || exp.logo}
                    alt={exp.company}
                    className="w-16 h-16 object-contain rounded-lg border border-gray-200 dark:border-gray-700 p-2"
                  />
                )}
              </div>
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
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-primary-light dark:text-primary-dark">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</p>
                </div>
                {(edu.logoUrl || edu.logo) && (
                  <img
                    src={edu.logoUrl || edu.logo}
                    alt={edu.institution}
                    className="w-16 h-16 object-contain rounded-lg border border-gray-200 dark:border-gray-700 p-2"
                  />
                )}
              </div>
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
