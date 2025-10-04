import { type ReactElement } from 'react'
import './DepartmentsPage.css'

const DepartmentsPage = (): ReactElement => {
  return (
    <div className="departments-page-container">
      <h1 className="departments-page-header">Departments</h1>
      <p className="departments-page-description">Manage municipal departments</p>
      {/* Departments content will go here */}
    </div>
  )
}

export default DepartmentsPage
