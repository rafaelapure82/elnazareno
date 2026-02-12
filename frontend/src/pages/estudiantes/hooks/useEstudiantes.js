
import { useState, useEffect, useCallback } from 'react';
import { EstudianteService } from '../servicios/estudiante.service';
import { EstudianteAdaptador } from '../adaptadores/estudiante.adaptador';

export const useEstudiantes = (initialFilters = {}) => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [estadisticas, setEstadisticas] = useState({
        total: 0,
        masculinos: 0,
        femeninos: 0,
        otros: 0,
        loading: true
    });

    // Filtros unificados
    const [filters, setFilters] = useState({
        searchQuery: '',
        genero: 'todos',
        nacionalidad: 'todos',
        tipoSangre: 'todos',
        estado: 'todos',
        edadMin: '',
        edadMax: '',
        tieneCedula: 'todos',
        sortBy: 'apellidos',
        order: 'asc',
        tipoBusqueda: 'general',
        page: 1,
        limit: 10,
        ...initialFilters
    });

    // Función para adaptar filtros al formato del backend
    const adaptarFiltrosParaBackend = useCallback((filtros) => {
        const backendFilters = {
            page: filtros.page,
            limit: filtros.limit,
            sortBy: filtros.sortBy,
            sortOrder: filtros.order
        };

        // Búsqueda general
        if (filtros.searchQuery) {
            backendFilters.search = filtros.searchQuery;
            backendFilters.tipoBusqueda = filtros.tipoBusqueda;
        }

        // Filtros específicos
        if (filtros.genero !== 'todos') {
            backendFilters.genero = filtros.genero;
        }

        if (filtros.nacionalidad !== 'todos') {
            backendFilters.nacionalidad = filtros.nacionalidad;
        }

        if (filtros.estado !== 'todos') {
            backendFilters.estado = filtros.estado;
        }

        if (filtros.tipoSangre !== 'todos') {
            backendFilters.tipoSangre = filtros.tipoSangre;
        }

        if (filtros.tieneCedula !== 'todos') {
            backendFilters.tiene_cedula = filtros.tieneCedula === 'si';
        }

        // Filtros de edad (convertir a fecha de nacimiento)
        if (filtros.edadMin || filtros.edadMax) {
            const hoy = new Date();

            if (filtros.edadMax) {
                const fechaMin = new Date(hoy.getFullYear() - parseInt(filtros.edadMax), hoy.getMonth(), hoy.getDate());
                backendFilters.fecha_nacimiento_hasta = fechaMin.toISOString().split('T')[0];
            }

            if (filtros.edadMin) {
                const fechaMax = new Date(hoy.getFullYear() - parseInt(filtros.edadMin), hoy.getMonth(), hoy.getDate());
                backendFilters.fecha_nacimiento_desde = fechaMax.toISOString().split('T')[0];
            }
        }

        return backendFilters;
    }, []);

    const fetchEstudiantes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const backendFilters = adaptarFiltrosParaBackend(filters);
            const response = await EstudianteService.obtenerTodos(backendFilters);

            if (response.success) {
                const estudiantesAdaptados = response.data.map(estudiante => {
                    const estudianteAdaptado = EstudianteAdaptador.adaptarParaFrontend(estudiante);
                    if (estudiante.representante) {
                        estudianteAdaptado.representante = {
                            ...estudiante.representante,
                            nombreCompleto: `${estudiante.representante.nombres} ${estudiante.representante.apellidos}`
                        };
                    }
                    return estudianteAdaptado;
                });

                setEstudiantes(estudiantesAdaptados);
                setPagination(response.pagination);

                // Calcular estadísticas de los resultados actuales
                const total = estudiantesAdaptados.length;
                const masculinos = estudiantesAdaptados.filter(e => e.sexo === 'Masculino').length;
                const femeninos = estudiantesAdaptados.filter(e => e.sexo === 'Femenino').length;
                const otros = total - masculinos - femeninos;

                setEstadisticas(prev => ({
                    ...prev,
                    totalResultados: total,
                    masculinosResultados: masculinos,
                    femeninosResultados: femeninos,
                    otrosResultados: otros
                }));
            } else {
                setError(response.message || 'Error al cargar estudiantes');
            }
        } catch (err) {
            setError(err.message || 'Error de conexión');
            console.error('Error fetching estudiantes:', err);
        } finally {
            setLoading(false);
        }
    }, [filters, adaptarFiltrosParaBackend]);

    // Función para obtener estadísticas generales
    const fetchEstadisticasGenerales = useCallback(async () => {
        try {
            setEstadisticas(prev => ({ ...prev, loading: true }));

            const response = await EstudianteService.obtenerTodos({
                exportAll: true,
                limit: 10000
            });

            if (response.success) {
                const todosEstudiantes = response.data.map(estudiante =>
                    EstudianteAdaptador.adaptarParaFrontend(estudiante)
                );

                const total = todosEstudiantes.length;
                const masculinos = todosEstudiantes.filter(e => e.sexo === 'Masculino').length;
                const femeninos = todosEstudiantes.filter(e => e.sexo === 'Femenino').length;
                const otros = total - masculinos - femeninos;

                setEstadisticas({
                    total,
                    masculinos,
                    femeninos,
                    otros,
                    loading: false,
                    porcentajeMasculino: total > 0 ? ((masculinos / total) * 100).toFixed(1) : 0,
                    porcentajeFemenino: total > 0 ? ((femeninos / total) * 100).toFixed(1) : 0,
                    porcentajeOtros: total > 0 ? ((otros / total) * 100).toFixed(1) : 0
                });
            }
        } catch (err) {
            console.error('Error obteniendo estadísticas:', err);
            setEstadisticas(prev => ({ ...prev, loading: false }));
        }
    }, []);

    const crearEstudiante = async (data) => {
        try {
            setLoading(true);
            const formData = EstudianteAdaptador.adaptarCrear(data);
            const response = await EstudianteService.crear(formData);

            if (response.success) {
                await fetchEstudiantes();
                await fetchEstadisticasGenerales();
                return { success: true, data: response.data };
            } else {
                return { success: false, message: response.message };
            }
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || 'Error al crear estudiante'
            };
        } finally {
            setLoading(false);
        }
    };

    const editarEstudiante = async (id, data) => {
        try {
            setLoading(true);
            const formData = EstudianteAdaptador.adaptarEditar(data);
            const response = await EstudianteService.editar(id, formData);

            if (response.success) {
                await fetchEstudiantes();
                await fetchEstadisticasGenerales();
                return { success: true, data: response.data };
            } else {
                return { success: false, message: response.message };
            }
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || 'Error al editar estudiante'
            };
        } finally {
            setLoading(false);
        }
    };

    const eliminarEstudiante = async (id) => {
        try {
            setLoading(true);
            const response = await EstudianteService.eliminar(id);

            if (response.success) {
                await fetchEstudiantes();
                await fetchEstadisticasGenerales();
                return { success: true };
            } else {
                return { success: false, message: response.message };
            }
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || 'Error al eliminar estudiante'
            };
        } finally {
            setLoading(false);
        }
    };

    // Función para cambiar filtros (usada por el componente de búsqueda)
    const actualizarFiltros = useCallback((nuevosFiltros) => {
        setFilters(prev => ({ ...prev, ...nuevosFiltros, page: 1 }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            searchQuery: '',
            genero: 'todos',
            nacionalidad: 'todos',
            tipoSangre: 'todos',
            estado: 'todos',
            edadMin: '',
            edadMax: '',
            tieneCedula: 'todos',
            sortBy: 'apellidos',
            order: 'asc',
            tipoBusqueda: 'general',
            page: 1,
            limit: 50
        });
    }, []);

    const cambiarPagina = useCallback((page) => {
        setFilters(prev => ({ ...prev, page }));
    }, []);

    useEffect(() => {
        fetchEstudiantes();
    }, [fetchEstudiantes]);

    // Cargar estadísticas generales al inicio
    useEffect(() => {
        fetchEstadisticasGenerales();
    }, [fetchEstadisticasGenerales]);

    return {
        estudiantes,
        loading,
        error,
        pagination,
        estadisticas,
        filters,
        crearEstudiante,
        editarEstudiante,
        eliminarEstudiante,
        actualizarFiltros,
        resetFilters,
        cambiarPagina,
        refresh: fetchEstudiantes,
        refreshEstadisticas: fetchEstadisticasGenerales
    };
};
