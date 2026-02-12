import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaUserGraduate, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useEstudiantes } from '../hooks/useEstudiantes';
import Swal from 'sweetalert2';
import Paginacion from './Paginacion';

const EstudiantesLista = ({ onView, onEdit, onDelete }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'apellidos', direction: 'asc' });
    const { estudiantes, loading, error, pagination, eliminarEstudiante, actualizarFiltros } = useEstudiantes();

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        actualizarFiltros({ sortBy: key, sortOrder: direction });
    };

    const handleDelete = async (id, nombre) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar al estudiante ${nombre}. Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await eliminarEstudiante(id);
                Swal.fire('¡Eliminado!', 'El estudiante ha sido eliminado.', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el estudiante.', 'error');
            }
        }
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
        return sortConfig.direction === 'asc'
            ? <FaSortUp className="text-blue-500" />
            : <FaSortDown className="text-blue-500" />;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> {error}
            </div>
        );
    }

    if (estudiantes.length === 0) {
        return (
            <div className="text-center py-12">
                <FaUserGraduate className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No hay estudiantes</h3>
                <p className="mt-1 text-sm text-gray-500">No se encontraron estudiantes con los criterios actuales.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('nombres')}
                        >
                            <div className="flex items-center space-x-1">
                                <span>Nombre</span>
                                {getSortIcon('nombres')}
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('cedula_escolar')}
                        >
                            <div className="flex items-center space-x-1">
                                <span>Cédula Escolar</span>
                                {getSortIcon('cedula_escolar')}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Edad
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Representante
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Teléfono
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
                                    <div className="flex-shrink-0 h-10 w-10">
                                        {estudiante.foto ? (
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={estudiante.fotoUrl}
                                                alt={estudiante.nombreCompleto}
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <FaUserGraduate className="h-5 w-5 text-blue-600" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {estudiante.nombreCompleto}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {estudiante.cedula ? `V-${estudiante.cedula}` : 'Sin cédula'}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {estudiante.cedulaEscolar}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {estudiante.edad} años
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{estudiante.representante?.nombreCompleto}</div>
                                <div className="text-sm text-gray-500">{estudiante.representante?.relacion}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {estudiante.representante?.telefono}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onView(estudiante.id)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Ver detalle"
                                    >
                                        <FaEye className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => onEdit(estudiante.id)}
                                        className="text-green-600 hover:text-green-900"
                                        title="Editar"
                                    >
                                        <FaEdit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(estudiante.id, estudiante.nombreCompleto)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Eliminar"
                                    >
                                        <FaTrash className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {pagination && (
                <div className="px-6 py-4 border-t border-gray-200">
                    <Paginacion
                        pagination={pagination}
                        onPageChange={(page) => actualizarFiltros({ page })}
                    />
                </div>
            )}
        </div>
    );
};

export default EstudiantesLista;