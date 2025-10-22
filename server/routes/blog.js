import express from 'express'
import BlogPost from '../models/BlogPost.js'

const router = express.Router()

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single blog post
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create blog post
router.post('/', async (req, res) => {
  try {
    let imagePath = ''
    
    if (req.files && req.files.image) {
      const image = req.files.image
      const uploadPath = `./uploads/blog/${Date.now()}_${image.name}`
      await image.mv(uploadPath)
      imagePath = uploadPath.replace('./uploads', '/uploads')
    }

    const post = new BlogPost({
      ...req.body,
      tags: JSON.parse(req.body.tags || '[]'),
      image: imagePath,
    })

    const savedPost = await post.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update blog post
router.put('/:id', async (req, res) => {
  try {
    let updateData = { ...req.body }
    
    if (req.files && req.files.image) {
      const image = req.files.image
      const uploadPath = `./uploads/blog/${Date.now()}_${image.name}`
      await image.mv(uploadPath)
      updateData.image = uploadPath.replace('./uploads', '/uploads')
    }

    if (req.body.tags) {
      updateData.tags = JSON.parse(req.body.tags)
    }

    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    res.json(post)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete blog post
router.delete('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    res.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
