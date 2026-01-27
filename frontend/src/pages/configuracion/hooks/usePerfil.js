import { useState, useEffect, useCallback } from 'react';
import { PerfilServicio } from '../servicios/perfil.servicio';

export const usePerfil = (idUsuario) => {
    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargarPerfil = useCallback(async () => {
        try {
            setCargando(true);
            setError(null);
            const datos = await PerfilServicio.obtenerPerfil(idUsuario);
            setPerfil(datos);
        } catch (err) {
            // Manejar errores de autenticación específicamente
            if (err.response?.status === 401) {
                setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            } else if (err.response?.status === 403) {
                setError('No tienes permiso para acceder a este perfil.');
            } else {
                setError(err.message || 'Error al cargar el perfil');
            }
        } finally {
            setCargando(false);
        }
    }, [idUsuario]);

    // Cargar perfil al iniciar
    useEffect(() => {
        if (idUsuario) {
            cargarPerfil();
        }
    }, [idUsuario, cargarPerfil]);

    const actualizarPerfil = async (datos) => {
        try {
            setError(null);
            const perfilActualizado = await PerfilServicio.actualizarPerfil(idUsuario, datos);
            setPerfil(perfilActualizado);
            return { success: true, data: perfilActualizado };
        } catch (err) {
            const mensajeError = err.response?.data?.message || err.message || 'Error al actualizar';

            // Manejar errores específicos
            if (err.response?.status === 401) {
                return {
                    success: false,
                    error: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
                };
            }

            setError(mensajeError);
            return { success: false, error: mensajeError };
        }
    };

    const cambiarContrasena = async (datos) => {
        try {
            setError(null);
            await PerfilServicio.cambiarContrasena(idUsuario, datos);
            return { success: true };
        } catch (err) {
            const mensajeError = err.response?.data?.message || err.message || 'Error al cambiar contraseña';

            // Manejar errores específicos
            if (err.response?.status === 401) {
                return {
                    success: false,
                    error: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
                };
            }

            setError(mensajeError);
            return { success: false, error: mensajeError };
        }
    };

    return {
        perfil,
        cargando,
        error,
        actualizarPerfil,
        cambiarContrasena,
        recargarPerfil: cargarPerfil
    };
};