import React from 'react';
import './StatsCard.css'; // Import the new CSS file

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
  const iconWrapperClass = () => {
    switch (title) {
      case 'Total Reports':
        return 'stats-card-icon-wrapper total-reports';
      case 'Resolved Today':
        return 'stats-card-icon-wrapper resolved-today';
      case 'In Progress':
        return 'stats-card-icon-wrapper in-progress';
      case 'Active Users':
        return 'stats-card-icon-wrapper active-users';
      default:
        return 'stats-card-icon-wrapper';
    }
  };

  return (
    <div className="stats-card-container">
      <div className="stats-card-content">
        <div>
          <p className="stats-card-title">{title}</p>
          <h3 className="stats-card-value">{value}</h3>
          <p className={`stats-card-change ${change.trend}`}>
            {change.trend === 'up' ? (
              <svg className="stats-card-change-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ) : (
              <svg className="stats-card-change-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
              </svg>
            )}
            {change.value} from last month
          </p>
        </div>
        {icon && (
          <div className={iconWrapperClass()}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
