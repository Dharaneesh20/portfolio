import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { 
  FaProjectDiagram, 
  FaCertificate, 
  FaBlog, 
  FaFileAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash,
  FaTimes,
  FaSignOutAlt
} from 'react-icons/fa'
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../services/api'

type Section = 'dashboard' | 'projects' | 'certifications' | 'blog' | 'cv'

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [projects, setProjects] = useState<any[]>([])
  const [certifications, setCertifications] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (isLoggedIn) {
      loadData()
    }
  }, [isLoggedIn, activeSection])

  const loadData = async () => {
    try {
      if (activeSection === 'projects') {
        const res = await getProjects()
        setProjects(res.data)
      } else if (activeSection === 'certifications') {
        const res = await getCertifications()
        setCertifications(res.data)
      } else if (activeSection === 'blog') {
        const res = await getBlogPosts()
        setBlogPosts(res.data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === 'admin' && credentials.password === 'changeme123') {
      setIsLoggedIn(true)
      toast.success('Welcome back! 🎉')
    } else {
      toast.error('Invalid credentials')
    }
  }

  const handleAdd = () => {
    setEditingItem(null)
    setFormData({})
    setShowModal(true)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setFormData(item)
    setShowModal(true)
  }

  const handleDelete = async (id: string, type: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    
    try {
      if (type === 'project') await deleteProject(id)
      else if (type === 'certification') await deleteCertification(id)
      else if (type === 'blog') await deleteBlogPost(id)
      
      toast.success('Deleted successfully!')
      loadData()
    } catch (error) {
      toast.error('Error deleting item')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const formDataToSend = new FormData()
      Object.keys(formData).forEach(key => {
        if (key === 'technologies' || key === 'tags') {
          formDataToSend.append(key, JSON.stringify(formData[key]))
        } else if (formData[key]) {
          formDataToSend.append(key, formData[key])
        }
      })

      if (activeSection === 'projects') {
        if (editingItem) {
          await updateProject(editingItem._id, formDataToSend)
          toast.success('Project updated!')
        } else {
          await createProject(formDataToSend)
          toast.success('Project created!')
        }
      } else if (activeSection === 'certifications') {
        if (editingItem) {
          await updateCertification(editingItem._id, formDataToSend)
          toast.success('Certification updated!')
        } else {
          await createCertification(formDataToSend)
          toast.success('Certification created!')
        }
      } else if (activeSection === 'blog') {
        if (editingItem) {
          await updateBlogPost(editingItem._id, formDataToSend)
          toast.success('Blog post updated!')
        } else {
          await createBlogPost(formDataToSend)
          toast.success('Blog post created!')
        }
      }

      setShowModal(false)
      loadData()
    } catch (error) {
      toast.error('Error saving item')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card max-w-md w-full mx-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSignOutAlt className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your credentials to continue</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="username" className="block text-sm font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  const dashboardCards = [
    { 
      id: 'projects', 
      icon: FaProjectDiagram, 
      title: 'Projects', 
      desc: 'Manage your projects',
      color: 'from-blue-500 to-cyan-500',
      count: projects.length
    },
    { 
      id: 'certifications', 
      icon: FaCertificate, 
      title: 'Certifications', 
      desc: 'Add certifications',
      color: 'from-purple-500 to-pink-500',
      count: certifications.length
    },
    { 
      id: 'blog', 
      icon: FaBlog, 
      title: 'Blog Posts', 
      desc: 'Write new posts',
      color: 'from-orange-500 to-red-500',
      count: blogPosts.length
    },
    { 
      id: 'cv', 
      icon: FaFileAlt, 
      title: 'CV', 
      desc: 'Update your CV',
      color: 'from-green-500 to-teal-500',
      count: 1
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your portfolio content</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsLoggedIn(false)
              setActiveSection('dashboard')
              toast.info('Logged out successfully')
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </motion.button>
        </motion.div>

        {/* Dashboard View */}
        {activeSection === 'dashboard' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(card.id as Section)}
                className="card cursor-pointer relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className="text-2xl text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{card.desc}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-light dark:text-primary-dark">
                      {card.count}
                    </span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-primary-light dark:text-primary-dark font-semibold"
                    >
                      Manage →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Projects Management */}
        {activeSection === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setActiveSection('dashboard')}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark"
              >
                ← Back to Dashboard
              </button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="btn-primary flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Project</span>
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="card"
                  >
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(project)}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(project._id, 'project')}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Similar sections for Certifications and Blog */}
        {activeSection === 'certifications' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setActiveSection('dashboard')}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark"
              >
                ← Back to Dashboard
              </button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="btn-primary flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Certification</span>
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="card"
                  >
                    <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{cert.issuer}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {new Date(cert.date).toLocaleDateString()}
                    </p>
                    
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(cert)}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(cert._id, 'certification')}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {activeSection === 'blog' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setActiveSection('dashboard')}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark"
              >
                ← Back to Dashboard
              </button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="btn-primary flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Blog Post</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="card"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{post.excerpt}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString()} • {post.author}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(post)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          <FaEdit />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(post._id, 'blog')}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {activeSection === 'cv' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
          >
            <button
              onClick={() => setActiveSection('dashboard')}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark mb-6"
            >
              ← Back to Dashboard
            </button>
            
            <h2 className="text-2xl font-bold mb-4">CV Management</h2>
            <p className="text-gray-600 dark:text-gray-400">
              CV management interface coming soon. For now, you can update your CV data directly through the API.
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingItem ? 'Edit' : 'Add'} {activeSection.slice(0, -1)}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  required
                />

                <textarea
                  placeholder="Description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-h-[100px]"
                  required
                />

                <select
                  value={formData.cloudProvider || ''}
                  onChange={(e) => setFormData({ ...formData, cloudProvider: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                >
                  <option value="">Select Cloud Provider</option>
                  <option value="aws">AWS</option>
                  <option value="azure">Azure</option>
                  <option value="mongodb">MongoDB</option>
                  <option value="kubernetes">Kubernetes</option>
                  <option value="redhat">Red Hat</option>
                  <option value="gcp">Google Cloud</option>
                  <option value="docker">Docker</option>
                </select>

                <div className="flex space-x-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 btn-primary"
                  >
                    {editingItem ? 'Update' : 'Create'}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Admin
