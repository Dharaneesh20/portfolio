import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getBlogPosts } from '../services/api'
import CloudLogo from '../components/CloudLogo'
import { FaCalendar, FaUser } from 'react-icons/fa'

interface BlogPost {
  _id: string
  title: string
  content: string
  excerpt: string
  author: string
  date: string
  cloudProvider?: string
  image?: string
  imageUrl?: string
  tags: string[]
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await getBlogPosts()
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleExpand = (postId: string) => {
    const newExpanded = new Set(expandedPosts)
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId)
    } else {
      newExpanded.add(postId)
    }
    setExpandedPosts(newExpanded)
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
        Blog & Cloud Events
      </motion.h1>

      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        {posts.map((post, index) => (
          <motion.article
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="md:flex gap-6">
              {(post.imageUrl || post.image) && (
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <img
                    src={post.imageUrl || post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  {post.cloudProvider && (
                    <CloudLogo provider={post.cloudProvider} size="text-2xl" />
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center">
                    <FaUser className="mr-2" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <FaCalendar className="mr-2" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {expandedPosts.has(post._id) ? post.content : post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => toggleExpand(post._id)}
                  className="text-primary-light dark:text-primary-dark hover:underline font-semibold transition-all"
                >
                  {expandedPosts.has(post._id) ? '← Show Less' : 'Read More →'}
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No blog posts yet. Stay tuned!
          </p>
        </div>
      )}
    </div>
  )
}

export default Blog
