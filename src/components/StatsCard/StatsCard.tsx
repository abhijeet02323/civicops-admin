import { type ReactElement } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  change: number
  icon?: ReactElement
}

const StatsCard = ({ title, value, change, icon }: StatsCardProps): ReactElement => {
  const isPositive = change >= 0

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{change}% from last month
      </div>
    </div>
  )
}

export default StatsCard
