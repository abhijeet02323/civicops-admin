import { type ReactElement } from 'react'
import ProSidebar from '../ProSidebar/ProSidebar'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  const location = useLocation()
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard'
      case '/reports':
        return 'Reports'
      case '/analytics':
        return 'Analytics'
      case '/complaints':
        return 'Complaints'
      case '/departments':
        return 'Departments'
      case '/settings':
        return 'Settings'
      default:
        return 'Dashboard'
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <ProSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm z-10 fixed top-0 right-0 left-[260px]">
          <div className="py-4 px-8 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h2>
              <p className="text-sm text-gray-500 mt-1">Welcome back to CivicOps Dashboard</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-4 border-l pl-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-medium shadow-lg shadow-indigo-500/25">
                  A
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Admin User</span>
                  <p className="text-xs text-gray-500">admin@civicops.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 mt-[89px] max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
