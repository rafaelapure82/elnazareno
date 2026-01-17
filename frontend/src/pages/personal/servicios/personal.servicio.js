
import axiosInstance from '../../../compartidos/api/axios.config';

export class PersonalServicio {
    // Obtener personal por tipo
    static async obtenerPersonalPorTipo(tipo, params = {}) {
        // GET /personal?tipo={tipo}
        return await axiosInstance.get('/personal', { params: { tipo, ...params } });
    }

    // Obtener personal por ID
    static async obtenerPersonalPorId(id) {
        // GET /personal/:id
        return await axiosInstance.get(`/personal/${id}`);
    }

    // Registrar personal
    static async registrarPersonal(data) {
        // POST /personal
        // Nota: Este endpoint requiere multipart/form-data para archivos
        const formData = new FormData();

        // Agregar datos JSON como string
        formData.append('data', JSON.stringify(data.personal));

        // Agregar archivos
        if (data.archivos && data.archivos.length > 0) {
            data.archivos.forEach((archivo, index) => {
                formData.append(`archivos`, archivo.file);
                formData.append(`archivo_${index}_tipo`, archivo.tipo || 'documento');
            });
        }

        return await axiosInstance.post('/personal', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    // Actualizar personal
    static async actualizarPersonal(id, data) {
        // PUT /personal/:id
        const formData = new FormData();

        // Agregar datos JSON como string
        formData.append('data', JSON.stringify(data.personal));

        // Agregar archivos nuevos
        if (data.archivos && data.archivos.length > 0) {
            data.archivos.forEach((archivo, index) => {
                formData.append(`archivos`, archivo.file);
                formData.append(`archivo_${index}_tipo`, archivo.tipo || 'documento');
            });
        }

        return await axiosInstance.put(`/personal/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    // Eliminar personal
    static async eliminarPersonal(id) {
        // DELETE /personal/:id
        return await axiosInstance.delete(`/personal/${id}`);
    }

    // Eliminar archivo
    static async eliminarArchivo(personalId, archivoId) {
        // DELETE /personal/:id/:archivoId
        return await axiosInstance.delete(`/personal/${personalId}/${archivoId}`);
    }
}