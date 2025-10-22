import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    toast.success('Message sent successfully! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title"
      >
        Get In Touch
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions. Feel free to reach out!
          </p>

          <div className="space-y-6">
            <a
              href="mailto:dharaneesh@example.com"
              className="flex items-center space-x-4 text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              <div className="bg-primary-light dark:bg-primary-dark text-white p-4 rounded-full">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm">dharaneesh@example.com</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/dharaneeshrs-clouddev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              <div className="bg-primary-light dark:bg-primary-dark text-white p-4 rounded-full">
                <FaLinkedin className="text-xl" />
              </div>
              <div>
                <p className="font-semibold">LinkedIn</p>
                <p className="text-sm">dharaneeshrs-clouddev</p>
              </div>
            </a>

            <a
              href="https://github.com/Dharaneesh20"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              <div className="bg-primary-light dark:bg-primary-dark text-white p-4 rounded-full">
                <FaGithub className="text-xl" />
              </div>
              <div>
                <p className="font-semibold">GitHub</p>
                <p className="text-sm">Dharaneesh20</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark resize-none"
              ></textarea>
            </div>

            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
