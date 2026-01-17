import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { EstudiantesServicio } from '../servicios/estudiantes.servicio';
import { EstudiantesAdaptador } from '../adaptadores/estudiantes.adaptador';

// export const useEstudiantes = () => {
//     const [estudiantes, setEstudiantes] = useState([]);
//     const [rawEstudiantes, setRawEstudiantes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filters, setFilters] = useState({
//         searchQuery: '',
//         genero: 'todos',
//         edadMin: '',
//         edadMax: '',
//         sortBy: 'nombreCompleto',
//         order: 'asc'
//     });


//     // Cargar estudiantes
//     const cargarEstudiantes = useCallback(async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await EstudiantesServicio.obtenerTodosEstudiantes();
//             console.log('Respuesta completa:', response);
//             const estudiantesList = EstudiantesAdaptador.toEstudiantesList(response.data.data);
//             setEstudiantes(estudiantesList);
//             setRawEstudiantes(estudiantesList);
//         } catch (err) {
//             setError(err.message || 'Error al cargar estudiantes');
//             console.error('Error cargando estudiantes:', err);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     // Buscar por cédula
//     const buscarPorCedula = useCallback(async (cedula) => {
//         if (!cedula.trim()) {
//             await cargarEstudiantes();
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             const response = await EstudiantesServicio.buscarPorCedula(cedula);
//             const estudiantesList = response.success ?
//                 [EstudiantesAdaptador.fromApiResponse(response)] : [];
//             setEstudiantes(estudiantesList);
//         } catch (err) {
//             setError(err.message || 'Error al buscar estudiante');
//         } finally {
//             setLoading(false);
//         }
//     }, [cargarEstudiantes]);

//     // Obtener estudiante por ID
//     const obtenerEstudiante = useCallback(async (id) => {
//         try {
//             const response = await EstudiantesServicio.obtenerEstudiantePorId(id);
//             return EstudiantesAdaptador.fromApiResponse(response);
//         } catch (err) {
//             throw new Error(err.message || 'Error al obtener estudiante');
//         }
//     }, []);

//     // Crear estudiante
//     const crearEstudiante = useCallback(async (data) => {
//         try {
//             const response = await EstudiantesServicio.crearEstudiante(data);
//             const nuevoEstudiante = EstudiantesAdaptador.fromApiResponse(response);

//             // Agregar a la lista local
//             setEstudiantes(prev => [...prev, nuevoEstudiante]);
//             setRawEstudiantes(prev => [...prev, nuevoEstudiante]);

//             return nuevoEstudiante;
//         } catch (err) {
//             throw new Error(err.message || 'Error al crear estudiante');
//         }
//     }, []);

//     // Editar estudiante
//     const editarEstudiante = useCallback(async (id, data) => {
//         try {
//             const response = await EstudiantesServicio.editarEstudiante(id, data);
//             const estudianteEditado = EstudiantesAdaptador.fromApiResponse(response);

//             // Actualizar en la lista local
//             setEstudiantes(prev =>
//                 prev.map(est => est.id === id ? estudianteEditado : est)
//             );
//             setRawEstudiantes(prev =>
//                 prev.map(est => est.id === id ? estudianteEditado : est)
//             );

//             return estudianteEditado;
//         } catch (err) {
//             throw new Error(err.message || 'Error al editar estudiante');
//         }
//     }, []);

//     // Eliminar estudiante
//     const eliminarEstudiante = useCallback(async (id) => {
//         try {
//             await EstudiantesServicio.eliminarEstudiante(id);

//             // Eliminar de la lista local
//             setEstudiantes(prev => prev.filter(est => est.id !== id));
//             setRawEstudiantes(prev => prev.filter(est => est.id !== id));

//             return true;
//         } catch (err) {
//             throw new Error(err.message || 'Error al eliminar estudiante');
//         }
//     }, []);


//     // Actualizar filtros
//     const actualizarFiltros = useCallback((newFilters) => {
//         setFilters(prev => ({ ...prev, ...newFilters }));
//     }, []);

//     // MEMOIZAR los estudiantes filtrados y ordenados
//     const sortedEstudiantes = useMemo(() => {
//         console.log('Recalculando estudiantes filtrados/ordenados');

//         // Filtrar primero
//         const filtered = EstudiantesAdaptador.filterEstudiantes(rawEstudiantes, filters);

//         // Luego ordenar
//         return EstudiantesAdaptador.sortEstudiantes(
//             filtered,
//             filters.sortBy,
//             filters.order
//         );
//     }, [rawEstudiantes, filters]); // Solo recalcula cuando cambian rawEstudiantes o filters

//     // Resetear filtros y mostrar todos
//     const resetearFiltros = useCallback(() => {
//         setFilters({
//             searchQuery: '',
//             genero: 'todos',
//             edadMin: '',
//             edadMax: '',
//             sortBy: 'nombreCompleto',
//             order: 'asc'
//         });
//         setEstudiantes(rawEstudiantes);
//     }, [rawEstudiantes]);

//     // Cargar inicialmente - con dependencia vacía para que solo se ejecute una vez
//     useEffect(() => {
//         cargarEstudiantes();
//     }, []); // Solo al montar

//     // Opcional: Si necesitas actualizar cuando rawEstudiantes cambia
//     useEffect(() => {
//         // Aplicar filtros actuales a los nuevos rawEstudiantes
//         const filtered = EstudiantesAdaptador.filterEstudiantes(rawEstudiantes, filters);
//         const sorted = EstudiantesAdaptador.sortEstudiantes(filtered, filters.sortBy, filters.order);
//         setEstudiantes(sorted);
//     }, [rawEstudiantes, filters]);


//     return {
//         estudiantes: sortedEstudiantes,
//         rawEstudiantes, // Para estadísticas o uso sin filtros
//         loading,
//         error,
//         filters,
//         cargarEstudiantes,
//         buscarPorCedula,
//         obtenerEstudiante,
//         crearEstudiante,
//         editarEstudiante,
//         eliminarEstudiante,
//         actualizarFiltros,
//         resetearFiltros
//     };
// };

export const useEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        searchQuery: '',
        genero: 'todos',
        edadMin: '',
        edadMax: '',
        sortBy: 'nombreCompleto',
        order: 'asc'
    });

    const isMountedRef = React.useRef(true);
    const hasLoadedRef = React.useRef(false);

    // Cargar estudiantes - SOLO UNA VEZ
    // const cargarEstudiantes = useCallback(async () => {
    //     console.log('📥 cargarEstudiantes ejecutándose...');
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const response = await EstudiantesServicio.obtenerTodosEstudiantes();
    //         console.log('Respuesta completa:', response);

    //         // Guardar los datos crudos directamente
    //         const estudiantesList = EstudiantesAdaptador.toEstudiantesList(response.data.data);
    //         setEstudiantes(estudiantesList);

    //     } catch (err) {
    //         setError(err.message || 'Error al cargar estudiantes');
    //         console.error('Error cargando estudiantes:', err);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    const cargarEstudiantes = useCallback(async () => {
        // Si ya se cargó, no cargar de nuevo
        if (hasLoadedRef.current && !loading) {
            // console.log('📭 Ya se cargaron los estudiantes, omitiendo...');
            return;
        }

        // console.log('📥 Cargando estudiantes...');
        setLoading(true);
        setError(null);

        try {
            const response = await EstudiantesServicio.obtenerTodosEstudiantes();

            if (isMountedRef.current) {
                const estudiantesList = EstudiantesAdaptador.toEstudiantesList(response.data.data);
                setEstudiantes(estudiantesList);
                hasLoadedRef.current = true; // Marcar como cargado
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError(err.message || 'Error al cargar estudiantes');
                console.error('Error cargando estudiantes:', err);
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [loading]); // Dependencia de loading

    // Buscar por cédula
    const buscarPorCedula = useCallback(async (cedula) => {
        if (!cedula.trim()) {
            await cargarEstudiantes();
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await EstudiantesServicio.buscarPorCedula(cedula);
            console.log('Respuesta búsqueda:', response.data);
            const estudiantesList = response.data.success ?
                [EstudiantesAdaptador.fromApiResponse(response.data)] : [];

            console.log(estudiantesList)
            // setEstudiantes(estudiantesList);
        } catch (err) {
            setError(err.message || 'Error al buscar estudiante');
        } finally {
            setLoading(false);
        }
    }, [cargarEstudiantes]);

    // Obtener estudiante por ID
    const obtenerEstudiante = useCallback(async (id) => {
        try {
            const response = await EstudiantesServicio.obtenerEstudiantePorId(id);
            return EstudiantesAdaptador.fromApiResponse(response);
        } catch (err) {
            throw new Error(err.message || 'Error al obtener estudiante');
        }
    }, []);

    // Crear estudiante
    const crearEstudiante = useCallback(async (data) => {
        try {
            const response = await EstudiantesServicio.crearEstudiante(data);
            const nuevoEstudiante = EstudiantesAdaptador.fromApiResponse(response);

            // Agregar a la lista local (optimistic update)
            setEstudiantes(prev => [...prev, nuevoEstudiante]);

            return nuevoEstudiante;
        } catch (err) {
            throw new Error(err.message || 'Error al crear estudiante');
        }
    }, []);

    // Editar estudiante
    const editarEstudiante = useCallback(async (id, data) => {
        try {
            const response = await EstudiantesServicio.editarEstudiante(id, data);
            const estudianteEditado = EstudiantesAdaptador.fromApiResponse(response);

            // Actualizar en la lista local
            setEstudiantes(prev =>
                prev.map(est => est.id === id ? estudianteEditado : est)
            );

            return estudianteEditado;
        } catch (err) {
            throw new Error(err.message || 'Error al editar estudiante');
        }
    }, []);

    // Eliminar estudiante
    const eliminarEstudiante = useCallback(async (id) => {
        try {
            await EstudiantesServicio.eliminarEstudiante(id);

            // Eliminar de la lista local
            setEstudiantes(prev => prev.filter(est => est.id !== id));

            return true;
        } catch (err) {
            throw new Error(err.message || 'Error al eliminar estudiante');
        }
    }, []);

    // Actualizar filtros
    const actualizarFiltros = useCallback((newFilters) => {
        // console.log('Actualizando filtros:', newFilters);
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Resetear filtros
    const resetearFiltros = useCallback(() => {
        // console.log('Reseteando filtros');
        setFilters({
            searchQuery: '',
            genero: 'todos',
            edadMin: '',
            edadMax: '',
            sortBy: 'nombreCompleto',
            order: 'asc'
        });
    }, []);

    // ESTUDIANTES FILTRADOS Y ORDENADOS - Usar useMemo
    const estudiantesFiltrados = useMemo(() => {
        // console.log('🔍 Aplicando filtros y ordenamiento...');

        if (loading) return [];

        // 1. Filtrar
        let resultado = [...estudiantes];

        // Filtrar por búsqueda
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            resultado = resultado.filter(est =>
                est.nombreCompleto?.toLowerCase().includes(query) ||
                est.cedula?.toLowerCase().includes(query) ||
                est.email?.toLowerCase().includes(query)
            );
        }

        // Filtrar por género
        if (filters.genero !== 'todos') {
            resultado = resultado.filter(est => est.genero === filters.genero);
        }

        // Filtrar por edad mínima
        if (filters.edadMin) {
            const edadMinNum = parseInt(filters.edadMin);
            resultado = resultado.filter(est => est.edad >= edadMinNum);
        }

        // Filtrar por edad máxima
        if (filters.edadMax) {
            const edadMaxNum = parseInt(filters.edadMax);
            resultado = resultado.filter(est => est.edad <= edadMaxNum);
        }

        // 2. Ordenar
        const orden = filters.order === 'asc' ? 1 : -1;

        resultado.sort((a, b) => {
            const aValue = a[filters.sortBy] || '';
            const bValue = b[filters.sortBy] || '';

            if (aValue < bValue) return -1 * orden;
            if (aValue > bValue) return 1 * orden;
            return 0;
        });

        return resultado;

    }, [estudiantes, filters, loading]);

    // Cargar estudiantes al montar - SOLO UNA VEZ
    // useEffect(() => {
    //     console.log('🎯 useEffect de montaje ejecutándose');

    //     let mounted = true;

    //     const cargar = async () => {
    //         if (mounted) {
    //             await cargarEstudiantes();
    //         }
    //     };

    //     cargar();

    //     // Cleanup para evitar actualizaciones si el componente se desmonta
    //     return () => {
    //         console.log('🧹 Cleanup del hook');
    //         mounted = false;
    //     };
    // }, []); // Array vacío - solo al montar

    // useEffect para cargar solo una vez
    useEffect(() => {
        isMountedRef.current = true;

        // Solo cargar si no se ha cargado antes
        if (!hasLoadedRef.current) {
            cargarEstudiantes();
        }

        // Cleanup
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return {
        estudiantes: estudiantesFiltrados, // Ya están filtrados y ordenados
        estudiantesOriginales: estudiantes, // Datos sin filtrar
        loading,
        error,
        filters,
        cargarEstudiantes,
        buscarPorCedula,
        obtenerEstudiante,
        crearEstudiante,
        editarEstudiante,
        eliminarEstudiante,
        actualizarFiltros,
        resetearFiltros
    };
};