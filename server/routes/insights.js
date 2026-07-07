import express from 'express'
import Insight from '../models/Insight.js'

const router = express.Router()

// Get recent published insights
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3
    const insights = await Insight.find({ status: 'published' })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
    res.json(insights)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all insights (public filter: published, admin filter: all)
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.status !== 'all') {
      filter.status = 'published'
    }
    const insights = await Insight.find(filter).sort({ publishedAt: -1, createdAt: -1 })
    res.json(insights)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single insight by slug or ID
router.get('/:slugOrId', async (req, res) => {
  try {
    let insight = await Insight.findOne({ slug: req.params.slugOrId })
    if (!insight) {
      // Fallback to searching by ID
      if (req.params.slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
        insight = await Insight.findById(req.params.slugOrId)
      }
    }
    if (!insight) {
      return res.status(404).json({ message: 'Insight not found' })
    }
    res.json(insight)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create insight
router.post('/', async (req, res) => {
  try {
    let coverImagePath = ''
    if (req.files && req.files.coverImage) {
      const coverImage = req.files.coverImage
      const uploadPath = `./uploads/insights/${Date.now()}_${coverImage.name}`
      await coverImage.mv(uploadPath)
      coverImagePath = uploadPath.replace('./uploads', '/uploads')
    }

    const insight = new Insight({
      ...req.body,
      tags: req.body.tags ? (typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags) : [],
      coverImage: coverImagePath || req.body.coverImage,
      featured: req.body.featured === 'true' || req.body.featured === true,
      publishedAt: req.body.publishedAt || Date.now()
    })

    const savedInsight = await insight.save()
    res.status(201).json(savedInsight)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update insight
router.put('/:id', async (req, res) => {
  try {
    let updateData = { ...req.body }
    
    if (req.files && req.files.coverImage) {
      const coverImage = req.files.coverImage
      const uploadPath = `./uploads/insights/${Date.now()}_${coverImage.name}`
      await coverImage.mv(uploadPath)
      updateData.coverImage = uploadPath.replace('./uploads', '/uploads')
    }

    if (req.body.tags) {
      updateData.tags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags
    }
    if (req.body.featured !== undefined) {
      updateData.featured = req.body.featured === 'true' || req.body.featured === true
    }

    const insight = await Insight.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!insight) {
      return res.status(404).json({ message: 'Insight not found' })
    }

    res.json(insight)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete insight
router.delete('/:id', async (req, res) => {
  try {
    const insight = await Insight.findByIdAndDelete(req.params.id)
    if (!insight) {
      return res.status(404).json({ message: 'Insight not found' })
    }
    res.json({ message: 'Insight deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
