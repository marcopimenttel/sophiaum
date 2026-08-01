import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { AdminLogin } from '../pages/AdminLogin'
import { AdminDashboard } from '../pages/AdminDashboard'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '../hooks/useAuth'

export function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* Página pública do convite */}
        <Route path="/" element={<Home />} />

        {/* Admin login */}
        <Route
          path="/admin/login"
          element={
            isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLogin />
          }
        />

        {/* Admin dashboard (protegido) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
