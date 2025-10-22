import express from 'express'
import Project from '../models/Project.js'
import path from 'path'

const router = express.Router()

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create project
router.post('/', async (req, res) => {
  try {
    let imagePath = ''
    
    if (req.files && req.files.image) {
      const image = req.files.image
      const uploadPath = `./uploads/projects/${Date.now()}_${image.name}`
      await image.mv(uploadPath)
      imagePath = uploadPath.replace('./uploads', '/uploads')
    }

    const project = new Project({
      ...req.body,
      technologies: JSON.parse(req.body.technologies || '[]'),
      image: imagePath,
    })

    const savedProject = await project.save()
    res.status(201).json(savedProject)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update project
router.put('/:id', async (req, res) => {
  try {
    let updateData = { ...req.body }
    
    if (req.files && req.files.image) {
      const image = req.files.image
      const uploadPath = `./uploads/projects/${Date.now()}_${image.name}`
      await image.mv(uploadPath)
      updateData.image = uploadPath.replace('./uploads', '/uploads')
    }

    if (req.body.technologies) {
      updateData.technologies = JSON.parse(req.body.technologies)
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.json({ message: 'Project deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
