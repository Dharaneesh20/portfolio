import mongoose from 'mongoose'

const codingProgressSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['LeetCode', 'HackerRank', 'SkillRack', 'CodeChef', 'Codeforces'],
  },
  username: {
    type: String,
    required: true,
  },
  problemsSolved: {
    type: Number,
    default: 0,
  },
  rank: String,
  rating: Number,
  badges: [{
    type: String,
  }],
  streak: {
    type: Number,
    default: 0,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  stats: {
    easy: {
      type: Number,
      default: 0,
    },
    medium: {
      type: Number,
      default: 0,
    },
    hard: {
      type: Number,
      default: 0,
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('CodingProgress', codingProgressSchema)
