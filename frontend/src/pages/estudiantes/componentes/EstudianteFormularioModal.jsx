import React, { useState, useEffect } from 'react';
import {
    FaUser, FaCalendar, FaIdCard, FaPhone, FaEnvelope,
    FaBriefcase, FaTimes, FaUserGraduate, FaSearch, FaSpinner
} from 'react-icons/fa';
import { useEstudianteForm } from '../hooks/useEstudianteFormulario';

const EstudianteFormularioModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title = 'Nuevo Estudiante'
}) => {
    const {
        formData,
        errors,
        loading,
        submitting,
        tiposCedula,
        generos,
        relaciones,
        handleChange,
        buscarRepresentante,
        validate,
        resetForm
    } = useEstudianteForm(initialData);

    const [activeTab, setActiveTab] = useState('estudiante');
    const [searchingCedula, setSearchingCedula] = useState(false);

    // Calcular edad automáticamente
    const calcularEdad = (fecha) => {
        if (!fecha) return '';
        const hoy = new Date();
        const nacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    };

    // Buscar representante al cambiar cédula
    useEffect(() => {
        if (formData.representante.cedula.length >= 6) {
            const timer = setTimeout(async () => {
                setSearchingCedula(true);
                await buscarRepresentante(formData.representante.cedula);
                setSearchingCedula(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [formData.representante.cedula, buscarRepresentante]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const data = {
                // Datos del estudiante
                nombres: formData.nombres,
                apellidos: formData.apellidos,
                fecha_nacimiento: formData.fecha_nacimiento,
                genero: formData.genero,
                tipo_cedula: formData.tipo_cedula,
                cedula: formData.cedula,
                cedula_escolar: formData.cedula_escolar,

                // Datos del representante
                representante: {
                    nombres: formData.representante.nombres,
                    apellidos: formData.representante.apellidos,
                    relacion: formData.representante.relacion,
                    email: formData.representante.email,
                    telefono: formData.representante.telefono,
                    ocupacion: formData.representante.ocupacion,
                    tipo_cedula: formData.representante.tipo_cedula,
                    cedula: formData.representante.cedula
                }
            };

            await onSubmit(data);
            handleClose();
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center">
                        <FaUserGraduate className="h-6 w-6 text-indigo-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaTimes className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('estudiante')}
                            className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'estudiante'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Datos del Estudiante
                        </button>
                        <button
                            onClick={() => setActiveTab('representante')}
                            className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === 'representante'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Datos del Representante
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {activeTab === 'estudiante' ? (
                        <div className="space-y-6">
                            {/* Información Personal */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Información Personal
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nombres */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombres *
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="text"
                                                name="nombres"
                                                value={formData.nombres}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.nombres ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Ingrese los nombres"
                                            />
                                        </div>
                                        {errors.nombres && (
                                            <p className="mt-1 text-sm text-red-600">{errors.nombres}</p>
                                        )}
                                    </div>

                                    {/* Apellidos */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Apellidos *
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="text"
                                                name="apellidos"
                                                value={formData.apellidos}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.apellidos ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Ingrese los apellidos"
                                            />
                                        </div>
                                        {errors.apellidos && (
                                            <p className="mt-1 text-sm text-red-600">{errors.apellidos}</p>
                                        )}
                                    </div>

                                    {/* Fecha de Nacimiento */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Fecha de Nacimiento *
                                        </label>
                                        <div className="relative">
                                            <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="date"
                                                name="fecha_nacimiento"
                                                value={formData.fecha_nacimiento}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.fecha_nacimiento ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                            />
                                        </div>
                                        {formData.fecha_nacimiento && (
                                            <p className="mt-2 text-sm text-gray-600">
                                                Edad: {calcularEdad(formData.fecha_nacimiento)} años
                                            </p>
                                        )}
                                        {errors.fecha_nacimiento && (
                                            <p className="mt-1 text-sm text-red-600">{errors.fecha_nacimiento}</p>
                                        )}
                                    </div>

                                    {/* Género */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Género *
                                        </label>
                                        <select
                                            name="genero"
                                            value={formData.genero}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            {generos.map(genero => (
                                                <option key={genero.value} value={genero.value}>
                                                    {genero.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Documentación */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Documentación
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Tipo de Cédula */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tipo de Cédula
                                        </label>
                                        <select
                                            name="tipo_cedula"
                                            value={formData.tipo_cedula}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            {tiposCedula.map(tipo => (
                                                <option key={tipo.value} value={tipo.value}>
                                                    {tipo.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Cédula */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cédula *
                                        </label>
                                        <div className="relative">
                                            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="text"
                                                name="cedula"
                                                value={formData.cedula}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.cedula ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Ej: 12345678"
                                            />
                                        </div>
                                        {errors.cedula && (
                                            <p className="mt-1 text-sm text-red-600">{errors.cedula}</p>
                                        )}
                                    </div>

                                    {/* Cédula Escolar */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cédula Escolar *
                                        </label>
                                        <div className="relative">
                                            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="text"
                                                name="cedula_escolar"
                                                value={formData.cedula_escolar}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.cedula_escolar ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Cédula escolar única"
                                            />
                                        </div>
                                        {errors.cedula_escolar && (
                                            <p className="mt-1 text-sm text-red-600">{errors.cedula_escolar}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Datos del Representante
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Cédula del Representante */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cédula del Representante *
                                        </label>
                                        <div className="relative">
                                            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            {searchingCedula && (
                                                <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-gray-400 h-5 w-5" />
                                            )}
                                            <input
                                                type="text"
                                                name="representante.cedula"
                                                value={formData.representante.cedula}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors['representante.cedula'] ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Buscar representante por cédula"
                                            />
                                        </div>
                                        {errors['representante.cedula'] && (
                                            <p className="mt-1 text-sm text-red-600">{errors['representante.cedula']}</p>
                                        )}
                                        <p className="mt-2 text-sm text-gray-500">
                                            Ingresa la cédula para buscar o crear un nuevo representante
                                        </p>
                                    </div>

                                    {/* Tipo de Cédula */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tipo de Cédula
                                        </label>
                                        <select
                                            name="representante.tipo_cedula"
                                            value={formData.representante.tipo_cedula}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            {tiposCedula.map(tipo => (
                                                <option key={tipo.value} value={tipo.value}>
                                                    {tipo.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Relación */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Relación *
                                        </label>
                                        <select
                                            name="representante.relacion"
                                            value={formData.representante.relacion}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors['representante.relacion'] ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        >
                                            {relaciones.map(relacion => (
                                                <option key={relacion.value} value={relacion.value}>
                                                    {relacion.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors['representante.relacion'] && (
                                            <p className="mt-1 text-sm text-red-600">{errors['representante.relacion']}</p>
                                        )}
                                    </div>

                                    {/* Nombres */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombres *
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="text"
                                                name="representante.nombres"
                                                value={formData.representante.nombres}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors['representante.nombres'] ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Nombres del representante"
                                            />
                                        </div>
                                        {errors['representante.nombres'] && (
                                            <p className="mt-1 text-sm text-red-600">{errors['representante.nombres']}</p>
                                        )}
                                    </div>

                                    {/* Apellidos */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Apellidos *
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="text"
                                                name="representante.apellidos"
                                                value={formData.representante.apellidos}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors['representante.apellidos'] ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Apellidos del representante"
                                            />
                                        </div>
                                        {errors['representante.apellidos'] && (
                                            <p className="mt-1 text-sm text-red-600">{errors['representante.apellidos']}</p>
                                        )}
                                    </div>

                                    {/* Teléfono */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Teléfono *
                                        </label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="tel"
                                                name="representante.telefono"
                                                value={formData.representante.telefono}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors['representante.telefono'] ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="Ej: 04141234567"
                                            />
                                        </div>
                                        {errors['representante.telefono'] && (
                                            <p className="mt-1 text-sm text-red-600">{errors['representante.telefono']}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="email"
                                                name="representante.email"
                                                value={formData.representante.email}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors['representante.email'] ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                placeholder="email@ejemplo.com"
                                            />
                                        </div>
                                        {errors['representante.email'] && (
                                            <p className="mt-1 text-sm text-red-600">{errors['representante.email']}</p>
                                        )}
                                    </div>

                                    {/* Ocupación */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ocupación
                                        </label>
                                        <div className="relative">
                                            <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <input
                                                type="text"
                                                name="representante.ocupacion"
                                                value={formData.representante.ocupacion}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Ocupación del representante"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-between items-center pt-6 mt-6 border-t">
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab(activeTab === 'estudiante' ? 'representante' : 'estudiante')}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                {activeTab === 'estudiante' ? 'Siguiente: Representante' : 'Anterior: Estudiante'}
                            </button>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                disabled={submitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || loading}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                            >
                                {submitting ? (
                                    <>
                                        <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                                        Guardando...
                                    </>
                                ) : (
                                    'Guardar Estudiante'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EstudianteFormularioModal;