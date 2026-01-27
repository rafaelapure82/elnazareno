import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { UsuarioServicio } from '../servicios/usuario.servicio';
import { UsuarioAdaptador } from '../adaptadores/usuario.adaptador';

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [error, setError] = useState(null);

    // const cargarUsuarios = useCallback(async (params = {}) => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const response = await UsuarioServicio.obtenerUsuarios(params);
    //         if (response.success) {
    //             const usuariosAdaptados = response.data.map(UsuarioAdaptador.fromApi);
    //             setUsuarios(usuariosAdaptados);
    //             setTotal(response.total);
    //         }
    //     } catch (err) {
    //         setError(err.response?.data?.message || 'Error al cargar usuarios');
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error',
    //             text: 'No se pudieron cargar los usuarios'
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    const cargarUsuarios = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await UsuarioServicio.obtenerUsuarios(params);
            console.log('Response from API:', response);
            if (response.success) {
                const usuariosAdaptados = response.data.usuarios.map(UsuarioAdaptador.fromApi);
                setUsuarios(usuariosAdaptados);
                setTotal(response.total);
                setPaginaActual(response.pagina || 1);
                setTotalPaginas(response.totalPaginas || 1);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar usuarios');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los usuarios'
            });
        } finally {
            setLoading(false);
        }
    }, []);


    const eliminarUsuario = useCallback(async (id, usuarioActualId) => {
        if (id === usuarioActualId) {
            Swal.fire({
                icon: 'warning',
                title: 'No permitido',
                text: 'No puedes eliminar tu propio usuario'
            });
            return false;
        }

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return false;

        try {
            setLoading(true);
            const response = await UsuarioServicio.eliminarUsuario(id);

            if (response.success) {
                setUsuarios(prev => prev.filter(user => user.id !== id));
                setTotal(prev => prev - 1);

                Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    text: 'El usuario ha sido eliminado',
                    timer: 2000,
                    showConfirmButton: false
                });

                return true;
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al eliminar usuario';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMsg
            });
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        usuarios,
        loading,
        error,
        total,
        cargarUsuarios,
        eliminarUsuario
    };
};