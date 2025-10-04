import { type ReactElement } from 'react'
import './AnalyticsPage.css'
import AnalyticsCharts from './AnalyticsCharts'

const AnalyticsPage = (): ReactElement => {
  return (
    <div className="analytics-page-container">
      <h1 className="analytics-page-header">Analytics</h1>
      <p className="analytics-page-description">View system analytics and trends</p>
      <div style={{ marginTop: 16 }}>
        <AnalyticsCharts />
      </div>
    </div>
  )
}

export default AnalyticsPage
