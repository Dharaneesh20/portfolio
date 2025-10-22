import mongoose from 'mongoose'

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cloudProvider: {
    type: String,
    enum: ['aws', 'azure', 'gcp', 'mongodb', 'redhat', 'kubernetes', 'docker', ''],
  },
  image: String,
  credentialUrl: String,
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Certification', certificationSchema)
