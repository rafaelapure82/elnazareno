// import { useState, useEffect, useCallback } from 'react';
// import { seccionesService } from '../servicios/secciones.service';
// import Swal from 'sweetalert2';

// export const useSecciones = () => {
//     const [grados, setGrados] = useState([]);
//     const [secciones, setSecciones] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [añoEscolarActual, setAñoEscolarActual] = useState(null);

//     // Obtener año escolar actual
//     const obtenerAñoEscolarActual = useCallback(async () => {
//         const result = await seccionesService.obtenerAñoEscolarActual();
//         if (result.success) {
//             setAñoEscolarActual(result.data.añoEscolar);
//         }
//         return result.data?.añoEscolar;
//     }, []);

//     // GRADOS
//     const obtenerGrados = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const result = await seccionesService.obtenerGrados();
//             if (result.success) {
//                 setGrados(result.data);
//                 return result.data;
//             } else {
//                 setError(result.message);
//                 Swal.fire('Error', result.message, 'error');
//                 return [];
//             }
//         } catch (err) {
//             setError('Error al cargar grados');
//             Swal.fire('Error', 'Error al cargar grados', 'error');
//             return [];
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     const crearGrado = useCallback(async (gradoData) => {
//         setLoading(true);
//         try {
//             const result = await seccionesService.crearGrado(gradoData);
//             if (result.success) {
//                 await obtenerGrados();
//                 Swal.fire('Éxito', result.message, 'success');
//                 return result.data;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return null;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al crear grado', 'error');
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     }, [obtenerGrados]);

//     const actualizarGrado = useCallback(async (id, gradoData) => {
//         setLoading(true);
//         try {
//             const result = await seccionesService.actualizarGrado(id, gradoData);
//             if (result.success) {
//                 await obtenerGrados();
//                 Swal.fire('Éxito', result.message, 'success');
//                 return result.data;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return null;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al actualizar grado', 'error');
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     }, [obtenerGrados]);

//     const eliminarGrado = useCallback(async (id) => {
//         const confirm = await Swal.fire({
//             title: '¿Estás seguro?',
//             text: "Esta acción no se puede deshacer",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Sí, eliminar',
//             cancelButtonText: 'Cancelar'
//         });

//         if (!confirm.isConfirmed) return false;

//         setLoading(true);
//         try {
//             const result = await seccionesService.eliminarGrado(id);
//             if (result.success) {
//                 await obtenerGrados();
//                 Swal.fire('Eliminado', result.message, 'success');
//                 return true;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return false;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al eliminar grado', 'error');
//             return false;
//         } finally {
//             setLoading(false);
//         }
//     }, [obtenerGrados]);

//     const obtenerGradoPorId = useCallback(async (id) => {
//         setLoading(true);
//         try {
//             const result = await seccionesService.obtenerGradoPorId(id);
//             if (result.success) {
//                 return result.data;
//             } else {
//                 throw new Error(result.message);
//             }
//         } catch (error) {
//             throw new Error(`Error al obtener grado: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     }, [])

//     // SECCIONES
//     const obtenerSeccionesPorGrado = useCallback(async (gradoId) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const result = await seccionesService.obtenerSeccionesPorGrado(gradoId);
//             if (result.success) {
//                 setSecciones(result.data);
//                 return result.data;
//             } else {
//                 setError(result.message);
//                 Swal.fire('Error', result.message, 'error');
//                 return [];
//             }
//         } catch (err) {
//             setError('Error al cargar secciones');
//             Swal.fire('Error', 'Error al cargar secciones', 'error');
//             return [];
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     const crearSeccion = useCallback(async (seccionData) => {
//         setLoading(true);
//         try {
//             const result = await seccionesService.crearSeccion(seccionData);
//             if (result.success) {
//                 await obtenerSeccionesPorGrado(seccionData.grado_id);
//                 Swal.fire('Éxito', result.message, 'success');
//                 return result.data;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return null;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al crear sección', 'error');
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     }, [obtenerSeccionesPorGrado]);

//     const actualizarSeccion = useCallback(async (id, seccionData) => {
//         setLoading(true);
//         try {
//             const result = await seccionesService.actualizarSeccion(id, seccionData);
//             if (result.success) {
//                 // Actualizar la sección en el estado
//                 setSecciones(prev => prev.map(sec =>
//                     sec.id === id ? { ...sec, ...result.data } : sec
//                 ));
//                 Swal.fire('Éxito', result.message, 'success');
//                 return result.data;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return null;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al actualizar sección', 'error');
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     const eliminarSeccion = useCallback(async (id, gradoId) => {
//         const confirm = await Swal.fire({
//             title: '¿Estás seguro?',
//             text: "Esta acción eliminará todos los estudiantes y profesores asignados",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Sí, eliminar',
//             cancelButtonText: 'Cancelar'
//         });

//         if (!confirm.isConfirmed) return false;

//         setLoading(true);
//         try {
//             const result = await seccionesService.eliminarSeccion(id);
//             if (result.success) {
//                 await obtenerSeccionesPorGrado(gradoId);
//                 Swal.fire('Eliminado', result.message, 'success');
//                 return true;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return false;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al eliminar sección', 'error');
//             return false;
//         } finally {
//             setLoading(false);
//         }
//     }, [obtenerSeccionesPorGrado]);

//     // PROFESORES EN SECCIONES
//     const asignarProfesorASeccion = useCallback(async (seccionId, profesorId, data) => {
//         setLoading(true);
//         try {
//             const result = await seccionesService.asignarProfesorASeccion(seccionId, profesorId, data);
//             if (result.success) {
//                 Swal.fire('Éxito', result.message, 'success');
//                 return result.data;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return null;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al asignar profesor', 'error');
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     const removerProfesorDeSeccion = useCallback(async (seccionId, profesorId) => {
//         const confirm = await Swal.fire({
//             title: '¿Estás seguro?',
//             text: "¿Desea remover este profesor de la sección?",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Sí, remover',
//             cancelButtonText: 'Cancelar'
//         });

//         if (!confirm.isConfirmed) return false;

//         setLoading(true);
//         try {
//             const result = await seccionesService.removerProfesorDeSeccion(seccionId, profesorId);
//             if (result.success) {
//                 Swal.fire('Éxito', result.message, 'success');
//                 return true;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return false;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al remover profesor', 'error');
//             return false;
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     // ESTUDIANTES EN SECCIONES
//     const inscribirEstudianteASeccion = useCallback(async (seccionId, estudianteId, añoEscolar) => {
//         setLoading(true);
//         try {
//             const result = await seccionesService.inscribirEstudianteASeccion(seccionId, estudianteId, añoEscolar);
//             if (result.success) {
//                 Swal.fire('Éxito', result.message, 'success');
//                 return result.data;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return null;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al inscribir estudiante', 'error');
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     const removerEstudianteDeSeccion = useCallback(async (seccionId, estudianteId) => {
//         const confirm = await Swal.fire({
//             title: '¿Estás seguro?',
//             text: "¿Desea remover este estudiante de la sección?",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Sí, remover',
//             cancelButtonText: 'Cancelar'
//         });

//         if (!confirm.isConfirmed) return false;

//         setLoading(true);
//         try {
//             const result = await seccionesService.removerEstudianteDeSeccion(seccionId, estudianteId);
//             if (result.success) {
//                 Swal.fire('Éxito', result.message, 'success');
//                 return true;
//             } else {
//                 Swal.fire('Error', result.message, 'error');
//                 return false;
//             }
//         } catch (err) {
//             Swal.fire('Error', 'Error al remover estudiante', 'error');
//             return false;
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     // Obtener año escolar al cargar
//     useEffect(() => {
//         obtenerAñoEscolarActual();
//     }, [obtenerAñoEscolarActual]);

//     return {
//         // Estados
//         grados,
//         secciones,
//         loading,
//         error,
//         añoEscolarActual,

//         // Métodos para Grados
//         obtenerGrados,
//         crearGrado,
//         actualizarGrado,
//         eliminarGrado,
//         obtenerGradoPorId,

//         // Métodos para Secciones
//         obtenerSeccionesPorGrado,
//         crearSeccion,
//         actualizarSeccion,
//         eliminarSeccion,

//         // Métodos para Profesores
//         asignarProfesorASeccion,
//         removerProfesorDeSeccion,

//         // Métodos para Estudiantes
//         inscribirEstudianteASeccion,
//         removerEstudianteDeSeccion,

//         // Servicios directos (para componentes específicos)
//         servicios: seccionesService
//     };
// };



import { useState, useEffect, useCallback } from 'react';
import { seccionesService } from '../servicios/secciones.service';
import Swal from 'sweetalert2';

// Crear un estado global fuera del hook para persistencia
let gradosCache = [];
let seccionesCache = [];
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

export const useSecciones = () => {
    const [grados, setGrados] = useState(gradosCache);
    const [secciones, setSecciones] = useState(seccionesCache);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [añoEscolarActual, setAñoEscolarActual] = useState(null);
    // Verificar si la caché es válida
    const isCacheValid = () => {
        return cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION);
    };

    // Obtener año escolar actual
    const obtenerAñoEscolarActual = useCallback(async () => {
        const result = await seccionesService.obtenerAñoEscolarActual();
        if (result.success) {
            setAñoEscolarActual(result.data.añoEscolar);
        }
        return result.data?.añoEscolar;
    }, []);

    // GRADOS - Con caché
    const obtenerGrados = useCallback(async (forceRefresh = false) => {
        // Si tenemos caché válida y no forzamos refresh, usar caché
        if (isCacheValid() && gradosCache.length > 0 && !forceRefresh) {
            setGrados(gradosCache);
            return gradosCache;
        }

        setLoading(true);
        setError(null);
        try {
            const result = await seccionesService.obtenerGrados();
            if (result.success) {
                // Actualizar caché
                gradosCache = result.data;
                cacheTimestamp = Date.now();

                // Actualizar estado local
                setGrados(result.data);
                return result.data;
            } else {
                setError(result.message);
                Swal.fire('Error', result.message, 'error');
                return gradosCache.length > 0 ? gradosCache : [];
            }
        } catch (err) {
            setError('Error al cargar grados');
            Swal.fire('Error', 'Error al cargar grados', 'error');
            return gradosCache.length > 0 ? gradosCache : [];
        } finally {
            setLoading(false);
        }
    }, []);

    const crearGrado = useCallback(async (gradoData) => {
        setLoading(true);
        try {
            const result = await seccionesService.crearGrado(gradoData);
            if (result.success) {
                // Invalidar caché para forzar refresh
                cacheTimestamp = null;
                await obtenerGrados(true); // Forzar refresh
                Swal.fire('Éxito', result.message, 'success');
                return result.data;
            } else {
                Swal.fire('Error', result.message, 'error');
                return null;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al crear grado', 'error');
            return null;
        } finally {
            setLoading(false);
        }
    }, [obtenerGrados]);

    const actualizarGrado = useCallback(async (id, gradoData) => {
        setLoading(true);
        try {
            const result = await seccionesService.actualizarGrado(id, gradoData);
            if (result.success) {
                // Invalidar caché para forzar refresh
                cacheTimestamp = null;
                await obtenerGrados(true); // Forzar refresh
                Swal.fire('Éxito', result.message, 'success');
                return result.data;
            } else {
                Swal.fire('Error', result.message, 'error');
                return null;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al actualizar grado', 'error');
            return null;
        } finally {
            setLoading(false);
        }
    }, [obtenerGrados]);

    const eliminarGrado = useCallback(async (id) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return false;

        setLoading(true);
        try {
            const result = await seccionesService.eliminarGrado(id);
            if (result.success) {
                // Invalidar caché para forzar refresh
                cacheTimestamp = null;
                await obtenerGrados(true); // Forzar refresh
                Swal.fire('Eliminado', result.message, 'success');
                return true;
            } else {
                Swal.fire('Error', result.message, 'error');
                return false;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al eliminar grado', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    }, [obtenerGrados]);

    const obtenerGradoPorId = useCallback(async (id) => {
        // Primero buscar en caché
        const gradoFromCache = gradosCache.find(g => g.id.toString() === id.toString());
        if (gradoFromCache) {
            return gradoFromCache;
        }

        setLoading(true);
        try {
            const result = await seccionesService.obtenerGradoPorId(id);
            if (result.success) {
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            throw new Error(`Error al obtener grado: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    // SECCIONES - Con caché por grado
    const obtenerSeccionesPorGrado = useCallback(async (gradoId, forceRefresh = false) => {
        setLoading(true);
        setError(null);
        try {
            const result = await seccionesService.obtenerSeccionesPorGrado(gradoId);
            if (result.success) {
                setSecciones(result.data);
                return result.data;
            } else {
                setError(result.message);
                Swal.fire('Error', result.message, 'error');
                return [];
            }
        } catch (err) {
            setError('Error al cargar secciones');
            Swal.fire('Error', 'Error al cargar secciones', 'error');
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const crearSeccion = useCallback(async (seccionData) => {
        setLoading(true);
        try {
            const result = await seccionesService.crearSeccion(seccionData);
            if (result.success) {
                // Invalidar caché de grados porque cambió el número de secciones
                cacheTimestamp = null;
                // Refrescar las secciones del grado
                await obtenerSeccionesPorGrado(seccionData.grado_id, true);
                Swal.fire('Éxito', result.message, 'success');
                return result.data;
            } else {
                Swal.fire('Error', result.message, 'error');
                return null;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al crear sección', 'error');
            return null;
        } finally {
            setLoading(false);
        }
    }, [obtenerSeccionesPorGrado]);

    const actualizarSeccion = useCallback(async (id, seccionData) => {
        setLoading(true);
        try {
            const result = await seccionesService.actualizarSeccion(id, seccionData);
            if (result.success) {
                // Actualizar la sección en el estado local
                setSecciones(prev => prev.map(sec =>
                    sec.id === id ? { ...sec, ...result.data } : sec
                ));
                Swal.fire('Éxito', result.message, 'success');
                return result.data;
            } else {
                Swal.fire('Error', result.message, 'error');
                return null;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al actualizar sección', 'error');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const eliminarSeccion = useCallback(async (id, gradoId) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción eliminará todos los estudiantes y profesores asignados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return false;

        setLoading(true);
        try {
            const result = await seccionesService.eliminarSeccion(id);
            if (result.success) {
                // Invalidar caché de grados
                cacheTimestamp = null;
                // Refrescar las secciones
                await obtenerSeccionesPorGrado(gradoId, true);
                Swal.fire('Eliminado', result.message, 'success');
                return true;
            } else {
                Swal.fire('Error', result.message, 'error');
                return false;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al eliminar sección', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    }, [obtenerSeccionesPorGrado]);

    // PROFESORES EN SECCIONES
    const asignarProfesorASeccion = useCallback(async (seccionId, profesorId, data) => {
        setLoading(true);
        try {
            const result = await seccionesService.asignarProfesorASeccion(seccionId, profesorId, data);
            if (result.success) {
                Swal.fire('Éxito', result.message, 'success');
                return result.data;
            } else {
                Swal.fire('Error', result.message, 'error');
                return null;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al asignar profesor', 'error');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const removerProfesorDeSeccion = useCallback(async (seccionId, profesorId) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea remover este profesor de la sección?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, remover',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return false;

        setLoading(true);
        try {
            const result = await seccionesService.removerProfesorDeSeccion(seccionId, profesorId);
            if (result.success) {
                Swal.fire('Éxito', result.message, 'success');
                return true;
            } else {
                Swal.fire('Error', result.message, 'error');
                return false;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al remover profesor', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // ESTUDIANTES EN SECCIONES
    const inscribirEstudianteASeccion = useCallback(async (seccionId, estudianteId, añoEscolar) => {
        setLoading(true);
        try {
            const result = await seccionesService.inscribirEstudianteASeccion(seccionId, estudianteId, añoEscolar);
            if (result.success) {
                Swal.fire('Éxito', result.message, 'success');
                return result.data;
            } else {
                Swal.fire('Error', result.message, 'error');
                return null;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al inscribir estudiante', 'error');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const removerEstudianteDeSeccion = useCallback(async (seccionId, estudianteId) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea remover este estudiante de la sección?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, remover',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return false;

        setLoading(true);
        try {
            const result = await seccionesService.removerEstudianteDeSeccion(seccionId, estudianteId);
            if (result.success) {
                Swal.fire('Éxito', result.message, 'success');
                return true;
            } else {
                Swal.fire('Error', result.message, 'error');
                return false;
            }
        } catch (err) {
            Swal.fire('Error', 'Error al remover estudiante', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener año escolar al cargar
    useEffect(() => {
        obtenerAñoEscolarActual();
    }, [obtenerAñoEscolarActual]);

    // Cargar grados automáticamente si la caché está vacía
    useEffect(() => {
        if (grados.length === 0 && !loading) {
            obtenerGrados();
        }
    }, []); // Solo al montar

    return {
        // Estados
        grados,
        secciones,
        loading,
        error,
        añoEscolarActual,

        // Métodos para Grados
        obtenerGrados,
        crearGrado,
        actualizarGrado,
        eliminarGrado,
        obtenerGradoPorId,

        // Métodos para Secciones
        obtenerSeccionesPorGrado,
        crearSeccion,
        actualizarSeccion,
        eliminarSeccion,

        // Métodos para Profesores
        asignarProfesorASeccion,
        removerProfesorDeSeccion,

        // Métodos para Estudiantes
        inscribirEstudianteASeccion,
        removerEstudianteDeSeccion,

        // Servicios directos (para componentes específicos)
        servicios: seccionesService
    };
};