import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaUserGraduate, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SeccionCard = ({ seccion, onEdit, onDelete, gradoNombre }) => {
    const navigate = useNavigate();
    const capacidadPorcentaje = seccion.capacidadActual && seccion.capacidadMaxima
        ? Math.round((seccion.capacidadActual / seccion.capacidadMaxima) * 100)
        : 0;

    const getCapacidadColor = () => {
        if (capacidadPorcentaje >= 90) return 'bg-red-500';
        if (capacidadPorcentaje >= 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const handleViewDetails = () => {
        navigate(`/secciones/detalle/${seccion.id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{seccion.nombre}</h3>
                    <p className="text-gray-600">{gradoNombre || seccion.gradoNombre}</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleViewDetails}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="Ver detalles"
                    >
                        <FaEye />
                    </button>
                    <button
                        onClick={() => onEdit(seccion)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                        title="Editar"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onDelete(seccion)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Eliminar"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Capacidad</span>
                    <span className="text-sm font-medium text-gray-700">
                        {seccion.capacidadActual || 0}/{seccion.capacidadMaxima}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${getCapacidadColor()}`}
                        style={{ width: `${capacidadPorcentaje}%` }}
                    ></div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <FaChalkboardTeacher className="text-purple-600 mr-2" />
                        <span className="font-bold text-gray-800">{seccion.totalProfesores || 0}</span>
                    </div>
                    <p className="text-xs text-gray-600">Profesores</p>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <FaUserGraduate className="text-green-600 mr-2" />
                        <span className="font-bold text-gray-800">{seccion.totalEstudiantes || 0}</span>
                    </div>
                    <p className="text-xs text-gray-600">Estudiantes</p>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <FaUsers className="text-blue-600 mr-2" />
                        <span className="font-bold text-gray-800">
                            {seccion.capacidadMaxima - (seccion.capacidadActual || 0)}
                        </span>
                    </div>
                    <p className="text-xs text-gray-600">Disponibles</p>
                </div>
            </div>
        </div>
    );
};

export default SeccionCard;