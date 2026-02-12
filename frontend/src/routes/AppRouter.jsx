
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from '../pages/login/';
import ProtectedRouter from './ProtectedRouter';
import LayoutConSidebar from '../compartidos/layouts/LayoutConSidebar';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import InicioPagina from '../pages/inicio/componentes/InicioPagina'
import ActividadesPage from '../pages/actividades/paginas/ActividadesPage';
import { ReportesPage } from '../pages/reportes';
// import { EstudiantesList } from '../pages/estudiantes';
import {
    PersonalLayout,
    DocentesPage,
    AdministrativosPage,
    ObrerosPage
} from '../pages/personal';
import ConfiguracionPage from '../pages/configuracion/paginas/ConfiguracionPage';
// import { SeccionesPage } from '../pages/secciones/'
// import SeccionesModule from '../pages/secciones';
import SeccionesLayout from '../pages/secciones/componentes/Layout/SeccionesLayout';
import GradosPage from '../pages/secciones/paginas/GradosPage'
import SeccionesPage from '../pages/secciones/paginas/SeccionesPage'
import SeccionDetallePage from '../pages/secciones/paginas/SeccionDetallePage'
import EditarSeccionPage from '../pages/secciones/paginas/EditarSeccionPage';
import EstadisticasPage from '../pages/secciones/paginas/EstadisticasPage';

import UsuariosModulo from '../pages/usuarios/index';

import {
    EstudiantesPage,
    CrearEstudiantePage,
    EditarEstudiantePage,
    DetalleEstudiantePage
} from '../pages/estudiantes/';

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

                    <Route path="/secciones" element={<SeccionesLayout />}>
                        <Route index element={<GradosPage />} />
                        <Route path="grados" element={<GradosPage />} />
                        <Route path="grados/:gradoId/secciones" element={<SeccionesPage />} />
                        <Route path="detalle/:id" element={<SeccionDetallePage />} />
                        <Route path="editar/:id" element={<EditarSeccionPage />} />
                        <Route path="estadisticas" element={<EstadisticasPage />} />
                    </Route>


                    {/* Dashboard - Acceso básico autenticado */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/inicio" element={<InicioPagina />} />
                    <Route path="/actividades" element={<ActividadesPage />} />
                    <Route path="/reportes" element={<ReportesPage />} />
                    <Route path="/personal" element={<PersonalLayout />}>
                        <Route path="docentes" element={<DocentesPage />} />
                        <Route path="administrativos" element={<AdministrativosPage />} />
                        <Route path="obreros" element={<ObrerosPage />} />
                    </Route>
                    <Route path="/configuracion" element={<ConfiguracionPage />} />
                    // <Route path="/usuarios" element={<UsuariosModulo />} />



                    <Route path="/estudiantes" element={<EstudiantesPage />} />
                    <Route path="/estudiantes/nuevo" element={<CrearEstudiantePage />} />
                    <Route path="/estudiantes/:id" element={<DetalleEstudiantePage />} />
                    <Route path="/estudiantes/:id/editar" element={<EditarEstudiantePage />} />

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