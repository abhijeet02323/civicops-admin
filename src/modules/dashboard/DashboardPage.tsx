import { type ReactElement } from 'react'
import StatsCard from '../../components/StatsCard/StatsCard'
import RecentReportCard from '../../components/RecentReportCard/RecentReportCard'
import OLMap from '../../components/Map/Map.tsx'
import './DashboardPage.css' // Import the new CSS file

const DashboardPage = (): ReactElement => {
  const statsData = [
    {
      title: 'Total Reports',
      value: '1,247',
      change: { value: '+12%', trend: 'up' as const },
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Resolved Today',
      value: '43',
      change: { value: '+8%', trend: 'up' as const },
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'In Progress',
      value: '89',
      change: { value: '-5%', trend: 'down' as const },
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Active Users',
      value: '2,156',
      change: { value: '+15%', trend: 'up' as const },
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const recentReports = [
    {
      title: 'Pothole on Main Street',
      location: 'Main St & 5th Ave',
      // sample coordinates in lon/lat (India)
      longitude: 72.8777,
      latitude: 19.0760,
      priority: 'High' as const,
      status: 'In Progress' as const
    },
    {
      title: 'Broken Streetlight',
      location: 'Oak St & 2nd Ave',
      longitude: 77.1025,
      latitude: 28.7041,
      priority: 'Medium' as const,
      status: 'Pending' as const
    }
  ];

  return (
    <div className="dashboard-page-container">
      <div>
        <h1 className="dashboard-page-header">Dashboard</h1>
        <p className="dashboard-page-description">Manage civic reports and municipal operations</p>
      </div>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <h2 className="recent-reports-header">Map View</h2>
        <OLMap
          reports={recentReports.map((r, i) => ({ id: i, title: r.title, longitude: r.longitude as number, latitude: r.latitude as number }))}
        />
      </div>

      <div>
        <h2 className="recent-reports-header">Recent Reports</h2>
        <div>
          {recentReports.map((report, index) => (
            <RecentReportCard
              key={index}
              title={report.title}
              location={report.location}
              priority={report.priority}
              status={report.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
