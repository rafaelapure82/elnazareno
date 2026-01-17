import axiosInstance from "../../../compartidos/api/axios.config";

export class EstudiantesServicio {

    // Obtener todos los estudiantes
    static async obtenerTodosEstudiantes(params = {}) {
        // GET /estudiantes/buscar-todos
        return await axiosInstance.get('/estudiantes/buscar-todos', { params });
    }

    // Buscar estudiante por cédula o cédula escolar
    static async buscarPorCedula(cedula) {
        // POST /estudiantes/buscar-cedula
        return await axiosInstance.post('/estudiantes/buscar', {
            q: cedula
        });
    }

    // Obtener estudiante por ID
    static async obtenerEstudiantePorId(id) {
        // GET /estudiantes/:id
        return await axiosInstance.get(`/estudiantes/${id}`);
    }

    // Crear estudiante
    static async crearEstudiante(data) {
        // POST /estudiantes
        return await axiosInstance.post('/estudiantes', data);
    }

    // Editar estudiante
    static async editarEstudiante(id, data) {
        // PUT /estudiantes/:id
        return await axiosInstance.put(`/estudiantes/${id}`, data);
    }

    // Eliminar estudiante
    static async eliminarEstudiante(id) {
        // DELETE /estudiantes/:id
        return await axiosInstance.delete(`/estudiantes/${id}`);
    }

    // Servicios para representantes (pueden estar en endpoints separados)
    static async crearRepresentante(data) {
        // POST /representantes
        return await axiosInstance.post('/representantes', data);
    }

    static async buscarRepresentantePorCedula(cedula) {
        // POST /representantes/buscar-cedula
        return await axiosInstance.post('/representantes/buscar-cedula', { cedula });
    }
}