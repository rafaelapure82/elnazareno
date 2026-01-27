import React from 'react';
import { FaSchool, FaUsers, FaChalkboardTeacher, FaUserGraduate, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GradoCard = ({ grado, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const getColorByNivel = (nivel) => {
        switch (nivel) {
            case 'Inicial': return 'bg-gradient-to-r from-pink-500 to-pink-600';
            case 'Primaria': return 'bg-gradient-to-r from-blue-500 to-blue-600';
            case 'Media': return 'bg-gradient-to-r from-green-500 to-green-600';
            case 'Jovenes y Adultos': return 'bg-gradient-to-r from-purple-500 to-purple-600';
            default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
        }
    };

    const handleViewSecciones = () => {
        navigate(`/secciones/grados/${grado.id}/secciones`);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Header con color según nivel */}
            <div className={`h-2 ${getColorByNivel(grado.nivel)}`}></div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${getColorByNivel(grado.nivel).replace('bg-gradient-to-r', 'bg')}`}>
                            <FaSchool className="text-white text-xl" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-bold text-gray-800">{grado.nombre}</h3>
                            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
                                {grado.nivel}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleViewSecciones}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Ver secciones"
                    >
                        <FaArrowRight className="text-xl" />
                    </button>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                            <FaUsers className="text-blue-600 mr-2" />
                            <span className="text-2xl font-bold text-gray-800">{grado.totalSecciones || 0}</span>
                        </div>
                        <p className="text-sm text-gray-600">Secciones</p>
                    </div>

                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                            <FaChalkboardTeacher className="text-green-600 mr-2" />
                            <span className="text-2xl font-bold text-gray-800">{grado.totalProfesores || 0}</span>
                        </div>
                        <p className="text-sm text-gray-600">Profesores</p>
                    </div>

                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                            <FaUserGraduate className="text-purple-600 mr-2" />
                            <span className="text-2xl font-bold text-gray-800">{grado.totalEstudiantes || 0}</span>
                        </div>
                        <p className="text-sm text-gray-600">Estudiantes</p>
                    </div>
                </div>

                {/* Información adicional */}
                <div className="text-sm text-gray-600 mb-4">
                    <p>Fecha creación: {new Date(grado.createdAt).toLocaleDateString()}</p>
                    <p>Última actualización: {new Date(grado.updatedAt).toLocaleDateString()}</p>
                </div>

                {/* Acciones */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(grado)}
                            className="px-4 py-2 text-sm font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => onDelete(grado)}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            Eliminar
                        </button>
                    </div>

                    <button
                        onClick={handleViewSecciones}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center"
                    >
                        Ver Secciones
                        <FaArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GradoCard;