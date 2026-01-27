import React, { useState } from 'react';
import { FiUser, FiMail, FiSave, FiX } from 'react-icons/fi';
import { usePerfil } from '../hooks/usePerfil';

export const ConfiguracionPerfil = ({ idUsuario }) => {
    const { perfil, cargando, error, actualizarPerfil } = usePerfil(idUsuario);
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        usuario: '',
        correo: ''
    });
    const [mensaje, setMensaje] = useState('');

    // Inicializar formData cuando perfil se carga
    React.useEffect(() => {
        if (perfil) {
            setFormData({
                nombre: perfil.nombre || '',
                usuario: perfil.usuario || '',
                correo: perfil.correo || ''
            });
        }
    }, [perfil]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        const resultado = await actualizarPerfil(formData);
        if (resultado.success) {
            setMensaje('Perfil actualizado correctamente');
            setEditando(false);
            setTimeout(() => setMensaje(''), 3000);
        } else {
            setMensaje(resultado.error);
        }
    };

    if (cargando) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error && !perfil) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Información del Perfil</h2>
                {!editando ? (
                    <button
                        onClick={() => setEditando(true)}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                        <FiUser /> Editar Perfil
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setEditando(false);
                            setFormData({
                                nombre: perfil.nombre,
                                usuario: perfil.usuario,
                                correo: perfil.correo
                            });
                        }}
                        className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                        <FiX /> Cancelar
                    </button>
                )}
            </div>

            {mensaje && (
                <div className={`mb-4 p-3 rounded ${mensaje.includes('correctamente') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {mensaje}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre Completo
                        </label>
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                disabled={!editando}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg ${editando ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200'}`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de Usuario
                        </label>
                        <input
                            type="text"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            disabled={!editando}
                            className={`w-full px-3 py-2 border rounded-lg ${editando ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200'}`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                disabled={!editando}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg ${editando ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200'}`}
                            />
                        </div>
                    </div>

                    {editando && (
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium cursor-pointer"
                            >
                                <FiSave /> Guardar Cambios
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};