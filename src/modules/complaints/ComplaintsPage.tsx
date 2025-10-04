import { type ReactElement } from 'react'
import './ComplaintsPage.css'

const ComplaintsPage = (): ReactElement => {
  return (
    <div className="complaints-page-container">
      <h1 className="complaints-page-header">Complaints</h1>
      <p className="complaints-page-description">Manage all civic complaints</p>
      {/* Complaints content will go here */}
    </div>
  )
}

export default ComplaintsPage
