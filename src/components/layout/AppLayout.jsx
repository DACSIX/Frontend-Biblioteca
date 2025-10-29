import { Outlet, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material'

export default function AppLayout() {
    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Biblioteca</Typography>
                    <Button color="inherit" component={Link} to="/catalogo">Catálogo</Button>
                    <Button color="inherit" component={Link} to="/me">Perfil</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Box py={3}><Outlet /></Box>
            </Container>
        </>
    )
}
