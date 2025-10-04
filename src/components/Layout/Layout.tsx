import React from 'react';
import { useLocation } from 'react-router-dom';

import ProSidebar from '../ProSidebar/ProSidebar';

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
    <div className="flex min-h-screen bg-secondary-50">
      <ProSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-soft z-10 fixed top-0 right-0 left-[260px] backdrop-blur-sm bg-white/80">
          <div className="py-4 px-8 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-secondary-900">{getPageTitle()}</h2>
              <p className="text-sm text-secondary-500 mt-1">Welcome back to CivicOps Dashboard</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <button className="relative p-2.5 text-secondary-400 hover:text-secondary-600 bg-secondary-50 hover:bg-secondary-100 rounded-xl transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger-500 border-2 border-white rounded-full shadow-sm"></span>
                </button>
                <button className="relative inline-flex items-center p-2 hover:bg-secondary-50 rounded-xl group transition-colors">
                  <div className="relative">
                    <img 
                      className="w-9 h-9 rounded-xl border-2 border-white shadow-soft" 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="User avatar" 
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-500 border-2 border-white rounded-full"></span>
                  </div>
                  <span className="hidden md:block ml-2 text-sm font-medium text-secondary-700 group-hover:text-secondary-900">Tom Cook</span>
                  <svg className="hidden md:block ml-2 h-5 w-5 text-secondary-400 group-hover:text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 mt-16 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
