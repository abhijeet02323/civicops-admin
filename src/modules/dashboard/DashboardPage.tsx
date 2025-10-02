import { type ReactElement } from 'react'
import StatsCard from '../../components/StatsCard/StatsCard'
import { type Report } from '../../types/report'

const DashboardPage = (): ReactElement => {
  const stats = [
    {
      title: 'Total Reports',
      value: '1,247',
      change: 12,
      trend: 'up',
      subtitle: 'Total complaints received',
      icon: (
        <div className="p-3 bg-blue-50 rounded-xl">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Resolved Today',
      value: '43',
      change: 8,
      trend: 'up',
      subtitle: 'Issues resolved today',
      icon: (
        <div className="p-3 bg-green-50 rounded-xl">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'In Progress',
      value: '89',
      change: -5,
      trend: 'down',
      subtitle: 'Active complaints',
      icon: (
        <div className="p-3 bg-yellow-50 rounded-xl">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Active Users',
      value: '2,156',
      change: 15,
      trend: 'up',
      subtitle: 'Citizens using the app',
      icon: (
        <div className="p-3 bg-purple-50 rounded-xl">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      ),
    },
  ]

  const recentReports: Report[] = [
    {
      id: '1',
      title: 'Pothole on Main Street',
      location: 'Main St & 5th Ave',
      priority: 'High',
      status: 'In Progress',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Broken Streetlight',
      location: 'Oak St & 2nd Ave',
      priority: 'Medium',
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
          </div>
          <div className="space-y-5">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    report.priority === 'High' ? 'bg-red-50' : 'bg-yellow-50'
                  }`}>
                    <svg className={`w-6 h-6 ${
                      report.priority === 'High' ? 'text-red-600' : 'text-yellow-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{report.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm text-gray-500">{report.location}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    report.priority === 'High' 
                      ? 'bg-red-50 text-red-700 border border-red-100' 
                      : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                  }`}>
                    {report.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    report.status === 'In Progress' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                      : 'bg-gray-50 text-gray-700 border border-gray-100'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Issue Distribution</h2>
            <select className="text-sm text-gray-600 border rounded-lg px-3 py-1.5">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Chart will be implemented here
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
