import { useState, useCallback } from 'react';
import { EstudianteService } from '../servicios/estudiante.service';
import { EstudianteAdaptador } from '../adaptadores/estudiante.adaptador';

export const useBusquedaEstudiantes = () => {
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [filters, setFilters] = useState({
        q: '',
        page: 1,
        limit: 10,
        tipoBusqueda: 'general'
    });

    const buscarEstudiantes = useCallback(async (searchFilters = {}) => {
        try {
            setLoading(true);
            setError(null);

            const nuevosFiltros = { ...filters, ...searchFilters, page: searchFilters.page || 1 };
            setFilters(nuevosFiltros);

            let response;

            // Si hay filtros avanzados (género, nacionalidad, etc.), usar búsqueda avanzada
            if (searchFilters.genero || searchFilters.nacionalidad || searchFilters.estado || searchFilters.fechaDesde) {
                const params = {
                    nombreEstudiante: searchFilters.q,
                    cedulaEstudiante: searchFilters.cedula,
                    cedulaEscolar: searchFilters.cedulaEscolar,
                    genero: searchFilters.genero,
                    limit: searchFilters.limit || 50,
                    page: searchFilters.page || 1
                };

                // Agregar filtros de fecha si existen
                if (searchFilters.fechaDesde || searchFilters.fechaHasta) {
                    // Aquí deberías adaptar según cómo tu backend maneje las fechas
                    // Por ejemplo, podrías convertir a un rango de edad
                }

                response = await EstudianteService.buscarAvanzado(params);
            } else {
                console.log("holaa")
                // Búsqueda normal
                response = await EstudianteService.buscar({
                    q: searchFilters.q || '',
                    page: searchFilters.page || 1,
                    limit: searchFilters.limit || 10,
                    tipoBusqueda: searchFilters.tipoBusqueda || 'general'
                });
            }

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

                setResultados(estudiantesAdaptados);
                setPagination(response.pagination || {
                    page: response.page || 1,
                    limit: response.limit || 10,
                    total: response.total || estudiantesAdaptados.length,
                    totalPages: response.totalPages || 1
                });
            } else {
                setError(response.message || 'Error en la búsqueda');
                setResultados([]);
            }
        } catch (err) {
            setError(err.message || 'Error de conexión');
            console.error('Error en búsqueda de estudiantes:', err);
            setResultados([]);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const buscarPorCedula = useCallback(async (cedula, cedulaEscolar, tipoCedula = 'estudiante') => {
        try {
            setLoading(true);
            setError(null);
            const params = {};
            if (cedula) params.cedula = cedula;
            if (cedulaEscolar) params.cedula_escolar = cedulaEscolar;
            if (tipoCedula) params.tipo_cedula = tipoCedula;

            const response = await EstudianteService.buscarPorCedula(params);

            if (response.success && response.data) {
                const estudianteAdaptado = EstudianteAdaptador.adaptarParaFrontend(response.data.estudiante);

                if (response.data.representante) {
                    estudianteAdaptado.representante = {
                        ...response.data.representante,
                        nombreCompleto: `${response.data.representante.nombres} ${response.data.representante.apellidos}`
                    };
                }

                setResultados([estudianteAdaptado]);
                setPagination({
                    page: 1,
                    limit: 1,
                    total: 1,
                    totalPages: 1
                });

                return { success: true, data: estudianteAdaptado };
            } else {
                setError(response.message || 'No se encontró el estudiante');
                setResultados([]);
                return { success: false, message: response.message };
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al buscar por cédula';
            setError(errorMsg);
            setResultados([]);
            return { success: false, message: errorMsg };
        } finally {
            setLoading(false);
        }
    }, []);

    const buscarAvanzado = useCallback(async (filtrosAvanzados) => {
        try {
            setLoading(true);
            setError(null);
            const params = {
                ...filtrosAvanzados,
                limit: filtrosAvanzados.limit || 50,
                page: filtrosAvanzados.page || 1
            };

            // Limpiar parámetros vacíos
            Object.keys(params).forEach(key => {
                if (params[key] === '' || params[key] === undefined) {
                    delete params[key];
                }
            });

            const response = await EstudianteService.buscarAvanzado(params);

            if (response.success) {
                const estudiantesAdaptados = response.data.map(item => {
                    // La respuesta de búsqueda avanzada puede tener diferente estructura
                    const estudianteData = item.estudiante || item;
                    const estudianteAdaptado = EstudianteAdaptador.adaptarParaFrontend(estudianteData);

                    if (item.representante) {
                        estudianteAdaptado.representante = {
                            ...item.representante,
                            nombreCompleto: `${item.representante.nombres} ${item.representante.apellidos}`
                        };
                    }
                    return estudianteAdaptado;
                });

                setResultados(estudiantesAdaptados);
                setPagination({
                    page: params.page || 1,
                    limit: params.limit || 50,
                    total: response.total || estudiantesAdaptados.length,
                    totalPages: Math.ceil((response.total || estudiantesAdaptados.length) / (params.limit || 50))
                });
            } else {
                setError(response.message || 'Error en búsqueda avanzada');
                setResultados([]);
            }
        } catch (err) {
            setError(err.message || 'Error de conexión');
            console.error('Error en búsqueda avanzada:', err);
            setResultados([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const cambiarPagina = useCallback((page) => {
        buscarEstudiantes({ ...filters, page });
    }, [filters, buscarEstudiantes]);

    const limpiarBusqueda = useCallback(() => {
        setResultados([]);
        setError(null);
        setPagination(null);
        setFilters({
            q: '',
            page: 1,
            limit: 10,
            tipoBusqueda: 'general'
        });
    }, []);

    const actualizarFiltros = useCallback((nuevosFiltros) => {
        setFilters(prev => ({ ...prev, ...nuevosFiltros }));
    }, []);

    return {
        resultados,
        loading,
        error,
        pagination,
        filters,
        buscarEstudiantes,
        buscarPorCedula,
        buscarAvanzado,
        cambiarPagina,
        limpiarBusqueda,
        actualizarFiltros,
        refresh: buscarEstudiantes
    };
};