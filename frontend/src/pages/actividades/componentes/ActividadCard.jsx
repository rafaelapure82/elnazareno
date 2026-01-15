// modules/actividades/componentes/ActividadCard.jsx - ACTUALIZADO
import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCalendarAlt, FaUser, FaEye } from 'react-icons/fa';
import { ActividadesAdaptador } from '../adaptadores/actividades.adaptador';
import { API_BASE_URL } from '../../../compartidos/api/axios.config';

const ActividadCard = ({
    actividad,
    onEdit,
    onDelete,
    onView,
    puedeEditar = false
}) => {
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(0);

    const handleDelete = () => {
        onDelete(actividad.id);
    };

    const siguienteImagen = () => {
        setImagenSeleccionada(prev =>
            prev < actividad.imagenes.length - 1 ? prev + 1 : 0
        );
    };

    const anteriorImagen = () => {
        setImagenSeleccionada(prev =>
            prev > 0 ? prev - 1 : actividad.imagenes.length - 1
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Imágenes */}
            {actividad.imagenes && actividad.imagenes.length > 0 && (
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={API_BASE_URL + actividad.imagenes[imagenSeleccionada].imagen_url}
                        alt={`Imagen ${imagenSeleccionada + 1} de ${actividad.titulo}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => onView && onView(actividad.id)}
                    />

                    {actividad.imagenes.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    anteriorImagen();
                                }}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 cursor-pointer"
                            >
                                ‹
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    siguienteImagen();
                                }}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 cursor-pointer"
                            >
                                ›
                            </button>

                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {actividad.imagenes.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${index === imagenSeleccionada ? 'bg-white' : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Contenido */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h3
                        className="text-xl font-bold text-gray-800 truncate cursor-pointer hover:text-blue-600"
                        onClick={() => onView && onView(actividad.id)}
                    >
                        {actividad.titulo}
                    </h3>

                    <div className="flex space-x-2">
                        {onView && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onView(actividad.id);
                                }}
                                className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                                title="Ver detalle"
                            >
                                <FaEye />
                            </button>
                        )}

                        {puedeEditar && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(actividad);
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                                    title="Editar"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete();
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                    title="Eliminar"
                                >
                                    <FaTrash />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <p
                    className="text-gray-600 mb-4 line-clamp-3 cursor-pointer"
                    onClick={() => onView && onView(actividad.id)}
                >
                    {actividad.descripcion}
                </p>

                {/* Metadatos */}
                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {ActividadesAdaptador.formatFecha(actividad.fechaCreacion)}
                        </span>
                        {actividad.creador && (
                            <span className="flex items-center">
                                <FaUser className="mr-1" />
                                {actividad.creador.nombre || 'Usuario'}
                            </span>
                        )}
                    </div>

                    {actividad.imagenes && actividad.imagenes.length > 0 && (
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                            {actividad.imagenes.length} imagen{actividad.imagenes.length !== 1 ? 'es' : ''}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActividadCard;