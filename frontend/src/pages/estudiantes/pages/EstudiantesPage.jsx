// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUserPlus, FaDownload, FaFilter, FaChartBar, FaSync } from 'react-icons/fa';
// import EstudiantesLista from '../componentes/EstudiantesLista';
// import BuscarEstudiantes from '../componentes/BuscarEstudiantes';
// import EstadisticasEstudiantes from '../componentes/EstadisticasEstudiantes';
// import { useEstudiantes } from '../hooks/useEstudiantes';
// import Swal from 'sweetalert2';

// const EstudiantesPage = () => {
//     const navigate = useNavigate();
//     const [showExportOptions, setShowExportOptions] = useState(false);

//     const {
//         estudiantes,
//         loading,
//         error,
//         pagination,
//         estadisticas,
//         filters,
//         actualizarFiltros,
//         resetFilters,
//         cambiarPagina,
//         refresh,
//         refreshEstadisticas
//     } = useEstudiantes();

//     const handleFilterChange = (nuevosFiltros) => {
//         actualizarFiltros(nuevosFiltros);
//     };

//     const handleView = (id) => {
//         navigate(`/estudiantes/${id}`);
//     };

//     const handleEdit = (id) => {
//         navigate(`/estudiantes/${id}/editar`);
//     };

//     const handleExport = (format) => {
//         setShowExportOptions(false);

//         Swal.fire({
//             title: 'Exportando...',
//             text: `Preparando archivo en formato ${format.toUpperCase()}`,
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });

//         setTimeout(() => {
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Exportación completada',
//                 text: `Los datos han sido exportados en formato ${format.toUpperCase()}`,
//                 showConfirmButton: true
//             });
//         }, 1500);
//     };

//     const handleRefresh = () => {
//         refresh();
//         refreshEstadisticas();

//         Swal.fire({
//             icon: 'success',
//             title: 'Datos actualizados',
//             text: 'La lista y estadísticas se han actualizado',
//             timer: 1500,
//             showConfirmButton: false
//         });
//     };

//     const getTotalResultados = () => {
//         return pagination?.total || estudiantes.length;
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Encabezado */}
//                 <div className="md:flex md:items-center md:justify-between mb-8">
//                     <div className="flex-1 min-w-0">
//                         <div className="flex items-center">
//                             <div className="flex-shrink-0 bg-blue-600 p-3 rounded-lg">
//                                 <FaChartBar className="h-6 w-6 text-white" />
//                             </div>
//                             <div className="ml-4">
//                                 <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
//                                     Gestión de Estudiantes
//                                 </h1>
//                                 <p className="mt-1 text-sm text-gray-500">
//                                     Administra el registro de estudiantes y sus representantes
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
//                         <button
//                             onClick={handleRefresh}
//                             disabled={loading}
//                             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//                             title="Refrescar datos"
//                         >
//                             <FaSync className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//                             Actualizar
//                         </button>

//                         <div className="relative">
//                             <button
//                                 onClick={() => setShowExportOptions(!showExportOptions)}
//                                 className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                             >
//                                 <FaDownload className="mr-2 h-4 w-4" />
//                                 Exportar
//                             </button>

//                             {showExportOptions && (
//                                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                                     <div className="py-1">
//                                         <button
//                                             onClick={() => handleExport('excel')}
//                                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         >
//                                             Exportar a Excel
//                                         </button>
//                                         <button
//                                             onClick={() => handleExport('pdf')}
//                                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         >
//                                             Exportar a PDF
//                                         </button>
//                                         <button
//                                             onClick={() => handleExport('csv')}
//                                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         >
//                                             Exportar a CSV
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         <button
//                             onClick={() => navigate('/estudiantes/nuevo')}
//                             className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                         >
//                             <FaUserPlus className="mr-2 h-4 w-4" />
//                             Nuevo Estudiante
//                         </button>
//                     </div>
//                 </div>

//                 {/* Estadísticas de género */}
//                 <EstadisticasEstudiantes
//                     estadisticas={estadisticas}
//                     loading={estadisticas.loading}
//                 />

//                 {/* Componente de búsqueda mejorado */}
//                 <BuscarEstudiantes
//                     onFilterChange={handleFilterChange}
//                     filters={filters}
//                     totalEstudiantes={getTotalResultados()}
//                 />

//                 {/* Resumen de resultados */}
//                 <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h3 className="text-lg font-medium text-gray-900">
//                                 Resultados de búsqueda
//                             </h3>
//                             <p className="text-sm text-gray-500">
//                                 Mostrando página {pagination?.page || 1} de {pagination?.totalPages || 1}
//                             </p>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                             Total: <span className="font-bold text-gray-900">{getTotalResultados()}</span> estudiantes
//                         </div>
//                     </div>
//                 </div>

//                 {/* Lista de estudiantes */}
//                 <div className="mt-6">
//                     <EstudiantesLista
//                         estudiantes={estudiantes}
//                         loading={loading}
//                         error={error}
//                         pagination={pagination}
//                         onView={handleView}
//                         onEdit={handleEdit}
//                         onPageChange={cambiarPagina}
//                     />
//                 </div>

//                 {/* Mensaje de estado */}
//                 {loading && (
//                     <div className="mt-8 text-center">
//                         <div className="inline-flex items-center justify-center p-4 bg-white rounded-lg shadow border border-gray-200">
//                             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
//                             <span className="text-gray-600">Cargando estudiantes...</span>
//                         </div>
//                     </div>
//                 )}

//                 {error && !loading && (
//                     <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
//                         <div className="flex">
//                             <div className="flex-shrink-0">
//                                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                             <div className="ml-3">
//                                 <h3 className="text-sm font-medium text-red-800">
//                                     Error al cargar estudiantes
//                                 </h3>
//                                 <div className="mt-2 text-sm text-red-700">
//                                     <p>{error}</p>
//                                     <button
//                                         onClick={handleRefresh}
//                                         className="mt-2 inline-flex items-center text-sm font-medium text-red-800 hover:text-red-900"
//                                     >
//                                         <FaSync className="mr-1 h-3 w-3" />
//                                         Intentar nuevamente
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {!loading && !error && estudiantes.length === 0 && (
//                     <div className="mt-12 text-center">
//                         <div className="inline-block p-6 bg-white rounded-lg shadow border border-gray-200">
//                             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
//                             </svg>
//                             <h3 className="mt-4 text-lg font-medium text-gray-900">No hay estudiantes registrados</h3>
//                             <p className="mt-2 text-sm text-gray-500">
//                                 Comienza registrando el primer estudiante o ajusta los filtros de búsqueda.
//                             </p>
//                             <div className="mt-6">
//                                 <button
//                                     onClick={() => navigate('/estudiantes/nuevo')}
//                                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                                 >
//                                     <FaUserPlus className="mr-2 h-4 w-4" />
//                                     Registrar primer estudiante
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EstudiantesPage;

//!Primero : 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaDownload, FaChartBar, FaSync } from 'react-icons/fa';
import EstudiantesLista from '../componentes/EstudiantesLista';
import BuscarEstudiantes from '../componentes/BuscarEstudiantes';
import EstadisticasEstudiantes from '../componentes/EstadisticasEstudiantes';
import { useEstudiantes } from '../hooks/useEstudiantes';
import Swal from 'sweetalert2';

const EstudiantesPage = () => {
    const navigate = useNavigate();
    const [showExportOptions, setShowExportOptions] = useState(false);

    const {
        estudiantes,
        loading,
        error,
        pagination,
        estadisticas,
        filters,
        actualizarFiltros,
        cambiarPagina,
        refresh,
        refreshEstadisticas,
        eliminarEstudiante
    } = useEstudiantes();

    const [sortConfig, setSortConfig] = useState({
        key: filters?.sortBy || 'apellidos',
        direction: filters?.order || 'asc'
    });

    const handleFilterChange = (nuevosFiltros) => {
        actualizarFiltros(nuevosFiltros);
    };

    const handleSort = ({ key, direction }) => {
        setSortConfig({ key, direction });
        actualizarFiltros({
            sortBy: key,
            order: direction
        });
    };

    const handleView = (id) => {
        navigate(`/estudiantes/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/estudiantes/${id}/editar`);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const response = await eliminarEstudiante(id);
                if (response.success) {
                    Swal.fire('¡Eliminado!', 'El estudiante ha sido eliminado.', 'success');
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el estudiante.', 'error');
            }
        }
    };

    const handlePageChange = (page) => {
        cambiarPagina(page);
    };

    const handleExport = (format) => {
        setShowExportOptions(false);
        Swal.fire({
            title: 'Exportando...',
            text: `Preparando archivo en formato ${format.toUpperCase()}`,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Exportación completada',
                text: `Los datos han sido exportados en formato ${format.toUpperCase()}`,
                showConfirmButton: true
            });
        }, 1500);
    };

    const handleRefresh = () => {
        refresh();
        refreshEstadisticas();
        Swal.fire({
            icon: 'success',
            title: 'Datos actualizados',
            text: 'La lista y estadísticas se han actualizado',
            timer: 1500,
            showConfirmButton: false
        });
    };

    const getTotalResultados = () => {
        return pagination?.total || estudiantes.length;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Encabezado */}
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-600 p-3 rounded-lg">
                                <FaChartBar className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                                    Gestión de Estudiantes
                                </h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Administra el registro de estudiantes y sus representantes
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            <FaSync className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Actualizar
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowExportOptions(!showExportOptions)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaDownload className="mr-2 h-4 w-4" />
                                Exportar
                            </button>

                            {showExportOptions && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                    <div className="py-1">
                                        <button
                                            onClick={() => handleExport('excel')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Exportar a Excel
                                        </button>
                                        <button
                                            onClick={() => handleExport('pdf')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Exportar a PDF
                                        </button>
                                        <button
                                            onClick={() => handleExport('csv')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Exportar a CSV
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => navigate('/estudiantes/nuevo')}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <FaUserPlus className="mr-2 h-4 w-4" />
                            Nuevo Estudiante
                        </button>
                    </div>
                </div>

                {/* Estadísticas de género */}
                <EstadisticasEstudiantes
                    estadisticas={estadisticas}
                    loading={estadisticas?.loading}
                />

                {/* Componente de búsqueda */}
                <BuscarEstudiantes
                    onFilterChange={handleFilterChange}
                    filters={filters}
                    totalEstudiantes={getTotalResultados()}
                />

                {/* Resumen de resultados */}
                <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Resultados de búsqueda
                            </h3>
                            <p className="text-sm text-gray-500">
                                Mostrando página {pagination?.page || 1} de {pagination?.totalPages || 1}
                            </p>
                        </div>
                        <div className="text-sm text-gray-600">
                            Total: <span className="font-bold text-gray-900">{getTotalResultados()}</span> estudiantes
                        </div>
                    </div>
                </div>

                {/* Lista de estudiantes */}
                <div className="mt-6">
                    <EstudiantesLista
                        estudiantes={estudiantes}
                        loading={loading}
                        error={error}
                        pagination={pagination}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSort={handleSort}
                        sortConfig={sortConfig}
                        onPageChange={handlePageChange}
                    />
                </div>

                {/* Mensaje de estado */}
                {loading && (
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-white rounded-lg shadow border border-gray-200">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
                            <span className="text-gray-600">Cargando estudiantes...</span>
                        </div>
                    </div>
                )}

                {error && !loading && (
                    <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Error al cargar estudiantes
                                </h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                    <button
                                        onClick={handleRefresh}
                                        className="mt-2 inline-flex items-center text-sm font-medium text-red-800 hover:text-red-900"
                                    >
                                        <FaSync className="mr-1 h-3 w-3" />
                                        Intentar nuevamente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && estudiantes.length === 0 && (
                    <div className="mt-12 text-center">
                        <div className="inline-block p-6 bg-white rounded-lg shadow border border-gray-200">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No hay estudiantes registrados</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Comienza registrando el primer estudiante o ajusta los filtros de búsqueda.
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() => navigate('/estudiantes/nuevo')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FaUserPlus className="mr-2 h-4 w-4" />
                                    Registrar primer estudiante
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EstudiantesPage;