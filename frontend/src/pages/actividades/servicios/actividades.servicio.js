// modules/actividades/servicios/actividades.servicio.js
import axiosInstance from '../../../compartidos/api/axios.config';
import { ActividadesAdaptador } from '../adaptadores/actividades.adaptador';

class ActividadesServicio {
    constructor() {
        this.axios = axiosInstance;
    }

    /**
     * Crear una nueva actividad
     */
    async crearActividad(titulo, descripcion, imagenes = []) {
        try {
            const formData = ActividadesAdaptador.toBackend(
                { titulo, descripcion },
                imagenes
            );

            const response = await this.axios.post('/actividades', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return {
                success: true,
                data: ActividadesAdaptador.fromBackend(response.data.datos),
                message: 'Actividad creada exitosamente'
            };
        } catch (error) {
            return this.handleError(error, 'Error al crear la actividad');
        }
    }

    /**
     * Obtener todas las actividades
     */
    async obtenerTodasActividades(pagina = 1, limite = 10) {
        try {
            const response = await this.axios.get('/actividades', {
                params: { pagina, limite }
            });

            return {
                success: true,
                data: {
                    actividades: response.data.data?.map(ActividadesAdaptador.fromBackend) || [],
                    total: response.data.total || 0,
                    paginas: response.data.paginas || 1,
                    paginaActual: response.data.paginaActual || 1
                }
            };
        } catch (error) {
            return this.handleError(error, 'Error al obtener actividades');
        }
    }

    /**
     * Eliminar una actividad
     */
    async eliminarActividad(id) {
        try {
            await this.axios.delete(`/actividades/${id}`);

            return {
                success: true,
                message: 'Actividad eliminada exitosamente'
            };
        } catch (error) {
            return this.handleError(error, 'Error al eliminar la actividad');
        }
    }

    /**
     * Editar una actividad
     */
    async editarActividad(id, titulo, descripcion, nuevasImagenes = [], imagenesAEliminar = []) {
        try {
            const formData = ActividadesAdaptador.toBackendEdit(
                { titulo, descripcion },
                nuevasImagenes,
                imagenesAEliminar
            );

            const response = await this.axios.put(`/actividades/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Respuesta del servidor:', response);
            return {
                success: true,
                data: ActividadesAdaptador.fromBackend(response.data.data),
                message: 'Actividad actualizada exitosamente'
            };
        } catch (error) {
            return this.handleError(error, 'Error al editar la actividad');
        }
    }

    /**
     * Obtener actividad por ID
     */
    async obtenerActividadPorId(id) {
        try {
            const response = await this.axios.get(`/actividades/${id}`);
            return {
                success: true,
                data: ActividadesAdaptador.fromBackend(response.data.data)
            };
        } catch (error) {
            return this.handleError(error, 'Error al obtener la actividad');
        }
    }

    /**
     * Buscar actividades por término
     */
    async buscarActividades(termino, pagina = 1, limite = 10) {
        try {
            const response = await this.axios.get('/actividades/buscar', {
                params: {
                    q: termino,
                    pagina,
                    limite
                }
            });

            return {
                success: true,
                data: {
                    actividades: response.data.actividades?.map(ActividadesAdaptador.fromBackend) || [],
                    total: response.data.total || 0,
                    paginas: response.data.paginas || 1,
                    paginaActual: response.data.paginaActual || 1
                }
            };
        } catch (error) {
            return this.handleError(error, 'Error al buscar actividades');
        }
    }

    /**
     * Manejo de errores
     */
    handleError(error, defaultMessage) {
        console.error('Error en servicio de actividades:', error);

        let message = defaultMessage;
        let status = null;
        let errorData = null;

        if (error.response) {
            status = error.response.status;
            errorData = error.response.data;

            // Si el backend envía un mensaje de error específico
            if (errorData?.message) {
                message = errorData.message;
            } else {
                // Mensajes por defecto según status code
                switch (status) {
                    case 400:
                        message = 'Datos inválidos. Verifique la información';
                        break;
                    case 401:
                        message = 'No autorizado. Por favor inicie sesión';
                        break;
                    case 403:
                        message = 'No tiene permisos para realizar esta acción';
                        break;
                    case 404:
                        message = 'Actividad no encontrada';
                        break;
                    case 413:
                        message = 'Las imágenes son demasiado grandes. Máximo 5MB por imagen';
                        break;
                    case 422:
                        message = 'Datos de entrada inválidos';
                        break;
                    case 429:
                        message = 'Demasiadas solicitudes. Por favor espere';
                        break;
                    case 500:
                        message = 'Error del servidor. Por favor intente más tarde';
                        break;
                    case 503:
                        message = 'Servicio no disponible temporalmente';
                        break;
                    default:
                        message = defaultMessage;
                }
            }
        } else if (error.request) {
            message = 'Error de conexión. Verifique su conexión a internet';
        } else if (error.code === 'ECONNABORTED') {
            message = 'Tiempo de espera agotado. Intente nuevamente';
        }

        return {
            success: false,
            message,
            status,
            error: errorData || error.message,
            originalError: error
        };
    }

    /**
     * Validar archivos antes de enviar
     */
    validarArchivos(archivos, maxCantidad = 5, maxTamanoMB = 5) {
        const maxTamanoBytes = maxTamanoMB * 1024 * 1024;
        const errores = [];

        if (archivos.length > maxCantidad) {
            errores.push(`Máximo ${maxCantidad} archivos permitidos`);
            return { valido: false, errores };
        }

        archivos.forEach((archivo, index) => {
            // Validar tipo de archivo
            if (!archivo.type.startsWith('image/')) {
                errores.push(`El archivo "${archivo.name}" no es una imagen válida`);
            }

            // Validar tamaño
            if (archivo.size > maxTamanoBytes) {
                errores.push(`La imagen "${archivo.name}" excede el tamaño máximo de ${maxTamanoMB}MB`);
            }
        });

        return {
            valido: errores.length === 0,
            errores
        };
    }

    /**
     * Subir imágenes individualmente (alternativa)
     */
    async subirImagenes(imagenes) {
        const resultados = [];

        for (const imagen of imagenes) {
            const formData = new FormData();
            formData.append('imagen', imagen);

            try {
                const response = await this.axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                resultados.push({
                    success: true,
                    nombre: imagen.name,
                    url: response.data.url
                });
            } catch (error) {
                resultados.push({
                    success: false,
                    nombre: imagen.name,
                    error: error.message
                });
            }
        }

        return resultados;
    }
}

export default new ActividadesServicio();