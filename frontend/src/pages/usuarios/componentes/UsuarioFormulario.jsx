import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { UsuarioFormAdaptador } from '../adaptadores/usuario.form.adaptador';
import { useUsuario } from '../hooks/useUsuario';

const UsuarioFormulario = ({ usuario, onGuardar, onCancelar, modo }) => {
    const [formData, setFormData] = useState(UsuarioFormAdaptador.initialValues(usuario));
    const [errores, setErrores] = useState({});
    const [touched, setTouched] = useState({});
    const { crearUsuario, actualizarUsuario, loading } = useUsuario();
    const esEdicion = modo === 'editar';

    useEffect(() => {
        if (usuario) {
            setFormData(UsuarioFormAdaptador.initialValues(usuario));
        }
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validar en tiempo real solo después de que el campo ha sido tocado
        if (touched[name]) {
            const validationErrors = UsuarioFormAdaptador.validate(formData, esEdicion);
            setErrores(validationErrors);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        // Validar solo el campo que perdió el foco
        const validationErrors = UsuarioFormAdaptador.validate({ ...formData }, esEdicion);
        setErrores(validationErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Marcar todos los campos como tocados
        const allTouched = {};
        Object.keys(formData).forEach(key => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        // Validar todos los campos
        const validationErrors = UsuarioFormAdaptador.validate(formData, esEdicion);
        setErrores(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                if (esEdicion) {
                    await actualizarUsuario(usuario.id, formData);
                } else {
                    await crearUsuario(formData);
                }
                onGuardar();
            } catch (error) {
                console.error('Error al guardar usuario:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo *
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errores.nombre && touched.nombre ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Ej: Juan Pérez"
                    />
                    {errores.nombre && touched.nombre && (
                        <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
                    )}
                </div>

                {/* Nombre de Usuario */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de Usuario *
                    </label>
                    <input
                        type="text"
                        name="usuario"
                        value={formData.usuario}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errores.usuario && touched.usuario ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Ej: juanperez"
                    />
                    {errores.usuario && touched.usuario && (
                        <p className="mt-1 text-sm text-red-600">{errores.usuario}</p>
                    )}
                </div>

                {/* Correo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico *
                    </label>
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errores.correo && touched.correo ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Ej: juan@ejemplo.com"
                    />
                    {errores.correo && touched.correo && (
                        <p className="mt-1 text-sm text-red-600">{errores.correo}</p>
                    )}
                </div>

                {/* Rol */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rol *
                    </label>
                    <select
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="usuario">Usuario</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>

                {/* Contraseña (solo para nuevo usuario) */}
                {!esEdicion && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña *
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errores.password && touched.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Mínimo 6 caracteres"
                            />
                            {errores.password && touched.password && (
                                <p className="mt-1 text-sm text-red-600">{errores.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar Contraseña *
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errores.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Repite la contraseña"
                            />
                            {errores.confirmPassword && touched.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errores.confirmPassword}</p>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onCancelar}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    disabled={loading}
                >
                    <FaTimes className="inline mr-2" />
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Guardando...
                        </div>
                    ) : (
                        <>
                            <FaSave className="inline mr-2" />
                            {esEdicion ? 'Actualizar Usuario' : 'Crear Usuario'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default UsuarioFormulario;