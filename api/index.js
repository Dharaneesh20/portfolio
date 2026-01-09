import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

// Import routes
import projectRoutes from '../server/routes/projects.js'
import certificationRoutes from '../server/routes/certifications.js'
import blogRoutes from '../server/routes/blog.js'
import cvRoutes from '../server/routes/cv.js'
import codingProgressRoutes from '../server/routes/codingProgress.js'
import experienceRoutes from '../server/routes/experience.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
}))

// Routes
app.use('/api/projects', projectRoutes)
app.use('/api/certifications', certificationRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/cv', cvRoutes)
app.use('/api/coding-progress', codingProgressRoutes)
app.use('/api/experience', experienceRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// MongoDB Connection
let isConnected = false

const connectDB = async () => {
  if (isConnected) {
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    isConnected = true
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

// Serverless function handler
export default async function handler(req, res) {
  await connectDB()
  return app(req, res)
}
