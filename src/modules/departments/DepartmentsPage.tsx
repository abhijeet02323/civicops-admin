import { type ChangeEvent, type ReactElement, useMemo, useState } from 'react'
import departmentsCsv from './departments.csv?raw'
import './DepartmentsPage.css'

interface Department {
  name: string
  function: string
}

const parseCSV = (csv: string): Department[] => {
  const lines = csv.trim().split('\n')
  const rows = lines.slice(1) // skip header
  return rows.map(line => {
    // simple CSV parse by first comma split
    const [name, ...rest] = line.split(',')
    const fn = rest.join(',').trim()
    return { name: name.trim(), function: fn }
  })
}

const DepartmentsPage = (): ReactElement => {
  const [query, setQuery] = useState('')

  const departments = useMemo(() => parseCSV(departmentsCsv), [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return departments
    return departments.filter(d => d.name.toLowerCase().includes(q) || d.function.toLowerCase().includes(q))
  }, [departments, query])

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

  return (
    <div className="departments-page-container">
      <h1 className="departments-page-header">Departments</h1>
      <p className="departments-page-description">Manage municipal departments</p>

      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <input
          className="input"
          placeholder="Search departments or functions..."
          value={query}
          onChange={onSearch}
        />
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.function}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DepartmentsPage
