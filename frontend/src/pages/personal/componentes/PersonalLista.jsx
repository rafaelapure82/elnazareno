import React from 'react';
import {
    User,
    Phone,
    Mail,
    Fingerprint,
    Calendar,
    Briefcase,
    Building2,
    Trash2,
    Edit3,
    Eye,
    GraduationCap,
    UserCog,
    HardHat,
    Loader2,
    CheckCircle2,
    MoreHorizontal,
    Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalAdaptador } from '../adaptadores/personal.adaptador';

const PersonalLista = ({
    personal,
    loading,
    tipo,
    onEdit,
    onDelete,
    onView,
    onSelect,
    selectedIds = []
}) => {
    const getTipoIcon = (tipoPersonal) => {
        switch (tipoPersonal) {
            case 'docente': return GraduationCap;
            case 'administrativo': return UserCog;
            case 'obrero': return HardHat;
            default: return User;
        }
    };

    const getTipoColor = (tipoPersonal) => {
        const colors = PersonalAdaptador.getColorByTipo(tipoPersonal);
        return colors;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleRowClick = (personaId, e) => {
        if (e.target.type === 'checkbox' ||
            e.target.closest('button') ||
            e.target.tagName === 'A') {
            return;
        }
        if (onSelect) {
            onSelect(personaId);
        }
    };

    if (loading) {
        return (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Sincronizando Nómina...</p>
            </div>
        );
    }

    if (personal.length === 0) {
        const EmptyIcon = getTipoIcon(tipo);
        return (
            <div className="p-20 text-center flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 ring-8 ring-slate-50/50">
                    <EmptyIcon size={48} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">No hay {tipo}s</h3>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto mt-2">La base de datos de personal para esta categoría está vacía actualmente.</p>
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
                            <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personal</th>
                            <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contacto</th>
                            <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Laboral</th>
                            <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Detalles</th>
                            <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        <AnimatePresence mode="popLayout">
                            {personal.map((persona, idx) => {
                                const TipoIcon = getTipoIcon(persona.tipo);
                                const tipoColors = getTipoColor(persona.tipo);
                                const isSelected = selectedIds.includes(persona.id);

                                return (
                                    <motion.tr
                                        key={persona.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.03 }}
                                        onClick={(e) => handleRowClick(persona.id, e)}
                                        className={`group cursor-pointer transition-all duration-200 ${isSelected ? 'bg-primary/5 shadow-inner' : 'hover:bg-slate-50/80'}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${isSelected ? 'bg-primary border-primary text-white' : 'border-slate-200 group-hover:border-primary/50'}`}>
                                                {isSelected && <CheckCircle2 size={14} />}
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ring-4 ring-white shadow-sm transition-transform group-hover:scale-110 ${tipoColors.bg} ${tipoColors.text}`}>
                                                    <TipoIcon size={20} />
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-black tracking-tight transition-colors ${isSelected ? 'text-primary' : 'text-slate-800'}`}>
                                                        {persona.nombreCompleto}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                                                        <Fingerprint size={10} />
                                                        {persona.cedula}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                    <Phone size={12} className="text-slate-300" />
                                                    {persona.telefono}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                                    <Mail size={12} className="text-slate-300" />
                                                    {persona.correo}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Briefcase size={12} className="text-primary/60" />
                                                    <span className="text-xs font-black text-slate-700 truncate max-w-[150px]" title={persona.cargo_voucher}>
                                                        {persona.cargo_voucher}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Building2 size={12} className="text-slate-300" />
                                                    <span className="text-[10px] font-bold text-slate-400 truncate max-w-[150px]" title={persona.dependencia}>
                                                        {persona.dependencia}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="text-center">
                                                    <div className="text-xs font-black text-slate-700">{persona.edad}</div>
                                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Edad</div>
                                                </div>
                                                <div className="h-6 w-px bg-slate-100" />
                                                <div className="text-center">
                                                    <div className="text-xs font-black text-primary">{persona.antiguedad || 0}</div>
                                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Años</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => { e.stopPropagation(); onView?.(persona); }}
                                                    className="p-2 rounded-xl bg-white text-blue-500 shadow-sm border border-slate-100 hover:bg-blue-50 transition-colors"
                                                    title="Ver Detalle"
                                                >
                                                    <Eye size={16} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => { e.stopPropagation(); onEdit?.(persona); }}
                                                    className="p-2 rounded-xl bg-white text-emerald-500 shadow-sm border border-slate-100 hover:bg-emerald-50 transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit3 size={16} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => { e.stopPropagation(); onDelete?.(persona.id); }}
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
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        {personal.length} {tipo}s registrados
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

export default PersonalLista;