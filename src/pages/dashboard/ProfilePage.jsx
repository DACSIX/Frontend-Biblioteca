import { useEffect, useState } from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { useAuthStore } from '@/auth/authStore'
import { api } from '@/services/api'

export default function ProfilePage() {
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const user = useAuthStore((state) => state.user)

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true)
                const response = await api.get('/me/full') // Obtener el perfil desde el backend
                setProfile(response.data)
            } catch (error) {
                console.error("Error al obtener el perfil:", error)
            } finally {
                setLoading(false)
            }
        }

        if (!user) {
            console.error("No se encontró usuario autenticado")
            return
        }

        fetchProfile()
    }, [user])

    if (loading) {
        return <CircularProgress />
    }


    return (
        <Box>
            <Typography variant="h5" gutterBottom>Mi Perfil</Typography>
            {profile ? (
                <Box>
                    <Typography variant="h6">
                        Nombre: {[profile.nombreUno, profile.nombreDos, profile.apellidoUno, profile.apellidoDos]
                            .filter(Boolean)
                            .join(" ")}
                    </Typography>
                    <Typography variant="body1">Correo: {profile.correo}</Typography>
                    <Typography variant="body1">Roles: {profile.nombreRol}</Typography>
                    <Typography variant="body1">Telefono: {profile.telefono}</Typography>
                    {profile?.nombreRol?.toLowerCase() === 'admin' && (
                        <Button variant="contained" color="secondary">Editar Perfil</Button>
                    )}
                </Box>
            ) : (
                <Typography variant="body1">No se pudo cargar el perfil.</Typography>
            )}
        </Box>
    )
}