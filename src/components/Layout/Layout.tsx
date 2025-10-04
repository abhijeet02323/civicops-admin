import React from 'react';
import { useLocation } from 'react-router-dom';
import ProSidebar from '../ProSidebar/ProSidebar';
import './Layout.css'; // Import the new CSS file

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/reports':
        return 'Reports';
      case '/users':
        return 'Users';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="layout-container">
      <ProSidebar />
      <div className="layout-content">
        <header className="layout-header">
          <div className="layout-header-inner">
            <div>
              <h2 className="layout-title">{getPageTitle()}</h2>
              <p className="layout-subtitle">Welcome back to CivicOps Dashboard</p>
            </div>
            <div className="layout-header-actions">
              <div className="layout-header-buttons">
                <button className="notification-button">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="notification-badge"></span>
                </button>
                <button className="user-menu-button group">
                  <div className="user-avatar-wrapper">
                    <img 
                      className="user-avatar" 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="User avatar" 
                    />
                    <span className="user-status-badge"></span>
                  </div>
                  <span className="user-name">Tom Cook</span>
                  <svg className="user-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
