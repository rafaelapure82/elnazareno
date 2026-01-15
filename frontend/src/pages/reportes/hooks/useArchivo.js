// src/modules/reportes/hooks/useArchivos.js
import { useState, useEffect, useCallback } from 'react';
import { ArchivosServicio } from '../servicios/archivo.servicio';
import { ArchivosAdaptador } from '../adaptadores/archivo.adaptador';

export const useArchivos = () => {
    const [archivos, setArchivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        categoria: 'todos',
        sortBy: 'fechaSubida',
        order: 'desc',
        searchQuery: ''
    });

    // Cargar archivos
    const cargarArchivos = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {

            const response = await ArchivosServicio.obtenerTodosArchivos();

            const archivosList = ArchivosAdaptador.toFileList(response.data);
            setArchivos(archivosList);
        } catch (err) {
            setError(err.message || 'Error al cargar archivos');
            console.error('Error cargando archivos:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Buscar archivos
    const buscarArchivos = useCallback(async (query) => {

        if (!query.trim()) {
            await cargarArchivos();
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const response = await ArchivosServicio.buscarArchivos(query);
            const archivosList = ArchivosAdaptador.toFileList(response.data);
            setArchivos(archivosList);
        } catch (err) {
            setError(err.message || 'Error al buscar archivos');
        } finally {
            setLoading(false);
        }
    }, [cargarArchivos]);

    // Obtener archivo por ID
    const obtenerArchivo = useCallback(async (id) => {
        try {
            const response = await ArchivosServicio.obtenerArchivoPorId(id);
            return ArchivosAdaptador.fromApiResponse(response);
        } catch (err) {
            throw new Error(err.message || 'Error al obtener archivo');
        }
    }, []);

    // Eliminar archivo
    const eliminarArchivo = useCallback(async (id) => {
        try {
            await ArchivosServicio.eliminarArchivo(id);
            // Actualizar lista local
            setArchivos(prev => prev.filter(archivo => archivo.id !== id));
            return true;
        } catch (err) {
            throw new Error(err.message || 'Error al eliminar archivo');
        }
    }, []);

    // Descargar archivo
    const descargarArchivo = useCallback(async (id, nombreArchivo) => {
        try {
            await ArchivosServicio.descargarArchivo(id, nombreArchivo);
        } catch (err) {
            throw new Error(err.message || 'Error al descargar archivo');
        }
    }, []);

    // Filtrar y ordenar archivos
    const filteredArchivos = ArchivosAdaptador.filterByCategory(archivos, filters.categoria);
    const sortedArchivos = ArchivosAdaptador.sortArchivos(
        filteredArchivos,
        filters.sortBy,
        filters.order
    );

    // Filtrar por búsqueda
    const searchedArchivos = filters.searchQuery
        ? sortedArchivos.filter(archivo =>
            archivo.nombre.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            archivo.descripcion.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            archivo.categoria.toLowerCase().includes(filters.searchQuery.toLowerCase())
        )
        : sortedArchivos;

    // Actualizar filtros
    const actualizarFiltros = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Cargar inicialmente
    useEffect(() => {
        cargarArchivos();
    }, [cargarArchivos]);

    return {
        archivos: searchedArchivos,
        loading,
        error,
        filters,
        cargarArchivos,
        buscarArchivos,
        obtenerArchivo,
        eliminarArchivo,
        descargarArchivo,
        actualizarFiltros
    };
};