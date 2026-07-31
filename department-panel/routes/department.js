const express = require('express')
const router = express.Router()
const axios = require('axios')

const API_BASE = process.env.CIVICOPS_API_BASE || 'https://civic-ops.onrender.com'

// Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // fetch summary from /admin/issues with department filters
    await axios.get(`${API_BASE}/admin/issues?limit=1`)
    // For demo, call locations for stats as documented
    const locResp = await axios.get(`${API_BASE}/admin/issues/locations`)
    // derive stats
    const locations = locResp.data.data.locations || []
    const total = locations.length
    const statusCounts = (locResp.data.data.statistics && locResp.data.data.statistics.status_breakdown) || {}

    res.render('dashboard/index', { admin: null, stats: { total, statusCounts } })
  } catch (err) {
    res.render('dashboard/index', { admin: null, stats: { total: 0, statusCounts: {} } })
  }
})

// Issues list with filters
router.get('/issues', async (req, res) => {
  const { status, priority, zone, page = 1, limit = 20 } = req.query
  try {
    const q = new URLSearchParams()
    if (status) q.append('status', status)
    if (priority) q.append('priority', priority)
    if (zone) q.append('zone', zone)
    q.append('page', String(page))
    q.append('limit', String(limit))

    const issuesResp = await axios.get(`${API_BASE}/admin/issues?${q.toString()}`)
    const data = issuesResp.data.data
    res.render('issues/list', { admin: null, issues: data.issues || [], meta: { total: data.total, page: data.page, limit: data.limit } })
  } catch (err) {
    res.render('issues/list', { admin: null, issues: [], meta: {} })
  }
})

// Assign, handover, resolve - POST handlers (simple proxies)
router.post('/issues/:id/assign', async (req, res) => {
  const { id } = req.params
  const { staffId } = req.body
  try {
    await axios.post(`${API_BASE}/admin/issues/${id}/assign`, { staffId })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ success: false, detail: err?.response?.data || 'Error' })
  }
})

router.post('/issues/:id/handover', async (req, res) => {
  const { id } = req.params
  const { departmentId } = req.body
  try {
    await axios.post(`${API_BASE}/admin/issues/${id}/handover`, { departmentId })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ success: false, detail: err?.response?.data || 'Error' })
  }
})

router.post('/issues/:id/resolve', async (req, res) => {
  const { id } = req.params
  try {
    await axios.post(`${API_BASE}/admin/issues/${id}/resolve`, {})
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ success: false, detail: err?.response?.data || 'Error' })
  }
})

// Map view
router.get('/map', async (req, res) => {
  try {
    const resp = await axios.get(`${API_BASE}/admin/issues/locations`)
    res.render('map/index', { admin: null, locations: resp.data.data.locations || [] })
  } catch (err) {
    res.render('map/index', { admin: null, locations: [] })
  }
})

// Reports analytics
router.get('/reports', async (req, res) => {
  try {
    const resp = await axios.get(`${API_BASE}/admin/issues/locations`)
    const stats = resp.data.data.statistics || {}
    res.render('reports/index', { admin: null, stats })
  } catch (err) {
    res.render('reports/index', { admin: null, stats: {} })
  }
})

// Zones
router.get('/zones', async (req, res) => {
  try {
    const resp = await axios.get(`${API_BASE}/admin/issues/locations`)
    const locations = resp.data.data.locations || []
    // group by zone/address simple heuristic
    const zones = {}
    locations.forEach(loc => {
      const zone = loc.address || 'Unknown'
      zones[zone] = zones[zone] ? zones[zone] + 1 : 1
    })
    res.render('zones/index', { admin: null, zones })
  } catch (err) {
    res.render('zones/index', { admin: null, zones: {} })
  }
})

module.exports = router
