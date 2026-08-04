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
import insightRoutes, { migrateInsights } from './routes/insights.js'
import kpiRoutes, { seedKpis } from './routes/kpis.js'
import currentlyBuildingRoutes, { seedCurrentlyBuilding } from './routes/currentlyBuilding.js'



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
app.use('/api/insights', insightRoutes)
app.use('/api/currently-building', currentlyBuildingRoutes)
app.use('/api', kpiRoutes)



// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Start Express server immediately
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// MongoDB Connection (non-blocking)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
  serverSelectionTimeoutMS: 5000
})
  .then(async () => {
    console.log('Connected to MongoDB')
    try {
      await seedKpis()
      await migrateInsights()
      await seedCurrentlyBuilding()
    } catch (err) {
      console.warn('DB seeding error:', err.message)
    }
  })
  .catch((error) => {
    console.warn('MongoDB connection warning:', error.message)
    console.warn('Running server in fallback mode.')
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

export default app
