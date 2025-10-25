import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
  }],
  cloudProvider: {
    type: String,
    enum: ['aws', 'azure', 'gcp', 'mongodb', 'redhat', 'kubernetes', 'docker', 'github', 'ibm', 'nvidia', ''],
  },
  image: String,
  imageUrl: String, // External image URL
  githubUrl: String,
  liveUrl: String,
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'upcoming'],
    default: 'completed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Project', projectSchema)
