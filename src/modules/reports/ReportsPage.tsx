import { type ReactElement } from 'react'
import './ReportsPage.css'

const ReportsPage = (): ReactElement => {
  return (
    <div className="reports-page-container">
      <h1 className="reports-page-header">Reports</h1>
      <p className="reports-page-description">View and manage all civic reports</p>
      {/* Reports content will go here */}
    </div>
  )
}

export default ReportsPage
