import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GradoList = ({ grados, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const getColorByNivel = (nivel) => {
        switch (nivel) {
            case 'Inicial': return 'bg-pink-100 text-pink-800 border-pink-200';
            case 'Primaria': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Media': return 'bg-green-100 text-green-800 border-green-200';
            case 'Jovenes y Adultos': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const handleViewSecciones = (gradoId) => {
        navigate(`/secciones/grados/${gradoId}/secciones`);
    };

    if (grados.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay grados registrados</h3>
                <p className="text-gray-500">Comience creando su primer grado académico.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grado
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nivel
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estadísticas
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha Creación
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {grados.map((grado) => (
                        <tr key={grado.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{grado.nombre}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorByNivel(grado.nivel)}`}>
                                    {grado.nivel}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-600">{grado.totalSecciones || 0}</div>
                                        <div className="text-xs text-gray-500">Secciones</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-green-600">{grado.totalProfesores || 0}</div>
                                        <div className="text-xs text-gray-500">Profesores</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-purple-600">{grado.totalEstudiantes || 0}</div>
                                        <div className="text-xs text-gray-500">Estudiantes</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(grado.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleViewSecciones(grado.id)}
                                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                                        title="Ver secciones"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => onEdit(grado)}
                                        className="text-yellow-600 hover:text-yellow-900 p-1 hover:bg-yellow-50 rounded"
                                        title="Editar"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => onDelete(grado)}
                                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                        title="Eliminar"
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
    );
};

export default GradoList;