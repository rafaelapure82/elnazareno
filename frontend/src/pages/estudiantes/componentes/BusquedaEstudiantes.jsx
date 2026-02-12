// import React, { useState } from 'react';
// import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
// import { useBusquedaEstudiantes } from '../hooks/useBusquedaEstudiantes';

// const BusquedaEstudiantes = ({ onSearch }) => {
//     const [query, setQuery] = useState('');
//     const [showAdvanced, setShowAdvanced] = useState(false);
//     const [advancedFilters, setAdvancedFilters] = useState({
//         tipoBusqueda: 'general'
//     });

//     const { loading } = useBusquedaEstudiantes();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (query.trim().length < 2 && !showAdvanced) {
//             return;
//         }

//         const filters = {
//             q: query.trim(),
//             ...(showAdvanced && advancedFilters)
//         };

//         onSearch(filters);
//     };

//     const handleAdvancedFilterChange = (field, value) => {
//         setAdvancedFilters(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     const clearFilters = () => {
//         setQuery('');
//         setAdvancedFilters({ tipoBusqueda: 'general' });
//         onSearch({ q: '' });
//     };

//     return (
//         <div className="bg-white shadow rounded-lg p-6 mb-6">
//             <form onSubmit={handleSubmit}>
//                 {/* Búsqueda rápida */}
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaSearch className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                         type="text"
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         placeholder="Buscar estudiantes por nombre, cédula, cédula escolar..."
//                         className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                     <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
//                         <button
//                             type="button"
//                             onClick={() => setShowAdvanced(!showAdvanced)}
//                             className="inline-flex items-center border border-gray-300 rounded px-2 text-sm font-sans font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <FaFilter className="h-4 w-4 mr-1" />
//                             Filtros
//                         </button>
//                     </div>
//                 </div>

//                 {/* Filtros avanzados */}
//                 {showAdvanced && (
//                     <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
//                         <div className="flex justify-between items-center mb-4">
//                             <h4 className="text-sm font-medium text-gray-700">Filtros Avanzados</h4>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowAdvanced(false)}
//                                 className="text-gray-400 hover:text-gray-500"
//                             >
//                                 <FaTimes className="h-5 w-5" />
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Tipo de Búsqueda
//                                 </label>
//                                 <select
//                                     value={advancedFilters.tipoBusqueda}
//                                     onChange={(e) => handleAdvancedFilterChange('tipoBusqueda', e.target.value)}
//                                     className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 >
//                                     <option value="general">General (Estudiante y Representante)</option>
//                                     <option value="estudiante">Solo Estudiante</option>
//                                     <option value="representante">Solo Representante</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Mostrar por página
//                                 </label>
//                                 <select
//                                     value={advancedFilters.limit || 10}
//                                     onChange={(e) => handleAdvancedFilterChange('limit', parseInt(e.target.value))}
//                                     className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 >
//                                     <option value="10">10 resultados</option>
//                                     <option value="25">25 resultados</option>
//                                     <option value="50">50 resultados</option>
//                                     <option value="100">100 resultados</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Botones de acción */}
//                 <div className="mt-4 flex justify-between">
//                     {(query || showAdvanced) && (
//                         <button
//                             type="button"
//                             onClick={clearFilters}
//                             className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                         >
//                             <FaTimes className="mr-2 h-4 w-4" />
//                             Limpiar filtros
//                         </button>
//                     )}

//                     <div className="flex space-x-3">
//                         <button
//                             type="submit"
//                             disabled={loading || (query.trim().length < 2 && !showAdvanced)}
//                             className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             {loading ? (
//                                 <>
//                                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                                     </svg>
//                                     Buscando...
//                                 </>
//                             ) : (
//                                 <>
//                                     <FaSearch className="mr-2 h-4 w-4" />
//                                     Buscar
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default BusquedaEstudiantes;


import React, { useState } from 'react';
import { FaSearch, FaTimes, FaFilter, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useBusquedaEstudiantes } from '../hooks/useBusquedaEstudiantes';

const BusquedaEstudiantes = ({ onSearch, onToggleAdvanced }) => {
    const [query, setQuery] = useState('');
    const [tipoBusqueda, setTipoBusqueda] = useState('general');
    const [showOptions, setShowOptions] = useState(false);

    const { loading } = useBusquedaEstudiantes();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim().length < 2 && query.trim() !== '') {
            return;
        }

        const filters = {
            q: query.trim(),
            tipoBusqueda
        };

        onSearch(filters);
    };

    const handleClear = () => {
        setQuery('');
        onSearch({ q: '' });
    };

    const handleTipoBusquedaChange = (tipo) => {
        setTipoBusqueda(tipo);
        if (query.trim().length >= 2) {
            onSearch({ q: query.trim(), tipoBusqueda: tipo });
        }
    };

    const getPlaceholder = () => {
        switch (tipoBusqueda) {
            case 'estudiante':
                return 'Buscar por nombre, apellido o cédula del estudiante...';
            case 'representante':
                return 'Buscar por nombre, apellido o cédula del representante...';
            default:
                return 'Buscar estudiantes o representantes por nombre, cédula, cédula escolar...';
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium text-gray-900">Buscar Estudiantes</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Encuentra rápidamente estudiantes o representantes
                    </p>
                </div>

                <div className="flex space-x-3">
                    <button
                        type="button"
                        onClick={onToggleAdvanced}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <FaFilter className="mr-2 h-4 w-4" />
                        Filtros Avanzados
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Barra de búsqueda principal */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={getPlaceholder()}
                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        {query && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="p-2 text-gray-400 hover:text-gray-500"
                            >
                                <FaTimes className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Opciones de búsqueda - Siempre visibles */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700">Opciones de búsqueda</h4>
                        <button
                            type="button"
                            onClick={() => setShowOptions(!showOptions)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            {showOptions ? <FaCaretUp className="h-4 w-4" /> : <FaCaretDown className="h-4 w-4" />}
                        </button>
                    </div>

                    {showOptions && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo de búsqueda
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleTipoBusquedaChange('general')}
                                        className={`px-4 py-2 text-sm font-medium rounded-md ${tipoBusqueda === 'general'
                                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                                            }`}
                                    >
                                        General
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTipoBusquedaChange('estudiante')}
                                        className={`px-4 py-2 text-sm font-medium rounded-md ${tipoBusqueda === 'estudiante'
                                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                                            }`}
                                    >
                                        Solo Estudiantes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTipoBusquedaChange('representante')}
                                        className={`px-4 py-2 text-sm font-medium rounded-md ${tipoBusqueda === 'representante'
                                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                                            }`}
                                    >
                                        Solo Representantes
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Cédula específica
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Ej: 12345678"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    onSearch({ cedula: e.target.value, tipoBusqueda: 'estudiante' });
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Cédula escolar
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Ej: CS123456"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    onSearch({ cedulaEscolar: e.target.value });
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Información de búsqueda */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                <span className="font-medium">Tip:</span> Puedes buscar por nombre completo, cédula, cédula escolar, teléfono o email. Mínimo 2 caracteres.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        {query ? (
                            <span>
                                Buscando: <span className="font-medium text-gray-700">"{query}"</span>
                                {tipoBusqueda !== 'general' && (
                                    <span className="ml-2">
                                        (Modo: {tipoBusqueda === 'estudiante' ? 'Estudiantes' : 'Representantes'})
                                    </span>
                                )}
                            </span>
                        ) : (
                            <span>Ingresa un término de búsqueda</span>
                        )}
                    </div>

                    <div className="flex space-x-3">
                        {query && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaTimes className="mr-2 h-4 w-4" />
                                Limpiar
                            </button>
                        )}

                        <button
                            type="submit"
                            disabled={loading || (query.trim().length < 2 && query.trim() !== '')}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Buscando...
                                </>
                            ) : (
                                <>
                                    <FaSearch className="mr-2 h-4 w-4" />
                                    Buscar Estudiantes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BusquedaEstudiantes;