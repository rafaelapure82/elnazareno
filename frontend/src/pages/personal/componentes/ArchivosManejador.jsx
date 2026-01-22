import React from 'react';
import {
    FaUpload, FaFile, FaFileImage, FaFilePdf, FaFileAlt,
    FaTrash, FaDownload, FaEye
} from 'react-icons/fa';

const ArchivosManejador = ({
    archivos = [],
    archivosErrors = [],
    onFileChange,
    onChangeFileType,
    onRemoveFile,
    tiposArchivo = []
}) => {
    console.log('ArchivosManejador recibió archivos:', archivos);
    console.log('Cantidad de archivos:', archivos.length);

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
        if (!tipo) return FaFile;

        const tipoLower = tipo.toLowerCase();
        if (tipoLower.includes('image') || tipoLower.includes('imagen')) return FaFileImage;
        if (tipoLower.includes('pdf')) return FaFilePdf;
        if (tipoLower.includes('doc') || tipoLower.includes('documento')) return FaFileAlt;
        return FaFile;
    };

    const getColorByTipo = (tipo) => {
        if (!tipo) return 'bg-gray-50 text-gray-600 border-gray-200';

        const tipoLower = tipo.toLowerCase();
        if (tipoLower.includes('image') || tipoLower.includes('imagen')) return 'bg-purple-50 text-purple-600 border-purple-200';
        if (tipoLower.includes('pdf')) return 'bg-red-50 text-red-600 border-red-200';
        if (tipoLower.includes('doc') || tipoLower.includes('documento')) return 'bg-blue-50 text-blue-600 border-blue-200';
        return 'bg-gray-50 text-gray-600 border-gray-200';
    };

    // Función para formatear tamaño
    const formatTamaño = (bytes) => {
        if (!bytes || bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Separar archivos nuevos y existentes
    // Separar archivos
    const archivosNuevos = archivos.filter(a => a.esNuevo || (a.file && !a.esExistente));
    const archivosExistentes = archivos.filter(a => a.esExistente && !a.marcadoParaEliminar);
    const archivosParaEliminar = archivos.filter(a => a.marcadoParaEliminar);

    return (
        <div className="space-y-6">
            {/* Área de subida */}
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('file-upload')?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={(e) => onFileChange(e.target.files)}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar"
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


            {/* Archivos nuevos */}
            {archivosNuevos.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        Archivos a subir ({archivosNuevos.length})
                    </h3>

                    <div className="space-y-3">
                        {archivosNuevos.map((archivo, index) => {
                            const tipo = archivo.tipo || 'documento';
                            const Icon = getIconByTipo(tipo);
                            const colorClass = getColorByTipo(tipo);
                            const nombre = archivo.file?.name || archivo.nombre || 'Sin nombre';

                            // Encontrar índice real en el array completo
                            const realIndex = archivos.findIndex(a =>
                                a === archivo ||
                                (a.file && archivo.file && a.file.name === archivo.file.name)
                            );

                            return (
                                <div key={index} className={`border rounded-lg p-4 ${colorClass}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Icon className="h-8 w-8" />
                                            <div>
                                                <p className="font-medium">{nombre}</p>
                                                <p className="text-sm">Nuevo archivo</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={tipo}
                                                onChange={(e) => onChangeFileType(realIndex, e.target.value)}
                                                className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                                            >
                                                {tiposArchivo.map(tipoOption => (
                                                    <option key={tipoOption.value} value={tipoOption.value}>
                                                        {tipoOption.label}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                onClick={() => onRemoveFile(realIndex)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Eliminar archivo"
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
            )}

            {/* Archivos existentes */}
            {archivosExistentes.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        Archivos existentes ({archivosExistentes.length})
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {archivosExistentes.map((archivo, index) => {
                            const tipo = archivo.tipo_archivo || archivo.tipo || 'documento';
                            const Icon = getIconByTipo(tipo);
                            const colorClass = getColorByTipo(tipo);
                            const nombre = archivo.nombre_original || archivo.nombre_archivo || 'Sin nombre';

                            // Encontrar índice real
                            const realIndex = archivos.findIndex(a => a.id === archivo.id);

                            return (
                                <div key={archivo.id} className={`border rounded-lg p-4 ${colorClass}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Icon className="h-8 w-8" />
                                            <div>
                                                <p className="font-medium">{nombre}</p>
                                                <p className="text-sm text-gray-600">
                                                    {formatTamaño(archivo.size_bytes || archivo.tamaño || 0)}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Tipo: {tipo}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                                Existente
                                            </span>

                                            {archivo.ruta_archivo && (
                                                <>
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
                                                            link.download = nombre;
                                                            document.body.appendChild(link);
                                                            link.click();
                                                            document.body.removeChild(link);
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                                        title="Descargar archivo"
                                                    >
                                                        <FaDownload className="h-4 w-4" />
                                                    </button>
                                                </>
                                            )}

                                            <button
                                                onClick={() => onRemoveFile(realIndex)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                title="Marcar para eliminar"
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
            )}

            {/* Archivos marcados para eliminar */}
            {archivosParaEliminar.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 text-red-600">
                        Archivos a eliminar ({archivosParaEliminar.length})
                    </h3>

                    <div className="space-y-2">
                        {archivosParaEliminar.map((archivo) => (
                            <div key={archivo.id} className="border border-red-200 bg-red-50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <FaTrash className="h-5 w-5 text-red-500" />
                                        <span className="text-gray-700 line-through">
                                            {archivo.nombre_original || archivo.nombre_archivo}
                                        </span>
                                    </div>
                                    <span className="text-sm text-red-600">Se eliminará al guardar</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Mensaje si no hay archivos */}
            {archivos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <FaFile className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No hay archivos adjuntos. Agrega archivos usando el área de arriba.</p>
                </div>
            )}
        </div>
    );
};

export default ArchivosManejador;