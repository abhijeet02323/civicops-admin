const express = require('express')
const router = express.Router()
const axios = require('axios')
const ensureAuth = require('../utils/ensureAuth')

const API_BASE = process.env.CIVICOPS_API_BASE || 'https://civic-ops.onrender.com'

// Login page
router.get('/login', (req, res) => {
  res.render('auth/login', { error: null })
})

// Login handler
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const resp = await axios.post(`${API_BASE}/admin/login`, { username, password })
    const { data } = resp.data
    // store token and admin info in session
    req.session.token = data.access_token
    req.session.admin = data.admin
    res.redirect('/department/dashboard')
  } catch (err) {
    const message = err?.response?.data?.detail || 'Login failed'
    res.render('auth/login', { error: message })
  }
})

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/department/login'))
})

// Dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const token = req.session.token
    const headers = { Authorization: `Bearer ${token}` }
    // fetch summary from /admin/issues with department filters
    const issuesResp = await axios.get(`${API_BASE}/admin/issues?limit=1`, { headers })
    // For demo, call locations for stats as documented
    const locResp = await axios.get(`${API_BASE}/admin/issues/locations`, { headers })
    // derive stats
    const locations = locResp.data.data.locations || []
    const total = locations.length
    const statusCounts = (locResp.data.data.statistics && locResp.data.data.statistics.status_breakdown) || {}

    res.render('dashboard/index', { admin: req.session.admin, stats: { total, statusCounts } })
  } catch (err) {
    res.render('dashboard/index', { admin: req.session.admin, stats: { total: 0, statusCounts: {} } })
  }
})

// Issues list with filters
router.get('/issues', ensureAuth, async (req, res) => {
  const { status, priority, zone, page = 1, limit = 20 } = req.query
  const token = req.session.token
  const headers = { Authorization: `Bearer ${token}` }
  try {
    const q = new URLSearchParams()
    if (status) q.append('status', status)
    if (priority) q.append('priority', priority)
    if (zone) q.append('zone', zone)
    q.append('page', String(page))
    q.append('limit', String(limit))

    const issuesResp = await axios.get(`${API_BASE}/admin/issues?${q.toString()}`, { headers })
    const data = issuesResp.data.data
    res.render('issues/list', { admin: req.session.admin, issues: data.issues || [], meta: { total: data.total, page: data.page, limit: data.limit } })
  } catch (err) {
    res.render('issues/list', { admin: req.session.admin, issues: [], meta: {} })
  }
})

// Assign, handover, resolve - POST handlers (simple proxies)
router.post('/issues/:id/assign', ensureAuth, async (req, res) => {
  const { id } = req.params
  const { staffId } = req.body
  try {
    await axios.post(`${API_BASE}/admin/issues/${id}/assign`, { staffId }, { headers: { Authorization: `Bearer ${req.session.token}` } })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ success: false, detail: err?.response?.data || 'Error' })
  }
})

router.post('/issues/:id/handover', ensureAuth, async (req, res) => {
  const { id } = req.params
  const { departmentId } = req.body
  try {
    await axios.post(`${API_BASE}/admin/issues/${id}/handover`, { departmentId }, { headers: { Authorization: `Bearer ${req.session.token}` } })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ success: false, detail: err?.response?.data || 'Error' })
  }
})

router.post('/issues/:id/resolve', ensureAuth, async (req, res) => {
  const { id } = req.params
  try {
    await axios.post(`${API_BASE}/admin/issues/${id}/resolve`, {}, { headers: { Authorization: `Bearer ${req.session.token}` } })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ success: false, detail: err?.response?.data || 'Error' })
  }
})

// Map view
router.get('/map', ensureAuth, async (req, res) => {
  try {
    const resp = await axios.get(`${API_BASE}/admin/issues/locations`, { headers: { Authorization: `Bearer ${req.session.token}` } })
    res.render('map/index', { admin: req.session.admin, locations: resp.data.data.locations || [] })
  } catch (err) {
    res.render('map/index', { admin: req.session.admin, locations: [] })
  }
})

// Reports analytics
router.get('/reports', ensureAuth, async (req, res) => {
  try {
    const resp = await axios.get(`${API_BASE}/admin/issues/locations`, { headers: { Authorization: `Bearer ${req.session.token}` } })
    const stats = resp.data.data.statistics || {}
    res.render('reports/index', { admin: req.session.admin, stats })
  } catch (err) {
    res.render('reports/index', { admin: req.session.admin, stats: {} })
  }
})

// Zones
router.get('/zones', ensureAuth, async (req, res) => {
  try {
    const resp = await axios.get(`${API_BASE}/admin/issues/locations`, { headers: { Authorization: `Bearer ${req.session.token}` } })
    const locations = resp.data.data.locations || []
    // group by zone/address simple heuristic
    const zones = {}
    locations.forEach(loc => {
      const zone = loc.address || 'Unknown'
      zones[zone] = zones[zone] ? zones[zone] + 1 : 1
    })
    res.render('zones/index', { admin: req.session.admin, zones })
  } catch (err) {
    res.render('zones/index', { admin: req.session.admin, zones: {} })
  }
})

module.exports = router
