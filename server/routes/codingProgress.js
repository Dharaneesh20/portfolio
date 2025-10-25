import express from 'express'
import CodingProgress from '../models/CodingProgress.js'

const router = express.Router()

// Get all coding progress
router.get('/', async (req, res) => {
  try {
    const progress = await CodingProgress.find().sort({ platform: 1 })
    res.json(progress)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single platform progress
router.get('/:id', async (req, res) => {
  try {
    const progress = await CodingProgress.findById(req.params.id)
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' })
    }
    res.json(progress)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create coding progress
router.post('/', async (req, res) => {
  try {
    const progress = new CodingProgress(req.body)
    const savedProgress = await progress.save()
    res.status(201).json(savedProgress)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update coding progress
router.put('/:id', async (req, res) => {
  try {
    const progress = await CodingProgress.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    )

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' })
    }

    res.json(progress)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete coding progress
router.delete('/:id', async (req, res) => {
  try {
    const progress = await CodingProgress.findByIdAndDelete(req.params.id)
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' })
    }
    res.json({ message: 'Progress deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
