import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCertifications } from '../services/api'
import CloudLogo from '../components/CloudLogo'

interface Certification {
  _id: string
  title: string
  issuer: string
  date: string
  cloudProvider?: string
  image?: string
  imageUrl?: string
  credentialUrl?: string
  description: string
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      const response = await getCertifications()
      setCertifications(response.data)
    } catch (error) {
      console.error('Error fetching certifications:', error)
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

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        Certifications
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card relative group hover:scale-105 transition-transform"
          >
            {cert.cloudProvider && (
              <div className="absolute top-4 right-4 z-10">
                <CloudLogo provider={cert.cloudProvider} size="text-3xl" />
              </div>
            )}

            {(cert.imageUrl || cert.image) && (
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={cert.imageUrl || cert.image}
                  alt={cert.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}

            <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{cert.issuer}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              {new Date(cert.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {cert.description}
            </p>

            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto text-primary-light dark:text-primary-dark hover:underline font-semibold"
              >
                View Credential →
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {certifications.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No certifications added yet.
          </p>
        </div>
      )}
    </div>
  )
}

export default Certifications
