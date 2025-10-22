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
    
    if (req.files && req.files.image) {
      const image = req.files.image
      const uploadPath = `./uploads/certifications/${Date.now()}_${image.name}`
      await image.mv(uploadPath)
      imagePath = uploadPath.replace('./uploads', '/uploads')
    }

    const certification = new Certification({
      ...req.body,
      image: imagePath,
    })

    const savedCertification = await certification.save()
    res.status(201).json(savedCertification)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update certification
router.put('/:id', async (req, res) => {
  try {
    let updateData = { ...req.body }
    
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
