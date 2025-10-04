import { type ReactElement, useEffect, useMemo, useState } from 'react'
import './ReportsPage.css'

type Report = {
  id: string
  title: string
  description?: string
  status?: string
  priority?: string
  location?: {
    lat: number
    lon: number
  }
  createdAt?: string
}

const API_BASE = import.meta.env.VITE_CIVICOPS_API_BASE || 'https://civic-ops.onrender.com'
const API_KEY = import.meta.env.VITE_CIVICOPS_API_KEY || ''

const ReportsPage = (): ReactElement => {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(`${API_BASE}/api/reports`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {})
      }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`)
        return res.json()
      })
      .then((data) => {
        // assume data is array of reports
        setReports(data || [])
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(String(err))
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return reports
    return reports.filter(r => (r.title || '').toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q))
  }, [reports, query])

  return (
    <div className="reports-page-container">
      <h1 className="reports-page-header">Reports</h1>
      <p className="reports-page-description">View and manage all civic reports</p>

      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <input className="input" placeholder="Search reports..." value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Location</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{r.priority ?? '-'}</td>
                  <td>{r.status ?? '-'}</td>
                  <td>{r.location ? `${r.location.lat.toFixed(3)}, ${r.location.lon.toFixed(3)}` : '-'}</td>
                  <td>{r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ReportsPage
