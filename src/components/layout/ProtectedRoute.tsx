import { useAppData } from '@/hooks/useAppData'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute() {
  const { isAuthenticated } = useAppData()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
