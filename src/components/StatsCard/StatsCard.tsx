import { type ReactElement } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down'
  subtitle: string
  icon?: ReactElement
}

const StatsCard = ({ title, value, change, trend, subtitle, icon }: StatsCardProps): ReactElement => {
  const isPositive = trend === 'up'

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div>
            <h3 className="text-gray-700 font-medium mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            <div className="flex items-center mt-2">
              <span className={`flex items-center text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
                {Math.abs(change)}%
              </span>
              <span className="text-gray-500 text-sm ml-1.5">vs last month</span>
            </div>
          </div>
        </div>
        {icon && <div>{icon}</div>}
      </div>
    </div>
  )
}

export default StatsCard
