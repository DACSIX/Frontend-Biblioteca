import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from './authStore'

export function ProtectedRoute() {
    const isAuth = useAuthStore((s) => s.isAuth)
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}

export function RoleGuard({ roles }) {
    const hasRole = useAuthStore((s) => s.hasRole)
    const ok = roles.some((r) => hasRole(r))
    return ok ? <Outlet /> : <Navigate to="/" replace />
}
