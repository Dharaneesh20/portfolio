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
  FaSignOutAlt,
  FaCode
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
  deleteBlogPost,
  getCV,
  updateCV,
  getCodingProgress,
  createCodingProgress,
  updateCodingProgress,
  deleteCodingProgress
} from '../services/api'

type Section = 'dashboard' | 'projects' | 'certifications' | 'blog' | 'cv' | 'coding-progress'

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [projects, setProjects] = useState<any[]>([])
  const [certifications, setCertifications] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [cvData, setCvData] = useState<any>(null)
  const [codingProgress, setCodingProgress] = useState<any[]>([])
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
      } else if (activeSection === 'cv') {
        const res = await getCV()
        setCvData(res.data)
      } else if (activeSection === 'coding-progress') {
        const res = await getCodingProgress()
        setCodingProgress(res.data)
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
      else if (type === 'coding-progress') await deleteCodingProgress(id)
      
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
      } else if (activeSection === 'coding-progress') {
        if (editingItem) {
          await updateCodingProgress(editingItem._id, formData)
          toast.success('Coding progress updated!')
        } else {
          await createCodingProgress(formData)
          toast.success('Coding progress created!')
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
    { 
      id: 'coding-progress', 
      icon: FaCode, 
      title: 'Coding Progress', 
      desc: 'Update platform stats',
      color: 'from-yellow-500 to-amber-500',
      count: codingProgress.length
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
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => setActiveSection('dashboard')}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark mb-6"
            >
              ← Back to Dashboard
            </button>
            
            {cvData && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Edit CV</h2>
                
                <form onSubmit={async (e) => {
                  e.preventDefault()
                  try {
                    await updateCV(cvData)
                    toast.success('CV updated successfully!')
                  } catch (error) {
                    toast.error('Error updating CV')
                  }
                }} className="space-y-6">
                  
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Name"
                        value={cvData.name || ''}
                        onChange={(e) => setCvData({ ...cvData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      />
                      <input
                        type="text"
                        placeholder="Title"
                        value={cvData.title || ''}
                        onChange={(e) => setCvData({ ...cvData, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      />
                      <textarea
                        placeholder="Summary"
                        value={cvData.summary || ''}
                        onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    {cvData.skills?.map((skill: any, idx: number) => (
                      <div key={idx} className="mb-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <input
                          type="text"
                          placeholder="Category"
                          value={skill.category || ''}
                          onChange={(e) => {
                            const newSkills = [...cvData.skills]
                            newSkills[idx].category = e.target.value
                            setCvData({ ...cvData, skills: newSkills })
                          }}
                          className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                        <input
                          type="text"
                          placeholder="Items (comma separated)"
                          value={skill.items?.join(', ') || ''}
                          onChange={(e) => {
                            const newSkills = [...cvData.skills]
                            newSkills[idx].items = e.target.value.split(',').map((s: string) => s.trim())
                            setCvData({ ...cvData, skills: newSkills })
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const newExperience = [...(cvData.experience || []), {
                            title: '',
                            company: '',
                            period: '',
                            description: [],
                            logoUrl: ''
                          }]
                          setCvData({ ...cvData, experience: newExperience })
                        }}
                        className="px-3 py-1 bg-primary-light dark:bg-primary-dark text-white rounded-lg text-sm flex items-center space-x-1"
                      >
                        <FaPlus /> <span>Add Experience</span>
                      </motion.button>
                    </div>
                    {cvData.experience?.map((exp: any, idx: number) => (
                      <div key={idx} className="mb-4 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-primary-light dark:text-primary-dark">Experience #{idx + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const newExperience = cvData.experience.filter((_: any, i: number) => i !== idx)
                              setCvData({ ...cvData, experience: newExperience })
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.title || ''}
                          onChange={(e) => {
                            const newExperience = [...cvData.experience]
                            newExperience[idx].title = e.target.value
                            setCvData({ ...cvData, experience: newExperience })
                          }}
                          className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company || ''}
                          onChange={(e) => {
                            const newExperience = [...cvData.experience]
                            newExperience[idx].company = e.target.value
                            setCvData({ ...cvData, experience: newExperience })
                          }}
                          className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                        <input
                          type="text"
                          placeholder="Period (e.g., 2020 - Present)"
                          value={exp.period || ''}
                          onChange={(e) => {
                            const newExperience = [...cvData.experience]
                            newExperience[idx].period = e.target.value
                            setCvData({ ...cvData, experience: newExperience })
                          }}
                          className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                        <input
                          type="url"
                          placeholder="Company Logo URL (optional)"
                          value={exp.logoUrl || ''}
                          onChange={(e) => {
                            const newExperience = [...cvData.experience]
                            newExperience[idx].logoUrl = e.target.value
                            setCvData({ ...cvData, experience: newExperience })
                          }}
                          className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                        <textarea
                          placeholder="Description (one point per line)"
                          value={exp.description?.join('\n') || ''}
                          onChange={(e) => {
                            const newExperience = [...cvData.experience]
                            newExperience[idx].description = e.target.value.split('\n').filter((d: string) => d.trim())
                            setCvData({ ...cvData, experience: newExperience })
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-h-[100px]"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Education */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Education</h3>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const newEducation = [...(cvData.education || []), {
                            degree: '',
                            institution: '',
                            year: '',
                            logoUrl: ''
                          }]
                          setCvData({ ...cvData, education: newEducation })
                        }}
                        className="px-3 py-1 bg-primary-light dark:bg-primary-dark text-white rounded-lg text-sm flex items-center space-x-1"
                      >
                        <FaPlus /> <span>Add Education</span>
                      </motion.button>
                    </div>
                    {cvData.education?.map((edu: any, idx: number) => (
                      <div key={idx} className="mb-4 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-primary-light dark:text-primary-dark">Education #{idx + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const newEducation = cvData.education.filter((_: any, i: number) => i !== idx)
                              setCvData({ ...cvData, education: newEducation })
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Degree/Course"
                          value={edu.degree || ''}
                          onChange={(e) => {
                            const newEducation = [...cvData.education]
                            newEducation[idx].degree = e.target.value
                            setCvData({ ...cvData, education: newEducation })
                          }}
                          className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                        <input
                          type="text"
                          placeholder="Institution/College/School"
                          value={edu.institution || ''}
                          onChange={(e) => {
                            const newEducation = [...cvData.education]
                            newEducation[idx].institution = e.target.value
                            setCvData({ ...cvData, education: newEducation })
                          }}
                          className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                        <input
                          type="text"
                          placeholder="Year/Period (e.g., 2020 - Present or 2018 - 2022)"
                          value={edu.year || ''}
                          onChange={(e) => {
                            const newEducation = [...cvData.education]
                            newEducation[idx].year = e.target.value
                            setCvData({ ...cvData, education: newEducation })
                          }}
                          className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                        <input
                          type="url"
                          placeholder="Institution Logo URL (optional)"
                          value={edu.logoUrl || ''}
                          onChange={(e) => {
                            const newEducation = [...cvData.education]
                            newEducation[idx].logoUrl = e.target.value
                            setCvData({ ...cvData, education: newEducation })
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                    <textarea
                      placeholder="Achievements (one per line)"
                      value={cvData.achievements?.join('\n') || ''}
                      onChange={(e) => {
                        setCvData({ ...cvData, achievements: e.target.value.split('\n').filter((a: string) => a.trim()) })
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-h-[120px]"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 btn-primary"
                    >
                      Save CV
                    </motion.button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        )}

        {/* Coding Progress Management */}
        {activeSection === 'coding-progress' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setActiveSection('dashboard')}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark"
              >
                <span>← Back to Dashboard</span>
              </button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="btn-primary flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add Platform Progress</span>
              </motion.button>
            </div>

            <div className="grid gap-6">
              {codingProgress.map((platform: any, index: number) => (
                <motion.div
                  key={platform._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{platform.platform}</h3>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Username</p>
                          <p className="font-semibold">{platform.username}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Profile URL</p>
                          <a 
                            href={platform.profileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-light dark:text-primary-dark hover:underline"
                          >
                            View Profile →
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Problems</p>
                          <p className="font-semibold">{platform.totalProblems}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Rank</p>
                          <p className="font-semibold">{platform.rank || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                          <p className="font-semibold">{platform.rating || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                          <p className="font-semibold">{platform.currentStreak || 0} days</p>
                        </div>
                      </div>
                      
                      {platform.stats && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                          <p className="text-sm font-semibold mb-2">Problem Stats:</p>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-green-600 dark:text-green-400">Easy</p>
                              <p className="font-bold">{platform.stats.easy || 0}</p>
                            </div>
                            <div>
                              <p className="text-sm text-yellow-600 dark:text-yellow-400">Medium</p>
                              <p className="font-bold">{platform.stats.medium || 0}</p>
                            </div>
                            <div>
                              <p className="text-sm text-red-600 dark:text-red-400">Hard</p>
                              <p className="font-bold">{platform.stats.hard || 0}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(platform)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(platform._id, 'coding-progress')}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {codingProgress.length === 0 && (
                <div className="text-center py-12">
                  <FaCode className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No coding platform progress yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Click "Add Platform Progress" to get started</p>
                </div>
              )}
            </div>
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

                {/* Certification-specific fields */}
                {activeSection === 'certifications' && (
                  <>
                    <input
                      type="text"
                      placeholder="Issuer (e.g., MongoDB)"
                      value={formData.issuer || ''}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                    <input
                      type="date"
                      placeholder="Date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                    <input
                      type="url"
                      placeholder="Credential URL (optional)"
                      value={formData.credentialUrl || ''}
                      onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                  </>
                )}

                {/* Blog-specific fields */}
                {activeSection === 'blog' && (
                  <>
                    <input
                      type="text"
                      placeholder="Author"
                      value={formData.author || 'Dharaneesh RS'}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                    <textarea
                      placeholder="Excerpt (Brief summary)"
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-h-[80px]"
                      required
                    />
                    <textarea
                      placeholder="Content (Full article)"
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-h-[200px]"
                      required
                    />
                  </>
                )}

                {/* Coding Progress-specific fields */}
                {activeSection === 'coding-progress' && (
                  <>
                    <select
                      value={formData.platform || ''}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      aria-label="Coding Platform"
                      required
                    >
                      <option value="">Select Platform</option>
                      <option value="LeetCode">LeetCode</option>
                      <option value="HackerRank">HackerRank</option>
                      <option value="SkillRack">SkillRack</option>
                      <option value="CodeChef">CodeChef</option>
                      <option value="Codeforces">Codeforces</option>
                    </select>
                    
                    <input
                      type="text"
                      placeholder="Username"
                      value={formData.username || ''}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                    
                    <input
                      type="url"
                      placeholder="Profile URL"
                      value={formData.profileUrl || ''}
                      onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                    
                    <input
                      type="number"
                      placeholder="Total Problems Solved"
                      value={formData.totalProblems || ''}
                      onChange={(e) => setFormData({ ...formData, totalProblems: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      required
                    />
                    
                    <input
                      type="text"
                      placeholder="Rank (optional)"
                      value={formData.rank || ''}
                      onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                    
                    <input
                      type="number"
                      placeholder="Rating (optional)"
                      value={formData.rating || ''}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                    
                    <input
                      type="number"
                      placeholder="Current Streak (days)"
                      value={formData.currentStreak || ''}
                      onChange={(e) => setFormData({ ...formData, currentStreak: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-3">
                      <p className="font-semibold text-sm">Problem Stats (Optional)</p>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Easy</label>
                          <input
                            type="number"
                            placeholder="0"
                            value={formData.stats?.easy || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              stats: { ...formData.stats, easy: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Medium</label>
                          <input
                            type="number"
                            placeholder="0"
                            value={formData.stats?.medium || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              stats: { ...formData.stats, medium: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Hard</label>
                          <input
                            type="number"
                            placeholder="0"
                            value={formData.stats?.hard || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              stats: { ...formData.stats, hard: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Description field for non-blog items */}
                {activeSection !== 'blog' && activeSection !== 'coding-progress' && (
                  <textarea
                    placeholder="Description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-h-[100px]"
                    required
                  />
                )}

                {/* Cloud Provider field for non-coding-progress items */}
                {activeSection !== 'coding-progress' && (
                  <select
                    value={formData.cloudProvider || ''}
                    onChange={(e) => setFormData({ ...formData, cloudProvider: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    aria-label="Cloud Provider"
                  >
                    <option value="">Select Cloud Provider</option>
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="mongodb">MongoDB</option>
                    <option value="kubernetes">Kubernetes</option>
                    <option value="redhat">Red Hat</option>
                    <option value="gcp">Google Cloud</option>
                    <option value="docker">Docker</option>
                    <option value="github">GitHub</option>
                    <option value="ibm">IBM</option>
                    <option value="nvidia">NVIDIA</option>
                  </select>
                )}

                {/* Image Options - not for coding progress */}
                {activeSection !== 'coding-progress' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold">Image</label>
                    
                    {/* Option 1: External URL */}
                    <div>
                    <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                      Image URL (LinkedIn, external link, etc.)
                    </label>
                    <input
                      type="url"
                      placeholder="https://media.licdn.com/dms/image/..."
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                  </div>

                  {/* OR Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                  </div>

                  {/* Option 2: File Upload */}
                  <div>
                    <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
                      Upload Image File
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setFormData({ ...formData, image: file })
                        }
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                      aria-label="Upload image file"
                    />
                  </div>
                  </div>
                )}

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
