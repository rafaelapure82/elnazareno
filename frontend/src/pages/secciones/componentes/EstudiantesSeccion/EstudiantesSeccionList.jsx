import React from 'react';
import { FaUserGraduate, FaTrash, FaEdit, FaPhone, FaVenusMars, FaCalendarAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const EstudiantesSeccionList = ({ estudiantes, estadisticas, onRemove, onUpdateEstado, loading }) => {
    const estados = {
        activo: { color: 'bg-green-100 text-green-800', label: 'Activo' },
        inactivo: { color: 'bg-yellow-100 text-yellow-800', label: 'Inactivo' },
        graduado: { color: 'bg-purple-100 text-purple-800', label: 'Graduado' }
    };

    const handleRemove = async (estudiante) => {
        const confirm = await Swal.fire({
            title: '¿Remover estudiante?',
            html: `
        <div class="text-left">
          <p><strong>Estudiante:</strong> ${estudiante.nombreCompleto}</p>
          <p><strong>Cédula Escolar:</strong> ${estudiante.cedulaEscolar}</p>
          <p>Esta acción removerá al estudiante de la sección.</p>
        </div>
      `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, remover',
            cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
            await onRemove(estudiante.estudianteId);
        }
    };

    const handleUpdateEstado = async (estudiante, nuevoEstado) => {
        const confirm = await Swal.fire({
            title: '¿Cambiar estado?',
            html: `
        <div class="text-left">
          <p><strong>Estudiante:</strong> ${estudiante.nombreCompleto}</p>
          <p><strong>Estado actual:</strong> ${estudiante.estado}</p>
          <p><strong>Nuevo estado:</strong> ${nuevoEstado}</p>
        </div>
      `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'Cancelar'
        });
        console.log(estudiante)
        if (confirm.isConfirmed) {
            await onUpdateEstado(estudiante.estudianteId, nuevoEstado);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Cargando estudiantes...</p>
            </div>
        );
    }

    if (estudiantes.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-gray-400 mb-4">
                    <FaUserGraduate className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay estudiantes inscritos</h3>
                <p className="text-gray-500">Inscriba estudiantes a esta sección para comenzar.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Estadísticas */}
            {estadisticas && estadisticas.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {estadisticas.map((estadistica) => (
                            <div key={estadistica.estado} className={`p-4 rounded-lg ${estados[estadistica.estado]?.color.replace('100', '50')} border ${estados[estadistica.estado]?.color.replace('100', '200')}`}>
                                <div className="text-3xl font-bold mb-1">{estadistica.total}</div>
                                <div className="font-medium">{estados[estadistica.estado]?.label || estadistica.estado}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Lista de Estudiantes */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estudiante
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Información
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Representante
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {estudiantes.map((estudiante) => (
                            <tr key={estudiante.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaUserGraduate className="text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{estudiante.nombreCompleto}</div>
                                            <div className="text-sm text-gray-500">{estudiante.cedulaEscolar}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 space-y-1">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-2 text-gray-400" />
                                            {new Date(estudiante.fechaNacimiento).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                            <FaVenusMars className="mr-2 text-gray-400" />
                                            {estudiante.genero}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        <div>{estudiante.representanteNombreCompleto}</div>
                                        <div className="flex items-center text-gray-500">
                                            <FaPhone className="mr-1 text-xs" />
                                            {estudiante.representanteTelefono}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={estudiante.estado}
                                        onChange={(e) => handleUpdateEstado(estudiante, e.target.value)}
                                        className={`px-3 py-1 text-sm font-medium rounded-full ${estados[estudiante.estado]?.color} border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                    >
                                        {Object.entries(estados).map(([key, value]) => (
                                            <option key={key} value={key}>{value.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleRemove(estudiante)}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                                            title="Remover"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EstudiantesSeccionList;