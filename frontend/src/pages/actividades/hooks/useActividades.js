// modules/actividades/hooks/useActividades.js
import { useState, useCallback, useEffect } from 'react';
import ActividadesServicio from '../servicios/actividades.servicio';

export const useActividades = () => {
    const [actividades, setActividades] = useState([]);
    const [actividadActual, setActividadActual] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [paginacion, setPaginacion] = useState({
        paginaActual: 1,
        totalPaginas: 1,
        totalActividades: 0,
        limite: 10
    });
    const [busqueda, setBusqueda] = useState('');

    /**Obtener todas las actividades*/
    const obtenerActividades = useCallback(async (pagina = 1, limite = 10) => {
        setCargando(true);
        setError(null);

        try {
            const resultado = await ActividadesServicio.obtenerTodasActividades(pagina, limite);

            if (resultado.success) {
                setActividades(resultado.data.actividades);
                setPaginacion({
                    paginaActual: resultado.data.paginaActual,
                    totalPaginas: resultado.data.paginas,
                    totalActividades: resultado.data.total,
                    limite
                });
            } else {
                setError(resultado.message);
            }
        } catch (err) {
            setError('Error inesperado al obtener actividades');
        } finally {
            setCargando(false);
        }
    }, []);

    /**Buscar actividades*/
    const buscarActividades = useCallback(async (termino, pagina = 1, limite = 10) => {
        if (!termino.trim()) {
            obtenerActividades(pagina, limite);
            return;
        }

        setCargando(true);
        setError(null);
        setBusqueda(termino);

        try {
            const resultado = await ActividadesServicio.buscarActividades(termino, pagina, limite);

            if (resultado.success) {
                setActividades(resultado.data.actividades);
                setPaginacion({
                    paginaActual: resultado.data.paginaActual,
                    totalPaginas: resultado.data.paginas,
                    totalActividades: resultado.data.total,
                    limite
                });
            } else {
                setError(resultado.message);
            }
        } catch (err) {
            setError('Error al buscar actividades');
        } finally {
            setCargando(false);
        }
    }, [obtenerActividades]);

    /**Obtener actividad por ID*/
    const obtenerActividadPorId = useCallback(async (id) => {
        setCargando(true);
        setError(null);

        try {
            const resultado = await ActividadesServicio.obtenerActividadPorId(id);

            if (resultado.success) {
                setActividadActual(resultado.data);
            } else {
                setError(resultado.message);
            }

            return resultado;
        } catch (err) {
            setError('Error al obtener la actividad');
            return { success: false, message: 'Error al obtener la actividad' };
        } finally {
            setCargando(false);
        }
    }, []);

    /**Crear una nueva actividad*/
    const crearActividad = async (titulo, descripcion, imagenes = []) => {
        setCargando(true);
        setError(null);

        try {
            // Validar archivos antes de enviar
            const validacion = ActividadesServicio.validarArchivos(imagenes);
            if (!validacion.valido) {
                setError(validacion.errores.join(', '));
                return { success: false, message: validacion.errores.join(', ') };
            }

            const resultado = await ActividadesServicio.crearActividad(
                titulo,
                descripcion,
                imagenes
            );



            if (resultado.success) {


                const actividadNormalizada = {
                    id: resultado.data.id,
                    titulo: resultado.data.titulo || titulo,
                    descripcion: resultado.data.descripcion || descripcion,
                    imagenes: Array.isArray(resultado.data.imagenes) ? resultado.data.imagenes : [],
                    fechaCreacion: resultado.data.fechaCreacion || new Date().toISOString(),
                    fechaActualizacion: resultado.data.fechaActualizacion || new Date().toISOString(),
                    // Agrega otras propiedades que necesites
                    ...resultado.data // Mantiene cualquier otra propiedad
                };

                console.log('Actividad normalizada:', actividadNormalizada); // <-- AQUÍ

                // Agregar la nueva actividad al inicio de la lista
                setActividades(prev => [actividadNormalizada, ...prev]);
                return {
                    success: true,
                    data: resultado.data,
                    message: resultado.message
                };
            } else {
                setError(resultado.message);
                return { success: false, message: resultado.message };
            }
        } catch (err) {
            const errorMsg = 'Error inesperado al crear actividad';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        } finally {
            setCargando(false);
        }
    };

    /**Eliminar una actividad*/
    const eliminarActividad = async (id) => {
        setCargando(true);
        setError(null);

        try {
            const resultado = await ActividadesServicio.eliminarActividad(id);

            if (resultado.success) {
                // Remover la actividad de la lista
                setActividades(prev => prev.filter(act => act.id !== id));

                // Si estamos viendo la actividad eliminada, limpiar
                if (actividadActual?.id === id) {
                    setActividadActual(null);
                }

                return { success: true, message: resultado.message };
            } else {
                setError(resultado.message);
                return { success: false, message: resultado.message };
            }
        } catch (err) {
            const errorMsg = 'Error inesperado al eliminar actividad';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        } finally {
            setCargando(false);
        }
    };

    /**Editar una actividad */
    const editarActividad = async (id, titulo, descripcion, nuevasImagenes = [], imagenesAEliminar = []) => {
        setCargando(true);
        setError(null);

        try {
            // Validar nuevas imágenes
            if (nuevasImagenes.length > 0) {
                const validacion = ActividadesServicio.validarArchivos(nuevasImagenes);
                if (!validacion.valido) {
                    setError(validacion.errores.join(', '));
                    return { success: false, message: validacion.errores.join(', ') };
                }
            }

            const resultado = await ActividadesServicio.editarActividad(
                id,
                titulo,
                descripcion,
                nuevasImagenes,
                imagenesAEliminar
            );

            // console.log('Resultado de editarActividad:', resultado);

            if (resultado.success) {
                // Actualizar la actividad en la lista
                setActividades(prev =>
                    prev.map(act =>
                        act.id === id ? resultado.data : act
                    )
                );

                // Actualizar actividad actual si está seleccionada
                if (actividadActual?.id === id) {
                    setActividadActual(resultado.data);
                }

                return {
                    success: true,
                    data: resultado.data,
                    message: resultado.message
                };
            } else {
                setError(resultado.message);
                return { success: false, message: resultado.message };
            }
        } catch (err) {
            const errorMsg = 'Error inesperado al editar actividad';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        } finally {
            setCargando(false);
        }
    };

    /**Limpiar actividad actual*/
    const limpiarActividadActual = () => {
        setActividadActual(null);
    };

    /**Cambiar de página */
    const cambiarPagina = (nuevaPagina) => {
        if (busqueda) {
            buscarActividades(busqueda, nuevaPagina, paginacion.limite);
        } else {
            obtenerActividades(nuevaPagina, paginacion.limite);
        }
    };

    /** Limpiar búsqueda */
    const limpiarBusqueda = () => {
        setBusqueda('');
        obtenerActividades(1, paginacion.limite);
    };

    return {
        actividades,
        actividadActual,
        cargando,
        error,
        paginacion,
        busqueda,
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
    };
};