import { type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import StatsCard from '../../components/StatsCard/StatsCard'
import RecentReportCard from '../../components/RecentReportCard/RecentReportCard'
import OLMap from '../../components/Map/Map'
import './DashboardPage.css'

const DashboardPage = (): ReactElement => {
  const stats = [
    { title: 'Total Reports', value: '1,247', change: { value: '+12%', trend: 'up' as const }, icon: '▤' },
    { title: 'Resolved Today', value: '43', change: { value: '+8%', trend: 'up' as const }, icon: '✓' },
    { title: 'In Progress', value: '89', change: { value: '5 fewer', trend: 'up' as const }, icon: '◷' },
    { title: 'Active Users', value: '2,156', change: { value: '+15%', trend: 'up' as const }, icon: '◎' },
  ]
  const recentReports = [
    { title:'Pothole on Main Street', location:'Main St & 5th Ave', longitude:72.8777, latitude:19.0760, priority:'High' as const, status:'In Progress' as const },
    { title:'Broken streetlight', location:'Oak St & 2nd Ave', longitude:77.1025, latitude:28.7041, priority:'Medium' as const, status:'Pending' as const },
    { title:'Overflowing waste bin', location:'Market Road, Ward 12', longitude:73.8567, latitude:18.5204, priority:'High' as const, status:'Pending' as const },
  ]
  return <div className="dashboard-page-container">
    <section className="dashboard-welcome">
      <div><h2>Good morning, Admin</h2><p>Here is what needs your attention across the city today.</p></div>
      <Link className="dashboard-primary-action" to="/reports">Review pending reports <span>→</span></Link>
    </section>
    <section className="stats-grid">{stats.map(stat => <StatsCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} icon={<span className="metric-symbol">{stat.icon}</span>} />)}</section>
    <section className="attention-grid">
      <div className="attention-card"><div className="attention-icon danger">!</div><div><strong>12 reports need assignment</strong><p>New cases are waiting for a department owner.</p></div><Link to="/reports">Assign now</Link></div>
      <div className="attention-card"><div className="attention-icon warning">◷</div><div><strong>7 service targets are at risk</strong><p>These reports are close to their resolution deadline.</p></div><Link to="/reports">View cases</Link></div>
    </section>
    <section className="dashboard-workspace">
      <div className="dashboard-panel map-panel"><div className="panel-heading"><div><h3>Issue map</h3><p>Latest reports across municipal zones</p></div><span className="live-pill"><i /> Live</span></div><OLMap reports={recentReports.map((r, id) => ({ id, title:r.title, longitude:r.longitude, latitude:r.latitude }))} /></div>
      <div className="dashboard-panel queue-panel"><div className="panel-heading"><div><h3>Priority queue</h3><p>Newest cases requiring review</p></div><Link to="/reports">View all</Link></div><div className="queue-list">{recentReports.map(report => <RecentReportCard key={report.title} {...report} />)}</div></div>
    </section>
  </div>
}
export default DashboardPage
