import React, { useContext } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

export function PrivateRoute({
  permissions,
  roles,
  redirectTo = '/login',
  children
}) {
  const { isAuthenticated } = useContext(AuthContext)

  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={'/login'} state={{ from: location }} />
  } 

  return children
}
