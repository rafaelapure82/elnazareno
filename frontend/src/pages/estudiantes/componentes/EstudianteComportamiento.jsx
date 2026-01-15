import React from 'react';
import { FaUserPlus, FaTrash, FaDownload, FaFileExport, FaPrint } from 'react-icons/fa';

const EstudianteComportamiento = ({
    onAddClick,
    onDeleteSelected,
    onExport,
    onPrint,
    selectedCount,
    totalCount
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center space-x-4">
                <button
                    onClick={onAddClick}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <FaUserPlus className="h-4 w-4 mr-2" />
                    Nuevo Estudiante
                </button>

                <div className="text-sm text-gray-600">
                    <span className="font-medium">{totalCount}</span> estudiante{totalCount !== 1 ? 's' : ''} registrado{totalCount !== 1 ? 's' : ''}
                    {selectedCount > 0 && (
                        <span className="ml-2">
                            • <span className="font-medium text-indigo-600">{selectedCount}</span> seleccionado{selectedCount !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                {selectedCount > 0 && (
                    <button
                        onClick={onDeleteSelected}
                        className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors"
                    >
                        <FaTrash className="h-4 w-4 mr-1" />
                        Eliminar Seleccionados
                    </button>
                )}

                <button
                    onClick={onExport}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <FaFileExport className="h-4 w-4 mr-1" />
                    Exportar
                </button>

                <button
                    onClick={onPrint}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <FaPrint className="h-4 w-4 mr-1" />
                    Imprimir
                </button>
            </div>
        </div>
    );
};

export default EstudianteComportamiento;