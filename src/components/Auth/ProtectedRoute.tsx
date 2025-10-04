import React from 'react'
import { Navigate } from 'react-router-dom'
import auth from '../../services/auth'

interface Props {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  if (!auth.isAuthenticated()) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute
