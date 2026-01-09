import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  certificateImage: String,
  certificateImageUrl: String,
  projects: [{
    name: String,
    description: String,
  }],
  techStack: [{
    type: String,
  }],
  learningCurve: {
    type: String,
  },
  summary: {
    type: String,
  },
  type: {
    type: String,
    enum: ['internship', 'full-time', 'part-time', 'contract'],
    default: 'internship',
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Experience', experienceSchema)
