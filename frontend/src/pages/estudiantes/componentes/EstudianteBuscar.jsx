import React, { useState, useEffect } from 'react';
import {
    FaSearch, FaFilter, FaSort, FaUser, FaVenusMars,
    FaCalendarAlt, FaTimes
} from 'react-icons/fa';

const EstudianteBuscar = ({
    onSearch,
    onFilterChange,
    filters,
    totalEstudiantes
}) => {
    const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
    const [localFilters, setLocalFilters] = useState({
        genero: filters.genero || 'todos',
        edadMin: filters.edadMin || '',
        edadMax: filters.edadMax || '',
        sortBy: filters.sortBy || 'nombreCompleto',
        order: filters.order || 'asc'
    });

    // Debounce para búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, onSearch]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const generos = [
        { value: 'todos', label: 'Todos los géneros' },
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Femenino', label: 'Femenino' },
        { value: 'Otro', label: 'Otro' }
    ];

    const sortOptions = [
        { value: 'nombreCompleto', label: 'Nombre' },
        { value: 'edad', label: 'Edad' },
        { value: 'created_at', label: 'Fecha de registro' }
    ];

    const clearFilters = () => {
        setSearchQuery('');
        setLocalFilters({
            genero: 'todos',
            edadMin: '',
            edadMax: '',
            sortBy: 'nombreCompleto',
            order: 'asc'
        });
        onSearch('');
        onFilterChange({
            genero: 'todos',
            edadMin: '',
            edadMax: '',
            sortBy: 'nombreCompleto',
            order: 'asc'
        });
    };

    const hasActiveFilters = () => {
        return searchQuery ||
            localFilters.genero !== 'todos' ||
            localFilters.edadMin ||
            localFilters.edadMax;
    };

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
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar por nombre, cédula o cédula escolar..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    {/* Filtro por género */}
                    <div className="relative">
                        <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <select
                            value={localFilters.genero}
                            onChange={(e) => handleFilterChange('genero', e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                        >
                            {generos.map(genero => (
                                <option key={genero.value} value={genero.value}>
                                    {genero.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro por edad mínima */}
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="number"
                            min="3"
                            max="30"
                            value={localFilters.edadMin}
                            onChange={(e) => handleFilterChange('edadMin', e.target.value)}
                            placeholder="Edad mín"
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-24"
                        />
                    </div>

                    {/* Filtro por edad máxima */}
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="number"
                            min="3"
                            max="30"
                            value={localFilters.edadMax}
                            onChange={(e) => handleFilterChange('edadMax', e.target.value)}
                            placeholder="Edad máx"
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-24"
                        />
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
                        title={localFilters.order === 'desc' ? 'Orden descendente' : 'Orden ascendente'}
                    >
                        {localFilters.order === 'desc' ? '↓' : '↑'}
                    </button>

                    {/* Limpiar filtros */}
                    {hasActiveFilters() && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                        >
                            <FaTimes className="h-4 w-4 mr-1" />
                            Limpiar
                        </button>
                    )}
                </div>
            </div>

            {/* Info de filtros activos y total */}
            <div className="mt-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">{totalEstudiantes}</span> estudiante{totalEstudiantes !== 1 ? 's' : ''} encontrado{totalEstudiantes !== 1 ? 's' : ''}
                    </div>

                    {(hasActiveFilters()) && (
                        <div className="flex flex-wrap gap-2">
                            {searchQuery && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    Búsqueda: "{searchQuery}"
                                </span>
                            )}
                            {localFilters.genero !== 'todos' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                    <FaVenusMars className="h-3 w-3 mr-1" />
                                    {generos.find(g => g.value === localFilters.genero)?.label}
                                </span>
                            )}
                            {(localFilters.edadMin || localFilters.edadMax) && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                                    <FaCalendarAlt className="h-3 w-3 mr-1" />
                                    Edad: {localFilters.edadMin || '3'}-{localFilters.edadMax || '30'} años
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EstudianteBuscar;