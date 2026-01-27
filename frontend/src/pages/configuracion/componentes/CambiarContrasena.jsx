import React, { useState } from 'react';
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';
import { usePerfil } from '../hooks/usePerfil';

export const CambiarContrasena = ({ idUsuario }) => {
    const { cambiarContrasena } = usePerfil(idUsuario);
    const [formData, setFormData] = useState({
        contrasenaActual: '',
        nuevaContrasena: '',
        confirmarContrasena: ''
    });
    const [mostrarContrasena, setMostrarContrasena] = useState({
        actual: false,
        nueva: false,
        confirmar: false
    });
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleMostrarContrasena = (campo) => {
        setMostrarContrasena(prev => ({
            ...prev,
            [campo]: !prev[campo]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        // Validaciones
        if (formData.nuevaContrasena !== formData.confirmarContrasena) {
            setMensaje('Las nuevas contraseñas no coinciden');
            return;
        }

        if (formData.nuevaContrasena.length < 6) {
            setMensaje('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        setCargando(true);
        const resultado = await cambiarContrasena({
            contrasenaActual: formData.contrasenaActual,
            nuevaContrasena: formData.nuevaContrasena
        });

        if (resultado.success) {
            setMensaje('Contraseña cambiada exitosamente');
            setFormData({
                contrasenaActual: '',
                nuevaContrasena: '',
                confirmarContrasena: ''
            });
            setTimeout(() => setMensaje(''), 3000);
        } else {
            setMensaje(resultado.error);
        }

        setCargando(false);
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cambiar Contraseña</h2>

            {mensaje && (
                <div className={`mb-4 p-3 rounded ${mensaje.includes('exitosamente') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {mensaje}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {/* Contraseña Actual */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña Actual
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={mostrarContrasena.actual ? "text" : "password"}
                                name="contrasenaActual"
                                value={formData.contrasenaActual}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => toggleMostrarContrasena('actual')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {mostrarContrasena.actual ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    {/* Nueva Contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={mostrarContrasena.nueva ? "text" : "password"}
                                name="nuevaContrasena"
                                value={formData.nuevaContrasena}
                                onChange={handleChange}
                                required
                                minLength="6"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => toggleMostrarContrasena('nueva')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {mostrarContrasena.nueva ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Mínimo 6 caracteres
                        </p>
                    </div>

                    {/* Confirmar Nueva Contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar Nueva Contraseña
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={mostrarContrasena.confirmar ? "text" : "password"}
                                name="confirmarContrasena"
                                value={formData.confirmarContrasena}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => toggleMostrarContrasena('confirmar')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                {mostrarContrasena.confirmar ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={cargando}
                            className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {cargando ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    <FiCheck /> Cambiar Contraseña
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};