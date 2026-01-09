import express from 'express'
import Experience from '../models/Experience.js'

const router = express.Router()

// Get all experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 })
    res.json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single experience
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' })
    }
    res.json(experience)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create experience
router.post('/', async (req, res) => {
  const experience = new Experience(req.body)
  try {
    const newExperience = await experience.save()
    res.status(201).json(newExperience)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update experience
router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' })
    }
    res.json(experience)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete experience
router.delete('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id)
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' })
    }
    res.json({ message: 'Experience deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
