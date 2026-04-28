import React from 'react';
import { 
    Upload, 
    Download, 
    Trash2, 
    FileOutput, 
    CheckCircle2, 
    Files 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccionesArchivo = ({
    onUploadClick,
    onDownloadAll,
    onDeleteSelected,
    selectedCount,
    onExport,
    totalCount
}) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="flex flex-wrap items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onUploadClick}
                    className="group relative flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Upload size={18} className="text-primary group-hover:animate-bounce" />
                    <span>Subir Archivo</span>
                </motion.button>

                <div className="flex items-center gap-4 px-6 py-4 bg-white/50 backdrop-blur-md border border-white rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2">
                        <Files size={16} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <span className="text-slate-900 text-sm">{totalCount}</span> Archivos
                        </span>
                    </div>
                    {selectedCount > 0 && (
                        <>
                            <div className="w-px h-4 bg-slate-200" />
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-primary" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                    <span className="text-sm">{selectedCount}</span> Seleccionados
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <AnimatePresence>
                    {selectedCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20 }}
                            className="flex items-center gap-3"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onDownloadAll}
                                className="flex items-center gap-2 px-6 py-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                            >
                                <Download size={16} />
                                <span>Descargar</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onDeleteSelected}
                                className="flex items-center gap-2 px-6 py-4 bg-rose-50 text-rose-500 border border-rose-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                            >
                                <Trash2 size={16} />
                                <span>Eliminar</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onExport}
                    className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all shadow-sm group"
                >
                    <FileOutput size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
                    <span>Exportar Lista</span>
                </motion.button>
            </div>
        </div>
    );
};

export default AccionesArchivo;