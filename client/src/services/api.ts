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

export default api
