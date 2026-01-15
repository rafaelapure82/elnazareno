import axiosInstance, { API_BASE_URL } from '../../../compartidos/api/axios.config';

export class ArchivosServicio {
    // Obtener todos los archivos
    static async obtenerTodosArchivos(params = {}) {
        // GET /archivos
        // console.log('Obteniendo todos los archivos con parámetros:', params);

        return await axiosInstance.get('/archivos/', { params });
    }

    // Buscar archivos
    static async buscarArchivos(query) {
        // GET /archivos/buscar?query=...
        return await axiosInstance.get('/archivos/buscar', {
            params: { query }
        });
    }

    // Obtener archivo por ID
    static async obtenerArchivoPorId(id) {
        // GET /archivos/:id
        return await axiosInstance.get(`/archivos/${id}`);
    }

    // Subir archivo
    static async subirArchivo(formData) {
        // POST /archivos
        // Nota: Este endpoint requiere multipart/form-data
        return await axiosInstance.post('/archivos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    // Eliminar archivo
    static async eliminarArchivo(id) {
        // DELETE /archivos/:id
        return await axiosInstance.delete(`/archivos/${id}`);
    }

    // Descargar archivo
    static async descargarArchivo(id, nombreArchivo) {
        // Endpoint para descargar (ajustar según tu backend)
        const response = await fetch(`${API_BASE_URL}/archivos/descargar/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) throw new Error('Error al descargar archivo');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nombreArchivo;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}