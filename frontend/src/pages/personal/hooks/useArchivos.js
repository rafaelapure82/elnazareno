import { useState, useCallback } from 'react';
import { PersonalServicio } from '../servicios/personal.servicio'

export const useArchivos = (personalId) => {
    const [archivos, setArchivos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener archivos
    const obtenerArchivos = useCallback(async () => {
        if (!personalId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await PersonalServicio.obtenerPersonalPorId(personalId);
            setArchivos(response.data?.archivos || []);
        } catch (err) {
            setError(err.message || 'Error al cargar archivos');
        } finally {
            setLoading(false);
        }
    }, [personalId]);

    // Eliminar archivo
    const eliminarArchivo = useCallback(async (archivoId) => {
        try {
            await PersonalServicio.eliminarArchivo(personalId, archivoId);
            setArchivos(prev => prev.filter(archivo => archivo.id !== archivoId));
            return true;
        } catch (err) {
            throw new Error(err.message || 'Error al eliminar archivo');
        }
    }, [personalId]);

    // Descargar archivo
    const descargarArchivo = useCallback(async (archivo) => {
        try {
            const response = await fetch(archivo.ruta_archivo);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = archivo.nombre_archivo;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            throw new Error(err.message || 'Error al descargar archivo');
        }
    }, []);

    return {
        archivos,
        loading,
        error,
        obtenerArchivos,
        eliminarArchivo,
        descargarArchivo
    };
};