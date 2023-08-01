import { Routes, Route, Navigate } from 'react-router-dom'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { AuthHeaderLayout } from '../layouts/AuthHeaderLayout'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { SignupPage } from '../pages/SignupPage'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { CausePage } from '../pages/CausePage'

export const RouteList = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><AuthHeaderLayout /></PublicRoute>}>
      <Route index element={<Navigate replace to={'login'} />} />
      
      <Route
        path="login"
        element={<LoginPage/>}
      />
      <Route
        path="signup"
        element={<SignupPage/>}
      />
    </Route>

    <Route path='/' element={<PrivateRoute><DashboardLayout/></PrivateRoute>}>
      <Route
        path="dashboard"
        element={<DashboardPage />}
      />
      <Route
        path="cause"
        element={<CausePage />}
      />
    </Route>

    <Route path="*" element={<h1>404</h1>} />

  </Routes>
)
