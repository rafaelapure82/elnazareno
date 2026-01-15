// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from '../pages/login/';
import ProtectedRouter from './ProtectedRouter';
import LayoutConSidebar from '../compartidos/layouts/LayoutConSidebar';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import InicioPagina from '../pages/inicio/componentes/InicioPagina'
import ActividadesPage from '../pages/actividades/paginas/ActividadesPage';
import { ReportesPage } from '../pages/reportes';
import { EstudiantesPage } from '../pages/estudiantes';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta pública - Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginForm />} />



                <Route element={
                    <ProtectedRouter>
                        <LayoutConSidebar />
                    </ProtectedRouter>
                }>
                    {/* Dashboard - Acceso básico autenticado */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/inicio" element={<InicioPagina />} />
                    <Route path="/actividades" element={<ActividadesPage />} />
                    <Route path="/reportes" element={<ReportesPage />} />
                    <Route path="/estudiantes" element={<EstudiantesPage />} />


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