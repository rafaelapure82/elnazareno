import React, { useEffect, useState } from 'react';
import { FaUserShield, FaUser, FaCalendarAlt, FaEnvelope, FaUserTag, FaTimes } from 'react-icons/fa';
import { useUsuario } from '../hooks/useUsuario';

const UsuarioDetalle = ({ usuarioId, onClose }) => {
    const [usuario, setUsuario] = useState(null);
    const { cargarUsuario, loading } = useUsuario();

    useEffect(() => {
        if (usuarioId) {
            cargarDetalle();
        }
    }, [usuarioId]);

    const cargarDetalle = async () => {
        try {
            const data = await cargarUsuario(usuarioId);
            setUsuario(data);
        } catch (error) {
            console.error('Error al cargar detalle:', error);
        }
    };

    if (!usuarioId) return null;

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!usuario) {
        return (
            <div className="text-center p-8 text-gray-500">
                Usuario no encontrado
            </div>
        );
    }

    const esAdministrador = usuario.rol === 'administrador';

    return (
        <div className="bg-white rounded-lg shadow p-6 relative">
            {/* Botón de cerrar mejorado - en esquina superior derecha */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Cerrar"
                title="Cerrar"
            >
                <FaTimes className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>

            <div className="pr-8 mb-6">
                <h3 className="text-xl font-bold text-gray-800">Detalles del Usuario</h3>
            </div>

            <div className="space-y-6">
                {/* Información básica */}
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center ${esAdministrador ? 'bg-purple-100' : 'bg-green-100'
                            }`}>
                            {esAdministrador ? (
                                <FaUserShield className="h-8 w-8 text-purple-600" />
                            ) : (
                                <FaUser className="h-8 w-8 text-green-600" />
                            )}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">{usuario.nombre}</h4>
                        <p className="text-gray-600">@{usuario.usuario}</p>
                        <span className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${esAdministrador
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                            }`}>
                            {usuario.rol}
                        </span>
                    </div>
                </div>

                {/* Detalles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center text-gray-600 mb-1">
                            <FaEnvelope className="mr-2" />
                            <span className="font-medium">Correo:</span>
                        </div>
                        <p className="text-gray-900">{usuario.correo}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center text-gray-600 mb-1">
                            <FaUserTag className="mr-2" />
                            <span className="font-medium">Usuario:</span>
                        </div>
                        <p className="text-gray-900">{usuario.usuario}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center text-gray-600 mb-1">
                            <FaCalendarAlt className="mr-2" />
                            <span className="font-medium">Último Login:</span>
                        </div>
                        <p className="text-gray-900">
                            {usuario.ultimoLogin
                                ? new Date(usuario.ultimoLogin).toLocaleString('es-ES')
                                : 'Nunca'
                            }
                        </p>
                    </div>
                </div>

                {/* ID del usuario */}
                <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        ID: <span className="font-mono">{usuario.id}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UsuarioDetalle;