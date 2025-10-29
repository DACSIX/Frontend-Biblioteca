import { api } from './api'

export function login(dto) {
    // Ajusta la ruta según tu backend: /auth/login ó /api/auth/login
    return api.post('/auth/login', dto).then(r => r.data)
}