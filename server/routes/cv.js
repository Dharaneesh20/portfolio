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
    
    // Handle file uploads for experience logos
    if (req.files) {
      const experienceData = req.body.experience ? JSON.parse(req.body.experience) : []
      const educationData = req.body.education ? JSON.parse(req.body.education) : []
      
      // Process experience logos
      for (let i = 0; i < experienceData.length; i++) {
        const logoKey = `experienceLogo${i}`
        if (req.files[logoKey]) {
          const logo = req.files[logoKey]
          const uploadPath = `./uploads/cv/${Date.now()}_${logo.name}`
          await logo.mv(uploadPath)
          experienceData[i].logo = uploadPath.replace('./uploads', '/uploads')
        }
      }
      
      // Process education logos
      for (let i = 0; i < educationData.length; i++) {
        const logoKey = `educationLogo${i}`
        if (req.files[logoKey]) {
          const logo = req.files[logoKey]
          const uploadPath = `./uploads/cv/${Date.now()}_${logo.name}`
          await logo.mv(uploadPath)
          educationData[i].logo = uploadPath.replace('./uploads', '/uploads')
        }
      }
      
      req.body.experience = experienceData
      req.body.education = educationData
    } else {
      // Parse JSON strings if present
      if (typeof req.body.experience === 'string') {
        req.body.experience = JSON.parse(req.body.experience)
      }
      if (typeof req.body.education === 'string') {
        req.body.education = JSON.parse(req.body.education)
      }
      if (typeof req.body.skills === 'string') {
        req.body.skills = JSON.parse(req.body.skills)
      }
      if (typeof req.body.achievements === 'string') {
        req.body.achievements = JSON.parse(req.body.achievements)
      }
    }
    
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
