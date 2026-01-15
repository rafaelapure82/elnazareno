import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';

const BuscarArchivo = ({ onSearch, onFilterChange, filters }) => {
    const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
    const [localFilters, setLocalFilters] = useState({
        categoria: filters.categoria || 'todos',
        sortBy: filters.sortBy || 'fechaSubida',
        order: filters.order || 'desc'
    });

    // Debounce para búsqueda
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         onSearch(searchQuery);
    //     }, 500);

    //     return () => clearTimeout(timer);
    // }, [searchQuery, onSearch]);
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
        onSearch(value);  // El padre maneja el debounce
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        onSearch('');  // También limpiar en el padre
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
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
                {/* Barra de búsqueda */}
                <div className="flex-1">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            onChange={handleSearchChange}
                            placeholder="Buscar archivos por nombre, descripción o categoría..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    {/* Filtro por categoría */}
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <select
                            value={localFilters.categoria}
                            onChange={(e) => handleFilterChange('categoria', e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                        >
                            {categorias.map(cat => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ordenar por */}
                    <div className="relative">
                        <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <select
                            value={localFilters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                        >
                            {sortOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Orden ascendente/descendente */}
                    <button
                        onClick={() => handleFilterChange('order', localFilters.order === 'desc' ? 'asc' : 'desc')}
                        className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                        {localFilters.order === 'desc' ? '↓' : '↑'}
                    </button>
                </div>
            </div>

            {/* Info de filtros activos */}
            {(searchQuery || localFilters.categoria !== 'todos') && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {searchQuery && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            Búsqueda: "{searchQuery}"
                            <button
                                onClick={handleClearSearch}
                                className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {localFilters.categoria !== 'todos' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            Categoría: {categorias.find(c => c.value === localFilters.categoria)?.label}
                            <button
                                onClick={() => handleFilterChange('categoria', 'todos')}
                                className="ml-2 text-green-600 hover:text-green-800"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default BuscarArchivo;