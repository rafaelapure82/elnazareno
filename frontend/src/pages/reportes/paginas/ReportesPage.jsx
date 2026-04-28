import React, { useState, useRef, useEffect } from 'react';
import { 
    FolderOpen, 
    ChartBar, 
    Loader2, 
    Upload, 
    Trash2, 
    Download,
    FileText,
    PieChart,
    HardDrive,
    Search,
    X,
    AlertCircle,
    RefreshCw,
    MoreVertical,
    Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArchivos } from '../hooks/useArchivo';
import SubirArchviModal from '../componentes/SubirArchivoModal';
import BuscarArchivo from '../componentes/BuscarArchivo';
import ListaArchivo from '../componentes/ListaArchivo';
import AccionesArchivo from '../componentes/AccionesArchivo';
import Swal from 'sweetalert2';

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
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => {
            if (query.trim()) {
                buscarArchivos(query);
            } else {
                cargarArchivos();
            }
            actualizarFiltros({ searchQuery: query });
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        };
    }, []);

    const handleDownload = async (id, nombre) => {
        try {
            await descargarArchivo(id, nombre);
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar archivo?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f43f5e",
            confirmButtonText: "Sí, eliminar"
        });

        if (result.isConfirmed) {
            try {
                await eliminarArchivo(id);
                setSelectedFiles(prev => prev.filter(fileId => fileId !== id));
                Swal.fire('Eliminado', 'Archivo borrado con éxito', 'success');
            } catch (e) {
                Swal.fire('Error', 'No se pudo eliminar el archivo', 'error');
            }
        }
    };

    const handleSelectFile = (archivo) => {
        setSelectedFiles(prev => 
            prev.includes(archivo.id) ? prev.filter(id => id !== archivo.id) : [...prev, archivo.id]
        );
    };

    const handleDownloadSelected = () => {
        if (selectedFiles.length === 0) return;
        selectedFiles.forEach(async (fileId) => {
            const archivo = archivos.find(a => a.id === fileId);
            if (archivo) await handleDownload(archivo.id, archivo.nombre);
        });
    };

    const handleDeleteSelected = async () => {
        if (selectedFiles.length === 0) return;
        const result = await Swal.fire({
            title: `¿Eliminar ${selectedFiles.length} archivos?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f43f5e"
        });

        if (result.isConfirmed) {
            try {
                for (const fileId of selectedFiles) await eliminarArchivo(fileId);
                setSelectedFiles([]);
                Swal.fire('Eliminados', 'Archivos borrados con éxito', 'success');
            } catch (e) {
                Swal.fire('Error', e.message, 'error');
            }
        }
    };

    const handleExport = () => {
        const headers = ['Nombre', 'Descripción', 'Categoría', 'Tamaño', 'Fecha'];
        const csvContent = [
            headers.join(','),
            ...archivos.map(a => [a.nombre, a.descripcion, a.categoria, a.tamaño, a.fechaSubida].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'archivos.csv';
        link.click();
    };

    const totalSize = archivos.reduce((sum, a) => sum + a.tamaño, 0);
    const formattedSize = totalSize > 1024 * 1024 * 1024 
        ? `${(totalSize / (1024**3)).toFixed(2)} GB` 
        : `${(totalSize / (1024**2)).toFixed(2)} MB`;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 ring-8 ring-rose-50/50">
                    <AlertCircle size={40} />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Fallo en Repositorio</h3>
                    <p className="text-slate-500 font-medium mt-2">{error}</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={cargarArchivos}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
                >
                    <RefreshCw size={16} />
                    Reconectar
                </motion.button>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 pt-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <FolderOpen size={32} />
                        </div>
                        <div className="h-px w-12 bg-primary/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Repositorio</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                        Gestión de <span className="text-primary">Archivos</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Repositorio centralizado para reportes académicos, documentos institucionales y expedientes digitales.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/50 backdrop-blur-xl p-2 rounded-3xl border border-white shadow-xl shadow-slate-200/50">
                    <div className="px-6 py-4 text-center">
                        <div className="text-2xl font-black text-slate-900">{archivos.length}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total</div>
                    </div>
                    <div className="w-px h-10 bg-slate-100" />
                    <div className="px-6 py-4 text-center">
                        <div className="text-2xl font-black text-indigo-500">{archivos.filter(a => a.categoria === 'reportes').length}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reportes</div>
                    </div>
                    <div className="w-px h-10 bg-slate-100" />
                    <div className="px-6 py-4 text-center">
                        <div className="text-xl font-black text-slate-700">{formattedSize}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Uso</div>
                    </div>
                </div>
            </div>

            <div className="px-4 space-y-6">
                {/* Actions Bar */}
                <AccionesArchivo
                    onUploadClick={() => setShowUploadModal(true)}
                    onDownloadAll={handleDownloadSelected}
                    onDeleteSelected={handleDeleteSelected}
                    onExport={handleExport}
                    selectedCount={selectedFiles.length}
                    totalCount={archivos.length}
                />

                {/* Search & Filters */}
                <BuscarArchivo
                    onSearch={handleSearch}
                    onFilterChange={actualizarFiltros}
                    filters={filters}
                />

                {/* Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden"
                >
                    <ListaArchivo
                        archivos={archivos}
                        selectedFiles={selectedFiles}
                        loading={loading}
                        onDownload={handleDownload}
                        onView={setViewedFile}
                        onDelete={handleDelete}
                        onSelect={handleSelectFile}
                    />
                </motion.div>
            </div>

            {/* Modals */}
            <SubirArchviModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onUploadSuccess={cargarArchivos}
            />

            <AnimatePresence>
                {viewedFile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setViewedFile(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-primary" size={24} />
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Detalles del Archivo</h3>
                                </div>
                                <button onClick={() => setViewedFile(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre del Archivo</p>
                                        <p className="text-slate-900 font-bold break-all">{viewedFile.nombre}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre Original</p>
                                        <p className="text-slate-600 font-medium break-all">{viewedFile.nombreOriginal}</p>
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Descripción</p>
                                        <p className="text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                                            {viewedFile.descripcion || 'Sin descripción adicional.'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoría</p>
                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-lg">
                                            {viewedFile.categoria}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tamaño</p>
                                        <p className="text-slate-900 font-black">
                                            {viewedFile.tamaño > 1024 * 1024
                                                ? `${(viewedFile.tamaño / (1024**2)).toFixed(2)} MB`
                                                : `${(viewedFile.tamaño / 1024).toFixed(2)} KB`
                                            }
                                        </p>
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha de Registro</p>
                                        <p className="text-slate-900 font-bold flex items-center gap-2">
                                            <Calendar size={14} className="text-slate-400" />
                                            {new Date(viewedFile.fechaSubida).toLocaleDateString('es-ES', {
                                                day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                                    <button
                                        onClick={() => setViewedFile(null)}
                                        className="flex-1 px-6 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all"
                                    >
                                        Cerrar Vista
                                    </button>
                                    <button
                                        onClick={() => handleDownload(viewedFile.id, viewedFile.nombre)}
                                        className="flex-[2] flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                                    >
                                        <Download size={16} />
                                        Descargar Archivo
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReportesPage;