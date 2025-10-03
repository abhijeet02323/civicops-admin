import React from 'react';

interface RecentReportCardProps {
  title: string;
  location: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Resolved';
}

const RecentReportCard: React.FC<RecentReportCardProps> = ({ title, location, priority, status }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-soft mb-3">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-secondary-50 rounded-lg">
          <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-secondary-900 font-medium">{title}</h3>
          <p className="text-secondary-500 text-sm">{location}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          priority === 'High' ? 'bg-danger-50 text-danger-700' :
          priority === 'Medium' ? 'bg-warning-50 text-warning-700' :
          'bg-success-50 text-success-700'
        }`}>
          {priority}
        </span>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          status === 'Pending' ? 'bg-secondary-100 text-secondary-700' :
          status === 'In Progress' ? 'bg-primary-50 text-primary-700' :
          'bg-success-50 text-success-700'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default RecentReportCard;
