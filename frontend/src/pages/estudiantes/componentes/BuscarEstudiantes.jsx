// import React, { useState, useEffect } from 'react';
// import {
//     FaSearch, FaFilter, FaSort, FaUser, FaVenusMars,
//     FaCalendarAlt, FaIdCard, FaSchool, FaTimes, FaSortUp, FaSortDown,
//     FaPhone, FaMapMarkerAlt, FaUserFriends, FaFlag, FaTint
// } from 'react-icons/fa';
// import { GENEROS, NACIONALIDADES, TIPOS_SANGRE, ESTADOS_VENEZUELA } from '../utils/constants';

// const BuscarEstudiantes = ({
//     onFilterChange,
//     filters,
//     totalEstudiantes
// }) => {
//     // const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
//     // const [localFilters, setLocalFilters] = useState({
//     //     genero: filters.genero || 'todos',
//     //     nacionalidad: filters.nacionalidad || 'todos',
//     //     tipoSangre: filters.tipoSangre || 'todos',
//     //     estado: filters.estado || 'todos',
//     //     edadMin: filters.edadMin || '',
//     //     edadMax: filters.edadMax || '',
//     //     tieneCedula: filters.tieneCedula || 'todos',
//     //     sortBy: filters.sortBy || 'apellidos',
//     //     order: filters.order || 'asc',
//     //     tipoBusqueda: filters.tipoBusqueda || 'general'
//     // });
//     const [searchQuery, setSearchQuery] = useState('');
//     const [localFilters, setLocalFilters] = useState({
//         genero: 'todos',
//         nacionalidad: 'todos',
//         tipoSangre: 'todos',
//         estado: 'todos',
//         edadMin: '',
//         edadMax: '',
//         tieneCedula: 'todos',
//         sortBy: 'apellidos',
//         order: 'asc',
//         tipoBusqueda: 'general'
//     });


//     // Debounce para búsqueda
//     // useEffect(() => {
//     //     const timer = setTimeout(() => {
//     //         onFilterChange({ searchQuery });
//     //     }, 500);

//     //     return () => clearTimeout(timer);
//     // }, [searchQuery, onFilterChange]);

//     useEffect(() => {
//         if (filters.searchQuery !== undefined) {
//             setSearchQuery(filters.searchQuery);
//         }
//         setLocalFilters(prev => ({
//             ...prev,
//             genero: filters.genero || 'todos',
//             nacionalidad: filters.nacionalidad || 'todos',
//             tipoSangre: filters.tipoSangre || 'todos',
//             estado: filters.estado || 'todos',
//             edadMin: filters.edadMin || '',
//             edadMax: filters.edadMax || '',
//             tieneCedula: filters.tieneCedula || 'todos',
//             sortBy: filters.sortBy || 'apellidos',
//             order: filters.order || 'asc',
//             tipoBusqueda: filters.tipoBusqueda || 'general'
//         }));
//     }, []); // Solo al montar el componente

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             onFilterChange({
//                 ...localFilters,
//                 searchQuery
//             });
//         }, 500);

//         return () => clearTimeout(timer);
//     }, [searchQuery]); // Solo dependencia de searchQuery


//     useEffect(() => {
//         onFilterChange({
//             ...localFilters,
//             searchQuery
//         });
//     }, [
//         localFilters.genero,
//         localFilters.nacionalidad,
//         localFilters.tipoSangre,
//         localFilters.estado,
//         localFilters.edadMin,
//         localFilters.edadMax,
//         localFilters.tieneCedula,
//         localFilters.sortBy,
//         localFilters.order,
//         localFilters.tipoBusqueda
//     ]);


//     // const handleFilterChange = (key, value) => {
//     //     const newFilters = { ...localFilters, [key]: value };
//     //     setLocalFilters(newFilters);
//     //     onFilterChange(newFilters);
//     // };

//     const handleFilterChange = (key, value) => {
//         setLocalFilters(prev => ({
//             ...prev,
//             [key]: value
//         }));
//     };

//     const handleSortChange = () => {
//         const newOrder = localFilters.order === 'asc' ? 'desc' : 'asc';
//         handleFilterChange('order', newOrder);
//     };

//     const clearFilters = () => {
//         setSearchQuery('');
//         setLocalFilters({
//             genero: 'todos',
//             nacionalidad: 'todos',
//             tipoSangre: 'todos',
//             estado: 'todos',
//             edadMin: '',
//             edadMax: '',
//             tieneCedula: 'todos',
//             sortBy: 'apellidos',
//             order: 'asc',
//             tipoBusqueda: 'general'
//         });
//         onFilterChange({
//             searchQuery: '',
//             genero: 'todos',
//             nacionalidad: 'todos',
//             tipoSangre: 'todos',
//             estado: 'todos',
//             edadMin: '',
//             edadMax: '',
//             tieneCedula: 'todos',
//             sortBy: 'apellidos',
//             order: 'asc',
//             tipoBusqueda: 'general'
//         });
//     };

//     const hasActiveFilters = () => {
//         return searchQuery ||
//             localFilters.genero !== 'todos' ||
//             localFilters.nacionalidad !== 'todos' ||
//             localFilters.tipoSangre !== 'todos' ||
//             localFilters.estado !== 'todos' ||
//             localFilters.edadMin ||
//             localFilters.edadMax ||
//             localFilters.tieneCedula !== 'todos' ||
//             localFilters.tipoBusqueda !== 'general';
//     };

//     const getTipoBusquedaLabel = () => {
//         switch (localFilters.tipoBusqueda) {
//             case 'estudiante': return 'Estudiantes';
//             case 'representante': return 'Representantes';
//             default: return 'General';
//         }
//     };

//     const sortOptions = [
//         { value: 'apellidos', label: 'Apellidos', icon: FaUser },
//         { value: 'nombres', label: 'Nombres', icon: FaUser },
//         { value: 'cedula_escolar', label: 'Cédula Escolar', icon: FaSchool },
//         { value: 'cedula', label: 'Cédula', icon: FaIdCard },
//         { value: 'fecha_nacimiento', label: 'Fecha Nacimiento', icon: FaCalendarAlt },
//         { value: 'genero', label: 'Género', icon: FaVenusMars },
//         { value: 'created_at', label: 'Fecha Registro', icon: FaCalendarAlt }
//     ];

//     const tipoBusquedaOptions = [
//         { value: 'general', label: 'Búsqueda General', icon: FaSearch },
//         { value: 'estudiante', label: 'Solo Estudiantes', icon: FaUser },
//         { value: 'representante', label: 'Solo Representantes', icon: FaUserFriends }
//     ];

//     const tieneCedulaOptions = [
//         { value: 'todos', label: 'Todos' },
//         { value: 'si', label: 'Con Cédula' },
//         { value: 'no', label: 'Sin Cédula' }
//     ];

//     return (
//         <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
//             {/* Fila 1: Búsqueda principal y Tipo de búsqueda */}
//             <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-6">
//                 {/* Barra de búsqueda principal */}
//                 <div className="flex-1">
//                     <div className="relative">
//                         <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             placeholder="Buscar por nombre, cédula, cédula escolar, teléfono o email..."
//                             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                         />
//                         {searchQuery && (
//                             <button
//                                 onClick={() => setSearchQuery('')}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                             >
//                                 <FaTimes className="h-4 w-4" />
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Tipo de búsqueda */}
//                 <div className="relative">
//                     <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.tipoBusqueda}
//                         onChange={(e) => handleFilterChange('tipoBusqueda', e.target.value)}
//                         className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[180px]"
//                     >
//                         {tipoBusquedaOptions.map(opt => (
//                             <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Fila 2: Filtros principales */}
//             <div className="flex flex-wrap gap-3 mb-6">
//                 {/* Género */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.genero}
//                         onChange={(e) => handleFilterChange('genero', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todos los géneros</option>
//                         {GENEROS.map(genero => (
//                             <option key={genero.value} value={genero.value}>
//                                 {genero.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Nacionalidad */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.nacionalidad}
//                         onChange={(e) => handleFilterChange('nacionalidad', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todas las nacionalidades</option>
//                         {NACIONALIDADES.map(nacionalidad => (
//                             <option key={nacionalidad} value={nacionalidad}>
//                                 {nacionalidad}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Estado */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.estado}
//                         onChange={(e) => handleFilterChange('estado', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todos los estados</option>
//                         {ESTADOS_VENEZUELA.map(estado => (
//                             <option key={estado} value={estado}>
//                                 {estado}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Tipo de sangre */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaTint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.tipoSangre}
//                         onChange={(e) => handleFilterChange('tipoSangre', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todos los tipos de sangre</option>
//                         {TIPOS_SANGRE.map(tipo => (
//                             <option key={tipo} value={tipo}>
//                                 {tipo}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Tiene cédula */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.tieneCedula}
//                         onChange={(e) => handleFilterChange('tieneCedula', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         {tieneCedulaOptions.map(opt => (
//                             <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Fila 3: Edad y Ordenamiento */}
//             <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-4">
//                 <div className="flex flex-wrap items-center gap-4">
//                     {/* Edad mínima */}
//                     <div className="relative">
//                         <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                         <input
//                             type="number"
//                             min="3"
//                             max="30"
//                             value={localFilters.edadMin}
//                             onChange={(e) => handleFilterChange('edadMin', e.target.value)}
//                             placeholder="Edad mín"
//                             className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 text-sm"
//                         />
//                         <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
//                             años
//                         </span>
//                     </div>

//                     {/* Edad máxima */}
//                     <div className="relative">
//                         <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                         <input
//                             type="number"
//                             min="3"
//                             max="30"
//                             value={localFilters.edadMax}
//                             onChange={(e) => handleFilterChange('edadMax', e.target.value)}
//                             placeholder="Edad máx"
//                             className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 text-sm"
//                         />
//                         <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
//                             años
//                         </span>
//                     </div>

//                     <div className="text-gray-400">|</div>

//                     {/* Ordenar por */}
//                     <div className="relative">
//                         <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                         <select
//                             value={localFilters.sortBy}
//                             onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                             className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[160px]"
//                         >
//                             {sortOptions.map(opt => (
//                                 <option key={opt.value} value={opt.value}>
//                                     Ordenar por {opt.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Botón de orden ascendente/descendente */}
//                     <button
//                         onClick={handleSortChange}
//                         className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
//                         title={localFilters.order === 'desc' ? 'Orden descendente' : 'Orden ascendente'}
//                     >
//                         {localFilters.order === 'desc' ? (
//                             <FaSortDown className="h-4 w-4 text-gray-600" />
//                         ) : (
//                             <FaSortUp className="h-4 w-4 text-gray-600" />
//                         )}
//                     </button>
//                 </div>

//                 {/* Limpiar filtros */}
//                 {hasActiveFilters() && (
//                     <button
//                         onClick={clearFilters}
//                         className="px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
//                     >
//                         <FaTimes className="h-4 w-4 mr-2" />
//                         Limpiar filtros
//                     </button>
//                 )}
//             </div>

//             {/* Info de filtros activos y total */}
//             <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="flex flex-wrap items-center justify-between gap-2">
//                     <div className="text-sm text-gray-600">
//                         <span className="font-medium text-gray-900">{totalEstudiantes}</span> estudiante{totalEstudiantes !== 1 ? 's' : ''} encontrado{totalEstudiantes !== 1 ? 's' : ''}
//                         {localFilters.tipoBusqueda !== 'general' && (
//                             <span className="ml-2 text-blue-600">
//                                 (Búsqueda: {getTipoBusquedaLabel()})
//                             </span>
//                         )}
//                     </div>

//                     {hasActiveFilters() && (
//                         <div className="flex flex-wrap gap-2">
//                             {searchQuery && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
//                                     <FaSearch className="h-3 w-3 mr-1" />
//                                     "{searchQuery}"
//                                 </span>
//                             )}
//                             {localFilters.genero !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
//                                     <FaVenusMars className="h-3 w-3 mr-1" />
//                                     {GENEROS.find(g => g.value === localFilters.genero)?.label}
//                                 </span>
//                             )}
//                             {localFilters.nacionalidad !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                                     <FaFlag className="h-3 w-3 mr-1" />
//                                     {localFilters.nacionalidad}
//                                 </span>
//                             )}
//                             {localFilters.estado !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
//                                     <FaMapMarkerAlt className="h-3 w-3 mr-1" />
//                                     {localFilters.estado}
//                                 </span>
//                             )}
//                             {localFilters.tipoSangre !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-800">
//                                     <FaTint className="h-3 w-3 mr-1" />
//                                     {localFilters.tipoSangre}
//                                 </span>
//                             )}
//                             {localFilters.tieneCedula !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
//                                     <FaIdCard className="h-3 w-3 mr-1" />
//                                     {localFilters.tieneCedula === 'si' ? 'Con cédula' : 'Sin cédula'}
//                                 </span>
//                             )}
//                             {(localFilters.edadMin || localFilters.edadMax) && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-pink-100 text-pink-800">
//                                     <FaCalendarAlt className="h-3 w-3 mr-1" />
//                                     Edad: {localFilters.edadMin || '3'}-{localFilters.edadMax || '30'} años
//                                 </span>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BuscarEstudiantes;

//!OPCION VIEJAAA


// import React, { useState, useEffect } from 'react';
// import {
//     FaSearch, FaFilter, FaSort, FaUser, FaVenusMars,
//     FaCalendarAlt, FaIdCard, FaSchool, FaTimes, FaSortUp, FaSortDown,
//     FaMapMarkerAlt, FaUserFriends, FaFlag, FaTint
// } from 'react-icons/fa';
// import { GENEROS, NACIONALIDADES, TIPOS_SANGRE, ESTADOS_VENEZUELA } from '../utils/constants';

// const BuscarEstudiantes = ({
//     onFilterChange,
//     filters,
//     totalEstudiantes
// }) => {
//     const [searchQuery, setSearchQuery] = useState(filters?.searchQuery || '');
//     const [localFilters, setLocalFilters] = useState({
//         genero: filters?.genero || 'todos',
//         nacionalidad: filters?.nacionalidad || 'todos',
//         tipoSangre: filters?.tipoSangre || 'todos',
//         estado: filters?.estado || 'todos',
//         edadMin: filters?.edadMin || '',
//         edadMax: filters?.edadMax || '',
//         tieneCedula: filters?.tieneCedula || 'todos',
//         sortBy: filters?.sortBy || 'apellidos',
//         order: filters?.order || 'asc',
//         tipoBusqueda: filters?.tipoBusqueda || 'general'
//     });

//     useEffect(() => {
//         if (filters) {
//             setSearchQuery(filters.searchQuery || '');
//             setLocalFilters({
//                 genero: filters.genero || 'todos',
//                 nacionalidad: filters.nacionalidad || 'todos',
//                 tipoSangre: filters.tipoSangre || 'todos',
//                 estado: filters.estado || 'todos',
//                 edadMin: filters.edadMin || '',
//                 edadMax: filters.edadMax || '',
//                 tieneCedula: filters.tieneCedula || 'todos',
//                 sortBy: filters.sortBy || 'apellidos',
//                 order: filters.order || 'asc',
//                 tipoBusqueda: filters.tipoBusqueda || 'general'
//             });
//         }
//     }, [filters]);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             onFilterChange({
//                 ...localFilters,
//                 searchQuery
//             });
//         }, 500);

//         return () => clearTimeout(timer);
//     }, [searchQuery]);

//     useEffect(() => {
//         onFilterChange({
//             ...localFilters,
//             searchQuery
//         });
//     }, [
//         localFilters.genero,
//         localFilters.nacionalidad,
//         localFilters.tipoSangre,
//         localFilters.estado,
//         localFilters.edadMin,
//         localFilters.edadMax,
//         localFilters.tieneCedula,
//         localFilters.sortBy,
//         localFilters.order,
//         localFilters.tipoBusqueda
//     ]);

//     const handleFilterChange = (key, value) => {
//         setLocalFilters(prev => ({
//             ...prev,
//             [key]: value
//         }));
//     };

//     const handleSortChange = () => {
//         const newOrder = localFilters.order === 'asc' ? 'desc' : 'asc';
//         handleFilterChange('order', newOrder);
//     };

//     const clearFilters = () => {
//         const defaultFilters = {
//             genero: 'todos',
//             nacionalidad: 'todos',
//             tipoSangre: 'todos',
//             estado: 'todos',
//             edadMin: '',
//             edadMax: '',
//             tieneCedula: 'todos',
//             sortBy: 'apellidos',
//             order: 'asc',
//             tipoBusqueda: 'general'
//         };
//         setSearchQuery('');
//         setLocalFilters(defaultFilters);
//         onFilterChange({
//             ...defaultFilters,
//             searchQuery: ''
//         });
//     };

//     const hasActiveFilters = () => {
//         return searchQuery ||
//             localFilters.genero !== 'todos' ||
//             localFilters.nacionalidad !== 'todos' ||
//             localFilters.tipoSangre !== 'todos' ||
//             localFilters.estado !== 'todos' ||
//             localFilters.edadMin ||
//             localFilters.edadMax ||
//             localFilters.tieneCedula !== 'todos' ||
//             localFilters.tipoBusqueda !== 'general';
//     };

//     const getTipoBusquedaLabel = () => {
//         switch (localFilters.tipoBusqueda) {
//             case 'estudiante': return 'Estudiantes';
//             case 'representante': return 'Representantes';
//             default: return 'General';
//         }
//     };

//     const sortOptions = [
//         { value: 'apellidos', label: 'Apellidos', icon: FaUser },
//         { value: 'nombres', label: 'Nombres', icon: FaUser },
//         { value: 'cedula_escolar', label: 'Cédula Escolar', icon: FaSchool },
//         { value: 'cedula', label: 'Cédula', icon: FaIdCard },
//         { value: 'fecha_nacimiento', label: 'Fecha Nacimiento', icon: FaCalendarAlt },
//         { value: 'genero', label: 'Género', icon: FaVenusMars },
//         { value: 'created_at', label: 'Fecha Registro', icon: FaCalendarAlt }
//     ];

//     const tipoBusquedaOptions = [
//         { value: 'general', label: 'Búsqueda General', icon: FaSearch },
//         { value: 'estudiante', label: 'Solo Estudiantes', icon: FaUser },
//         { value: 'representante', label: 'Solo Representantes', icon: FaUserFriends }
//     ];

//     const tieneCedulaOptions = [
//         { value: 'todos', label: 'Todos' },
//         { value: 'si', label: 'Con Cédula' },
//         { value: 'no', label: 'Sin Cédula' }
//     ];

//     return (
//         <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
//             {/* Fila 1: Búsqueda principal y Tipo de búsqueda */}
//             <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-6">
//                 {/* Barra de búsqueda principal */}
//                 <div className="flex-1">
//                     <div className="relative">
//                         <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             placeholder="Buscar por nombre, cédula, cédula escolar, teléfono o email..."
//                             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                         />
//                         {searchQuery && (
//                             <button
//                                 onClick={() => setSearchQuery('')}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                             >
//                                 <FaTimes className="h-4 w-4" />
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Tipo de búsqueda */}
//                 <div className="relative">
//                     <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.tipoBusqueda}
//                         onChange={(e) => handleFilterChange('tipoBusqueda', e.target.value)}
//                         className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[180px]"
//                     >
//                         {tipoBusquedaOptions.map(opt => (
//                             <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Fila 2: Filtros principales */}
//             <div className="flex flex-wrap gap-3 mb-6">
//                 {/* Género */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.genero}
//                         onChange={(e) => handleFilterChange('genero', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todos los géneros</option>
//                         {GENEROS.map(genero => (
//                             <option key={genero.value} value={genero.value}>
//                                 {genero.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Nacionalidad */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.nacionalidad}
//                         onChange={(e) => handleFilterChange('nacionalidad', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todas las nacionalidades</option>
//                         {NACIONALIDADES.map(nacionalidad => (
//                             <option key={nacionalidad} value={nacionalidad}>
//                                 {nacionalidad}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Estado */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.estado}
//                         onChange={(e) => handleFilterChange('estado', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todos los estados</option>
//                         {ESTADOS_VENEZUELA.map(estado => (
//                             <option key={estado} value={estado}>
//                                 {estado}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Tipo de sangre */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaTint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.tipoSangre}
//                         onChange={(e) => handleFilterChange('tipoSangre', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todos los tipos de sangre</option>
//                         {TIPOS_SANGRE.map(tipo => (
//                             <option key={tipo} value={tipo}>
//                                 {tipo}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Tiene cédula */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.tieneCedula}
//                         onChange={(e) => handleFilterChange('tieneCedula', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         {tieneCedulaOptions.map(opt => (
//                             <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Fila 3: Edad y Ordenamiento */}
//             <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-4">
//                 <div className="flex flex-wrap items-center gap-4">
//                     {/* Edad mínima */}
//                     <div className="relative">
//                         <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                         <input
//                             type="number"
//                             min="3"
//                             max="30"
//                             value={localFilters.edadMin}
//                             onChange={(e) => handleFilterChange('edadMin', e.target.value)}
//                             placeholder="Edad mín"
//                             className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 text-sm"
//                         />
//                         <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
//                             años
//                         </span>
//                     </div>

//                     {/* Edad máxima */}
//                     <div className="relative">
//                         <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                         <input
//                             type="number"
//                             min="3"
//                             max="30"
//                             value={localFilters.edadMax}
//                             onChange={(e) => handleFilterChange('edadMax', e.target.value)}
//                             placeholder="Edad máx"
//                             className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 text-sm"
//                         />
//                         <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
//                             años
//                         </span>
//                     </div>

//                     <div className="text-gray-400">|</div>

//                     {/* Ordenar por */}
//                     <div className="relative">
//                         <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                         <select
//                             value={localFilters.sortBy}
//                             onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                             className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[160px]"
//                         >
//                             {sortOptions.map(opt => (
//                                 <option key={opt.value} value={opt.value}>
//                                     Ordenar por {opt.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Botón de orden ascendente/descendente */}
//                     <button
//                         onClick={handleSortChange}
//                         className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
//                         title={localFilters.order === 'desc' ? 'Orden descendente' : 'Orden ascendente'}
//                     >
//                         {localFilters.order === 'desc' ? (
//                             <FaSortDown className="h-4 w-4 text-gray-600" />
//                         ) : (
//                             <FaSortUp className="h-4 w-4 text-gray-600" />
//                         )}
//                     </button>
//                 </div>

//                 {/* Limpiar filtros */}
//                 {hasActiveFilters() && (
//                     <button
//                         onClick={clearFilters}
//                         className="px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
//                     >
//                         <FaTimes className="h-4 w-4 mr-2" />
//                         Limpiar filtros
//                     </button>
//                 )}
//             </div>

//             {/* Info de filtros activos y total */}
//             <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="flex flex-wrap items-center justify-between gap-2">
//                     <div className="text-sm text-gray-600">
//                         <span className="font-medium text-gray-900">{totalEstudiantes}</span> estudiante{totalEstudiantes !== 1 ? 's' : ''} encontrado{totalEstudiantes !== 1 ? 's' : ''}
//                         {localFilters.tipoBusqueda !== 'general' && (
//                             <span className="ml-2 text-blue-600">
//                                 (Búsqueda: {getTipoBusquedaLabel()})
//                             </span>
//                         )}
//                     </div>

//                     {hasActiveFilters() && (
//                         <div className="flex flex-wrap gap-2">
//                             {searchQuery && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
//                                     <FaSearch className="h-3 w-3 mr-1" />
//                                     "{searchQuery}"
//                                 </span>
//                             )}
//                             {localFilters.genero !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
//                                     <FaVenusMars className="h-3 w-3 mr-1" />
//                                     {GENEROS.find(g => g.value === localFilters.genero)?.label}
//                                 </span>
//                             )}
//                             {localFilters.nacionalidad !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                                     <FaFlag className="h-3 w-3 mr-1" />
//                                     {localFilters.nacionalidad}
//                                 </span>
//                             )}
//                             {localFilters.estado !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
//                                     <FaMapMarkerAlt className="h-3 w-3 mr-1" />
//                                     {localFilters.estado}
//                                 </span>
//                             )}
//                             {localFilters.tipoSangre !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-800">
//                                     <FaTint className="h-3 w-3 mr-1" />
//                                     {localFilters.tipoSangre}
//                                 </span>
//                             )}
//                             {localFilters.tieneCedula !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
//                                     <FaIdCard className="h-3 w-3 mr-1" />
//                                     {localFilters.tieneCedula === 'si' ? 'Con cédula' : 'Sin cédula'}
//                                 </span>
//                             )}
//                             {(localFilters.edadMin || localFilters.edadMax) && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-pink-100 text-pink-800">
//                                     <FaCalendarAlt className="h-3 w-3 mr-1" />
//                                     Edad: {localFilters.edadMin || '3'}-{localFilters.edadMax || '30'} años
//                                 </span>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BuscarEstudiantes;

//!aaaaaaaaaa

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
//     FaSearch, FaFilter, FaSort, FaUser, FaVenusMars,
//     FaCalendarAlt, FaIdCard, FaSchool, FaTimes, FaSortUp, FaSortDown,
//     FaMapMarkerAlt, FaUserFriends, FaFlag, FaTint
// } from 'react-icons/fa';
// import { GENEROS, NACIONALIDADES, TIPOS_SANGRE, ESTADOS_VENEZUELA } from '../utils/constants';

// const BuscarEstudiantes = ({
//     onFilterChange,
//     filters,
//     totalEstudiantes
// }) => {
//     // Estados locales
//     const [searchQuery, setSearchQuery] = useState(filters?.searchQuery || '');
//     const [localFilters, setLocalFilters] = useState({
//         genero: filters?.genero || 'todos',
//         nacionalidad: filters?.nacionalidad || 'todos',
//         tipoSangre: filters?.tipoSangre || 'todos',
//         estado: filters?.estado || 'todos',
//         edadMin: filters?.edadMin || '',
//         edadMax: filters?.edadMax || '',
//         tieneCedula: filters?.tieneCedula || 'todos',
//         sortBy: filters?.sortBy || 'apellidos',
//         order: filters?.order || 'asc',
//         tipoBusqueda: filters?.tipoBusqueda || 'general'
//     });

//     // 🔥 Sincronizar con filtros del padre - SOLO cuando cambian realmente
//     useEffect(() => {
//         if (!filters) return;

//         setSearchQuery(prev => filters.searchQuery ?? prev);

//         setLocalFilters(prev => ({
//             genero: filters.genero ?? prev.genero,
//             nacionalidad: filters.nacionalidad ?? prev.nacionalidad,
//             tipoSangre: filters.tipoSangre ?? prev.tipoSangre,
//             estado: filters.estado ?? prev.estado,
//             edadMin: filters.edadMin ?? prev.edadMin,
//             edadMax: filters.edadMax ?? prev.edadMax,
//             tieneCedula: filters.tieneCedula ?? prev.tieneCedula,
//             sortBy: filters.sortBy ?? prev.sortBy,
//             order: filters.order ?? prev.order,
//             tipoBusqueda: filters.tipoBusqueda ?? prev.tipoBusqueda
//         }));
//     }, [filters?.searchQuery, filters?.genero, filters?.nacionalidad, filters?.tipoSangre,
//     filters?.estado, filters?.edadMin, filters?.edadMax, filters?.tieneCedula,
//     filters?.sortBy, filters?.order, filters?.tipoBusqueda]);

//     // 🔥 FUNCIÓN PARA CONVERTIR EDAD A FECHA - Memoizada
//     const convertirEdadAFecha = useCallback((edad, tipo) => {
//         if (!edad) return null;
//         const fecha = new Date();

//         if (tipo === 'max') {
//             fecha.setFullYear(fecha.getFullYear() - parseInt(edad));
//             fecha.setMonth(0);
//             fecha.setDate(1);
//         } else {
//             fecha.setFullYear(fecha.getFullYear() - parseInt(edad));
//             fecha.setMonth(11);
//             fecha.setDate(31);
//         }

//         return fecha.toISOString().split('T')[0];
//     }, []);

//     // 🔥 DEBOUNCE manual para búsqueda
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             enviarFiltros();
//         }, 500);

//         return () => clearTimeout(timer);
//     }, [searchQuery]);

//     // 🔥 ENVIAR FILTROS - Optimizado con useCallback
//     const enviarFiltros = useCallback(() => {
//         const filtrosParaEnviar = {
//             searchQuery,
//             genero: localFilters.genero,
//             nacionalidad: localFilters.nacionalidad,
//             tipoSangre: localFilters.tipoSangre,
//             estado: localFilters.estado,
//             edadMin: localFilters.edadMin,
//             edadMax: localFilters.edadMax,
//             tieneCedula: localFilters.tieneCedula,
//             sortBy: localFilters.sortBy,
//             order: localFilters.order,
//             tipoBusqueda: localFilters.tipoBusqueda
//         };

//         if (localFilters.edadMin || localFilters.edadMax) {
//             if (localFilters.edadMax) {
//                 filtrosParaEnviar.fecha_nacimiento_desde = convertirEdadAFecha(localFilters.edadMax, 'max');
//             }
//             if (localFilters.edadMin) {
//                 filtrosParaEnviar.fecha_nacimiento_hasta = convertirEdadAFecha(localFilters.edadMin, 'min');
//             }
//         }

//         onFilterChange(filtrosParaEnviar);
//     }, [searchQuery, localFilters, convertirEdadAFecha, onFilterChange]);

//     // 🔥 Efecto separado para filtros que NO son búsqueda
//     useEffect(() => {
//         // No enviar si solo cambió la búsqueda (eso lo maneja el debounce)
//         enviarFiltros();
//     }, [
//         localFilters.genero,
//         localFilters.nacionalidad,
//         localFilters.tipoSangre,
//         localFilters.estado,
//         localFilters.edadMin,
//         localFilters.edadMax,
//         localFilters.tieneCedula,
//         localFilters.sortBy,
//         localFilters.order,
//         localFilters.tipoBusqueda
//     ]);

//     // 🔥 Handlers optimizados
//     const handleFilterChange = useCallback((key, value) => {
//         setLocalFilters(prev => ({
//             ...prev,
//             [key]: value
//         }));
//     }, []);

//     const handleSortChange = useCallback(() => {
//         setLocalFilters(prev => ({
//             ...prev,
//             order: prev.order === 'asc' ? 'desc' : 'asc'
//         }));
//     }, []);

//     const handleSearchChange = useCallback((e) => {
//         setSearchQuery(e.target.value);
//     }, []);

//     const handleClearSearch = useCallback(() => {
//         setSearchQuery('');
//     }, []);

//     const clearFilters = useCallback(() => {
//         const defaultFilters = {
//             genero: 'todos',
//             nacionalidad: 'todos',
//             tipoSangre: 'todos',
//             estado: 'todos',
//             edadMin: '',
//             edadMax: '',
//             tieneCedula: 'todos',
//             sortBy: 'apellidos',
//             order: 'asc',
//             tipoBusqueda: 'general'
//         };
//         setSearchQuery('');
//         setLocalFilters(defaultFilters);

//         onFilterChange({
//             ...defaultFilters,
//             searchQuery: ''
//         });
//     }, [onFilterChange]);

//     // 🔥 Computed values memoizados
//     const hasActiveFilters = useMemo(() => {
//         return searchQuery ||
//             localFilters.genero !== 'todos' ||
//             localFilters.nacionalidad !== 'todos' ||
//             localFilters.tipoSangre !== 'todos' ||
//             localFilters.estado !== 'todos' ||
//             localFilters.edadMin ||
//             localFilters.edadMax ||
//             localFilters.tieneCedula !== 'todos' ||
//             localFilters.tipoBusqueda !== 'general';
//     }, [searchQuery, localFilters]);

//     const getTipoBusquedaLabel = useCallback(() => {
//         switch (localFilters.tipoBusqueda) {
//             case 'estudiante': return 'Estudiantes';
//             case 'representante': return 'Representantes';
//             default: return 'General';
//         }
//     }, [localFilters.tipoBusqueda]);

//     // 🔥 Opciones de selects - Memoizadas
//     const sortOptions = useMemo(() => [
//         { value: 'apellidos', label: 'Apellidos', icon: FaUser },
//         { value: 'nombres', label: 'Nombres', icon: FaUser },
//         { value: 'cedula_escolar', label: 'Cédula Escolar', icon: FaSchool },
//         { value: 'cedula', label: 'Cédula', icon: FaIdCard },
//         { value: 'fecha_nacimiento', label: 'Fecha Nacimiento', icon: FaCalendarAlt },
//         { value: 'genero', label: 'Género', icon: FaVenusMars },
//         { value: 'created_at', label: 'Fecha Registro', icon: FaCalendarAlt }
//     ], []);

//     const tipoBusquedaOptions = useMemo(() => [
//         { value: 'general', label: 'Búsqueda General', icon: FaSearch },
//         { value: 'estudiante', label: 'Solo Estudiantes', icon: FaUser },
//         { value: 'representante', label: 'Solo Representantes', icon: FaUserFriends }
//     ], []);

//     const tieneCedulaOptions = useMemo(() => [
//         { value: 'todos', label: 'Todos' },
//         { value: 'si', label: 'Con Cédula' },
//         { value: 'no', label: 'Sin Cédula' }
//     ], []);

//     return (
//         <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
//             {/* Fila 1: Búsqueda principal y Tipo de búsqueda */}
//             <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-6">
//                 {/* Barra de búsqueda principal */}
//                 <div className="flex-1">
//                     <div className="relative">
//                         <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             placeholder="Buscar por nombre, cédula, cédula escolar, teléfono o email..."
//                             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                         />
//                         {searchQuery && (
//                             <button
//                                 onClick={handleClearSearch}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                             >
//                                 <FaTimes className="h-4 w-4" />
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Tipo de búsqueda */}
//                 <div className="relative">
//                     <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.tipoBusqueda}
//                         onChange={(e) => handleFilterChange('tipoBusqueda', e.target.value)}
//                         className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[180px]"
//                     >
//                         {tipoBusquedaOptions.map(opt => (
//                             <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Fila 2: Filtros principales */}
//             <div className="flex flex-wrap gap-3 mb-6">
//                 {/* Género */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.genero}
//                         onChange={(e) => handleFilterChange('genero', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todos los géneros</option>
//                         {GENEROS.map(genero => (
//                             <option key={genero.value} value={genero.value}>
//                                 {genero.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Nacionalidad */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.nacionalidad}
//                         onChange={(e) => handleFilterChange('nacionalidad', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todas las nacionalidades</option>
//                         {NACIONALIDADES.map(nacionalidad => (
//                             <option key={nacionalidad} value={nacionalidad}>
//                                 {nacionalidad}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Estado */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.estado}
//                         onChange={(e) => handleFilterChange('estado', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todos los estados</option>
//                         {ESTADOS_VENEZUELA.map(estado => (
//                             <option key={estado} value={estado}>
//                                 {estado}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Tipo de sangre */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaTint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.tipoSangre}
//                         onChange={(e) => handleFilterChange('tipoSangre', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         <option value="todos">Todos los tipos de sangre</option>
//                         {TIPOS_SANGRE.map(tipo => (
//                             <option key={tipo} value={tipo}>
//                                 {tipo}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Tiene cédula */}
//                 <div className="relative flex-1 min-w-[150px]">
//                     <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                     <select
//                         value={localFilters.tieneCedula}
//                         onChange={(e) => handleFilterChange('tieneCedula', e.target.value)}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
//                     >
//                         {tieneCedulaOptions.map(opt => (
//                             <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Fila 3: Edad y Ordenamiento */}
//             <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-4">
//                 <div className="flex flex-wrap items-center gap-4">
//                     {/* Edad mínima */}
//                     <div className="relative">
//                         <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                         <input
//                             type="number"
//                             min="3"
//                             max="30"
//                             value={localFilters.edadMin}
//                             onChange={(e) => handleFilterChange('edadMin', e.target.value)}
//                             placeholder="Edad mín"
//                             className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 text-sm"
//                         />
//                         <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
//                             años
//                         </span>
//                     </div>

//                     {/* Edad máxima */}
//                     <div className="relative">
//                         <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                         <input
//                             type="number"
//                             min="3"
//                             max="30"
//                             value={localFilters.edadMax}
//                             onChange={(e) => handleFilterChange('edadMax', e.target.value)}
//                             placeholder="Edad máx"
//                             className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 text-sm"
//                         />
//                         <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
//                             años
//                         </span>
//                     </div>

//                     <div className="text-gray-400">|</div>

//                     {/* Ordenar por */}
//                     <div className="relative">
//                         <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                         <select
//                             value={localFilters.sortBy}
//                             onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                             className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[160px]"
//                         >
//                             {sortOptions.map(opt => (
//                                 <option key={opt.value} value={opt.value}>
//                                     Ordenar por {opt.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Botón de orden ascendente/descendente */}
//                     <button
//                         onClick={handleSortChange}
//                         className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
//                         title={localFilters.order === 'desc' ? 'Orden descendente' : 'Orden ascendente'}
//                     >
//                         {localFilters.order === 'desc' ? (
//                             <FaSortDown className="h-4 w-4 text-gray-600" />
//                         ) : (
//                             <FaSortUp className="h-4 w-4 text-gray-600" />
//                         )}
//                     </button>
//                 </div>

//                 {/* Limpiar filtros */}
//                 {hasActiveFilters && (
//                     <button
//                         onClick={clearFilters}
//                         className="px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
//                     >
//                         <FaTimes className="h-4 w-4 mr-2" />
//                         Limpiar filtros
//                     </button>
//                 )}
//             </div>

//             {/* Info de filtros activos y total */}
//             <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="flex flex-wrap items-center justify-between gap-2">
//                     <div className="text-sm text-gray-600">
//                         <span className="font-medium text-gray-900">{totalEstudiantes}</span> estudiante{totalEstudiantes !== 1 ? 's' : ''} encontrado{totalEstudiantes !== 1 ? 's' : ''}
//                         {localFilters.tipoBusqueda !== 'general' && (
//                             <span className="ml-2 text-blue-600">
//                                 (Búsqueda: {getTipoBusquedaLabel()})
//                             </span>
//                         )}
//                     </div>

//                     {hasActiveFilters && (
//                         <div className="flex flex-wrap gap-2">
//                             {searchQuery && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
//                                     <FaSearch className="h-3 w-3 mr-1" />
//                                     "{searchQuery}"
//                                 </span>
//                             )}
//                             {localFilters.genero !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
//                                     <FaVenusMars className="h-3 w-3 mr-1" />
//                                     {GENEROS.find(g => g.value === localFilters.genero)?.label}
//                                 </span>
//                             )}
//                             {localFilters.nacionalidad !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                                     <FaFlag className="h-3 w-3 mr-1" />
//                                     {localFilters.nacionalidad}
//                                 </span>
//                             )}
//                             {localFilters.estado !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
//                                     <FaMapMarkerAlt className="h-3 w-3 mr-1" />
//                                     {localFilters.estado}
//                                 </span>
//                             )}
//                             {localFilters.tipoSangre !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-800">
//                                     <FaTint className="h-3 w-3 mr-1" />
//                                     {localFilters.tipoSangre}
//                                 </span>
//                             )}
//                             {localFilters.tieneCedula !== 'todos' && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
//                                     <FaIdCard className="h-3 w-3 mr-1" />
//                                     {localFilters.tieneCedula === 'si' ? 'Con cédula' : 'Sin cédula'}
//                                 </span>
//                             )}
//                             {(localFilters.edadMin || localFilters.edadMax) && (
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-pink-100 text-pink-800">
//                                     <FaCalendarAlt className="h-3 w-3 mr-1" />
//                                     Edad: {localFilters.edadMin || '3'}-{localFilters.edadMax || '30'} años
//                                 </span>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BuscarEstudiantes;



import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    FaSearch, FaFilter, FaSort, FaUser, FaVenusMars,
    FaCalendarAlt, FaIdCard, FaSchool, FaTimes, FaSortUp, FaSortDown,
    FaMapMarkerAlt, FaUserFriends, FaFlag, FaTint
} from 'react-icons/fa';
import { GENEROS, NACIONALIDADES, TIPOS_SANGRE, ESTADOS_VENEZUELA } from '../utils/constants';

const BuscarEstudiantes = ({
    onFilterChange,
    filters,
    totalEstudiantes
}) => {
    // Estados locales
    const [searchQuery, setSearchQuery] = useState(filters?.searchQuery || '');
    const [localFilters, setLocalFilters] = useState({
        genero: filters?.genero || 'todos',
        nacionalidad: filters?.nacionalidad || 'todos',
        tipoSangre: filters?.tipoSangre || 'todos',
        estado: filters?.estado || 'todos',
        // 🔥 VALORES POR DEFECTO: edadMin = 0, edadMax = 30
        edadMin: filters?.edadMin !== undefined ? filters.edadMin : '0',
        edadMax: filters?.edadMax !== undefined ? filters.edadMax : '30',
        tieneCedula: filters?.tieneCedula || 'todos',
        sortBy: filters?.sortBy || 'apellidos',
        order: filters?.order || 'asc',
        tipoBusqueda: filters?.tipoBusqueda || 'general'
    });

    // Sincronizar con filtros del padre
    useEffect(() => {
        if (!filters) return;

        setSearchQuery(prev => filters.searchQuery ?? prev);

        setLocalFilters(prev => ({
            genero: filters.genero ?? prev.genero,
            nacionalidad: filters.nacionalidad ?? prev.nacionalidad,
            tipoSangre: filters.tipoSangre ?? prev.tipoSangre,
            estado: filters.estado ?? prev.estado,
            // 🔥 MANTENER VALORES POR DEFECTO si el padre envía undefined
            edadMin: filters.edadMin !== undefined ? filters.edadMin : prev.edadMin,
            edadMax: filters.edadMax !== undefined ? filters.edadMax : prev.edadMax,
            tieneCedula: filters.tieneCedula ?? prev.tieneCedula,
            sortBy: filters.sortBy ?? prev.sortBy,
            order: filters.order ?? prev.order,
            tipoBusqueda: filters.tipoBusqueda ?? prev.tipoBusqueda
        }));
    }, [filters?.searchQuery, filters?.genero, filters?.nacionalidad, filters?.tipoSangre,
    filters?.estado, filters?.edadMin, filters?.edadMax, filters?.tieneCedula,
    filters?.sortBy, filters?.order, filters?.tipoBusqueda]);

    // FUNCIÓN PARA CONVERTIR EDAD A FECHA
    const convertirEdadAFecha = useCallback((edad, tipo) => {
        if (!edad && edad !== 0) return null;
        const fecha = new Date();

        if (tipo === 'max') {
            // Edad MÁXIMA = fecha MÁS ANTIGUA
            fecha.setFullYear(fecha.getFullYear() - parseInt(edad));
            fecha.setMonth(0);
            fecha.setDate(1);
        } else {
            // Edad MÍNIMA = fecha MÁS RECIENTE
            fecha.setFullYear(fecha.getFullYear() - parseInt(edad));
            fecha.setMonth(11);
            fecha.setDate(31);
        }

        return fecha.toISOString().split('T')[0];
    }, []);

    // DEBOUNCE para búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            enviarFiltros();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // ENVIAR FILTROS
    const enviarFiltros = useCallback(() => {
        const filtrosParaEnviar = {
            searchQuery,
            genero: localFilters.genero,
            nacionalidad: localFilters.nacionalidad,
            tipoSangre: localFilters.tipoSangre,
            estado: localFilters.estado,
            // 🔥 ENVIAR SIEMPRE LOS VALORES DE EDAD (0 y 30 por defecto)
            edadMin: localFilters.edadMin || '0',
            edadMax: localFilters.edadMax || '30',
            tieneCedula: localFilters.tieneCedula,
            sortBy: localFilters.sortBy,
            order: localFilters.order,
            tipoBusqueda: localFilters.tipoBusqueda
        };

        // 🔥 SIEMPRE convertir edades a fechas (con valores por defecto)
        filtrosParaEnviar.fecha_nacimiento_desde = convertirEdadAFecha(localFilters.edadMax || '30', 'max');
        filtrosParaEnviar.fecha_nacimiento_hasta = convertirEdadAFecha(localFilters.edadMin || '0', 'min');

        onFilterChange(filtrosParaEnviar);
    }, [searchQuery, localFilters, convertirEdadAFecha, onFilterChange]);

    // Efecto para filtros que NO son búsqueda
    useEffect(() => {
        enviarFiltros();
    }, [
        localFilters.genero,
        localFilters.nacionalidad,
        localFilters.tipoSangre,
        localFilters.estado,
        localFilters.edadMin,
        localFilters.edadMax,
        localFilters.tieneCedula,
        localFilters.sortBy,
        localFilters.order,
        localFilters.tipoBusqueda
    ]);

    // Handlers
    const handleFilterChange = useCallback((key, value) => {
        setLocalFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const handleSortChange = useCallback(() => {
        setLocalFilters(prev => ({
            ...prev,
            order: prev.order === 'asc' ? 'desc' : 'asc'
        }));
    }, []);

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);

    const clearFilters = useCallback(() => {
        const defaultFilters = {
            genero: 'todos',
            nacionalidad: 'todos',
            tipoSangre: 'todos',
            estado: 'todos',
            // 🔥 VALORES POR DEFECTO AL LIMPIAR
            edadMin: '0',
            edadMax: '30',
            tieneCedula: 'todos',
            sortBy: 'apellidos',
            order: 'asc',
            tipoBusqueda: 'general'
        };
        setSearchQuery('');
        setLocalFilters(defaultFilters);

        onFilterChange({
            ...defaultFilters,
            searchQuery: ''
        });
    }, [onFilterChange]);

    // Computed values
    const hasActiveFilters = useMemo(() => {
        return searchQuery ||
            localFilters.genero !== 'todos' ||
            localFilters.nacionalidad !== 'todos' ||
            localFilters.tipoSangre !== 'todos' ||
            localFilters.estado !== 'todos' ||
            // 🔥 IGNORAR LOS VALORES POR DEFECTO PARA EL INDICADOR
            (localFilters.edadMin !== '0' && localFilters.edadMin !== '') ||
            (localFilters.edadMax !== '30' && localFilters.edadMax !== '') ||
            localFilters.tieneCedula !== 'todos' ||
            localFilters.tipoBusqueda !== 'general';
    }, [searchQuery, localFilters]);

    const getTipoBusquedaLabel = useCallback(() => {
        switch (localFilters.tipoBusqueda) {
            case 'estudiante': return 'Estudiantes';
            case 'representante': return 'Representantes';
            default: return 'General';
        }
    }, [localFilters.tipoBusqueda]);

    // Opciones de selects
    const sortOptions = useMemo(() => [
        { value: 'apellidos', label: 'Apellidos', icon: FaUser },
        { value: 'nombres', label: 'Nombres', icon: FaUser },
        { value: 'cedula_escolar', label: 'Cédula Escolar', icon: FaSchool },
        { value: 'cedula', label: 'Cédula', icon: FaIdCard },
        { value: 'fecha_nacimiento', label: 'Fecha Nacimiento', icon: FaCalendarAlt },
        { value: 'genero', label: 'Género', icon: FaVenusMars },
        { value: 'created_at', label: 'Fecha Registro', icon: FaCalendarAlt }
    ], []);

    const tipoBusquedaOptions = useMemo(() => [
        { value: 'general', label: 'Búsqueda General', icon: FaSearch },
        { value: 'estudiante', label: 'Solo Estudiantes', icon: FaUser },
        { value: 'representante', label: 'Solo Representantes', icon: FaUserFriends }
    ], []);

    const tieneCedulaOptions = useMemo(() => [
        { value: 'todos', label: 'Todos' },
        { value: 'si', label: 'Con Cédula' },
        { value: 'no', label: 'Sin Cédula' }
    ], []);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            {/* Fila 1: Búsqueda principal y Tipo de búsqueda */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-6">
                {/* Barra de búsqueda principal */}
                <div className="flex-1">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Buscar por nombre, cédula, cédula escolar, teléfono o email..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <FaTimes className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Tipo de búsqueda */}
                <div className="relative">
                    <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                        value={localFilters.tipoBusqueda}
                        onChange={(e) => handleFilterChange('tipoBusqueda', e.target.value)}
                        className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[180px]"
                    >
                        {tipoBusquedaOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Fila 2: Filtros principales */}
            <div className="flex flex-wrap gap-3 mb-6">
                {/* Género */}
                <div className="relative flex-1 min-w-[150px]">
                    <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                        value={localFilters.genero}
                        onChange={(e) => handleFilterChange('genero', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                    >
                        <option value="todos">Todos los géneros</option>
                        {GENEROS.map(genero => (
                            <option key={genero.value} value={genero.value}>
                                {genero.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Nacionalidad */}
                <div className="relative flex-1 min-w-[150px]">
                    <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                        value={localFilters.nacionalidad}
                        onChange={(e) => handleFilterChange('nacionalidad', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                    >
                        <option value="todos">Todas las nacionalidades</option>
                        {NACIONALIDADES.map(nacionalidad => (
                            <option key={nacionalidad} value={nacionalidad}>
                                {nacionalidad}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Estado */}
                <div className="relative flex-1 min-w-[150px]">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                        value={localFilters.estado}
                        onChange={(e) => handleFilterChange('estado', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                    >
                        <option value="todos">Todos los estados</option>
                        {ESTADOS_VENEZUELA.map(estado => (
                            <option key={estado} value={estado}>
                                {estado}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tipo de sangre */}
                <div className="relative flex-1 min-w-[150px]">
                    <FaTint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                        value={localFilters.tipoSangre}
                        onChange={(e) => handleFilterChange('tipoSangre', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                    >
                        <option value="todos">Todos los tipos de sangre</option>
                        {TIPOS_SANGRE.map(tipo => (
                            <option key={tipo} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tiene cédula */}
                <div className="relative flex-1 min-w-[150px]">
                    <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                        value={localFilters.tieneCedula}
                        onChange={(e) => handleFilterChange('tieneCedula', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                    >
                        {tieneCedulaOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Fila 3: Edad y Ordenamiento */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* 🔥 Edad mínima - valor por defecto 0 */}
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="number"
                            min="0"
                            max="30"
                            value={localFilters.edadMin}
                            onChange={(e) => handleFilterChange('edadMin', e.target.value)}
                            placeholder="Edad mín"
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 text-sm"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            años
                        </span>
                    </div>

                    {/* 🔥 Edad máxima - valor por defecto 30 */}
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="number"
                            min="0"
                            max="30"
                            value={localFilters.edadMax}
                            onChange={(e) => handleFilterChange('edadMax', e.target.value)}
                            placeholder="Edad máx"
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 text-sm"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            años
                        </span>
                    </div>

                    <div className="text-gray-400">|</div>

                    {/* Ordenar por */}
                    <div className="relative">
                        <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <select
                            value={localFilters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[160px]"
                        >
                            {sortOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    Ordenar por {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Botón de orden ascendente/descendente */}
                    <button
                        onClick={handleSortChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                        title={localFilters.order === 'desc' ? 'Orden descendente' : 'Orden ascendente'}
                    >
                        {localFilters.order === 'desc' ? (
                            <FaSortDown className="h-4 w-4 text-gray-600" />
                        ) : (
                            <FaSortUp className="h-4 w-4 text-gray-600" />
                        )}
                    </button>
                </div>

                {/* Limpiar filtros - solo si hay filtros activos (excluyendo valores por defecto) */}
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
                    >
                        <FaTimes className="h-4 w-4 mr-2" />
                        Limpiar filtros
                    </button>
                )}
            </div>

            {/* Info de filtros activos y total */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{totalEstudiantes}</span> estudiante{totalEstudiantes !== 1 ? 's' : ''} encontrado{totalEstudiantes !== 1 ? 's' : ''}
                        {localFilters.tipoBusqueda !== 'general' && (
                            <span className="ml-2 text-blue-600">
                                (Búsqueda: {getTipoBusquedaLabel()})
                            </span>
                        )}
                    </div>

                    {hasActiveFilters && (
                        <div className="flex flex-wrap gap-2">
                            {searchQuery && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                    <FaSearch className="h-3 w-3 mr-1" />
                                    "{searchQuery}"
                                </span>
                            )}
                            {localFilters.genero !== 'todos' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                    <FaVenusMars className="h-3 w-3 mr-1" />
                                    {GENEROS.find(g => g.value === localFilters.genero)?.label}
                                </span>
                            )}
                            {localFilters.nacionalidad !== 'todos' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    <FaFlag className="h-3 w-3 mr-1" />
                                    {localFilters.nacionalidad}
                                </span>
                            )}
                            {localFilters.estado !== 'todos' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
                                    <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                                    {localFilters.estado}
                                </span>
                            )}
                            {localFilters.tipoSangre !== 'todos' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                    <FaTint className="h-3 w-3 mr-1" />
                                    {localFilters.tipoSangre}
                                </span>
                            )}
                            {localFilters.tieneCedula !== 'todos' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                    <FaIdCard className="h-3 w-3 mr-1" />
                                    {localFilters.tieneCedula === 'si' ? 'Con cédula' : 'Sin cédula'}
                                </span>
                            )}
                            {/* 🔥 Solo mostrar filtro de edad si NO son valores por defecto */}
                            {(localFilters.edadMin && localFilters.edadMin !== '0') && (localFilters.edadMax && localFilters.edadMax !== '30') && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-pink-100 text-pink-800">
                                    <FaCalendarAlt className="h-3 w-3 mr-1" />
                                    Edad: {localFilters.edadMin}-{localFilters.edadMax} años
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuscarEstudiantes;