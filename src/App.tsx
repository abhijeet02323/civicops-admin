import { type ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.tsx'
import DashboardPage from './modules/dashboard/DashboardPage.tsx'
import ReportsPage from './modules/reports/ReportsPage.tsx'
import UsersPage from './modules/users/UsersPage.tsx'
import AnalyticsPage from './modules/analytics/AnalyticsPage.tsx'
import ComplaintsPage from './modules/complaints/ComplaintsPage.tsx'
import DepartmentsPage from './modules/departments/DepartmentsPage.tsx'
import SettingsPage from './modules/settings/SettingsPage.tsx'
import './App.css'

const App = (): ReactElement => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
