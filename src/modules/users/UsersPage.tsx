import { type ReactElement } from 'react'
import './UsersPage.css'

const UsersPage = (): ReactElement => {
  return (
    <div className="users-page-container">
      <h1 className="users-page-header">Users</h1>
      <p className="users-page-description">Manage all registered users</p>
      {/* Users content will go here */}
    </div>
  )
}

export default UsersPage
