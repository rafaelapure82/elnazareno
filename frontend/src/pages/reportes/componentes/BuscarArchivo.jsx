import React, { useState, useEffect } from 'react';
import { 
    Search, 
    Filter, 
    ArrowUpDown, 
    X, 
    ChevronDown, 
    FolderClosed,
    SortAsc
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BuscarArchivo = ({ onSearch, onFilterChange, filters }) => {
    const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
    const [isExpanded, setIsExpanded] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        categoria: filters.categoria || 'todos',
        sortBy: filters.sortBy || 'fechaSubida',
        order: filters.order || 'desc'
    });

    useEffect(() => {
        setSearchQuery(filters.searchQuery || '');
        setLocalFilters({
            categoria: filters.categoria || 'todos',
            sortBy: filters.sortBy || 'fechaSubida',
            order: filters.order || 'desc'
        });
    }, [filters]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch(value);
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        onSearch('');
    };

    const categorias = [
        { value: 'todos', label: 'Todas las categorías' },
        { value: 'general', label: 'General' },
        { value: 'reportes', label: 'Reportes' },
        { value: 'documentos', label: 'Documentos' },
        { value: 'imagenes', label: 'Imágenes' },
        { value: 'videos', label: 'Videos' },
        { value: 'audios', label: 'Audios' },
        { value: 'archivos', label: 'Archivos' }
    ];

    const sortOptions = [
        { value: 'fechaSubida', label: 'Fecha' },
        { value: 'nombre', label: 'Nombre' },
        { value: 'tamaño', label: 'Tamaño' }
    ];

    return (
        <div className="w-full mb-8">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Buscar por nombre, descripción o categoría..."
                        className="w-full pl-14 pr-12 py-4 bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl font-bold text-slate-700 shadow-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all outline-none placeholder:text-slate-300"
                    />
                    <AnimatePresence>
                        {searchQuery && (
                            <motion.button 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleClearSearch} 
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
                        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-2">
                            {/* Category Filter */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <FolderClosed size={12} /> Categoría
                                </label>
                                <div className="relative group">
                                    <select
                                        value={localFilters.categoria}
                                        onChange={(e) => handleFilterChange('categoria', e.target.value)}
                                        className="w-full pl-5 pr-10 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 appearance-none transition-all cursor-pointer group-hover:border-slate-200"
                                    >
                                        {categorias.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
                                </div>
                            </div>

                            {/* Sort By */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <SortAsc size={12} /> Ordenar por
                                </label>
                                <div className="relative group">
                                    <select
                                        value={localFilters.sortBy}
                                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                        className="w-full pl-5 pr-10 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 appearance-none transition-all cursor-pointer group-hover:border-slate-200"
                                    >
                                        {sortOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
                                </div>
                            </div>

                            {/* Order Direction */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <ArrowUpDown size={12} /> Dirección
                                </label>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleFilterChange('order', localFilters.order === 'desc' ? 'asc' : 'desc')}
                                    className="w-full flex items-center justify-between px-6 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-sm text-slate-700 hover:border-primary/20 transition-all shadow-sm"
                                >
                                    <span>{localFilters.order === 'desc' ? 'Descendente' : 'Ascendente'}</span>
                                    <ArrowUpDown size={16} className={`text-primary transition-transform duration-500 ${localFilters.order === 'desc' ? 'rotate-180' : ''}`} />
                                </motion.button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {(searchQuery || localFilters.categoria !== 'todos') && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="mt-6 flex flex-wrap gap-2 pb-2"
                                >
                                    {searchQuery && (
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-wider">
                                            <span>Búsqueda: {searchQuery}</span>
                                            <button onClick={handleClearSearch} className="hover:text-slate-900 transition-colors">
                                                <X size={12} />
                                            </button>
                                        </div>
                                    )}
                                    {localFilters.categoria !== 'todos' && (
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-wider">
                                            <span>Cat: {categorias.find(c => c.value === localFilters.categoria)?.label}</span>
                                            <button onClick={() => handleFilterChange('categoria', 'todos')} className="hover:text-slate-900 transition-colors">
                                                <X size={12} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BuscarArchivo;