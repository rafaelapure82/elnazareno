// src/modules/login/services/api.service.js
import axiosInstance from "../../../compartidos/api/axios.config";

export class ApiServicio {
    static async post(endpoint, data) {
        try {
            const respuesta = await axiosInstance.post(endpoint, data);
            return respuesta.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async get(endpoint) {
        try {
            const respuesta = await axiosInstance.get(endpoint);
            return respuesta.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static handleError(error) {
        if (error.response) {
            // Error del servidor
            const { status, data } = error.response;
            switch (status) {
                case 400:
                    throw new Error(data.message || 'Datos inválidos');
                case 401:
                    throw new Error('Credenciales incorrectas');
                case 403:
                    throw new Error('No tienes permisos para acceder');
                case 404:
                    throw new Error('Recurso no encontrado');
                case 500:
                    throw new Error('Error interno del servidor');
                default:
                    throw new Error(data.message || 'Error desconocido');
            }
        } else if (error.request) {
            // Error de red
            throw new Error('Error de conexión. Verifica tu internet.');
        } else {
            // Error en la configuración
            throw new Error('Error en la configuración de la solicitud');
        }
    }
}