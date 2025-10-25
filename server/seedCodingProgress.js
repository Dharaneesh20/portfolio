// Seed file for coding progress data
// Run with: node server/seedCodingProgress.js

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import CodingProgress from './models/CodingProgress.js'

dotenv.config()

const sampleData = [
  {
    platform: 'LeetCode',
    username: 'dharaneesh_rs',
    problemsSolved: 250,
    rank: 'Knight',
    rating: 1850,
    streak: 45,
    profileUrl: 'https://leetcode.com/dharaneesh_rs',
    stats: {
      easy: 120,
      medium: 100,
      hard: 30,
    },
    badges: ['50 Days Badge', '100 Problems', 'SQL Explorer'],
  },
  {
    platform: 'HackerRank',
    username: 'dharaneesh_rs',
    problemsSolved: 180,
    rank: '5 Star',
    rating: 2100,
    streak: 30,
    profileUrl: 'https://hackerrank.com/dharaneesh_rs',
    stats: {
      easy: 90,
      medium: 70,
      hard: 20,
    },
    badges: ['Problem Solving Gold', 'SQL Gold', 'Python Gold'],
  },
  {
    platform: 'SkillRack',
    username: 'dharaneesh_rs',
    problemsSolved: 320,
    rank: 'Top 100',
    rating: 1950,
    streak: 60,
    profileUrl: 'https://skillrack.com/profile/dharaneesh_rs',
    stats: {
      easy: 180,
      medium: 110,
      hard: 30,
    },
    badges: ['Daily Coder', 'Speed Demon', 'Problem Solver'],
  },
]

async function seedCodingProgress() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    console.log('Connected to MongoDB')

    // Clear existing data
    await CodingProgress.deleteMany({})
    console.log('Cleared existing coding progress data')

    // Insert sample data
    await CodingProgress.insertMany(sampleData)
    console.log('Sample coding progress data inserted successfully!')

    mongoose.connection.close()
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seedCodingProgress()
