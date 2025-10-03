import { type ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.tsx'
import DashboardPage from './modules/dashboard/DashboardPage.tsx'
import './App.css'

const App = (): ReactElement => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          {/* Add more routes here as we build them */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
