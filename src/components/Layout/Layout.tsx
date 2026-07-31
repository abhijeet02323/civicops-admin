import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

interface LayoutProps { children: React.ReactNode }

const pageCopy: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Operations overview', subtitle: 'Keep civic services moving, every day.' },
  '/reports': { title: 'Reports', subtitle: 'Review, assign and resolve citizen requests.' },
  '/analytics': { title: 'Analytics', subtitle: 'Understand service performance across the city.' },
  '/departments': { title: 'Departments', subtitle: 'Coordinate teams and workloads.' },
  '/users': { title: 'Users', subtitle: 'Manage administrator access.' },
  '/settings': { title: 'Settings', subtitle: 'Configure your CivicOps workspace.' },
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const page = pageCopy[pathname] ?? { title: 'CivicOps', subtitle: 'Municipal operations workspace.' }

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return <div className="layout-container">
    <Sidebar />
    <div className="layout-content content-with-sidebar">
      <header className="layout-header">
        <div className="layout-header-inner">
          <div className="page-intro"><p className="page-eyebrow">CIVICOPS / ADMIN</p><h1 className="layout-title">{page.title}</h1><p className="layout-subtitle">{page.subtitle}</p></div>
          <div className="layout-header-actions">
            <button className="notification-button" type="button" aria-label="View 3 notifications" title="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 0 0-4-5.66V5a2 2 0 1 0-4 0v.34A6 6 0 0 0 7 11v3.16c0 .53-.21 1.04-.59 1.42L5 17h5m5 0v1a3 3 0 0 1-6 0v-1" /></svg><span className="notification-badge">3</span>
            </button>
            <div className="profile-menu" ref={profileRef}>
              <button className="user-menu-button" type="button" onClick={() => setProfileOpen(value => !value)} aria-expanded={profileOpen}>
                <span className="user-avatar">AC</span><span className="user-identity"><strong>Admin CivicOps</strong><small>City administrator</small></span>
                <svg className="user-dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" /></svg>
              </button>
              {profileOpen && <div className="profile-popover" role="menu"><div className="profile-popover-head"><strong>Admin CivicOps</strong><span>admin@civicops.gov</span></div><button type="button" role="menuitem">My profile</button><button type="button" role="menuitem">Workspace settings</button><hr /><button type="button" role="menuitem" className="sign-out">Sign out</button></div>}
            </div>
          </div>
        </div>
      </header>
      <main className="layout-main">{children}</main>
    </div>
  </div>
}

export default Layout
