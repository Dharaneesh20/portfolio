import mongoose from 'mongoose'

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Dharaneesh RS',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cloudProvider: {
    type: String,
    enum: ['aws', 'azure', 'gcp', 'mongodb', 'redhat', 'kubernetes', 'docker', ''],
  },
  image: String,
  imageUrl: String, // External image URL
  tags: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('BlogPost', blogPostSchema)
