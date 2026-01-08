// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from '../pages/login/';
import ProtectedRouter from './ProtectedRouter';
import LayoutConSidebar from '../compartidos/layouts/LayoutConSidebar';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import InicioPagina from '../pages/inicio/componentes/InicioPagina'
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta pública - Login */}
                <Route path="/login" element={<LoginForm />} />


                <Route element={
                    <ProtectedRouter>
                        <LayoutConSidebar />
                    </ProtectedRouter>
                }>
                    {/* Dashboard - Acceso básico autenticado */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/inicio" element={<InicioPagina />} />


                    {/* Perfil - Acceso básico autenticado
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Configuración - Acceso básico autenticado */}
                    {/* <Route path="/settings" element={<SettingsPage />} />  */}


                    {/* Reportes - Requiere permiso específico */}
                    {/* <Route path="/reports" element={
                        <ProtectedRoute requiredPermissions={['view_reports']}>
                            <ReportsPage />
                        </ProtectedRoute>
                    } /> */}

                    {/* Admin - Requiere rol admin
                    <Route path="/admin" element={
                        <ProtectedRoute requiredRoles={['admin']}>
                            <AdminPage />
                        </ProtectedRoute>
                    } /> */}

                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;