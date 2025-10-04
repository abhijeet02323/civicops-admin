import React from 'react';
import './RecentReportCard.css'; // Import the new CSS file

interface RecentReportCardProps {
  title: string;
  location: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Resolved';
}

const RecentReportCard: React.FC<RecentReportCardProps> = ({ title, location, priority, status }) => {
  const getPriorityClass = (p: 'High' | 'Medium' | 'Low') => {
    switch (p) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const getStatusClass = (s: 'Pending' | 'In Progress' | 'Resolved') => {
    switch (s) {
      case 'Pending':
        return 'status-pending';
      case 'In Progress':
        return 'status-in-progress';
      case 'Resolved':
        return 'status-resolved';
      default:
        return '';
    }
  };

  return (
    <div className="recent-report-card-container">
      <div className="recent-report-card-content-left">
        <div className="recent-report-card-icon-wrapper">
          <svg className="recent-report-card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h3 className="recent-report-card-title">{title}</h3>
          <p className="recent-report-card-location">{location}</p>
        </div>
      </div>
      <div className="recent-report-card-content-right">
        <span className={`recent-report-card-badge ${getPriorityClass(priority)}`}>
          {priority}
        </span>
        <span className={`recent-report-card-badge ${getStatusClass(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default RecentReportCard;
