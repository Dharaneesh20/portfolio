import mongoose from 'mongoose'

const cvSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Dharaneesh RS',
  },
  title: {
    type: String,
    default: 'Cloud Developer & Solutions Architect',
  },
  summary: String,
  experience: [{
    title: String,
    company: String,
    period: String,
    description: [String],
  }],
  education: [{
    degree: String,
    institution: String,
    year: String,
  }],
  skills: [{
    category: String,
    items: [String],
  }],
  achievements: [String],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('CV', cvSchema)
