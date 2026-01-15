// modules/actividades/componentes/ActividadDetalle.jsx
import React, { useState } from 'react';
import { FaCalendarAlt, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { ActividadesAdaptador } from '../adaptadores/actividades.adaptador';
import { API_BASE_URL } from '../../../compartidos/api/axios.config'
const ActividadDetalle = ({ actividad, onEdit, onDelete, puedeEditar = false }) => {
    const [imagenSeleccionada, setImagenSeleccionada] = useState(0);

    if (!actividad) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No se encontró la actividad</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Imágenes */}
            {actividad.imagenes && actividad.imagenes.length > 0 && (
                <div className="relative">
                    <img
                        src={API_BASE_URL + actividad.imagenes[imagenSeleccionada].imagen_url}
                        alt={actividad.titulo}
                        className="w-full h-96 object-contain"
                    />

                    {actividad.imagenes.length > 1 && (
                        <>
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {actividad.imagenes.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setImagenSeleccionada(index)}
                                        className={`w-3 h-3 rounded-full ${index === imagenSeleccionada ? 'bg-white' : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                                <button
                                    onClick={() =>
                                        setImagenSeleccionada(prev =>
                                            prev > 0 ? prev - 1 : actividad.imagenes.length - 1
                                        )
                                    }
                                    className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 cursor-pointer"
                                >
                                    ‹
                                </button>
                            </div>

                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                <button
                                    onClick={() =>
                                        setImagenSeleccionada(prev =>
                                            prev < actividad.imagenes.length - 1 ? prev + 1 : 0
                                        )
                                    }
                                    className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 cursor-pointer"
                                >
                                    ›
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Contenido */}
            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {actividad.titulo}
                        </h1>

                        <div className="flex items-center space-x-4 text-gray-600">
                            <span className="flex items-center">
                                <FaCalendarAlt className="mr-2" />
                                {ActividadesAdaptador.formatFecha(actividad.fechaCreacion)}
                            </span>
                            {actividad.creador && (
                                <span className="flex items-center">
                                    <FaUser className="mr-2" />
                                    {actividad.creador.nombre || 'Usuario'}
                                </span>
                            )}
                        </div>
                    </div>

                    {puedeEditar && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit(actividad)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center cursor-pointer"
                            >
                                <FaEdit className="mr-2" />
                                Editar
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm('¿Estás seguro de eliminar esta actividad?')) {
                                        onDelete(actividad.id);
                                    }
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center cursor-pointer"
                            >
                                <FaTrash className="mr-2" />
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>

                {/* Descripción */}
                <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {actividad.descripcion}
                    </p>
                </div>

                {/* Miniaturas de imágenes */}
                {actividad.imagenes && actividad.imagenes.length > 1 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Imágenes ({actividad.imagenes.length})
                        </h3>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                            {actividad.imagenes.map((imagen, index) => (
                                <button
                                    key={index}
                                    onClick={() => setImagenSeleccionada(index)}
                                    className={`rounded-lg overflow-hidden border-2 cursor-pointer ${index === imagenSeleccionada
                                        ? 'border-blue-500'
                                        : 'border-transparent'
                                        }`}
                                >
                                    <img
                                        src={API_BASE_URL + imagen.imagen_url}
                                        alt={`Miniatura ${index + 1}`}
                                        className="w-full h-20 object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActividadDetalle;