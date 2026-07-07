import express from 'express'
import Kpi from '../models/Kpi.js'

const router = express.Router()

// Seed helper
export const seedKpis = async () => {
  try {
    const count = await Kpi.countDocuments()
    if (count === 0) {
      const defaultKpis = [
        { title: 'Projects Built', value: '10+', subtitle: 'MERN & Full-stack apps', displayOrder: 1, isActive: true },
        { title: 'Certifications', value: '8+', subtitle: 'AWS & technical courses', displayOrder: 2, isActive: true },
        { title: 'Insights Logged', value: '12+', subtitle: 'Chronological learning log', displayOrder: 3, isActive: true },
        { title: 'Core Focus Areas', value: '3+', subtitle: 'Cloud · Network · Security', displayOrder: 4, isActive: true }
      ]
      await Kpi.insertMany(defaultKpis)
      console.log('Seeded default KPIs successfully')
    }
  } catch (error) {
    console.error('Error seeding KPIs:', error)
  }
}

// GET /dashboard/kpis (Public active KPIs)
router.get('/dashboard/kpis', async (req, res) => {
  try {
    const kpis = await Kpi.find({ isActive: true }).sort({ displayOrder: 1 })
    res.json(kpis)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /admin/dashboard/kpis (Admin: all KPIs)
router.get('/admin/dashboard/kpis', async (req, res) => {
  try {
    const kpis = await Kpi.find().sort({ displayOrder: 1 })
    res.json(kpis)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /admin/dashboard/kpis (Admin: create KPI)
router.post('/admin/dashboard/kpis', async (req, res) => {
  try {
    const kpi = new Kpi(req.body)
    const savedKpi = await kpi.save()
    res.status(201).json(savedKpi)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT /admin/dashboard/kpis/:id (Admin: update KPI)
router.put('/admin/dashboard/kpis/:id', async (req, res) => {
  try {
    const updatedKpi = await Kpi.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedKpi) {
      return res.status(404).json({ message: 'KPI not found' })
    }
    res.json(updatedKpi)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE /admin/dashboard/kpis/:id (Admin: delete KPI)
router.delete('/admin/dashboard/kpis/:id', async (req, res) => {
  try {
    const deletedKpi = await Kpi.findByIdAndDelete(req.params.id)
    if (!deletedKpi) {
      return res.status(404).json({ message: 'KPI not found' })
    }
    res.json({ message: 'KPI deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
