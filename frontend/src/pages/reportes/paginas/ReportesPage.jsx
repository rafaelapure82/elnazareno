import React, { useState, useRef } from 'react';
import { FaFolderOpen, FaChartBar, FaSpinner } from 'react-icons/fa';
import { useArchivos } from '../hooks/useArchivo';
import SubirArchviModal from '../componentes/SubirArchivoModal';
import BuscarArchivo from '../componentes/BuscarArchivo';
import ListaArchivo from '../componentes/ListaArchivo';
import AccionesArchivo from '../componentes/AccionesArchivo';
import Swal from 'sweetalert2'

const ReportesPage = () => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [viewedFile, setViewedFile] = useState(null);

    const {
        archivos,
        loading,
        error,
        filters,
        cargarArchivos,
        buscarArchivos,
        eliminarArchivo,
        descargarArchivo,
        actualizarFiltros
    } = useArchivos();

    const searchTimeoutRef = useRef(null);

    const handleSearch = (query) => {

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Setear timeout
        searchTimeoutRef.current = setTimeout(() => {
            if (query.trim()) {
                buscarArchivos(query);
            } else {
                cargarArchivos();
            }
            actualizarFiltros({ searchQuery: query });
        }, 500);

        // if (query.trim()) {
        //     buscarArchivos(query);
        // } else {
        //     cargarArchivos();
        // }
        // actualizarFiltros({ searchQuery: query });
    };

    React.useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    const handleFilterChange = (newFilters) => {
        actualizarFiltros(newFilters);
    };

    const handleDownload = async (id, nombre) => {
        try {
            await descargarArchivo(id, nombre);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {

        Swal.fire({
            title: "¿Estás seguro de eliminar este archivo?",
            text: "Esta accion no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eliminarArchivo(id);
                    setSelectedFiles(prev => prev.filter(fileId => fileId !== id));
                    Swal.fire({
                        title: "Eliminado",
                        text: "Su archivo ha sido eliminado",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Error al eliminar el archivo",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        });

    };

    const handleUploadSuccess = () => {
        cargarArchivos();
    };

    const handleSelectFile = (archivo) => {
        setSelectedFiles(prev => {
            if (prev.includes(archivo.id)) {
                return prev.filter(id => id !== archivo.id);
            } else {
                return [...prev, archivo.id];
            }
        });
    };

    const handleDownloadSelected = () => {
        if (selectedFiles.length === 0) {
            alert('Selecciona al menos un archivo para descargar');
            return;
        }

        // Descargar archivos seleccionados
        selectedFiles.forEach(async (fileId) => {
            const archivo = archivos.find(a => a.id === fileId);
            if (archivo) {
                await handleDownload(archivo.id, archivo.nombre);
            }
        });
    };

    const handleDeleteSelected = async () => {
        if (selectedFiles.length === 0) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "info",
                title: "Selecciona al menos un archivo para eliminar"
            });
            return;
        }

        Swal.fire({
            title: `¿Estás seguro de eliminar ${selectedFiles.length} archivo(s)?`,
            text: "Esta accion no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    for (const fileId of selectedFiles) {
                        await eliminarArchivo(fileId);
                    }
                    setSelectedFiles([]);
                    Swal.fire({
                        title: "Eliminado",
                        text: "Su archivo ha sido eliminado",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: `Error al eliminar los archivo: ${error.message}`,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        });
    };

    const handleExport = () => {
        // Exportar lista a CSV
        const headers = ['Nombre', 'Descripción', 'Categoría', 'Tamaño', 'Fecha'];
        const csvData = archivos.map(archivo => [
            archivo.nombre,
            archivo.descripcion,
            archivo.categoria,
            archivo.tamaño,
            archivo.fechaSubida
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'archivos.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (error) {
        return (
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
                        <p className="text-red-700">{error}</p>
                        <button
                            onClick={cargarArchivos}
                            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <FaFolderOpen className="h-8 w-8 text-indigo-600 mr-3" />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Gestión de Archivos
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Administra y comparte todos los archivos de la institución
                            </p>
                        </div>
                    </div>

                    {/* Estadísticas rápidas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="text-2xl font-bold text-gray-900">{archivos.length}</div>
                            <div className="text-sm text-gray-600">Total de archivos</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="text-2xl font-bold text-gray-900">
                                {archivos.filter(a => a.categoria === 'reportes').length}
                            </div>
                            <div className="text-sm text-gray-600">Reportes</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="text-2xl font-bold text-gray-900">
                                {archivos.filter(a => a.categoria === 'documentos').length}
                            </div>
                            <div className="text-sm text-gray-600">Documentos</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="text-2xl font-bold text-gray-900">
                                {archivos.reduce((sum, a) => sum + a.tamaño, 0) / 1024 / 1024 / 1024 > 1
                                    ? `${(archivos.reduce((sum, a) => sum + a.tamaño, 0) / 1024 / 1024 / 1024).toFixed(2)} GB`
                                    : `${(archivos.reduce((sum, a) => sum + a.tamaño, 0) / 1024 / 1024).toFixed(2)} MB`
                                }
                            </div>
                            <div className="text-sm text-gray-600">Espacio usado</div>
                        </div>
                    </div>

                </div>

                {/* Acciones */}
                <AccionesArchivo
                    onUploadClick={() => setShowUploadModal(true)}
                    onDownloadAll={handleDownloadSelected}
                    onDeleteSelected={handleDeleteSelected}
                    onExport={handleExport}
                    selectedCount={selectedFiles.length}
                    totalCount={archivos.length}
                />

                {/* Búsqueda y filtros */}
                <BuscarArchivo
                    onSearch={handleSearch}
                    onFilterChange={(newFilters) => actualizarFiltros(newFilters)}
                    filters={filters}
                />

                {/* Lista de archivos */}
                <ListaArchivo
                    archivos={archivos}
                    selectedFiles={selectedFiles}
                    loading={loading}
                    onDownload={handleDownload}
                    onView={setViewedFile}
                    onDelete={handleDelete}
                    onSelect={handleSelectFile}
                />

                {/* Modal para subir archivos */}
                <SubirArchviModal
                    isOpen={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    onUploadSuccess={handleUploadSuccess}
                />

                {/* Vista de detalles del archivo */}
                {viewedFile && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Detalles del archivo</h3>
                                <button
                                    onClick={() => setViewedFile(null)}
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                        <p className="mt-1 text-gray-900">{viewedFile.nombre}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nombre Original</label>
                                        <p className="mt-1 text-gray-900">{viewedFile.nombreOriginal}</p>
                                    </div></div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                    <p className="mt-1 text-gray-900">{viewedFile.descripcion || 'Sin descripción'}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Categoría</label>
                                        <p className="mt-1 text-gray-900">{viewedFile.categoria}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tamaño</label>
                                        <p className="mt-1 text-gray-900">
                                            {viewedFile.tamaño > 1024 * 1024
                                                ? `${(viewedFile.tamaño / 1024 / 1024).toFixed(2)} MB`
                                                : `${(viewedFile.tamaño / 1024).toFixed(2)} KB`
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha de subida</label>
                                    <p className="mt-1 text-gray-900">
                                        {new Date(viewedFile.fechaSubida).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <button
                                        onClick={() => setViewedFile(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 cursor-pointer"
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        onClick={() => handleDownload(viewedFile.id, viewedFile.nombre)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                                    >
                                        Descargar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportesPage;