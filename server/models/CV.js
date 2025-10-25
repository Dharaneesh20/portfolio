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
    logo: String, // Uploaded logo file path
    logoUrl: String, // External logo URL
  }],
  education: [{
    degree: String,
    institution: String,
    year: String,
    logo: String, // Uploaded logo file path
    logoUrl: String, // External logo URL
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
