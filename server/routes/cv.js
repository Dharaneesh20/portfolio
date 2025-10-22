import express from 'express'
import CV from '../models/CV.js'

const router = express.Router()

// Get CV data
router.get('/', async (req, res) => {
  try {
    let cv = await CV.findOne()
    
    // If no CV exists, create a default one
    if (!cv) {
      cv = new CV({
        name: 'Dharaneesh RS',
        title: 'Cloud Developer & Solutions Architect',
        summary: 'Passionate cloud developer with expertise in AWS and Azure, specializing in building scalable and efficient cloud infrastructure. MongoDB Certified Associate Atlas Administrator.',
        experience: [
          {
            title: 'Cloud Developer',
            company: 'Your Company',
            period: '2020 - Present',
            description: [
              'Designed and implemented cloud solutions on AWS and Azure',
              'Developed serverless applications using AWS Lambda and Azure Functions',
              'Managed MongoDB Atlas databases for enterprise applications',
            ],
          },
        ],
        education: [
          {
            degree: 'Bachelor of Technology in Computer Science',
            institution: 'Your University',
            year: '2020',
          },
        ],
        skills: [
          {
            category: 'Cloud Platforms',
            items: ['AWS', 'Azure', 'Google Cloud Platform'],
          },
          {
            category: 'Databases',
            items: ['MongoDB', 'PostgreSQL', 'DynamoDB', 'CosmosDB'],
          },
          {
            category: 'DevOps & Tools',
            items: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions'],
          },
          {
            category: 'Programming',
            items: ['JavaScript', 'Python', 'Node.js', 'React', 'TypeScript'],
          },
        ],
        achievements: [
          'MongoDB Certified Associate Atlas Administrator',
          'AWS Certified Solutions Architect',
          'Azure Administrator Associate',
        ],
      })
      await cv.save()
    }
    
    res.json(cv)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update CV data
router.put('/', async (req, res) => {
  try {
    let cv = await CV.findOne()
    
    if (!cv) {
      cv = new CV(req.body)
    } else {
      Object.assign(cv, req.body)
      cv.updatedAt = Date.now()
    }
    
    const savedCV = await cv.save()
    res.json(savedCV)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
