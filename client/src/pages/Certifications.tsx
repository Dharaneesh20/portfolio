import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCertifications } from '../services/api'
import CloudLogo from '../components/CloudLogo'
import ImageModal from '../components/ImageModal'
import { FaChevronDown, FaSearchPlus } from 'react-icons/fa'

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
  const [selectedProvider, setSelectedProvider] = useState<string>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null)

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

  // Get unique providers
  const providers = ['all', ...new Set(certifications.map(cert => cert.cloudProvider).filter(Boolean) as string[])]

  // Filter certifications based on selected provider
  const filteredCertifications = selectedProvider === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.cloudProvider === selectedProvider)

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

      {/* Provider Filter Dropdown */}
      <div className="max-w-4xl mx-auto mt-8 mb-12">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full md:w-64 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-between hover:border-primary-light dark:hover:border-primary-dark transition-colors shadow-md"
          >
            <div className="flex items-center space-x-3">
              {selectedProvider !== 'all' && (
                <CloudLogo provider={selectedProvider} size="text-2xl" />
              )}
              <span className="font-semibold">
                {selectedProvider === 'all' ? 'All Providers' : selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaChevronDown />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 w-full md:w-64 mt-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl overflow-hidden"
              >
                {providers.map((provider) => (
                  <motion.button
                    key={provider}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                    onClick={() => {
                      setSelectedProvider(provider)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full px-6 py-3 text-left flex items-center space-x-3 transition-colors ${
                      selectedProvider === provider
                        ? 'bg-primary-light/10 dark:bg-primary-dark/10'
                        : ''
                    }`}
                  >
                    {provider !== 'all' && (
                      <CloudLogo provider={provider} size="text-2xl" />
                    )}
                    <span className="font-medium">
                      {provider === 'all' ? 'All Providers' : provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredCertifications.map((cert, index) => (
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
              <div 
                className="mb-4 overflow-hidden rounded-lg relative cursor-pointer group"
                onClick={() => setSelectedImage({ 
                  url: cert.imageUrl || cert.image || '', 
                  title: cert.title 
                })}
              >
                <img
                  src={cert.imageUrl || cert.image}
                  alt={cert.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <FaSearchPlus className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
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

      {filteredCertifications.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {selectedProvider === 'all' 
              ? 'No certifications added yet.' 
              : `No certifications from ${selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)} yet.`}
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

export default Certifications
