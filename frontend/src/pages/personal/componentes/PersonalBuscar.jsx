import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Search,
    Filter,
    X,
    Users,
    Calendar,
    ChevronDown,
    Briefcase,
    ArrowUpDown,
    Clock,
    UserCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PersonalBuscar = ({
    onFilterChange,
    filters,
    totalPersonal,
    tipo
}) => {
    const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
    const [isExpanded, setIsExpanded] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        sexo: filters.sexo || 'todos',
        edadMin: filters.edadMin || '',
        edadMax: filters.edadMax || '',
        antiguedadMin: filters.antiguedadMin || '',
        antiguedadMax: filters.antiguedadMax || '',
        sortBy: filters.sortBy || 'nombreCompleto',
        order: filters.order || 'asc'
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange({ ...localFilters, searchQuery });
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleFilterChange = useCallback((key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFilterChange({ ...newFilters, searchQuery });
    }, [localFilters, searchQuery, onFilterChange]);

    const clearFilters = useCallback(() => {
        setSearchQuery('');
        const defaults = {
            sexo: 'todos',
            edadMin: '',
            edadMax: '',
            antiguedadMin: '',
            antiguedadMax: '',
            sortBy: 'nombreCompleto',
            order: 'asc'
        };
        setLocalFilters(defaults);
        onFilterChange({ ...defaults, searchQuery: '' });
    }, [onFilterChange]);

    const hasActiveFilters = useMemo(() => {
        return searchQuery ||
            localFilters.sexo !== 'todos' ||
            localFilters.edadMin ||
            localFilters.edadMax ||
            localFilters.antiguedadMin ||
            localFilters.antiguedadMax;
    }, [searchQuery, localFilters]);

    const getTipoLabel = () => {
        switch (tipo) {
            case 'docente': return 'docentes';
            case 'administrativo': return 'administrativos';
            case 'obrero': return 'obreros';
            default: return 'personal';
        }
    };

    return (
        <div className="w-full mb-8">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Buscar ${getTipoLabel()} por nombre, cédula o cargo...`}
                        className="w-full pl-14 pr-12 py-4 bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl font-bold text-slate-700 shadow-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none placeholder:text-slate-300"
                    />
                    <AnimatePresence>
                        {searchQuery && (
                            <motion.button 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => setSearchQuery('')} 
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                            >
                                <X size={16} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-sm ${isExpanded ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-100 hover:border-slate-200'}`}
                >
                    <Filter size={16} className={isExpanded ? 'text-primary' : 'text-slate-400'} />
                    <span>Filtros</span>
                    <ChevronDown size={14} className={`transition-transform duration-500 ease-out ${isExpanded ? 'rotate-180' : ''}`} />
                </motion.button>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-2">
                            {/* Sex Filter */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <Users size={12} /> Sexo
                                </label>
                                <div className="relative group">
                                    <select
                                        value={localFilters.sexo}
                                        onChange={(e) => handleFilterChange('sexo', e.target.value)}
                                        className="w-full pl-5 pr-10 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 appearance-none transition-all cursor-pointer group-hover:border-slate-200"
                                    >
                                        <option value="todos">Todos los sexos</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
                                </div>
                            </div>

                            {/* Age Range */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <Calendar size={12} /> Rango de Edad
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Mín"
                                        value={localFilters.edadMin}
                                        onChange={(e) => handleFilterChange('edadMin', e.target.value)}
                                        className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all hover:border-slate-200"
                                    />
                                    <span className="text-slate-300 font-black text-xl">-</span>
                                    <input
                                        type="number"
                                        placeholder="Máx"
                                        value={localFilters.edadMax}
                                        onChange={(e) => handleFilterChange('edadMax', e.target.value)}
                                        className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all hover:border-slate-200"
                                    />
                                </div>
                            </div>

                            {/* Tenure Range */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <Briefcase size={12} /> Antigüedad
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Mín"
                                        value={localFilters.antiguedadMin}
                                        onChange={(e) => handleFilterChange('antiguedadMin', e.target.value)}
                                        className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all hover:border-slate-200"
                                    />
                                    <span className="text-slate-300 font-black text-xl">-</span>
                                    <input
                                        type="number"
                                        placeholder="Máx"
                                        value={localFilters.antiguedadMax}
                                        onChange={(e) => handleFilterChange('antiguedadMax', e.target.value)}
                                        className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all hover:border-slate-200"
                                    />
                                </div>
                            </div>

                            {/* Sort By */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <ArrowUpDown size={12} /> Ordenar por
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1 group">
                                        <select
                                            value={localFilters.sortBy}
                                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                            className="w-full pl-5 pr-10 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 appearance-none transition-all cursor-pointer group-hover:border-slate-200"
                                        >
                                            <option value="nombreCompleto">Nombre</option>
                                            <option value="cedula">Cédula</option>
                                            <option value="edad">Edad</option>
                                            <option value="antiguedad">Antigüedad</option>
                                            <option value="cargo_voucher">Cargo</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleFilterChange('order', localFilters.order === 'desc' ? 'asc' : 'desc')}
                                        className="p-3.5 bg-white border border-slate-100 rounded-2xl text-primary hover:border-primary/30 transition-all shadow-sm"
                                    >
                                        <ArrowUpDown size={16} className={localFilters.order === 'desc' ? 'rotate-180' : ''} />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between mt-8 pb-4 border-t border-slate-50 pt-6 gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <AnimatePresence>
                                    {hasActiveFilters && (
                                        <motion.button 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            onClick={clearFilters}
                                            className="px-4 py-2 rounded-xl bg-rose-50 text-rose-500 border border-rose-100 text-[10px] font-black uppercase tracking-[0.15em] hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                        >
                                            Limpiar Filtros
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                            
                            <div className="bg-primary/5 px-5 py-2.5 rounded-2xl border border-primary/10 flex items-center gap-2">
                                <UserCircle2 size={14} className="text-primary" />
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                    Resultados: <span className="text-primary text-sm ml-1 font-black">{totalPersonal}</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PersonalBuscar;