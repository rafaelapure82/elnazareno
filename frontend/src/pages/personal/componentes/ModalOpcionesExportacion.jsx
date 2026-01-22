// components/ModalOpcionesExportacion.jsx
import React, { useState, useEffect } from 'react';
import {
    FaTimes, FaFilePdf, FaFileExcel, FaFileCsv, FaPrint,
    FaSpinner, FaCheck, FaDownload, FaExclamationTriangle
} from 'react-icons/fa';

const ModalOpcionesExportacion = ({
    isOpen,
    onClose,
    personal,
    tipo,
    selectedIds = [],
    exportando = '',
    exportado = false,
    // Añadir props para las funciones de exportación
    onExportPDF,
    onExportExcel,
    onExportCSV,
    onPrint
}) => {
    const [datosParaExportar, setDatosParaExportar] = useState([]);

    // Actualizar datos cuando cambien personal o selectedIds
    useEffect(() => {
        if (personal && Array.isArray(personal)) {
            if (selectedIds.length > 0) {
                // Filtrar solo los seleccionados
                const filtrados = personal.filter(p => selectedIds.includes(p.id));
                setDatosParaExportar(filtrados);
            } else {
                // Tomar todos
                setDatosParaExportar(personal);
            }
        } else {
            setDatosParaExportar([]);
        }
    }, [personal, selectedIds]);

    if (!isOpen) return null;

    const getTipoNombre = () => {
        switch (tipo) {
            case 'docente': return 'Docentes';
            case 'administrativo': return 'Administrativos';
            case 'obrero': return 'Obreros';
            default: return 'Personal';
        }
    };

    const FormatoBoton = ({
        formato,
        icon: Icon,
        color,
        titulo,
        descripcion,
        onClick,
        disabled = false
    }) => {
        const estaExportando = exportando === formato;

        return (
            <button
                onClick={onClick}
                disabled={disabled || exportando !== ''}
                className={`flex flex-col items-center justify-center p-4 border-2 ${color.border} rounded-lg hover:${color.hover} transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${estaExportando ? 'animate-pulse' : ''
                    }`}
            >
                <div className="relative">
                    <Icon className={`h-8 w-8 ${color.icon} mb-2 ${estaExportando ? 'opacity-50' : ''}`} />
                    {estaExportando && (
                        <FaSpinner className="h-8 w-8 absolute top-0 left-0 text-gray-400 animate-spin" />
                    )}
                </div>
                <span className="font-medium text-gray-900">{titulo}</span>
                <span className="text-xs text-gray-600">{descripcion}</span>
                {estaExportando && (
                    <span className="text-xs mt-1 text-blue-600">
                        Generando...
                    </span>
                )}
            </button>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Exportar {getTipoNombre()}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Selecciona el formato de exportación
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        disabled={exportando !== ''}
                    >
                        <FaTimes className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-6">
                    {/* Información del export */}
                    <div className={`mb-4 p-3 rounded-lg transition-colors ${selectedIds.length > 0 ? 'bg-indigo-50 border border-indigo-100' : 'bg-blue-50 border border-blue-100'
                        }`}>
                        <div className="flex items-center">
                            <FaDownload className={`h-4 w-4 mr-2 ${selectedIds.length > 0 ? 'text-indigo-600' : 'text-blue-600'
                                }`} />
                            <div>
                                <p className={`text-sm font-medium ${selectedIds.length > 0 ? 'text-indigo-700' : 'text-blue-700'
                                    }`}>
                                    {selectedIds.length > 0
                                        ? `Exportar ${selectedIds.length} ${getTipoNombre().toLowerCase()} seleccionados`
                                        : `Exportar todos los ${personal?.length || 0} ${getTipoNombre().toLowerCase()}`
                                    }
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Datos listos para exportar: {datosParaExportar.length} registros
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Advertencia si no hay datos */}
                    {datosParaExportar.length === 0 && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center">
                                <FaExclamationTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                                <p className="text-sm text-yellow-700">
                                    No hay datos disponibles para exportar
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Opciones de exportación */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormatoBoton
                            formato="pdf"
                            icon={FaFilePdf}
                            color={{
                                border: 'border-red-200',
                                hover: 'bg-red-50',
                                icon: 'text-red-600'
                            }}
                            titulo="PDF"
                            descripcion="Formato para imprimir"
                            onClick={onExportPDF}
                            disabled={datosParaExportar.length === 0}
                        />

                        <FormatoBoton
                            formato="excel"
                            icon={FaFileExcel}
                            color={{
                                border: 'border-green-200',
                                hover: 'bg-green-50',
                                icon: 'text-green-600'
                            }}
                            titulo="Excel"
                            descripcion="Datos completos"
                            onClick={onExportExcel}
                            disabled={datosParaExportar.length === 0}
                        />

                        <FormatoBoton
                            formato="csv"
                            icon={FaFileCsv}
                            color={{
                                border: 'border-blue-200',
                                hover: 'bg-blue-50',
                                icon: 'text-blue-600'
                            }}
                            titulo="CSV"
                            descripcion="Datos simples"
                            onClick={onExportCSV}
                            disabled={datosParaExportar.length === 0}
                        />

                        <FormatoBoton
                            formato="print"
                            icon={FaPrint}
                            color={{
                                border: 'border-gray-200',
                                hover: 'bg-gray-50',
                                icon: 'text-gray-600'
                            }}
                            titulo="Imprimir"
                            descripcion="Vista previa"
                            onClick={onPrint}
                            disabled={datosParaExportar.length === 0}
                        />
                    </div>

                    {/* Vista previa de datos */}
                    {datosParaExportar.length > 0 && (
                        <div className="mt-6">
                            <details className="text-sm">
                                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                                    Vista previa de datos ({datosParaExportar.length} registros)
                                </summary>
                                <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg p-2 bg-gray-50">
                                    {datosParaExportar.slice(0, 5).map(p => (
                                        <div key={p.id} className="text-xs p-1 border-b last:border-b-0">
                                            {p.id}: {p.nombreCompleto || 'Sin nombre'}
                                        </div>
                                    ))}
                                    {datosParaExportar.length > 5 && (
                                        <div className="text-xs text-gray-500 p-1 text-center">
                                            ... y {datosParaExportar.length - 5} más
                                        </div>
                                    )}
                                </div>
                            </details>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t">
                    <button
                        onClick={onClose}
                        disabled={exportando !== ''}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {exportando ? 'Exportando...' : 'Cerrar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalOpcionesExportacion;