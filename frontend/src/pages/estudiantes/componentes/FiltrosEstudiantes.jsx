import React, { useState } from 'react';
import { FaFilter, FaTimes, FaCalendarAlt, FaVenusMars, FaFlag } from 'react-icons/fa';
import { ESTADOS_VENEZUELA, NACIONALIDADES, GENEROS } from '../utils/constants';

const FiltrosEstudiantes = ({ onApplyFilters, onReset }) => {
    const [filters, setFilters] = useState({
        genero: '',
        nacionalidad: '',
        estado: '',
        fechaDesde: '',
        fechaHasta: ''
    });

    const [showFilters, setShowFilters] = useState({
        genero: true,
        nacionalidad: true,
        direccion: true,
        fecha: true
    });

    const handleChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleApply = () => {
        // Filtrar solo los campos que tienen valor
        const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value && value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});

        onApplyFilters(activeFilters);
    };

    const handleReset = () => {
        setFilters({
            genero: '',
            nacionalidad: '',
            estado: '',
            fechaDesde: '',
            fechaHasta: ''
        });
        onReset();
    };

    const toggleFilterSection = (section) => {
        setShowFilters(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getActiveFilterCount = () => {
        return Object.values(filters).filter(value => value && value !== '').length;
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <FaFilter className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Filtros Avanzados</h3>
                    {getActiveFilterCount() > 0 && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getActiveFilterCount()} activo{getActiveFilterCount() !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <FaTimes className="mr-2 h-4 w-4" />
                        Limpiar
                    </button>
                    <button
                        onClick={handleApply}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Género */}
                <div className="border border-gray-200 rounded-lg">
                    <button
                        onClick={() => toggleFilterSection('genero')}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-t-lg"
                    >
                        <div className="flex items-center">
                            <FaVenusMars className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="font-medium text-gray-900">Género</span>
                        </div>
                        <span className="text-gray-500">
                            {showFilters.genero ? '▼' : '▶'}
                        </span>
                    </button>

                    {showFilters.genero && (
                        <div className="p-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {GENEROS.map((genero) => (
                                    <label key={genero.value} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="genero"
                                            checked={filters.genero === genero.value}
                                            onChange={() => handleChange('genero', genero.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{genero.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Nacionalidad */}
                <div className="border border-gray-200 rounded-lg">
                    <button
                        onClick={() => toggleFilterSection('nacionalidad')}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-t-lg"
                    >
                        <div className="flex items-center">
                            <FaFlag className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="font-medium text-gray-900">Nacionalidad</span>
                        </div>
                        <span className="text-gray-500">
                            {showFilters.nacionalidad ? '▼' : '▶'}
                        </span>
                    </button>

                    {showFilters.nacionalidad && (
                        <div className="p-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <div className="col-span-full mb-2">
                                    <input
                                        type="text"
                                        placeholder="Buscar nacionalidad..."
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={(e) => {
                                            const searchTerm = e.target.value.toLowerCase();
                                            // Podrías implementar búsqueda en tiempo real aquí
                                        }}
                                    />
                                </div>
                                <div className="col-span-full max-h-60 overflow-y-auto">
                                    <select
                                        value={filters.nacionalidad}
                                        onChange={(e) => handleChange('nacionalidad', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="">Todas las nacionalidades</option>
                                        {NACIONALIDADES.map((nacionalidad) => (
                                            <option key={nacionalidad} value={nacionalidad}>
                                                {nacionalidad}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Dirección - Estado */}
                <div className="border border-gray-200 rounded-lg">
                    <button
                        onClick={() => toggleFilterSection('direccion')}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-t-lg"
                    >
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium text-gray-900">Ubicación</span>
                        </div>
                        <span className="text-gray-500">
                            {showFilters.direccion ? '▼' : '▶'}
                        </span>
                    </button>

                    {showFilters.direccion && (
                        <div className="p-4 border-t border-gray-200">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Estado
                                    </label>
                                    <select
                                        value={filters.estado}
                                        onChange={(e) => handleChange('estado', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="">Todos los estados</option>
                                        {ESTADOS_VENEZUELA.map((estado) => (
                                            <option key={estado} value={estado}>
                                                {estado}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Fecha de Nacimiento */}
                <div className="border border-gray-200 rounded-lg">
                    <button
                        onClick={() => toggleFilterSection('fecha')}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-t-lg"
                    >
                        <div className="flex items-center">
                            <FaCalendarAlt className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="font-medium text-gray-900">Fecha de Nacimiento</span>
                        </div>
                        <span className="text-gray-500">
                            {showFilters.fecha ? '▼' : '▶'}
                        </span>
                    </button>

                    {showFilters.fecha && (
                        <div className="p-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Desde
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.fechaDesde}
                                        onChange={(e) => handleChange('fechaDesde', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Hasta
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.fechaHasta}
                                        onChange={(e) => handleChange('fechaHasta', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            {filters.fechaDesde || filters.fechaHasta ? (
                                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                                    <p className="text-sm text-blue-800">
                                        {filters.fechaDesde && filters.fechaHasta
                                            ? `Nacidos entre ${new Date(filters.fechaDesde).toLocaleDateString('es-ES')} y ${new Date(filters.fechaHasta).toLocaleDateString('es-ES')}`
                                            : filters.fechaDesde
                                                ? `Nacidos después de ${new Date(filters.fechaDesde).toLocaleDateString('es-ES')}`
                                                : `Nacidos antes de ${new Date(filters.fechaHasta).toLocaleDateString('es-ES')}`
                                        }
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>

            {/* Resumen de filtros activos */}
            {getActiveFilterCount() > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Filtros aplicados:</h4>
                    <div className="flex flex-wrap gap-2">
                        {filters.genero && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Género: {GENEROS.find(g => g.value === filters.genero)?.label}
                                <button
                                    onClick={() => handleChange('genero', '')}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.nacionalidad && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Nacionalidad: {filters.nacionalidad}
                                <button
                                    onClick={() => handleChange('nacionalidad', '')}
                                    className="ml-2 text-green-600 hover:text-green-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.estado && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Estado: {filters.estado}
                                <button
                                    onClick={() => handleChange('estado', '')}
                                    className="ml-2 text-purple-600 hover:text-purple-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.fechaDesde && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Desde: {new Date(filters.fechaDesde).toLocaleDateString('es-ES')}
                                <button
                                    onClick={() => handleChange('fechaDesde', '')}
                                    className="ml-2 text-yellow-600 hover:text-yellow-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.fechaHasta && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Hasta: {new Date(filters.fechaHasta).toLocaleDateString('es-ES')}
                                <button
                                    onClick={() => handleChange('fechaHasta', '')}
                                    className="ml-2 text-red-600 hover:text-red-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FiltrosEstudiantes;