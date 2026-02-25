import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import cron from 'node-cron'

// Import routes
import projectRoutes from './routes/projects.js'
import certificationRoutes from './routes/certifications.js'
import blogRoutes from './routes/blog.js'
import cvRoutes from './routes/cv.js'
import codingProgressRoutes from './routes/codingProgress.js'
import experienceRoutes from './routes/experience.js'
import githubRoutes, { fetchAndCacheGitHubStats } from './routes/github.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
}))

// Static files for uploads
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/projects', projectRoutes)
app.use('/api/certifications', certificationRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/cv', cvRoutes)
app.use('/api/coding-progress', codingProgressRoutes)
app.use('/api/experience', experienceRoutes)
app.use('/api/github', githubRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

    // Schedule GitHub stats fetch 3 times a day: 00:00, 08:00, 16:00
    cron.schedule('0 0,8,16 * * *', async () => {
      console.log('[Cron] Running scheduled GitHub stats fetch...')
      try {
        await fetchAndCacheGitHubStats()
      } catch (err) {
        console.error('[Cron] GitHub fetch error:', err.message)
      }
    })
    console.log('[Cron] GitHub stats scheduler started (00:00, 08:00, 16:00)')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })

export default app
