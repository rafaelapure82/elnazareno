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


    static async registrarPersonal(data) {
        try {
            // 1. Registrar información personal
            const respuestaPersonal = await axiosInstance.post('/personal', data.personal, {
                headers: { 'Content-Type': 'application/json' }
            });

            const personalId = respuestaPersonal.data.id || respuestaPersonal.data.data?.id;

            if (!personalId) {
                throw new Error('No se recibió ID del personal');
            }

            // 2. Subir archivos si existen
            if (data.archivos?.length > 0) {
                const formData = new FormData();

                // Agregar archivos
                data.archivos.forEach(archivo => {
                    formData.append('archivos', archivo.file);
                });

                // Agregar metadata de los archivos
                const metadata = data.archivos.map(archivo => ({
                    tipo: archivo.tipo || 'documento',
                    descripcion: archivo.descripcion || '',
                    nombreOriginal: archivo.file.name
                }));

                formData.append('metadata', JSON.stringify(metadata));

                await axiosInstance.post(`/personal/${personalId}/archivos`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            return {
                success: true,
                data: respuestaPersonal.data,
                message: 'Registro completado exitosamente'
            };

        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message,
                error: error.response?.data
            };
        }
    }

    // Actualizar personal
    static async actualizarPersonal(id, data) {
        // PUT /personal/:id
        const formData = new FormData();

        // 1. Datos del personal (va en req.body)
        formData.append('personal', JSON.stringify(data.personal));

        // 2. Archivos NUEVOS (van en req.files.archivos)
        if (data.archivos?.nuevos?.length > 0) {
            data.archivos.nuevos.forEach((archivo, index) => {
                if (archivo.file instanceof File) {
                    formData.append('archivos', archivo.file);
                    formData.append(`archivo_${index}_metadata`, JSON.stringify({
                        tipo: archivo.tipo || 'documento',
                        descripcion: archivo.descripcion || ''
                    }));
                }
            });
        }

        // 3. Metadata general (va en req.body)
        const metadata = {
            existentes: data.archivos?.existentes?.map(archivo => ({
                id: archivo.id,
                tipo: archivo.tipo || 'documento',
                descripcion: archivo.descripcion || ''
            })) || [],
            eliminar: data.archivos?.eliminar || []
        };


        formData.append('metadata', JSON.stringify(metadata))

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

    static async descargarArchivoPorNombre(nombreArchivo) {
        try {
            const response = await axiosInstance.get(
                `/personal/descargar-archivo/${nombreArchivo}`,
                {
                    responseType: 'blob',
                    headers: {
                        'Accept': 'application/octet-stream'
                    }
                }
            );

            return {
                success: true,
                data: response.data,
                headers: response.headers
            };

        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message,
                error: error.response?.data
            };
        }
    }

    static async obtenerPersonalMultiple(ids) {
        try {
            console.log('IDs enviados al endpoint /multiples:', ids);
            console.log('Cantidad de IDs:', ids.length);

            const response = await axiosInstance.post('/personal/multiples', { ids });

            console.log('Respuesta del endpoint /multiples:', response.data);

            return {
                success: response.data.success,
                data: response.data.data,
                metadata: response.data.metadata,
                message: response.data.message || 'Datos obtenidos correctamente'
            };

        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message,
                error: error.response?.data
            };
        }
    }

}