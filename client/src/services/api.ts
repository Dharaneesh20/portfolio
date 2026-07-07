import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Projects
export const getProjects = () => api.get('/projects')
export const createProject = (data: FormData) => api.post('/projects', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
export const updateProject = (id: string, data: FormData) => api.put(`/projects/${id}`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
export const deleteProject = (id: string) => api.delete(`/projects/${id}`)

// Certifications
export const getCertifications = () => api.get('/certifications')
export const createCertification = (data: FormData) => api.post('/certifications', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
export const updateCertification = (id: string, data: FormData) => api.put(`/certifications/${id}`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
export const deleteCertification = (id: string) => api.delete(`/certifications/${id}`)

// Blog Posts
export const getBlogPosts = () => api.get('/blog')
export const createBlogPost = (data: FormData) => api.post('/blog', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
export const updateBlogPost = (id: string, data: FormData) => api.put(`/blog/${id}`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
export const deleteBlogPost = (id: string) => api.delete(`/blog/${id}`)

// CV
export const getCV = () => api.get('/cv')
export const updateCV = (data: any) => api.put('/cv', data)

// Coding Progress
export const getCodingProgress = () => api.get('/coding-progress')
export const createCodingProgress = (data: any) => api.post('/coding-progress', data)
export const updateCodingProgress = (id: string, data: any) => api.put(`/coding-progress/${id}`, data)
export const deleteCodingProgress = (id: string) => api.delete(`/coding-progress/${id}`)

// Experience
export const getExperiences = () => api.get('/experience')
export const createExperience = (data: any) => api.post('/experience', data)
export const updateExperience = (id: string, data: any) => api.put(`/experience/${id}`, data)
export const deleteExperience = (id: string) => api.delete(`/experience/${id}`)

// GitHub Stats
export const getGitHubStats = () => api.get('/github/stats')
export const syncGitHubStats = () => api.post('/github/sync')

// Insights
export const getInsights = () => api.get('/insights')
export const getRecentInsights = (limit = 3) => api.get('/insights/recent', { params: { limit } })
export const getAllInsightsAdmin = () => api.get('/insights', { params: { status: 'all' } })
export const createInsight = (data: any) => api.post('/insights', data)
export const updateInsight = (id: string, data: any) => api.put(`/insights/${id}`, data)
export const deleteInsight = (id: string) => api.delete(`/insights/${id}`)

// Recent Projects & Certifications
export const getRecentProjects = (limit = 3) => api.get('/projects/recent', { params: { limit } })
export const getRecentCertifications = (limit = 3) => api.get('/certifications/recent', { params: { limit } })

// KPIs / Dashboard Metrics
export const getKpis = () => api.get('/dashboard/kpis')
export const getAdminKpis = () => api.get('/admin/dashboard/kpis')
export const createKpi = (data: any) => api.post('/admin/dashboard/kpis', data)
export const updateKpi = (id: string, data: any) => api.put(`/admin/dashboard/kpis/${id}`, data)
export const deleteKpi = (id: string) => api.delete(`/admin/dashboard/kpis/${id}`)



export const resolveImage = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.replace(/\\/g, '/');
  
  // Resolve absolute path relative to production API if hosted separately
  const apiBase = import.meta.env.VITE_API_URL || '';
  if (apiBase.startsWith('http://') || apiBase.startsWith('https://')) {
    const serverUrl = apiBase.replace(/\/api\/?$/, '');
    const formattedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    return `${serverUrl}${formattedPath}`;
  }
  
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
};

export default api


