import { PerfilAdaptador } from '../adaptadores/perfil.adaptador';
import axiosInstance from '../../../compartidos/api/axios.config'
export class PerfilServicio {
    /**
     * Obtiene el perfil del usuario por ID
     * @param {number} id - ID del usuario
     */
    static async obtenerPerfil(id) {
        try {
            const response = await axiosInstance.get(`usuarios/perfil/${id}`);
            if (response.data.success) {
                return PerfilAdaptador.adaptarPerfil(response.data.data);
            }
            throw new Error('Error al obtener perfil');
        } catch (error) {
            console.error('Error en obtenerPerfil:', error);
            throw error;
        }
    }

    /**
     * Actualiza los datos del perfil
     * @param {number} id - ID del usuario
     * @param {Object} datos - Datos a actualizar
     */
    static async actualizarPerfil(id, datos) {
        try {
            const datosAdaptados = PerfilAdaptador.adaptarActualizacionPerfil(datos);
            const response = await axiosInstance.put(`usuarios/perfil/${id}`, datosAdaptados);

            if (response.data.success) {
                return PerfilAdaptador.adaptarPerfil(response.data.data);
            }
            throw new Error('Error al actualizar perfil');
        } catch (error) {
            console.error('Error en actualizarPerfil:', error);
            throw error;
        }
    }

    /**
     * Cambia la contraseña del usuario
     * @param {number} id - ID del usuario
     * @param {Object} datos - Datos para cambiar contraseña
     */
    static async cambiarContrasena(id, datos) {
        try {
            const datosAdaptados = PerfilAdaptador.adaptarCambioContrasena(datos);
            const response = await axiosInstance.put(`usuarios/perfil/contrasena/${id}`, datosAdaptados);

            return response.data.success;
        } catch (error) {
            console.error('Error en cambiarContrasena:', error);
            throw error;
        }
    }
}