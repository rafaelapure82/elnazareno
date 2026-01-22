// import React from 'react';
// import { FaUserPlus, FaTrash, FaFileExport, FaPrint, FaDownload } from 'react-icons/fa';
// import ExportarListaPersonal from './ExportarListaPersonal';
// import ModalOpcionesExportacion from './ModalOpcionesExportacion';

// const PersonalAccion = ({
//     onAddClick,
//     onDeleteSelected,
//     onExport,
//     onPrint,
//     onDownloadSelected,
//     selectedCount,
//     totalCount,
//     tipo,
//     personal,
//     selectedIds
// }) => {
//     const getTipoLabel = () => {
//         switch (tipo) {
//             case 'docente': return 'docente';
//             case 'administrativo': return 'administrativo';
//             case 'obrero': return 'obrero';
//             default: return 'personal';
//         }
//     };

//     const getTipoLabelPlural = () => {
//         switch (tipo) {
//             case 'docente': return 'docentes';
//             case 'administrativo': return 'administrativos';
//             case 'obrero': return 'obreros';
//             default: return 'personal';
//         }
//     };

//     // return (
//     //     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl border border-gray-200 p-4 mb-6">
//     //         <div className="flex items-center space-x-4">
//     //             <button
//     //                 onClick={onAddClick}
//     //                 className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
//     //             >
//     //                 <FaUserPlus className="h-4 w-4 mr-2" />
//     //                 Nuevo {getTipoLabel()}
//     //             </button>

//     //             <div className="text-sm text-gray-600">
//     //                 <span className="font-medium">{totalCount}</span> {getTipoLabelPlural()} registrado{totalCount !== 1 ? 's' : ''}
//     //                 {selectedCount > 0 && (
//     //                     <span className="ml-2">
//     //                         • <span className="font-medium text-indigo-600">{selectedCount}</span> seleccionado{selectedCount !== 1 ? 's' : ''}
//     //                     </span>
//     //                 )}
//     //             </div>
//     //         </div>

//     //         <div className="flex items-center space-x-2 mt-4 sm:mt-0">
//     //             {selectedCount > 0 && (
//     //                 <>
//     //                     <button
//     //                         onClick={onDownloadSelected}
//     //                         className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
//     //                     >
//     //                         <FaDownload className="h-4 w-4 mr-1" />
//     //                         Descargar Seleccionados
//     //                     </button>
//     //                     <button
//     //                         onClick={onDeleteSelected}
//     //                         className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
//     //                     >
//     //                         <FaTrash className="h-4 w-4 mr-1" />
//     //                         Eliminar Seleccionados
//     //                     </button>
//     //                 </>
//     //             )}

//     //             <button
//     //                 onClick={onExport}
//     //                 className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//     //             >
//     //                 <FaFileExport className="h-4 w-4 mr-1" />
//     //                 Exportar Lista
//     //             </button>

//     //             <button
//     //                 onClick={onPrint}
//     //                 className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//     //             >
//     //                 <FaPrint className="h-4 w-4 mr-1" />
//     //                 Imprimir
//     //             </button>
//     //         </div>
//     //     </div>
//     // );

//     return (
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl border border-gray-200 p-4 mb-6">
//             <div className="flex items-center space-x-4">
//                 <button
//                     onClick={onAddClick}
//                     className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
//                 >
//                     <FaUserPlus className="h-4 w-4 mr-2" />
//                     Nuevo {getTipoLabel()}
//                 </button>

//                 <div className="text-sm text-gray-600">
//                     <span className="font-medium">{totalCount}</span> {getTipoLabelPlural()} registrado{totalCount !== 1 ? 's' : ''}
//                     {selectedCount > 0 && (
//                         <span className="ml-2">
//                             • <span className="font-medium text-indigo-600">{selectedCount}</span> seleccionado{selectedCount !== 1 ? 's' : ''}
//                         </span>
//                     )}
//                 </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
//                 {selectedCount > 0 && (
//                     <>
//                         <button
//                             onClick={onDownloadSelected}
//                             className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
//                         >
//                             <FaDownload className="h-4 w-4 mr-1" />
//                             Descargar Seleccionados
//                         </button>
//                         <button
//                             onClick={onDeleteSelected}
//                             className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
//                         >
//                             <FaTrash className="h-4 w-4 mr-1" />
//                             Eliminar Seleccionados
//                         </button>
//                     </>
//                 )}

//                 {/* Componente de exportación mejorado */}
//                 <ExportarListaPersonal
//                     personal={personal}
//                     tipo={tipo}
//                     selectedIds={selectedIds}
//                     onExportComplete={(tipo) => console.log(`Exportado como ${tipo}`)}
//                 />
//             </div>
//         </div>
//     );

// };

// export default PersonalAccion;

// PersonalAccion.jsx
import React, { useState } from 'react';
import { FaUserPlus, FaTrash, FaFileExport } from 'react-icons/fa';
import ModalOpcionesExportacion from './ModalOpcionesExportacion';
import { PersonalServicio } from '../servicios/personal.servicio'
const PersonalAccion = ({
    personal, // <-- Recibir datos del personal
    onAddClick,
    onDeleteSelected,
    selectedCount,
    totalCount,
    tipo,
    selectedIds,
    onExportPDF,    // Funciones reales de exportación
    onExportExcel,
    onExportCSV,
    onPrint
}) => {
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportando, setExportando] = useState('');
    const [exportado, setExportado] = useState(false);
    const getTipoLabel = () => {
        switch (tipo) {
            case 'docente': return 'docente';
            case 'administrativo': return 'administrativo';
            case 'obrero': return 'obrero';
            default: return 'personal';
        }
    };

    const getTipoLabelPlural = () => {
        switch (tipo) {
            case 'docente': return 'docentes';
            case 'administrativo': return 'administrativos';
            case 'obrero': return 'obreros';
            default: return 'personal';
        }
    };

    const handleExportOption = async (formato, exportFunction) => {
        try {
            setExportando(formato);
            setExportado(false);

            // Llamar a la función de exportación real
            await exportFunction();

            setExportado(true);
            setTimeout(() => {
                setExportando('');
                setShowExportModal(false);
                setExportado(false);
            }, 1500);

        } catch (error) {
            console.error(`Error al exportar ${formato}:`, error);
            alert(`Error al exportar a ${formato.toUpperCase()}: ${error.message}`);
            setExportando('');
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onAddClick}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                        <FaUserPlus className="h-4 w-4 mr-2" />
                        Nuevo {getTipoLabel()}
                    </button>
                    {/*//!!#ojito papa */}

                    <button
                        onClick={() => {
                            console.log('DEBUG - Estado actual:', {
                                personal: personal,
                                cantidadPersonal: personal.length,
                                selectedIds: selectedIds,
                                cantidadSelectedIds: selectedIds.length,
                                primerRegistro: personal[0]
                            });

                            // Probar endpoint directamente
                            if (selectedIds.length > 0) {
                                PersonalServicio.obtenerPersonalMultiple(selectedIds.slice(0, 2))
                                    .then(result => {
                                        console.log('Resultado endpoint /multiples:', result);
                                        if (result.data && result.data[0]) {
                                            console.log('Campos en respuesta:', Object.keys(result.data[0]));
                                        }
                                    })
                                    .catch(err => console.error('Error endpoint:', err));
                            }
                        }}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                    >
                        Debug Exportación
                    </button>

                    <div className="text-sm text-gray-600">
                        <span className="font-medium">{totalCount}</span> {getTipoLabelPlural()} registrado{totalCount !== 1 ? 's' : ''}
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
                            className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                            <FaTrash className="h-4 w-4 mr-1" />
                            Eliminar Seleccionados
                        </button>
                    )}

                    <button
                        onClick={() => setShowExportModal(true)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        disabled={!personal || personal.length === 0}
                    >
                        <FaFileExport className="h-4 w-4 mr-1" />
                        Exportar Lista
                    </button>
                </div>
            </div>

            {/* Modal de Exportación - Pasar los datos */}
            <ModalOpcionesExportacion
                isOpen={showExportModal}
                onClose={() => !exportando && setShowExportModal(false)}
                personal={personal}
                tipo={tipo}
                selectedIds={selectedIds}
                // Pasar las funciones de exportación como props
                onExportPDF={() => handleExportOption('pdf', onExportPDF)}
                onExportExcel={() => handleExportOption('excel', onExportExcel)}
                onExportCSV={() => handleExportOption('csv', onExportCSV)}
                onPrint={() => handleExportOption('print', onPrint)}
                exportando={exportando}
                exportado={exportado}
            />
        </>
    );
};

export default PersonalAccion;