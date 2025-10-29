import axios from 'axios'
import { getToken, clearToken } from '@/auth/tokens'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    (r) => r,
    async (error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            clearToken()
            // aquí podrías redirigir a /login si quieres
        }
        return Promise.reject(error)
    }
)
