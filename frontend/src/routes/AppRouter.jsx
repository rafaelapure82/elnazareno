// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from '../pages/login/';
import DashboardPage from '../pages/Dashboard/DashboardPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta pública - Login */}
                <Route path="/login" element={<LoginForm />} />

                {/* Ruta protegida - Dashboard */}
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* Ruta por defecto redirige a login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Ruta 404 - Página no encontrada */}
                <Route path="*" element={
                    <div className="min-h-screen flex items-center justify-center">
                        <h1 className="text-2xl font-bold">404 - Página no encontrada</h1>
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;