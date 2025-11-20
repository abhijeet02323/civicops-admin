import { type ReactElement, useEffect, useMemo, useState } from 'react'
import './ReportsPage.css'
import auth from '../../services/auth'
import OLMap from '../../components/Map/Map'
import demoComplaints from './demo-complaints.json'

type Report = {
  id: string
  title: string
  description?: string
  category?: string
  subcategory?: string
  status?: string
  priority?: string
  department?: { id: number; name: string }
  location?: {
    latitude: number
    longitude: number
    address?: string
  }
  image_url?: string
  voice_note_url?: string
  reported_by?: { id?: string; name?: string; phone?: string }
  created_at?: string
  updated_at?: string
}

const API_BASE = import.meta.env.VITE_CIVICOPS_API_BASE || 'https://civic-ops.onrender.com'

const ReportsPage = (): ReactElement => {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [query, setQuery] = useState('')

  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [total, setTotal] = useState(0)

  const [sortField, setSortField] = useState<'created_at' | 'category' | 'priority' | ''>('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const [selected, setSelected] = useState<Report | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [mapLocations, setMapLocations] = useState<any[]>([])

  const [departments, setDepartments] = useState<Array<{ id: number; name: string }>>([])
  const [actionLoading, setActionLoading] = useState(false)
  const [showAssign, setShowAssign] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showResolveModal, setShowResolveModal] = useState(false)
  const [formValue, setFormValue] = useState('')
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null)

  const token = auth.getToken()

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const resp = await fetch(`${API_BASE}/admin/departments`, { headers: { Authorization: `Bearer ${token}` } })
      if (resp.ok) {
        const json = await resp.json()
        // assuming json.data or json
        const list = json.data?.departments || json.data || json || []
        setDepartments(list.map((d: any) => ({ id: d.id, name: d.name || d.department_name || d })))
      } else {
        // fallback hardcoded
        setDepartments([
          { id: 1, name: 'Solid Waste Management' },
          { id: 2, name: 'Public Works' },
          { id: 3, name: 'Water Supply' }
        ])
      }
    } catch (err) {
      setDepartments([
        { id: 1, name: 'Solid Waste Management' },
        { id: 2, name: 'Public Works' },
        { id: 3, name: 'Water Supply' }
      ])
    }
  }

  const fetchReports = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (categoryFilter) params.append('category', categoryFilter)
      if (priorityFilter) params.append('priority', priorityFilter)
      params.append('page', String(page))
      params.append('limit', String(limit))

      const res = await fetch(`${API_BASE}/admin/issues?${params.toString()}`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' }
      })
      if (res.status === 401 || res.status === 403) {
        window.location.href = '/login'
        return
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Failed to load' }))
        throw new Error(err.detail || 'Failed to load reports')
      }
      const json = await res.json()
      const data = json.data || {}
      setReports(data.issues || [])
      setTotal(data.total || (data.issues || []).length)
    } catch (err: any) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, categoryFilter, priorityFilter, page])

  const refresh = () => {
    fetchReports()
  }

  const loadDemo = () => {
    try {
      // @ts-ignore - JSON import
      setReports((demoComplaints as unknown as Report[]))
      setTotal((demoComplaints as unknown as Report[]).length)
    } catch (err) {
      console.error('Failed to load demo complaints', err)
    }
  }

  const categories = useMemo(() => {
    const set = new Set<string>()
    reports.forEach(r => { if (r.category) set.add(r.category) })
    return Array.from(set)
  }, [reports])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = reports.filter(r => {
      if (!q) return true
      return (r.title || '').toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q) || (r.reported_by?.name || '').toLowerCase().includes(q)
    })

    if (sortField) {
      list = list.sort((a: any, b: any) => {
        const av = a[sortField] || ''
        const bv = b[sortField] || ''
        if (av < bv) return sortDir === 'asc' ? -1 : 1
        if (av > bv) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return list
  }, [reports, query, sortField, sortDir])

  function badgeClass(status?: string) {
    switch (status) {
      case 'reported': return 'badge badge-gray'
      case 'in_progress': return 'badge badge-orange'
      case 'resolved': return 'badge badge-green'
      case 'rejected': return 'badge badge-red'
      default: return 'badge'
    }
  }

  const openDetails = (r: Report) => {
    setSelected(r)
    setShowDetails(true)
  }

  const closeDetails = () => { setSelected(null); setShowDetails(false) }

  const openMapFor = async (r: Report) => {
    try {
      const res = await fetch(`${API_BASE}/admin/issues/locations?category=&status=&priority=`, { headers: { Authorization: token ? `Bearer ${token}` : '' } })
      const json = await res.json()
      const locs = json.data?.locations || []
      // center on selected
      const selectedLoc = locs.find((l: any) => l.issue_id === r.id) || r.location && { issue_id: r.id, latitude: r.location.latitude, longitude: r.location.longitude, title: r.title, reported_by: r.reported_by?.name }
      const points = selectedLoc ? [selectedLoc] : locs
      setMapLocations(points.map((p: any) => ({ id: p.issue_id || p.id, title: p.title, longitude: p.longitude || p.longitude, latitude: p.latitude || p.latitude })))
      setShowMap(true)
    } catch (err) {
      alert('Failed to load map data')
    }
  }

  const doAssignDepartment = async (issueId: string, deptId: number) => {
    setActionLoading(true)
    try {
      const res = await fetch(`${API_BASE}/admin/issues/${issueId}`, { method: 'PATCH', headers: { 'Content-Type':'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify({ department_id: deptId }) })
      if (!res.ok) throw new Error('Failed to assign')
      // update local
      setReports(prev => prev.map(r => r.id === issueId ? { ...r, department: departments.find(d => d.id === deptId) } : r))
      alert('Assigned successfully')
    } catch (err: any) {
      alert(err.message || 'Error')
    } finally { setActionLoading(false) }
  }

  const doReject = async (issueId: string, reason: string) => {
    setActionLoading(true)
    try {
      const res = await fetch(`${API_BASE}/admin/issues/${issueId}`, { method: 'PATCH', headers: { 'Content-Type':'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify({ status: 'rejected', reject_reason: reason }) })
      if (!res.ok) throw new Error('Failed to reject')
      setReports(prev => prev.map(r => r.id === issueId ? { ...r, status: 'rejected' } : r))
      alert('Rejected')
    } catch (err: any) {
      alert(err.message || 'Error')
    } finally { setActionLoading(false) }
  }

  const doResolve = async (issueId: string, resolution: string) => {
    setActionLoading(true)
    try {
      const res = await fetch(`${API_BASE}/admin/issues/${issueId}`, { method: 'PATCH', headers: { 'Content-Type':'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify({ status: 'resolved', resolution: resolution }) })
      if (!res.ok) throw new Error('Failed to resolve')
      setReports(prev => prev.map(r => r.id === issueId ? { ...r, status: 'resolved' } : r))
      alert('Marked as resolved')
    } catch (err: any) {
      alert(err.message || 'Error')
    } finally { setActionLoading(false) }
  }

  return (
    <div className="reports-page-container reports-layout">
    <div className="filters-col">
        <h3>Filters</h3>
        <div className="filter-row">
          <label>Status</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="reported">reported</option>
            <option value="in_progress">in_progress</option>
            <option value="resolved">resolved</option>
            <option value="rejected">rejected</option>
          </select>
        </div>

        <div className="filter-row">
          <label>Category</label>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="">All</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-row">
          <label>Priority</label>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="">All</option>
            <option value="unassigned">unassigned</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
            <option value="urgent">urgent</option>
          </select>
        </div>

        <div style={{ marginTop: 12 }}>
          <button className="btn-primary" onClick={refresh}>↻ Refresh Data</button>
        </div>
      </div>

      <div className="list-col">
        <div className="list-header">
          <div>
            <h1>Reports</h1>
            <p className="muted">Centralized supervision — view & manage complaints</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" placeholder="Search by title, desc, reporter..." value={query} onChange={e => setQuery(e.target.value)} />
            <button className="btn-ghost" onClick={loadDemo}>Load Demo Complaints</button>
          </div>
        </div>

        {loading && <div className="loading">Loading reports...</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Issue ID</th>
                <th onClick={() => { setSortField('category'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc') }}>Category</th>
                <th>Title</th>
                <th onClick={() => { setSortField('priority'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc') }}>Priority</th>
                <th>Status</th>
                <th>Department</th>
                <th>Reported By</th>
                <th onClick={() => { setSortField('created_at'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc') }}>Date Reported</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="hover-row">
                  <td>{r.id}</td>
                  <td>{r.category || '-'}</td>
                  <td><button className="link-button" onClick={() => openDetails(r)}>{r.title}</button></td>
                  <td>{r.priority || '-'}</td>
                  <td><span className={badgeClass(r.status)}>{r.status}</span></td>
                  <td>{r.department?.name || '-'}</td>
                  <td>{r.reported_by?.name || '-'}</td>
                  <td>{r.created_at ? new Date(r.created_at).toLocaleString() : '-'}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => openDetails(r)}>View</button>
                    <button className="btn-ghost" onClick={() => { setActiveIssueId(r.id); setShowAssign(true); setFormValue('') }}>Assign</button>
                    <button className="btn-danger" onClick={() => { setActiveIssueId(r.id); setShowRejectModal(true); setFormValue('') }}>Reject</button>
                    <button className="btn-success" onClick={() => { setActiveIssueId(r.id); setShowResolveModal(true); setFormValue('') }}>Mark Solved</button>
                    <button className="btn-secondary" onClick={() => openMapFor(r)}>View on Map</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p-1))}>&lt; Prev</button>
          <span>Page {page} — Showing {filtered.length} of {total || filtered.length}</span>
          <button onClick={() => setPage(p => p+1)}>Next &gt;</button>
        </div>
      </div>

      {showDetails && selected && (
        <div className="modal">
          <div className="modal-card">
            <h3>{selected.title}</h3>
            <p className="muted">{selected.category} — {selected.subcategory}</p>
            <p>{selected.description}</p>
            {selected.image_url && <img src={selected.image_url} alt="issue" style={{ maxWidth: '100%', borderRadius: 8 }} />}
            {selected.voice_note_url && <audio controls src={selected.voice_note_url} />}
            <div><strong>Location:</strong> {selected.location?.address || '-'} ({selected.location?.latitude},{selected.location?.longitude})</div>
            <div><strong>Reported by:</strong> {selected.reported_by?.name} ({selected.reported_by?.phone})</div>
            <div><strong>Created:</strong> {selected.created_at} <strong>Updated:</strong> {selected.updated_at}</div>
            <div style={{ marginTop: 12 }}>
              <button className="btn-primary" onClick={() => { setShowDetails(false); setShowMap(true); openMapFor(selected) }}>Open on Map</button>
              <button className="btn-ghost" onClick={closeDetails}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showMap && (
        <div className="modal">
          <div className="modal-card large">
            <button className="btn-ghost" onClick={() => setShowMap(false)}>Close Map</button>
            <OLMap reports={mapLocations.map(m => ({ id: m.id, title: m.title, longitude: m.longitude, latitude: m.latitude }))} />
          </div>
        </div>
      )}

      {showAssign && activeIssueId && (
        <div className="modal">
          <div className="modal-card">
            <h3>Assign to Department</h3>
            <div style={{ marginBottom: 8 }}>
              <select value={formValue} onChange={e => setFormValue(e.target.value)}>
                <option value="">Select department</option>
                {departments.map(d => <option key={d.id} value={String(d.id)}>{d.name}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button className="btn-primary" disabled={actionLoading || !formValue} onClick={() => { doAssignDepartment(activeIssueId, Number(formValue)); setShowAssign(false); setActiveIssueId(null) }}>Assign</button>
              <button className="btn-ghost" onClick={() => { setShowAssign(false); setActiveIssueId(null) }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && activeIssueId && (
        <div className="modal">
          <div className="modal-card">
            <h3>Reject Report</h3>
            <textarea rows={4} value={formValue} onChange={e => setFormValue(e.target.value)} placeholder="Reason for rejection" style={{ width: '100%', padding:8, borderRadius:6 }} />
            <div style={{ display:'flex', gap:8, marginTop:8 }}>
              <button className="btn-danger" disabled={actionLoading || !formValue.trim()} onClick={() => { doReject(activeIssueId, formValue); setShowRejectModal(false); setActiveIssueId(null) }}>Reject</button>
              <button className="btn-ghost" onClick={() => { setShowRejectModal(false); setActiveIssueId(null) }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showResolveModal && activeIssueId && (
        <div className="modal">
          <div className="modal-card">
            <h3>Mark as Resolved</h3>
            <textarea rows={4} value={formValue} onChange={e => setFormValue(e.target.value)} placeholder="Resolution description" style={{ width: '100%', padding:8, borderRadius:6 }} />
            <div style={{ display:'flex', gap:8, marginTop:8 }}>
              <button className="btn-success" disabled={actionLoading || !formValue.trim()} onClick={() => { doResolve(activeIssueId, formValue); setShowResolveModal(false); setActiveIssueId(null) }}>Resolve</button>
              <button className="btn-ghost" onClick={() => { setShowResolveModal(false); setActiveIssueId(null) }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ReportsPage
