import React from 'react';
import {
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaFileImage,
    FaFileAlt,
    FaFileArchive,
    FaFile,
    FaDownload,
    FaEye,
    FaTrash,
    FaCalendarAlt,
    FaUser,
    FaSpinner
} from 'react-icons/fa';
import { ArchivosAdaptador } from '../adaptadores/archivo.adaptador';

const iconMap = {
    pdf: FaFilePdf,
    doc: FaFileWord,
    docx: FaFileWord,
    xls: FaFileExcel,
    xlsx: FaFileExcel,
    jpg: FaFileImage,
    jpeg: FaFileImage,
    png: FaFileImage,
    gif: FaFileImage,
    txt: FaFileAlt,
    zip: FaFileArchive,
    rar: FaFileArchive,
    default: FaFile
};

const ListaArchivo = ({
    archivos,
    selectedFiles = [],
    loading,
    onDownload,
    onView,
    onDelete,
    onSelect
}) => {
    const getFileIcon = (formato) => {
        return iconMap[formato] || iconMap.default;
    };

    const getFileColor = (formato) => {
        const colorMap = {
            pdf: 'text-red-600 bg-red-50',
            doc: 'text-blue-600 bg-blue-50',
            docx: 'text-blue-600 bg-blue-50',
            xls: 'text-green-600 bg-green-50',
            xlsx: 'text-green-600 bg-green-50',
            jpg: 'text-purple-600 bg-purple-50',
            jpeg: 'text-purple-600 bg-purple-50',
            png: 'text-purple-600 bg-purple-50',
            default: 'text-gray-600 bg-gray-50'
        };
        return colorMap[formato] || colorMap.default;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
                <span className="ml-3 text-gray-600">Cargando archivos...</span>
            </div>
        );
    }

    if (archivos.length === 0) {
        return (
            <div className="text-center py-12">
                <FaFile className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay archivos</h3>
                <p className="text-gray-500">Sube tu primer archivo para comenzar</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header de la tabla - AÑADE COLUMNA PARA SELECCIÓN */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-700">
                <div className="col-span-1 text-center">Sel</div>
                <div className="col-span-3">Nombre</div>
                <div className="col-span-2 text-center">Categoría</div>
                <div className="col-span-1">Tamaño</div>
                <div className="col-span-2">Fecha</div>
                <div className="col-span-3">Acciones</div>
            </div>

            {/* Lista de archivos */}
            <div className="divide-y divide-gray-100">
                {archivos.map((archivo) => {
                    const Icon = getFileIcon(archivo.formato);
                    const colorClass = getFileColor(archivo.formato);
                    const isSelected = selectedFiles.includes(archivo.id); // ← Determina si está seleccionado

                    return (
                        <div
                            key={archivo.id}
                            className={`grid grid-cols-12 gap-4 p-4 transition-colors items-center cursor-pointer
                                ${isSelected
                                    ? 'bg-indigo-50 hover:bg-indigo-100 border-l-4 border-indigo-500'
                                    : 'hover:bg-gray-50'
                                }`}
                            onClick={() => onSelect?.(archivo)}
                        >
                            {/* Checkbox de selección */}
                            <div className="col-span-1 flex justify-center">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center
                                    ${isSelected
                                        ? 'bg-indigo-500 border-indigo-500'
                                        : 'bg-white border-gray-300'
                                    }`}
                                >
                                    {isSelected && (
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>

                            {/* Nombre e icono */}
                            <div className="col-span-3 flex items-center space-x-3">
                                <div className={`p-3 rounded-lg ${colorClass} ${isSelected ? 'ring-2 ring-indigo-300' : ''
                                    }`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className={`font-medium truncate ${isSelected ? 'text-indigo-700' : 'text-gray-900'
                                        }`}>
                                        {archivo.nombre}
                                    </p>
                                    {archivo.descripcion && (
                                        <p className={`text-sm truncate ${isSelected ? 'text-indigo-500' : 'text-gray-500'
                                            }`}>
                                            {archivo.descripcion}
                                        </p>
                                    )}
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className={`text-xs px-2 py-1 rounded ${isSelected
                                                ? 'bg-indigo-100 text-indigo-600'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            .{archivo.formato}
                                        </span>
                                        {archivo.tags?.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Categoría */}
                            <div className="col-span-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isSelected
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {archivo.categoria}
                                </span>
                            </div>

                            {/* Tamaño */}
                            <div className={`col-span-1 ${isSelected ? 'text-indigo-600' : 'text-gray-600'
                                }`}>
                                {ArchivosAdaptador.formatFileSize(archivo.tamaño)}
                            </div>

                            {/* Fecha */}
                            <div className="col-span-2">
                                <div className={`flex items-center ${isSelected ? 'text-indigo-600' : 'text-gray-600'
                                    }`}>
                                    <FaCalendarAlt className="h-4 w-4 mr-2" />
                                    <span className="text-sm">{formatDate(archivo.fechaSubida)}</span>
                                </div>
                                {archivo.subidoPor?.nombre && (
                                    <div className={`flex items-center mt-1 ${isSelected ? 'text-indigo-400' : 'text-gray-500'
                                        }`}>
                                        <FaUser className="h-3 w-3 mr-1" />
                                        <span className="text-xs">{archivo.subidoPor.nombre}</span>
                                    </div>
                                )}
                            </div>

                            {/* Acciones */}
                            <div className="col-span-3">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDownload?.(archivo.id, archivo.nombre);
                                        }}
                                        className={`p-2 transition-colors cursor-pointer ${isSelected
                                                ? 'text-indigo-400 hover:text-indigo-600'
                                                : 'text-gray-400 hover:text-indigo-600'
                                            }`}
                                        title="Descargar"
                                    >
                                        <FaDownload className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onView?.(archivo);
                                        }}
                                        className={`p-2 transition-colors cursor-pointer ${isSelected
                                                ? 'text-indigo-400 hover:text-green-600'
                                                : 'text-gray-400 hover:text-green-600'
                                            }`}
                                        title="Ver detalles"
                                    >
                                        <FaEye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete?.(archivo.id);
                                        }}
                                        className={`p-2 transition-colors cursor-pointer ${isSelected
                                                ? 'text-indigo-400 hover:text-red-600'
                                                : 'text-gray-400 hover:text-red-600'
                                            }`}
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
        </div>
    );
};

export default ListaArchivo;