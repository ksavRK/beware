
import React from 'react'

import { AuthProvider } from './AuthContext'
import { DashboardProvider } from './DashboardConext'

export const BewareProvider = ({ children }) => {
  return (
    <AuthProvider>
      <DashboardProvider>
        {children}
      </DashboardProvider>
    </AuthProvider>
  )
}
