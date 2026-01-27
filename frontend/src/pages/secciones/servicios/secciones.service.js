import axiosInstance from '../../../compartidos/api/axios.config';
import { seccionesAdaptador } from '../adaptadores/secciones.adaptador';

export const seccionesService = {
    // Servicios para Grados
    crearGrado: async (gradoData) => {
        try {
            const response = await axiosInstance.post('/secciones/grados', gradoData);
            return {
                success: true,
                data: seccionesAdaptador.adaptarGrado(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al crear el grado'
            };
        }
    },

    obtenerGrados: async () => {
        try {
            const response = await axiosInstance.get('/secciones/grados');
            return {
                success: true,
                data: seccionesAdaptador.adaptarGrados(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener grados'
            };
        }
    },

    obtenerGradoPorId: async (id) => {
        try {
            const response = await axiosInstance.get(`/secciones/grados/${id}`);
            return {
                success: true,
                data: seccionesAdaptador.adaptarGrado(response.data.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener el grado'
            };
        }
    },

    actualizarGrado: async (id, gradoData) => {
        try {
            const response = await axiosInstance.put(`/secciones/grados/${id}`, gradoData);
            return {
                success: true,
                data: seccionesAdaptador.adaptarGrado(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al actualizar el grado'
            };
        }
    },

    eliminarGrado: async (id) => {
        try {
            const response = await axiosInstance.delete(`/secciones/grados/${id}`);
            return {
                success: true,
                data: response.data.resultado,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al eliminar el grado'
            };
        }
    },

    // Servicios para Secciones
    crearSeccion: async (seccionData) => {
        try {
            const response = await axiosInstance.post('/secciones/secciones', seccionData);
            return {
                success: true,
                data: seccionesAdaptador.adaptarSeccion(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al crear la sección'
            };
        }
    },

    obtenerSeccionesPorGrado: async (gradoId) => {
        try {
            const response = await axiosInstance.get(`/secciones/grados/${gradoId}/secciones`);
            return {
                success: true,
                data: seccionesAdaptador.adaptarSecciones(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener secciones'
            };
        }
    },

    obtenerSeccionCompleta: async (id) => {
        try {
            const response = await axiosInstance.get(`/secciones/secciones/${id}`);
            return {
                success: true,
                data: seccionesAdaptador.adaptarSeccionCompleta(response.data.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener la sección'
            };
        }
    },

    actualizarSeccion: async (id, seccionData) => {
        try {
            const response = await axiosInstance.put(`/secciones/secciones/${id}`, seccionData);
            return {
                success: true,
                data: seccionesAdaptador.adaptarSeccion(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al actualizar la sección'
            };
        }
    },

    eliminarSeccion: async (id) => {
        try {
            const response = await axiosInstance.delete(`/secciones/secciones/${id}`);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al eliminar la sección'
            };
        }
    },

    // Servicios para Profesores en Secciones
    asignarProfesorASeccion: async (seccionId, profesorId, data) => {
        try {
            const response = await axiosInstance.post(`/secciones/secciones/${seccionId}/profesores/${profesorId}`, data);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al asignar profesor'
            };
        }
    },

    obtenerProfesoresDeSeccion: async (seccionId) => {
        try {
            const response = await axiosInstance.get(`/secciones/secciones/${seccionId}/profesores`);
            return {
                success: true,
                data: seccionesAdaptador.adaptarProfesores(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener profesores'
            };
        }
    },

    removerProfesorDeSeccion: async (seccionId, profesorId) => {
        try {
            const response = await axiosInstance.delete(`/secciones/secciones/${seccionId}/profesores/${profesorId}`);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al remover profesor'
            };
        }
    },

    actualizarTutor: async (seccionId, profesorId, esTutor) => {
        try {
            const response = await axiosInstance.put(`/secciones/secciones/${seccionId}/profesores/${profesorId}/tutor`, { es_tutor: esTutor });
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al actualizar tutor'
            };
        }
    },

    buscarProfesoresDisponibles: async (seccionId, search = '') => {
        try {
            const response = await axiosInstance.get(`/secciones/secciones/${seccionId}/profesores-disponibles`, {
                params: { search }
            });
            console.log("esta es la respuesta", response)
            let ghola = seccionesAdaptador.adaptarProfesores(response.data.data)
            console.log("esta es la respuesta adaptada", ghola)


            return {
                success: true,
                data: seccionesAdaptador.adaptarProfesores(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al buscar profesores'
            };
        }
    },

    obtenerSeccionesPorProfesor: async (profesorId) => {
        try {
            const response = await axiosInstance.get(`/secciones/profesores/${profesorId}/secciones`);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener secciones del profesor'
            };
        }
    },

    // Servicios para Estudiantes en Secciones
    inscribirEstudianteASeccion: async (seccionId, estudianteId, añoEscolar) => {
        try {
            const response = await axiosInstance.post(`/secciones/secciones/${seccionId}/estudiantes/${estudianteId}`, {
                año_escolar: añoEscolar
            });
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al inscribir estudiante'
            };
        }
    },

    obtenerEstudiantesDeSeccion: async (seccionId) => {
        try {
            const response = await axiosInstance.get(`/secciones/secciones/${seccionId}/estudiantes`);
            return {
                success: true,
                data: {
                    estudiantes: seccionesAdaptador.adaptarEstudiantes(response.data.data.estudiantes),
                    estadisticas: response.data.data.estadisticas
                },
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener estudiantes'
            };
        }
    },

    removerEstudianteDeSeccion: async (seccionId, estudianteId) => {
        try {
            const response = await axiosInstance.delete(`/secciones/secciones/${seccionId}/estudiantes/${estudianteId}`);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al remover estudiante'
            };
        }
    },

    actualizarEstadoEstudiante: async (seccionId, estudianteId, estado) => {
        try {
            const response = await axiosInstance.put(`/secciones/secciones/${seccionId}/estudiantes/${estudianteId}/estado`, { estado });
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al actualizar estado del estudiante'
            };
        }
    },

    buscarEstudiantesDisponibles: async (seccionId, añoEscolar, search = '') => {
        try {
            const response = await axiosInstance.get(`/secciones/secciones/${seccionId}/estudiantes-disponibles`, {
                params: { año_escolar: añoEscolar, search }
            });
            return {
                success: true,
                data: seccionesAdaptador.adaptarEstudiantes(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al buscar estudiantes'
            };
        }
    },

    obtenerHistorialEstudiante: async (estudianteId) => {
        try {
            const response = await axiosInstance.get(`/secciones/estudiantes/${estudianteId}/historial`);
            return {
                success: true,
                data: seccionesAdaptador.adaptarHistorialAcademico(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener historial'
            };
        }
    },

    obtenerSeccionActualEstudiante: async (estudianteId, añoEscolar = null) => {
        try {
            const params = añoEscolar ? { año_escolar: añoEscolar } : {};
            const response = await axiosInstance.get(`/secciones/estudiantes/${estudianteId}/seccion-actual`, { params });
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al obtener sección actual'
            };
        }
    },

    // Servicio para obtener año escolar actual
    obtenerAñoEscolarActual: async () => {
        try {
            const response = await axiosInstance.get('/secciones/config/año-escolar-actual');
            return {
                success: true,
                data: seccionesAdaptador.adaptarAñoEscolar(response.data.data),
                message: response.data.message
            };
        } catch (error) {
            // Si falla, calcular localmente
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const añoEscolar = month >= 8 ? year : year - 1;

            return {
                success: true,
                data: { añoEscolar },
                message: 'Año escolar calculado localmente'
            };
        }
    }
};