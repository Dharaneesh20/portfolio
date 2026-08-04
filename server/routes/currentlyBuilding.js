import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

// Schema definition
const currentlyBuildingSchema = new mongoose.Schema({
  title: { type: String, default: 'SCOPE — AI Context Optimization Engine' },
  description: { type: String, default: 'High-performance prompt compression & context pruning engine designed for LLM agent memory reduction.' },
  progress: { type: Number, default: 82, min: 0, max: 100 },
  statusBadge: { type: String, default: 'Active Labs' },
  moduleName: { type: String, default: 'Memory Engine' },
  targetRelease: { type: String, default: 'Q4 2026' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const CurrentlyBuilding = mongoose.model('CurrentlyBuilding', currentlyBuildingSchema)

// Default seed helper
export const seedCurrentlyBuilding = async () => {
  try {
    const count = await CurrentlyBuilding.countDocuments()
    if (count === 0) {
      await CurrentlyBuilding.create({
        title: 'SCOPE — AI Context Optimization Engine',
        description: 'High-performance prompt compression & context pruning engine designed for LLM agent memory reduction.',
        progress: 82,
        statusBadge: 'Active Labs',
        moduleName: 'Memory Engine',
        targetRelease: 'Q4 2026',
        isActive: true
      })
      console.log('Seeded default Currently Building record.')
    }
  } catch (err) {
    console.error('Error seeding Currently Building:', err.message)
  }
}

// GET /api/currently-building
router.get('/', async (req, res) => {
  try {
    let data = await CurrentlyBuilding.findOne()
    if (!data) {
      data = await CurrentlyBuilding.create({
        title: 'SCOPE — AI Context Optimization Engine',
        description: 'High-performance prompt compression & context pruning engine designed for LLM agent memory reduction.',
        progress: 82,
        statusBadge: 'Active Labs',
        moduleName: 'Memory Engine',
        targetRelease: 'Q4 2026',
        isActive: true
      })
    }
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/currently-building
router.put('/', async (req, res) => {
  try {
    const { title, description, progress, statusBadge, moduleName, targetRelease, isActive } = req.body
    let data = await CurrentlyBuilding.findOne()
    if (!data) {
      data = new CurrentlyBuilding()
    }

    if (title !== undefined) data.title = title
    if (description !== undefined) data.description = description
    if (progress !== undefined) data.progress = Number(progress)
    if (statusBadge !== undefined) data.statusBadge = statusBadge
    if (moduleName !== undefined) data.moduleName = moduleName
    if (targetRelease !== undefined) data.targetRelease = targetRelease
    if (isActive !== undefined) data.isActive = Boolean(isActive)

    await data.save()
    res.json({ message: 'Currently Building updated successfully', data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
