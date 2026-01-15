// modules/actividades/paginas/ActividadesPage.jsx
import React, { useState, useEffect } from 'react';
import { useActividades } from '../hooks/useActividades';
import ActividadesList from '../componentes/ActividadesList';
import ActividadForm from '../componentes/ActividadForm';
import ActividadDetalle from '../componentes/ActividadDetalle';
import LoadingSpinner from '../../../compartidos/componentes/LoadingSpinner';
import {
    FaPlus,
    FaList,
    FaSearch,
    FaTimes,
    FaFilter,
    FaSortAmountDown,
    FaSortAmountUp,
    FaEye,
    FaEdit,
    FaTrash
} from 'react-icons/fa';
import Swal from 'sweetalert2'

const ActividadesPage = () => {
    const {
        actividades,
        actividadActual,
        cargando,
        error,
        paginacion,
        obtenerActividades,
        obtenerActividadPorId,
        buscarActividades,
        crearActividad,
        eliminarActividad,
        editarActividad,
        cambiarPagina,
        limpiarBusqueda,
        limpiarActividadActual,
        setError
    } = useActividades();


    const [modo, setModo] = useState('lista'); // 'lista', 'crear', 'editar', 'detalle'
    // const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [orden, setOrden] = useState('desc'); // 'asc' o 'desc'
    const [filtro, setFiltro] = useState('todos'); // 'todos', 'conImagenes', 'sinImagenes'

    // Cargar actividades al inicio
    useEffect(() => {
        obtenerActividades();
    }, []);

    // Efecto para limpiar actividad seleccionada cuando cambia el modo
    // useEffect(() => {
    //     if (modo !== 'detalle' && actividadActual) {
    //         // setActividadSeleccionada(null);
    //         limpiarActividadActual();

    //     }
    //     // obtenerActividades()
    // }, [modo]);



    const handleCrear = async (data) => {
        const resultado = await crearActividad(
            data.titulo,
            data.descripcion,
            data.imagenes
        );

        if (resultado.success) {
            setModo('lista');
            // Opcional: Mostrar mensaje de éxito
            Swal.fire({
                title: "Actividad creada exitosamente",
                icon: "success",
            });
        } else {
            // El error ya está manejado en el hook
        }
    };

    const handleEditar = async (data) => {
        const resultado = await editarActividad(
            data.id,
            data.titulo,
            data.descripcion,
            data.nuevasImagenes,
            data.imagenesAEliminar
        );

        if (resultado.success) {
            setModo('lista');
            // setActividadSeleccionada(null);
            Swal.fire({
                title: "Actividad actualizada exitosamente",
                icon: "success",
            });
        }
    };

    const handleEliminar = async (id) => {

        Swal.fire({
            title: "¿Estás seguro de eliminar esta actividad?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminarlo!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resultado = await eliminarActividad(id);
                if (resultado.success) {
                    Swal.fire({
                        title: "Eliminado!",
                        text: "La actividad ha sido eliminado",
                        icon: "success"
                    });
                }
            }

        });


        // if (window.confirm('¿Estás seguro de eliminar esta actividad? sssss')) {
        //     const resultado = await eliminarActividad(id);
        //     if (resultado.success) {
        //         alert('Actividad eliminada exitosamente');
        //     }
        // }
    };

    const handleVerDetalle = async (id) => {
        const resultado = await obtenerActividadPorId(id);
        if (resultado.success) {
            // setActividadSeleccionada(resultado.data);
            setModo('detalle');
        }
    };

    const handleEditarActividad = async (actividad) => {
        // setActividadSeleccionada(actividad);
        // setModo('editar');

        const resultado = await obtenerActividadPorId(actividad.id);
        if (resultado.success) {
            setModo("editar");
        }
    };

    const handleBuscar = (e) => {
        e.preventDefault();
        if (terminoBusqueda.trim()) {
            buscarActividades(terminoBusqueda);
        } else {
            limpiarBusqueda();
        }
    };

    const limpiarFiltros = () => {
        setTerminoBusqueda('');
        setOrden('desc');
        setFiltro('todos');
        limpiarBusqueda();
    };

    const actividadesFiltradas = actividades.filter(actividad => {
        // Filtrar por término de búsqueda
        if (terminoBusqueda) {
            const termino = terminoBusqueda.toLowerCase();
            const titulo = actividad.titulo?.toLowerCase() || '';
            const descripcion = actividad.descripcion?.toLowerCase() || '';

            if (!titulo.includes(termino) && !descripcion.includes(termino)) {
                return false;
            }
        }

        // Filtrar por tipo de imágenes
        if (filtro === 'conImagenes' && (!actividad.imagenes || actividad.imagenes.length === 0)) {
            return false;
        }
        if (filtro === 'sinImagenes' && actividad.imagenes && actividad.imagenes.length > 0) {
            return false;
        }

        return true;
    });

    // Ordenar actividades
    const actividadesOrdenadas = [...actividadesFiltradas].sort((a, b) => {
        const fechaA = new Date(a.fechaCreacion);
        const fechaB = new Date(b.fechaCreacion);

        return orden === 'asc'
            ? fechaA - fechaB
            : fechaB - fechaA;
    });

    const handleCambiarPagina = (nuevaPagina) => {
        cambiarPagina(nuevaPagina);
        // Scroll al inicio de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Renderizar contenido según el modo
    const renderContenido = () => {
        switch (modo) {
            case 'crear':
                return (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Crear Nueva Actividad
                            </h2>
                            <button
                                onClick={() => setModo('lista')}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                            >
                                Volver a la lista
                            </button>
                        </div>
                        <ActividadForm
                            onSubmit={handleCrear}
                            onCancel={() => setModo('lista')}
                            cargando={cargando}
                        />
                    </div>
                );

            case 'editar':
                return (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Editar Actividad
                            </h2>
                            <button
                                onClick={() => setModo('lista')}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                            >
                                Volver a la lista
                            </button>
                        </div>
                        {actividadActual ? (
                            <ActividadForm
                                actividad={actividadActual}
                                onSubmit={handleEditar}
                                onCancel={() => setModo('lista')}
                                cargando={cargando}
                            />
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No se encontró la actividad</p>
                            </div>
                        )}
                    </div>
                );

            case 'detalle':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Detalle de Actividad
                            </h2>
                            <button
                                onClick={() => setModo('lista')}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                            >
                                Volver a la lista
                            </button>
                        </div>
                        {actividadActual ? (
                            <ActividadDetalle
                                actividad={actividadActual}
                                // onEdit={(act) => {
                                //     setActividadSeleccionada(act);
                                //     setModo('editar');
                                // }}
                                onEdit={() => setModo('editar')}
                                onDelete={handleEliminar}
                                puedeEditar={true}
                            />
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <p className="text-gray-500">Cargando detalles...</p>
                            </div>
                        )}
                    </div>
                );

            case 'lista':
            default:
                return (
                    <div className="space-y-6">
                        {/* Header con estadísticas */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                        Actividades
                                    </h1>
                                    <p className="text-gray-600">
                                        {actividades.length} actividad{actividades.length !== 1 ? 'es' : ''} en total
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setModo('crear')}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center cursor-pointer"
                                    >
                                        <FaPlus className="mr-2" />
                                        Nueva Actividad
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Filtros y búsqueda */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Búsqueda */}
                                <div>
                                    <form onSubmit={handleBuscar} className="relative">
                                        <input
                                            type="text"
                                            value={terminoBusqueda}
                                            onChange={(e) => setTerminoBusqueda(e.target.value)}
                                            placeholder="Buscar actividades..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        {terminoBusqueda && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setTerminoBusqueda('');
                                                    limpiarBusqueda();
                                                }}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </form>
                                </div>

                                {/* Orden */}
                                <div>
                                    <div className="relative">
                                        <select
                                            value={orden}
                                            onChange={(e) => setOrden(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                                        >
                                            <option value="desc">
                                                <FaSortAmountDown className="inline mr-2" />
                                                Más recientes primero
                                            </option>
                                            <option value="asc">
                                                <FaSortAmountUp className="inline mr-2" />
                                                Más antiguas primero
                                            </option>
                                        </select>
                                        <FaSortAmountDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                {/* Filtro de imágenes */}
                                <div>
                                    <div className="relative">
                                        <select
                                            value={filtro}
                                            onChange={(e) => setFiltro(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                                        >
                                            <option value="todos">Todas las actividades</option>
                                            <option value="conImagenes">Con imágenes</option>
                                            <option value="sinImagenes">Sin imágenes</option>
                                        </select>
                                        <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Botón limpiar filtros */}
                            {(terminoBusqueda || filtro !== 'todos' || orden !== 'desc') && (
                                <div className="mt-4">
                                    <button
                                        onClick={limpiarFiltros}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors flex items-center text-sm cursor-pointer"
                                    >
                                        <FaTimes className="mr-2" />
                                        Limpiar filtros
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Lista de actividades */}
                        <div>
                            {cargando ? (
                                <div className="bg-white rounded-xl shadow-lg p-12">
                                    <LoadingSpinner text="Cargando actividades..." />
                                </div>
                            ) : error ? (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                                    <p className="text-red-600 font-medium mb-4">{error}</p>
                                    <button
                                        onClick={() => obtenerActividades()}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Reintentar
                                    </button>
                                </div>
                            ) : actividadesOrdenadas.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                    <div className="text-gray-400 text-5xl mb-4">📋</div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        No hay actividades
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        {terminoBusqueda || filtro !== 'todos'
                                            ? 'No se encontraron actividades con los filtros aplicados'
                                            : 'Crea tu primera actividad para comenzar'}
                                    </p>
                                    <button
                                        onClick={() => setModo('crear')}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <FaPlus className="inline mr-2" />
                                        Crear primera actividad
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <ActividadesList
                                        actividades={actividadesOrdenadas}
                                        cargando={false}
                                        error={null}
                                        onEdit={handleEditarActividad}
                                        onDelete={handleEliminar}
                                        onView={handleVerDetalle}
                                        puedeEditar={true}
                                    />

                                    {/* Paginación */}
                                    {paginacion.totalPaginas > 1 && (
                                        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="text-gray-600">
                                                    Mostrando página {paginacion.paginaActual} de {paginacion.totalPaginas}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleCambiarPagina(paginacion.paginaActual - 1)}
                                                        disabled={paginacion.paginaActual === 1}
                                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                                    >
                                                        Anterior
                                                    </button>

                                                    {[...Array(paginacion.totalPaginas)].map((_, index) => {
                                                        const pagina = index + 1;
                                                        // Mostrar solo algunas páginas alrededor de la actual
                                                        if (
                                                            pagina === 1 ||
                                                            pagina === paginacion.totalPaginas ||
                                                            (pagina >= paginacion.paginaActual - 1 && pagina <= paginacion.paginaActual + 1)
                                                        ) {
                                                            return (
                                                                <button
                                                                    key={pagina}
                                                                    onClick={() => handleCambiarPagina(pagina)}
                                                                    className={`px-4 py-2 rounded-lg ${pagina === paginacion.paginaActual
                                                                        ? 'bg-blue-600 text-white'
                                                                        : 'border border-gray-300 hover:bg-gray-50'
                                                                        }`}
                                                                >
                                                                    {pagina}
                                                                </button>
                                                            );
                                                        } else if (
                                                            pagina === paginacion.paginaActual - 2 ||
                                                            pagina === paginacion.paginaActual + 2
                                                        ) {
                                                            return <span key={pagina} className="px-2">...</span>;
                                                        }
                                                        return null;
                                                    })}

                                                    <button
                                                        onClick={() => handleCambiarPagina(paginacion.paginaActual + 1)}
                                                        disabled={paginacion.paginaActual === paginacion.totalPaginas}
                                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                                    >
                                                        Siguiente
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navegación de modos (solo para móvil/tablet) */}
                <div className="md:hidden mb-6">
                    <div className="bg-white rounded-xl shadow-lg p-4">
                        <div className="flex justify-between items-center">
                            <div className="text-lg font-semibold text-gray-800">
                                {modo === 'lista' && 'Actividades'}
                                {modo === 'crear' && 'Crear Actividad'}
                                {modo === 'editar' && 'Editar Actividad'}
                                {modo === 'detalle' && 'Detalle'}
                            </div>
                            {modo !== 'lista' && (
                                <button
                                    onClick={() => setModo('lista')}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    <FaList />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Barra lateral para modos (desktop) */}
                <div className="hidden md:flex gap-6">
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Actividades</h2>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setModo('lista')}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${modo === 'lista'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <FaList className="inline mr-3" />
                                    Lista de Actividades
                                </button>

                                <button
                                    onClick={() => setModo('crear')}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${modo === 'crear'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <FaPlus className="inline mr-3" />
                                    Crear Nueva
                                </button>

                                {modo === 'detalle' && actividadActual && (
                                    <>
                                        <div className="border-t border-gray-200 my-3"></div>

                                        <div className="px-4 py-3">
                                            <h3 className="font-medium text-gray-700 mb-2">Opciones</h3>
                                            <button
                                                onClick={() => handleEditarActividad(actividadActual)}
                                                className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors mb-2 cursor-pointer"
                                            >
                                                <FaEdit className="inline mr-2" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleEliminar(actividadActual.id)}
                                                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <FaTrash className="inline mr-2" />
                                                Eliminar
                                            </button>
                                        </div>
                                    </>
                                )}
                            </nav>

                            {/* Estadísticas */}
                            <div className="border-t border-gray-200 mt-6 pt-6">
                                <h3 className="font-medium text-gray-700 mb-3">Estadísticas</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total:</span>
                                        <span className="font-medium">{actividades.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Con imágenes:</span>
                                        <span className="font-medium">
                                            {actividades.filter(a => a.imagenes?.length > 0).length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Página actual:</span>
                                        <span className="font-medium">{paginacion.paginaActual}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="flex-1">
                        {renderContenido()}
                    </div>
                </div>

                {/* Versión móvil (sin sidebar) */}
                <div className="md:hidden">
                    {renderContenido()}
                </div>
            </div>
        </div>
    );
};

export default ActividadesPage;