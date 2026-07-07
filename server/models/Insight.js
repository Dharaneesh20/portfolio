import mongoose from 'mongoose'

const insightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['achievement', 'learning', 'project-update', 'certification', 'writeup', 'career', 'event'],
    default: 'learning',
    required: true,
  },
  tags: [{
    type: String,
  }],
  coverImage: {
    type: String,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published',
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  readTime: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  displayOrder: {
    type: Number,
    default: 999
  }
}, {
  timestamps: true
})

export default mongoose.model('Insight', insightSchema)
