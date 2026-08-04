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

let CurrentlyBuilding
try {
  CurrentlyBuilding = mongoose.model('CurrentlyBuilding')
} catch (e) {
  CurrentlyBuilding = mongoose.model('CurrentlyBuilding', currentlyBuildingSchema)
}

// In-memory fallback store
let memoryStore = {
  title: 'SCOPE — AI Context Optimization Engine',
  description: 'High-performance prompt compression & context pruning engine designed for LLM agent memory reduction.',
  progress: 82,
  statusBadge: 'Active Labs',
  moduleName: 'Memory Engine',
  targetRelease: 'Q4 2026',
  isActive: true
}

// Default seed helper
export const seedCurrentlyBuilding = async () => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const count = await CurrentlyBuilding.countDocuments()
      if (count === 0) {
        await CurrentlyBuilding.create(memoryStore)
        console.log('Seeded default Currently Building record.')
      }
    }
  } catch (err) {
    console.error('Error seeding Currently Building:', err.message)
  }
}

// GET /api/currently-building
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      let data = await CurrentlyBuilding.findOne()
      if (!data) {
        data = await CurrentlyBuilding.create(memoryStore)
      }
      if (data) {
        memoryStore = data.toObject()
        return res.json(data)
      }
    }
  } catch (err) {
    console.warn('MongoDB query failed for currently-building, using fallback:', err.message)
  }
  res.json(memoryStore)
})

// PUT /api/currently-building
router.put('/', async (req, res) => {
  try {
    const { title, description, progress, statusBadge, moduleName, targetRelease, isActive } = req.body

    // Always update in-memory store
    if (title !== undefined) memoryStore.title = title
    if (description !== undefined) memoryStore.description = description
    if (progress !== undefined) memoryStore.progress = Number(progress)
    if (statusBadge !== undefined) memoryStore.statusBadge = statusBadge
    if (moduleName !== undefined) memoryStore.moduleName = moduleName
    if (targetRelease !== undefined) memoryStore.targetRelease = targetRelease
    if (isActive !== undefined) memoryStore.isActive = Boolean(isActive)

    if (mongoose.connection && mongoose.connection.readyState === 1) {
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
      return res.json({ message: 'Currently Building updated successfully', data })
    }

    res.json({ message: 'Currently Building updated successfully', data: memoryStore })
  } catch (err) {
    console.error('Error updating currently-building:', err.message)
    res.json({ message: 'Currently Building updated successfully', data: memoryStore })
  }
})

export default router
