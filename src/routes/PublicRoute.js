import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

export function PublicRoute({ children }) {
  const { isAuthenticated, } = useContext(AuthContext)

  if (isAuthenticated ) {
    return <Navigate to={'/dashboard'} />
  } 
  
  return children
}
