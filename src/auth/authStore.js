import { create } from 'zustand'
import { jwtDecode } from "jwt-decode";
import { getToken, setToken, clearToken } from './tokens'

export const useAuthStore = create((set, get) => ({
    isAuth: !!getToken(),
    user: (() => {
        const t = getToken()
        if (!t) return undefined
        try {
            const decoded = jwtDecode(t)
            return { email: decoded.sub, roles: decoded.roles || [] }
        } catch { return undefined }
    })(),
    login: (token) => {
        setToken(token)
        try {
            const decoded = jwtDecode(token)
            set({ isAuth: true, user: { email: decoded.sub, roles: decoded.roles || [] } })
        } catch {
            set({ isAuth: true, user: undefined })
        }
    },
    logout: () => { clearToken(); set({ isAuth: false, user: undefined }) },
    hasRole: (role) => (get().user?.roles || []).includes(role),
}))