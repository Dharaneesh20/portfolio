import mongoose from 'mongoose'

const repoSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  homepage: String,
  stars: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
  watchers: { type: Number, default: 0 },
  language: String,
  topics: [String],
  isForked: { type: Boolean, default: false },
  updatedAt: String,
  createdAt: String,
})

const githubStatsSchema = new mongoose.Schema({
  username: { type: String, required: true, default: 'Dharaneesh20' },
  name: String,
  bio: String,
  avatarUrl: String,
  profileUrl: String,
  company: String,
  location: String,
  blog: String,
  twitterUsername: String,
  publicRepos: { type: Number, default: 0 },
  publicGists: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  totalStars: { type: Number, default: 0 },
  totalForks: { type: Number, default: 0 },
  topLanguages: [
    {
      language: String,
      count: Number,
    },
  ],
  topRepos: [repoSchema],
  contributionStats: {
    totalCommits: { type: Number, default: 0 },
    totalPRs: { type: Number, default: 0 },
    totalIssues: { type: Number, default: 0 },
  },
  fetchedAt: { type: Date, default: Date.now },
})

export default mongoose.model('GitHubStats', githubStatsSchema)
