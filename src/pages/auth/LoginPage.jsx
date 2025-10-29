import { useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/services/auth.api'
import { useAuthStore } from '@/auth/authStore'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const doLogin = useAuthStore((s) => s.login)

    const mutation = useMutation({
        mutationFn: () => login({ email, password }),
        onSuccess: (data) => {
            const token = data?.accessToken ?? data?.token ?? ''
            if (!token) { enqueueSnackbar('Respuesta de login inválida', { variant: 'error' }); return }
            doLogin(token)
            enqueueSnackbar('Bienvenido/a', { variant: 'success' })
            navigate('/')
        },
        onError: (err) => {
            const msg = err?.response?.data?.message || 'Credenciales inválidas'
            enqueueSnackbar(msg, { variant: 'error' })
        },
    })

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper sx={{ p: 3, width: 360 }}>
                <Typography variant="h6" mb={2}>Iniciar sesión</Typography>
                <TextField label="Correo" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
                <Button fullWidth sx={{ mt: 2 }} disabled={mutation.isPending} onClick={() => mutation.mutate()}>
                    {mutation.isPending ? 'Ingresando...' : 'Entrar'}
                </Button>
            </Paper>
        </Box>
    )
}
