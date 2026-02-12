import React from 'react';
import { useAuth } from '../../../contextos/AuthContexto';
import { ConfiguracionPerfil } from '../componentes/ConfiguracionPerfil';
import { CambiarContrasena } from '../componentes/CambiarContrasena';

const Configuracion = () => {
    const { user, isAuthenticated, isLoading } = useAuth();

    // Mostrar loading mientras se verifica autenticación
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Redirigir si no está autenticado (esto debería manejarse en el router)
    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceso denegado</h2>
                    <p className="text-gray-600">Debes iniciar sesión para acceder a esta página.</p>
                </div>
            </div>
        );
    }

    // Tomar el ID del usuario desde el contexto
    const idUsuario = user.id; // Asumiendo que el objeto user tiene un campo 'id'
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header con información del usuario */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Configuración de Cuenta</h1>
                    <p className="text-gray-600 mt-2">
                        Bienvenido, <span className="font-semibold">{user.nombre || user.usuario}</span>
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Sección de Perfil */}
                    <ConfiguracionPerfil idUsuario={idUsuario} />

                    {/* Sección de Contraseña */}
                    <CambiarContrasena idUsuario={idUsuario} />

                    {/* Información de la cuenta */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Información de la Cuenta</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">ID de Usuario:</span>
                                <span className="font-mono text-gray-800">{user.id}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-600">Nombre de Usuario:</span>
                                <span className="font-medium text-gray-800">{user.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">Correo Electrónico:</span>
                                <span className="font-medium text-gray-800">{user.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Sección de sesión */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Sesión</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                Tu sesión está activa desde tu última autenticación.
                            </p>
                            <div className="flex items-center gap-2 text-green-600">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Sesión activa</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuracion;