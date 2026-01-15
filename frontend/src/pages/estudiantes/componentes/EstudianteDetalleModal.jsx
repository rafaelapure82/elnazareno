import React from 'react';
import {
    FaUserGraduate, FaUser, FaPhone, FaEnvelope,
    FaIdCard, FaCalendar, FaVenusMars, FaBriefcase,
    FaTimes, FaPrint, FaDownload
} from 'react-icons/fa';
import { EstudiantesAdaptador } from '../adaptadores/estudiantes.adaptador';

const EstudianteDetailModal = ({ estudiante, isOpen, onClose, onPrint, onExport }) => {
    if (!isOpen || !estudiante) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const getGeneroColor = (genero) => {
        switch (genero) {
            case 'Masculino': return 'text-blue-600 bg-blue-50';
            case 'Femenino': return 'text-pink-600 bg-pink-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${getGeneroColor(estudiante.genero)} mr-3`}>
                            <FaUserGraduate className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {estudiante.nombreCompleto}
                            </h2>
                            <p className="text-gray-600">ID: {estudiante.id} • Cédula: {estudiante.cedula}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => onPrint?.(estudiante)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Imprimir"
                        >
                            <FaPrint className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => onExport?.(estudiante)}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Exportar"
                        >
                            <FaDownload className="h-5 w-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <FaTimes className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {/* Información del estudiante */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                            Información del Estudiante
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Columna izquierda */}
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FaUser className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                                        <p className="text-gray-900">{estudiante.nombreCompleto}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FaVenusMars className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Género</p>
                                        <p className="text-gray-900">{estudiante.genero}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Fecha de Nacimiento</p>
                                        <p className="text-gray-900">
                                            {formatDate(estudiante.fecha_nacimiento)} ({estudiante.edad} años)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Columna derecha */}
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FaIdCard className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Cédula de Identidad</p>
                                        <p className="text-gray-900">
                                            {estudiante.tipo_cedula}-{estudiante.cedula}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FaIdCard className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Cédula Escolar</p>
                                        <p className="text-gray-900 font-medium">{estudiante.cedula_escolar}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Fecha de Registro</p>
                                        <p className="text-gray-900">{formatDate(estudiante.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información del representante */}
                    {estudiante.representante && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                Información del Representante
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Columna izquierda */}
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <FaUser className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                                            <p className="text-gray-900">{estudiante.representante.nombreCompleto}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaUser className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Relación</p>
                                            <p className="text-gray-900">{estudiante.representante.relacion}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaIdCard className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Cédula de Identidad</p>
                                            <p className="text-gray-900">
                                                {estudiante.representante.tipo_cedula}-{estudiante.representante.cedula}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Columna derecha */}
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <FaPhone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Teléfono</p>
                                            <p className="text-gray-900">{estudiante.representante.telefono}</p>
                                        </div>
                                    </div>

                                    {estudiante.representante.email && (
                                        <div className="flex items-start">
                                            <FaEnvelope className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Email</p>
                                                <p className="text-gray-900">{estudiante.representante.email}</p>
                                            </div>
                                        </div>
                                    )}

                                    {estudiante.representante.ocupacion && (
                                        <div className="flex items-start">
                                            <FaBriefcase className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Ocupación</p>
                                                <p className="text-gray-900">{estudiante.representante.ocupacion}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t">
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstudianteDetailModal;