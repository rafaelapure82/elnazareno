import React from 'react';
import {
    FileText,
    FileImage,
    FileCode,
    FileAudio,
    FileVideo,
    FileArchive,
    FileSpreadsheet,
    FileBox,
    Download,
    Eye,
    Trash2,
    Calendar,
    User,
    Loader2,
    CheckCircle2,
    Clock,
    MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchivosAdaptador } from '../adaptadores/archivo.adaptador';

const iconMap = {
    pdf: FileText,
    doc: FileText,
    docx: FileText,
    xls: FileSpreadsheet,
    xlsx: FileSpreadsheet,
    jpg: FileImage,
    jpeg: FileImage,
    png: FileImage,
    gif: FileImage,
    txt: FileText,
    zip: FileArchive,
    rar: FileArchive,
    default: FileBox
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
            pdf: 'text-rose-600 bg-rose-50',
            doc: 'text-blue-600 bg-blue-50',
            docx: 'text-blue-600 bg-blue-50',
            xls: 'text-emerald-600 bg-emerald-50',
            xlsx: 'text-emerald-600 bg-emerald-50',
            jpg: 'text-violet-600 bg-violet-50',
            jpeg: 'text-violet-600 bg-violet-50',
            png: 'text-violet-600 bg-violet-50',
            default: 'text-slate-600 bg-slate-50'
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
            <div className="py-24 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Escaneando Repositorio...</p>
            </div>
        );
    }

    if (archivos.length === 0) {
        return (
            <div className="py-24 text-center flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 ring-8 ring-slate-50/50">
                    <FileBox size={48} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Repositorio Vacío</h3>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto mt-2">No se han encontrado archivos que coincidan con los criterios de búsqueda.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="px-6 py-5 text-left w-12"></th>
                            <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Documento</th>
                            <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Categoría</th>
                            <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Metadatos</th>
                            <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Registro</th>
                            <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        <AnimatePresence mode="popLayout">
                            {archivos.map((archivo, idx) => {
                                const Icon = getFileIcon(archivo.formato);
                                const colorClass = getFileColor(archivo.formato);
                                const isSelected = selectedFiles.includes(archivo.id);

                                return (
                                    <motion.tr
                                        key={archivo.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.03 }}
                                        onClick={() => onSelect?.(archivo)}
                                        className={`group cursor-pointer transition-all duration-200 ${isSelected ? 'bg-primary/5' : 'hover:bg-slate-50/80'}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-white' : 'border-slate-200 group-hover:border-primary/50'}`}>
                                                {isSelected && <CheckCircle2 size={14} />}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${colorClass}`}>
                                                    <Icon size={20} />
                                                </div>
                                                <div className="max-w-[250px]">
                                                    <div className={`text-sm font-black tracking-tight truncate ${isSelected ? 'text-primary' : 'text-slate-800'}`}>
                                                        {archivo.nombre}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase mt-0.5 truncate">
                                                        {archivo.descripcion || 'Sin descripción'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isSelected ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                                                {archivo.categoria}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">
                                                    {ArchivosAdaptador.formatFileSize(archivo.tamaño)}
                                                </div>
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                    Formato: {archivo.formato}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                                                    <Calendar size={12} className="text-slate-300" />
                                                    {formatDate(archivo.fechaSubida)}
                                                </div>
                                                {archivo.subidoPor?.nombre && (
                                                    <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase">
                                                        <User size={10} className="text-slate-300" />
                                                        {archivo.subidoPor.nombre}
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => { e.stopPropagation(); onDownload?.(archivo.id, archivo.nombre); }}
                                                    className="p-2 rounded-xl bg-white text-emerald-500 shadow-sm border border-slate-100 hover:bg-emerald-50 transition-colors"
                                                    title="Descargar"
                                                >
                                                    <Download size={16} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => { e.stopPropagation(); onView?.(archivo); }}
                                                    className="p-2 rounded-xl bg-white text-blue-500 shadow-sm border border-slate-100 hover:bg-blue-50 transition-colors"
                                                    title="Ver Detalles"
                                                >
                                                    <Eye size={16} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => { e.stopPropagation(); onDelete?.(archivo.id); }}
                                                    className="p-2 rounded-xl bg-white text-rose-500 shadow-sm border border-slate-100 hover:bg-rose-50 transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={16} />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <div className="px-8 py-5 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        Explorando {archivos.length} Entradas
                    </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                    <Clock size={12} />
                    Sincronizado: {new Date().toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
};

export default ListaArchivo;