import React, { useState, useEffect } from 'react';
import {
    FaSearch, FaFilter, FaSort, FaUser, FaVenusMars,
    FaCalendarAlt, FaBriefcase, FaBuilding, FaTimes
} from 'react-icons/fa';

const PersonalBuscar = ({
    onFilterChange,
    filters,
    totalPersonal,
    tipo
}) => {
    const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
    const [localFilters, setLocalFilters] = useState({
        sexo: filters.sexo || 'todos',
        edadMin: filters.edadMin || '',
        edadMax: filters.edadMax || '',
        antiguedadMin: filters.antiguedadMin || '',
        antiguedadMax: filters.antiguedadMax || '',
        sortBy: filters.sortBy || 'nombreCompleto',
        order: filters.order || 'asc'
    });

    // Debounce para búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange({ searchQuery });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, onFilterChange]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const sexos = [
        { value: 'todos', label: 'Todos los sexos' },
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' },
        { value: 'otro', label: 'Otro' }
    ];

    const sortOptions = [
        { value: 'nombreCompleto', label: 'Nombre' },
        { value: 'cedula', label: 'Cédula' },
        { value: 'edad', label: 'Edad' },
        { value: 'antiguedad', label: 'Antigüedad' },
        { value: 'cargo_voucher', label: 'Cargo' },
        { value: 'fecha_ingreso_mppe', label: 'Fecha de ingreso' }
    ];

    const clearFilters = () => {
        setSearchQuery('');
        setLocalFilters({
            sexo: 'todos',
            edadMin: '',
            edadMax: '',
            antiguedadMin: '',
            antiguedadMax: '',
            sortBy: 'nombreCompleto',
            order: 'asc'
        });
        onFilterChange({
            searchQuery: '',
            sexo: 'todos',
            edadMin: '',
            edadMax: '',
            antiguedadMin: '',
            antiguedadMax: '',
            sortBy: 'nombreCompleto',
            order: 'asc'
        });
    };

    const hasActiveFilters = () => {
        return searchQuery ||
            localFilters.sexo !== 'todos' ||
            localFilters.edadMin ||
            localFilters.edadMax ||
            localFilters.antiguedadMin ||
            localFilters.antiguedadMax;
    };

    const getTipoLabel = () => {
        switch (tipo) {
            case 'docente': return 'docentes';
            case 'administrativo': return 'administrativos';
            case 'obrero': return 'obreros';
            default: return 'personal';
        }
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
                            placeholder={`Buscar ${getTipoLabel()} por nombre, cédula, cargo o dependencia...`}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap gap-4">
                    {/* Filtro por sexo */}
                    <div className="relative">
                        <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <select
                            value={localFilters.sexo}
                            onChange={(e) => handleFilterChange('sexo', e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                        >
                            {sexos.map(sexo => (
                                <option key={sexo.value} value={sexo.value}>
                                    {sexo.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro por edad mínima */}
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="number"
                            min="18"
                            max="80"
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
                            min="18"
                            max="80"
                            value={localFilters.edadMax}
                            onChange={(e) => handleFilterChange('edadMax', e.target.value)}
                            placeholder="Edad máx"
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-24"
                        />
                    </div>

                    {/* Filtro por antigüedad mínima */}
                    <div className="relative">
                        <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="number"
                            min="0"
                            max="50"
                            value={localFilters.antiguedadMin}
                            onChange={(e) => handleFilterChange('antiguedadMin', e.target.value)}
                            placeholder="Ant. mín"
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-24"
                        />
                    </div>

                    {/* Filtro por antigüedad máxima */}
                    <div className="relative">
                        <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="number"
                            min="0"
                            max="50"
                            value={localFilters.antiguedadMax}
                            onChange={(e) => handleFilterChange('antiguedadMax', e.target.value)}
                            placeholder="Ant. máx"
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-24"
                        />
                    </div>
                </div>
            </div>

            {/* Filtros adicionales */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 mt-4">
                {/* Ordenar por */}
                <div className="flex items-center space-x-4">
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
                </div>

                {/* Limpiar filtros */}
                {hasActiveFilters() && (
                    <button
                        onClick={clearFilters}
                        className="px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                    >
                        <FaTimes className="h-4 w-4 mr-1" />
                        Limpiar filtros
                    </button>
                )}
            </div>

            {/* Info de filtros activos y total */}
            <div className="mt-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">{totalPersonal}</span> {getTipoLabel()} encontrado{totalPersonal !== 1 ? 's' : ''}
                    </div>

                    {hasActiveFilters() && (
                        <div className="flex flex-wrap gap-2">
                            {searchQuery && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                    Búsqueda: "{searchQuery}"
                                </span>
                            )}
                            {localFilters.sexo !== 'todos' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                    <FaVenusMars className="h-3 w-3 mr-1" />
                                    {sexos.find(s => s.value === localFilters.sexo)?.label}
                                </span>
                            )}
                            {(localFilters.edadMin || localFilters.edadMax) && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                                    <FaCalendarAlt className="h-3 w-3 mr-1" />
                                    Edad: {localFilters.edadMin || '18'}-{localFilters.edadMax || '80'} años
                                </span>
                            )}
                            {(localFilters.antiguedadMin || localFilters.antiguedadMax) && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                                    <FaBriefcase className="h-3 w-3 mr-1" />
                                    Antigüedad: {localFilters.antiguedadMin || '0'}-{localFilters.antiguedadMax || '50'} años
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalBuscar;