import express from 'express'
import Certification from '../models/Certification.js'

const router = express.Router()

// Get all certifications
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ date: -1 })
    res.json(certifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single certification
router.get('/:id', async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id)
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' })
    }
    res.json(certification)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create certification
router.post('/', async (req, res) => {
  try {
    let imagePath = ''
    
    // Check if imageUrl is provided (external URL like LinkedIn)
    if (req.body.imageUrl) {
      imagePath = req.body.imageUrl
    } 
    // Otherwise, handle file upload
    else if (req.files && req.files.image) {
      const image = req.files.image
      const uploadPath = `./uploads/certifications/${Date.now()}_${image.name}`
      await image.mv(uploadPath)
      imagePath = uploadPath.replace('./uploads', '/uploads')
    }

    const certification = new Certification({
      title: req.body.title,
      issuer: req.body.issuer,
      date: req.body.date,
      cloudProvider: req.body.cloudProvider,
      image: req.files && req.files.image ? imagePath : undefined,
      imageUrl: req.body.imageUrl || undefined,
      credentialUrl: req.body.credentialUrl,
      description: req.body.description
    })

    const savedCertification = await certification.save()
    res.status(201).json(savedCertification)
  } catch (error) {
    console.error('Error creating certification:', error)
    res.status(400).json({ message: error.message })
  }
})

// Update certification
router.put('/:id', async (req, res) => {
  try {
    let updateData = {
      title: req.body.title,
      issuer: req.body.issuer,
      date: req.body.date,
      cloudProvider: req.body.cloudProvider,
      credentialUrl: req.body.credentialUrl,
      description: req.body.description
    }
    
    // Handle imageUrl (external URL)
    if (req.body.imageUrl) {
      updateData.imageUrl = req.body.imageUrl
    }
    
    // Handle file upload
    if (req.files && req.files.image) {
      const image = req.files.image
      const uploadPath = `./uploads/certifications/${Date.now()}_${image.name}`
      await image.mv(uploadPath)
      updateData.image = uploadPath.replace('./uploads', '/uploads')
    }

    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' })
    }

    res.json(certification)
  } catch (error) {
    console.error('Error updating certification:', error)
    res.status(400).json({ message: error.message })
  }
})

// Delete certification
router.delete('/:id', async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id)
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' })
    }
    res.json({ message: 'Certification deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
