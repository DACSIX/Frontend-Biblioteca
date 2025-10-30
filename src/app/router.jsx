import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import HomePage from '@/pages/dashboard/HomePage'
import ProfilePage from '@/pages/dashboard/ProfilePage'
import CatalogoPage from '@/pages/catalogo/CatalogoPage'
import LibroDetallePage from '@/pages/catalogo/LibroDetallePage'
import MisReservasPage from '@/pages/usuario/MisReservasPage'
import MisPrestamosPage from '@/pages/usuario/MisPrestamosPage'
import MisMultasPage from '@/pages/usuario/MisMultasPage'
import LibrosPage from '@/pages/admin/LibrosPage'
import ReservasPage from '@/pages/admin/ReservasPage'
import PrestamosPage from '@/pages/admin/PrestamosPage'
import MultasPage from '@/pages/admin/MultasPage'
import UsuariosPage from '@/pages/admin/UsuariosPage'
import MediaPage from '@/pages/admin/MediaPage'
import { ProtectedRoute, RoleGuard } from '@/auth/guards'

export const router = createBrowserRouter([
    // Rutas públicas (sin autenticación)
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },

    // Rutas protegidas (usuario autenticado)
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    { path: '/', element: <HomePage /> },
                    { path: '/me', element: <ProfilePage /> },
                    { path: '/catalogo', element: <CatalogoPage /> },
                    { path: '/libros/:id', element: <LibroDetallePage /> },
                ],
            },

            //Rutas del rol USUARIO
            {
                element: <RoleGuard roles={['usuario']} />,
                children: [
                    { path: '/mis-reservas', element: <MisReservasPage /> },
                    { path: '/mis-prestamos', element: <MisPrestamosPage /> },
                    { path: '/mis-multas', element: <MisMultasPage /> },
                ],
            },

            //Rutas del rol BIBLIOTECARIO
            {
                element: <RoleGuard roles={['bibliotecario']} />,
                children: [
                    {
                        element: <AdminLayout />,
                        children: [
                            { path: '/admin/reservas', element: <ReservasPage /> },
                            { path: '/admin/prestamos', element: <PrestamosPage /> },
                            { path: '/admin/multas', element: <MultasPage /> },
                            { path: '/admin/libros', element: <LibrosPage /> }
                        ],
                    },
                ],
            },

            // Rutas del rol ADMIN
            {
                element: <RoleGuard roles={['admin']} />,
                children: [
                    {
                        element: <AdminLayout />,
                        children: [
                            { path: '/admin/libros', element: <LibrosPage /> },
                            { path: '/admin/usuarios', element: <UsuariosPage /> },
                            { path: '/admin/media', element: <MediaPage /> },
                        ],
                    },
                ],
            },
        ],
    },
])

