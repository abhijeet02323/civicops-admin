import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: {
    value: string;
    trend: 'up' | 'down';
  };
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-600">{title}</p>
          <h3 className="text-2xl font-semibold text-secondary-900 mt-1">{value}</h3>
          <p className={`text-sm mt-2 flex items-center ${
            change.trend === 'up' ? 'text-success-600' : 'text-danger-600'
          }`}>
            {change.trend === 'up' ? (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
              </svg>
            )}
            {change.value} from last month
          </p>
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${
            title === 'Total Reports' ? 'bg-primary-50 text-primary-600' :
            title === 'Resolved Today' ? 'bg-success-50 text-success-600' :
            title === 'In Progress' ? 'bg-warning-50 text-warning-600' :
            'bg-info-50 text-info-600'
          }`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
