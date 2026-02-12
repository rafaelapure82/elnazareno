import { axiosInstance } from '../../../config/axiosInstance';

export class RepresentanteService {
    static async crear(data) {
        try {
            const response = await axiosInstance.post('/representantes', data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async editar(id, data) {
        try {
            const response = await axiosInstance.put(`/representantes/${id}`, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async eliminar(id) {
        try {
            const response = await axiosInstance.delete(`/representantes/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async obtenerPorId(id) {
        try {
            const response = await axiosInstance.get(`/representantes/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async obtenerTodos(params = {}) {
        try {
            const response = await axiosInstance.get('/representantes', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async buscarPorCedula(cedula) {
        try {
            const response = await axiosInstance.get(`/representantes/buscar/cedula/${cedula}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async buscarPorNombre(nombre) {
        try {
            const response = await axiosInstance.get('/representantes/buscar', {
                params: { nombre }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async obtenerEstudiantes(id) {
        try {
            const response = await axiosInstance.get(`/representantes/${id}/estudiantes`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async verificarExistencia(cedula) {
        try {
            const response = await axiosInstance.post('/representantes/verificar', { cedula });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static handleError(error) {
        if (error.response) {
            // El servidor respondió con un código de error
            return {
                message: error.response.data?.message || 'Error del servidor',
                status: error.response.status,
                data: error.response.data
            };
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            return {
                message: 'No se pudo conectar con el servidor',
                status: null
            };
        } else {
            // Algo sucedió al configurar la petición
            return {
                message: error.message || 'Error desconocido',
                status: null
            };
        }
    }

    // Métodos específicos para el módulo de estudiantes
    static adaptarParaEstudiante(representanteData) {
        return {
            tipo_cedula: representanteData.tipoCedula,
            cedula: representanteData.cedula,
            nombres: representanteData.nombres,
            apellidos: representanteData.apellidos,
            sexo: representanteData.sexo,
            fecha_nacimiento: representanteData.fechaNacimiento || null,
            relacion: representanteData.relacion,
            telefono: representanteData.telefono,
            email: representanteData.email || null,
            ocupacion: representanteData.ocupacion || null
        };
    }

    static validarDatos(representanteData) {
        const errores = [];

        if (!representanteData.cedula) errores.push('La cédula es requerida');
        if (!representanteData.nombres) errores.push('Los nombres son requeridos');
        if (!representanteData.apellidos) errores.push('Los apellidos son requeridos');
        if (!representanteData.telefono) errores.push('El teléfono es requerido');
        if (!representanteData.relacion) errores.push('La relación es requerida');

        if (representanteData.email && !this.validarEmail(representanteData.email)) {
            errores.push('El email no es válido');
        }

        if (representanteData.telefono && !this.validarTelefono(representanteData.telefono)) {
            errores.push('El teléfono debe tener al menos 10 dígitos');
        }

        return errores;
    }

    static validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validarTelefono(telefono) {
        const digits = telefono.replace(/\D/g, '');
        return digits.length >= 10;
    }
}

// Exportar una instancia por defecto para compatibilidad
export default new RepresentanteService();