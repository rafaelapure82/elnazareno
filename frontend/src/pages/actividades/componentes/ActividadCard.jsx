import React, { useState } from 'react';
import { 
    Calendar, 
    User, 
    Eye, 
    Edit3, 
    Trash2, 
    Image as ImageIcon, 
    ChevronLeft, 
    ChevronRight,
    Clock,
    MoreHorizontal,
    Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActividadesAdaptador } from '../adaptadores/actividades.adaptador';
import { API_BASE_URL } from '../../../compartidos/api/axios.config';

const ActividadCard = ({
    actividad,
    onEdit,
    onDelete,
    onView,
    puedeEditar = false
}) => {
    const [imagenSeleccionada, setImagenSeleccionada] = useState(0);

    const siguienteImagen = (e) => {
        e.stopPropagation();
        setImagenSeleccionada(prev => prev < actividad.imagenes.length - 1 ? prev + 1 : 0);
    };

    const anteriorImagen = (e) => {
        e.stopPropagation();
        setImagenSeleccionada(prev => prev > 0 ? prev - 1 : actividad.imagenes.length - 1);
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                    {actividad.imagenes && actividad.imagenes.length > 0 ? (
                        <motion.img
                            key={imagenSeleccionada}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6 }}
                            src={API_BASE_URL + actividad.imagenes[imagenSeleccionada].imagen_url}
                            alt={actividad.titulo}
                            className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-1000"
                            onClick={() => onView?.(actividad.id)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                            <ImageIcon size={40} strokeWidth={1.5} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Sin Imagen</span>
                        </div>
                    )}
                </AnimatePresence>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Image Navigation */}
                {actividad.imagenes?.length > 1 && (
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={anteriorImagen} className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-slate-900 transition-all">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={siguienteImagen} className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-slate-900 transition-all">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                        <Calendar size={10} className="text-primary" />
                        {ActividadesAdaptador.formatFecha(actividad.fechaCreacion)}
                    </div>
                    {actividad.imagenes?.length > 0 && (
                        <div className="px-3 py-1 bg-primary/90 rounded-full text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-primary/20">
                            <ImageIcon size={10} />
                            {actividad.imagenes.length} {actividad.imagenes.length === 1 ? 'Foto' : 'Fotos'}
                        </div>
                    )}
                </div>

                {/* Top Action */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white hover:text-slate-900 transition-all">
                        <Share2 size={16} />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-4">
                <div className="space-y-2">
                    <h3 
                        onClick={() => onView?.(actividad.id)}
                        className="text-xl font-black text-slate-800 leading-tight group-hover:text-primary transition-colors cursor-pointer line-clamp-1 uppercase tracking-tight"
                    >
                        {actividad.titulo}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm line-clamp-2 leading-relaxed">
                        {actividad.descripcion}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <User size={14} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Publicado por</span>
                            <span className="text-[10px] font-bold text-slate-700">{actividad.creador?.nombre || 'Administrador'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {puedeEditar && (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => { e.stopPropagation(); onEdit(actividad); }}
                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-all border border-transparent hover:border-blue-100"
                                >
                                    <Edit3 size={16} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => { e.stopPropagation(); onDelete(actividad.id); }}
                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all border border-transparent hover:border-rose-100"
                                >
                                    <Trash2 size={16} />
                                </motion.button>
                            </>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onView?.(actividad.id)}
                            className="p-2.5 rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-200 transition-all"
                        >
                            <Eye size={16} />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Visual Indicator */}
            <div className="h-1.5 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
        </motion.div>
    );
};

export default ActividadCard;