import React from 'react';
import {
    FaUpload, FaFile, FaFileImage, FaFilePdf, FaFileAlt,
    FaTrash, FaDownload, FaEye, FaTimes
} from 'react-icons/fa';
import { ArchivosAdaptador } from '../adaptadores/archivos.adaptador';

const ArchivosManejador = ({
    archivos,
    archivosErrors = [],
    onFileChange,
    onChangeFileType,
    onRemoveFile,
    tiposArchivo = []
}) => {
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileChange(files);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const getIconByTipo = (tipo) => {
        switch (tipo) {
            case 'imagen': return FaFileImage;
            case 'pdf': return FaFilePdf;
            case 'documento': return FaFileAlt;
            default: return FaFile;
        }
    };

    const getColorByTipo = (tipo) => {
        switch (tipo) {
            case 'imagen': return 'bg-purple-50 text-purple-600 border-purple-200';
            case 'pdf': return 'bg-red-50 text-red-600 border-red-200';
            case 'documento': return 'bg-blue-50 text-blue-600 border-blue-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Área de subida */}
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors"
                onClick={() => document.getElementById('file-upload')?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={(e) => onFileChange(e.target.files)}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                />

                <FaUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                    Arrastra y suelta tus archivos aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-gray-500">
                    Formatos soportados: JPG, PNG, GIF, WEBP, PDF, DOC, XLS, PPT, TXT
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Tamaño máximo por archivo: 10MB
                </p>
            </div>

            {/* Errores de archivos */}
            {archivosErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">Errores en los archivos:</h4>
                    <ul className="text-red-700 text-sm list-disc list-inside">
                        {archivosErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Lista de archivos */}
            {archivos.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        Archivos a subir ({archivos.length})
                    </h3>

                    <div className="space-y-3">
                        {archivos.map((archivo, index) => {
                            const Icon = getIconByTipo(archivo.tipo);
                            const colorClass = getColorByTipo(archivo.tipo);

                            return (
                                <div key={index} className={`border rounded-lg p-4 ${colorClass}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Icon className="h-8 w-8" />
                                            <div>
                                                <p className="font-medium">{archivo.file.name}</p>
                                                <p className="text-sm">
                                                    {ArchivosAdaptador.formatTamaño(archivo.file.size)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={archivo.tipo}
                                                onChange={(e) => onChangeFileType(index, e.target.value)}
                                                className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {tiposArchivo.map(tipo => (
                                                    <option key={tipo.value} value={tipo.value}>
                                                        {tipo.label}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                onClick={() => onRemoveFile(index)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Eliminar archivo"
                                            >
                                                <FaTrash className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Vista previa para imágenes */}
                                    {archivo.tipo === 'imagen' && archivo.file.type.startsWith('image/') && (
                                        <div className="mt-4">
                                            <img
                                                src={URL.createObjectURL(archivo.file)}
                                                alt="Vista previa"
                                                className="max-h-48 rounded-lg mx-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Archivos existentes (si los hay) */}
            {archivos.some(a => a.id) && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Archivos existentes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {archivos
                            .filter(a => a.id)
                            .map((archivo) => {
                                const Icon = ArchivosAdaptador.getIconByTipo(archivo.tipo_archivo);
                                const colors = ArchivosAdaptador.getColorByTipo(archivo.tipo_archivo);

                                return (
                                    <div key={archivo.id} className={`border rounded-lg p-4 ${colors.border} ${colors.bg}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Icon className={`h-8 w-8 ${colors.text}`} />
                                                <div>
                                                    <p className="font-medium">{archivo.nombre_archivo}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {ArchivosAdaptador.formatTamaño(archivo.tamaño || 0)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => window.open(archivo.ruta_archivo, '_blank')}
                                                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                    title="Ver archivo"
                                                >
                                                    <FaEye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const link = document.createElement('a');
                                                        link.href = archivo.ruta_archivo;
                                                        link.download = archivo.nombre_archivo;
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                                    title="Descargar archivo"
                                                >
                                                    <FaDownload className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Vista previa para imágenes */}
                                        {archivo.tipo_archivo === 'imagen' && archivo.ruta_archivo && (
                                            <div className="mt-4">
                                                <img
                                                    src={archivo.ruta_archivo}
                                                    alt={archivo.nombre_archivo}
                                                    className="max-h-48 rounded-lg mx-auto"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArchivosManejador;