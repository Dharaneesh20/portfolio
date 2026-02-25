import express from 'express'
import axios from 'axios'
import GitHubStats from '../models/GitHubStats.js'

const router = express.Router()

const GITHUB_USERNAME = 'Dharaneesh20'
const GITHUB_API = 'https://api.github.com'

// Helper: fetch from GitHub and save to DB
export const fetchAndCacheGitHubStats = async () => {
  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    }

    // Fetch user profile
    const userRes = await axios.get(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { headers })
    const user = userRes.data

    // Fetch all repos (paginated)
    let repos = []
    let page = 1
    while (true) {
      const reposRes = await axios.get(
        `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`,
        { headers }
      )
      if (reposRes.data.length === 0) break
      repos = repos.concat(reposRes.data)
      if (reposRes.data.length < 100) break
      page++
    }

    // Compute language stats
    const languageCount = {}
    repos.forEach((repo) => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1
      }
    })
    const topLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([language, count]) => ({ language, count }))

    // Compute totals
    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
    const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)

    // Top repos by stars (non-fork, top 6)
    const topRepos = repos
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage,
        stars: r.stargazers_count,
        forks: r.forks_count,
        watchers: r.watchers_count,
        language: r.language,
        topics: r.topics || [],
        isForked: r.fork,
        updatedAt: r.updated_at,
        createdAt: r.created_at,
      }))

    const statsData = {
      username: GITHUB_USERNAME,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      company: user.company,
      location: user.location,
      blog: user.blog,
      twitterUsername: user.twitter_username,
      publicRepos: user.public_repos,
      publicGists: user.public_gists,
      followers: user.followers,
      following: user.following,
      totalStars,
      totalForks,
      topLanguages,
      topRepos,
      fetchedAt: new Date(),
    }

    // Upsert (replace the single document)
    await GitHubStats.findOneAndUpdate(
      { username: GITHUB_USERNAME },
      statsData,
      { upsert: true, new: true }
    )

    console.log('[GitHub] Stats refreshed at', new Date().toISOString())
    return statsData
  } catch (error) {
    console.error('[GitHub] Failed to fetch stats:', error.message)
    throw error
  }
}

// GET /api/github/stats — return cached stats (fetch if none)
router.get('/stats', async (req, res) => {
  try {
    let stats = await GitHubStats.findOne({ username: GITHUB_USERNAME })

    if (!stats) {
      // No cache yet — fetch now
      const fresh = await fetchAndCacheGitHubStats()
      return res.json(fresh)
    }

    res.json(stats)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get GitHub stats', error: error.message })
  }
})

// POST /api/github/sync — manual refresh
router.post('/sync', async (req, res) => {
  try {
    const data = await fetchAndCacheGitHubStats()
    res.json({ message: 'GitHub stats synced successfully', fetchedAt: data.fetchedAt })
  } catch (error) {
    res.status(500).json({ message: 'Failed to sync GitHub stats', error: error.message })
  }
})

export default router
