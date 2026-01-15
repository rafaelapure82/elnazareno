import React from 'react';
import {
    FaUserGraduate, FaUser, FaPhone, FaIdCard,
    FaCalendar, FaVenusMars, FaTrash, FaEdit, FaEye,
    FaSpinner, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';
import { EstudiantesAdaptador } from '../adaptadores/estudiantes.adaptador';

const EstudianteLista = ({
    estudiantes,
    loading,
    onEdit,
    onDelete,
    onView,
    onSelect,
    selectedIds = []
}) => {
    const getGeneroIcon = (genero) => {
        switch (genero) {
            case 'Masculino': return { icon: FaUser, color: 'text-blue-600 bg-blue-50' };
            case 'Femenino': return { icon: FaUser, color: 'text-pink-600 bg-pink-50' };
            default: return { icon: FaUser, color: 'text-gray-600 bg-gray-50' };
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
                <span className="ml-3 text-gray-600">Cargando estudiantes...</span>
            </div>
        );
    }

    if (estudiantes.length === 0) {
        return (
            <div className="text-center py-12">
                <FaUserGraduate className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay estudiantes registrados</h3>
                <p className="text-gray-500">Registra tu primer estudiante para comenzar</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header de la tabla */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-700">
                <div className="col-span-1"></div>
                <div className="col-span-3">Estudiante</div>
                <div className="col-span-2">Documentos</div>
                <div className="col-span-2">Edad/Género</div>
                <div className="col-span-2">Representante</div>
                <div className="col-span-2">Acciones</div>
            </div>

            {/* Lista de estudiantes */}
            <div className="divide-y divide-gray-100">
                {estudiantes.map((estudiante) => {
                    const generoData = getGeneroIcon(estudiante.genero);
                    const GeneroIcon = generoData.icon;
                    const isSelected = selectedIds.includes(estudiante.id);

                    return (
                        <div
                            key={estudiante.id}
                            className={`grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-indigo-50' : ''
                                }`}
                            onClick={() => onSelect?.(estudiante.id)}
                        >
                            {/* Selección */}
                            <div className="col-span-1 flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => onSelect?.(estudiante.id)}
                                    className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>

                            {/* Información del estudiante */}
                            <div className="col-span-3">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${generoData.color}`}>
                                        <FaUserGraduate className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{estudiante.nombreCompleto}</p>
                                        <p className="text-sm text-gray-500">
                                            ID: {estudiante.id}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Registrado: {EstudiantesAdaptador.formatFecha(estudiante.created_at)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Documentos */}
                            <div className="col-span-2">
                                <div className="space-y-1">
                                    <div className="flex items-center text-sm">
                                        <FaIdCard className="h-3 w-3 text-gray-400 mr-2" />
                                        <span className="text-gray-600">CI: {estudiante.cedula}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <FaIdCard className="h-3 w-3 text-gray-400 mr-2" />
                                        <span className="text-gray-600">Escolar: {estudiante.cedula_escolar}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Edad y género */}
                            <div className="col-span-2">
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <FaCalendar className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="text-gray-900 font-medium">{estudiante.edad} años</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaVenusMars className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="text-gray-600">{estudiante.genero}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Representante */}
                            <div className="col-span-2">
                                {estudiante.representante ? (
                                    <div>
                                        <p className="font-medium text-gray-900 truncate">
                                            {estudiante.representante.nombreCompleto}
                                        </p>
                                        <div className="flex items-center text-sm text-gray-600 mt-1">
                                            <FaUser className="h-3 w-3 mr-1" />
                                            <span>{estudiante.representante.relacion}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 mt-1">
                                            <FaPhone className="h-3 w-3 mr-1" />
                                            <span>{estudiante.representante.telefono}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-400 italic">Sin representante</div>
                                )}
                            </div>

                            {/* Acciones */}
                            <div className="col-span-2">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onView?.(estudiante);
                                        }}
                                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                        title="Ver detalles"
                                    >
                                        <FaEye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit?.(estudiante);
                                        }}
                                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                        title="Editar"
                                    >
                                        <FaEdit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete?.(estudiante.id);
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                        title="Eliminar"
                                    >
                                        <FaTrash className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                        {estudiantes.length} estudiante{estudiantes.length !== 1 ? 's' : ''} encontrado{estudiantes.length !== 1 ? 's' : ''}
                    </span>
                    <span className="text-sm text-gray-500">
                        Última actualización: {new Date().toLocaleTimeString('es-ES')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EstudianteLista;