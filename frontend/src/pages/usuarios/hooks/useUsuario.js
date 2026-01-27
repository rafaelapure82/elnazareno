import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { UsuarioServicio } from '../servicios/usuario.servicio';
import { UsuarioAdaptador } from '../adaptadores/usuario.adaptador';

export const useUsuario = () => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cargarUsuario = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await UsuarioServicio.obtenerUsuarioPorId(id);
            if (response.success) {
                const usuarioAdaptado = UsuarioAdaptador.fromApi(response.data);
                setUsuario(usuarioAdaptado);
                return usuarioAdaptado;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar usuario');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const crearUsuario = useCallback(async (usuarioData) => {
        setLoading(true);
        try {
            const datosApi = UsuarioAdaptador.toApi(usuarioData);
            const response = await UsuarioServicio.crearUsuario(datosApi);

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: response.message,
                    timer: 2000,
                    showConfirmButton: false
                });
                return response.data;
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al crear usuario';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMsg
            });
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const actualizarUsuario = useCallback(async (id, usuarioData) => {
        setLoading(true);
        try {
            const datosApi = UsuarioAdaptador.toApiUpdate(usuarioData);
            const response = await UsuarioServicio.actualizarUsuario(id, datosApi);

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: response.message,
                    timer: 2000,
                    showConfirmButton: false
                });
                return response.resultado;
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al actualizar usuario';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMsg
            });
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        usuario,
        loading,
        error,
        cargarUsuario,
        crearUsuario,
        actualizarUsuario
    };
};