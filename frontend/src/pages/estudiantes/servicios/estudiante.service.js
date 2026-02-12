import axiosInstance from '../../../compartidos/api/axios.config'
export class EstudianteService {
    static async crear(formData) {
        try {
            const response = await axiosInstance.post('/estudiantes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async editar(id, formData) {
        try {
            const response = await axiosInstance.put(`/estudiantes/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async eliminar(id) {
        try {
            const response = await axiosInstance.delete(`/estudiantes/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async obtenerPorId(id) {
        try {
            const response = await axiosInstance.get(`/estudiantes/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async obtenerTodos(params = {}) {
        try {
            const response = await axiosInstance.get('/estudiantes/buscar-todos', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async buscar(params) {
        try {
            const response = await axiosInstance.post('/estudiantes/buscar', params);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async buscarPorCedula(params) {
        try {
            const response = await axiosInstance.post('/estudiantes/buscar-cedula', params);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async buscarAvanzado(params) {
        try {
            const response = await axiosInstance.get('/estudiantes/buscar/avanzado', { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    static async obtenerEstadisticas() {
        try {
            const response = await axiosInstance.get('/estudiantes/estadisticas');
            return response.data;
        } catch (error) {
            // Si el endpoint no existe, calcular localmente
            return this.calcularEstadisticasLocal();
        }
    }

    static async calcularEstadisticasLocal() {
        try {
            const response = await this.obtenerTodos({ exportAll: true, limit: 10000 });

            if (response.success && Array.isArray(response.data)) {
                const total = response.data.length;
                const masculinos = response.data.filter(e =>
                    e.genero === 'Masculino' || e.sexo === 'Masculino'
                ).length;
                const femeninos = response.data.filter(e =>
                    e.genero === 'Femenino' || e.sexo === 'Femenino'
                ).length;
                const otros = total - masculinos - femeninos;

                return {
                    success: true,
                    data: {
                        total,
                        masculinos,
                        femeninos,
                        otros,
                        porcentajeMasculino: total > 0 ? ((masculinos / total) * 100).toFixed(1) : '0.0',
                        porcentajeFemenino: total > 0 ? ((femeninos / total) * 100).toFixed(1) : '0.0',
                        porcentajeOtros: total > 0 ? ((otros / total) * 100).toFixed(1) : '0.0'
                    }
                };
            }

            return {
                success: true,
                data: {
                    total: 0,
                    masculinos: 0,
                    femeninos: 0,
                    otros: 0,
                    porcentajeMasculino: '0.0',
                    porcentajeFemenino: '0.0',
                    porcentajeOtros: '0.0'
                }
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    static obtenerFotoUrl(id) {
        return `${axiosInstance.defaults.baseURL}/estudiantes/${id}/foto`;
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
}