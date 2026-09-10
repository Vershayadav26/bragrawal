import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../components/common/Loader'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ roles }) {
  const { user, ready } = useAuth()
  if (!ready) return <Loader label="Checking session…" />
  if (!user) return <Navigate to="/login" replace />
  if (roles?.length && !roles.includes(user.role)) return <Navigate to="/" replace />
  return <Outlet />
}
