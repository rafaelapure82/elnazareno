import React from 'react';
import { FaUpload, FaDownload, FaTrash, FaFileExport } from 'react-icons/fa';

const AccionesArchivo = ({
    onUploadClick,
    onDownloadAll,
    onDeleteSelected,
    selectedCount,
    onExport,
    totalCount
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center space-x-4">
                <button
                    onClick={onUploadClick}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                    <FaUpload className="h-4 w-4 mr-2" />
                    Subir Archivo
                </button>

                <div className="text-sm text-gray-600">
                    <span className="font-medium">{totalCount}</span> archivos encontrados
                    {selectedCount > 0 && (
                        <span className="ml-2">
                            • <span className="font-medium text-indigo-600">{selectedCount}</span> seleccionados
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                {selectedCount > 0 && (
                    <>
                        <button
                            onClick={onDownloadAll}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer"
                        >
                            <FaDownload className="h-4 w-4 mr-1" />
                            Descargar Seleccionados
                        </button>
                        <button
                            onClick={onDeleteSelected}
                            className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                            <FaTrash className="h-4 w-4 mr-1" />
                            Eliminar Seleccionados
                        </button>
                    </>
                )}

                <button
                    onClick={onExport}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                    <FaFileExport className="h-4 w-4 mr-1" />
                    Exportar Lista
                </button>
            </div>
        </div>
    );
};

export default AccionesArchivo;