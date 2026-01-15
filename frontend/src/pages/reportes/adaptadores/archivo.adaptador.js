
export class ArchivosAdaptador {
    // Adaptar datos del formulario de subida
    static toUploadForm(formData, metadata = {}) {
        const form = new FormData();

        // Agregar archivo
        if (formData.archivo) {
            form.append('archivo', formData.archivo);
        }

        // Agregar metadatos
        if (formData.nombre) {
            form.append('nombre', formData.nombre);
        }

        if (formData.descripcion) {
            form.append('descripcion', formData.descripcion);
        }

        if (formData.categoria) {
            form.append('categoria', formData.categoria);
        }

        // Metadatos adicionales
        Object.entries(metadata).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                form.append(key, value);
            }
        });

        return form;
    }

    // Adaptar respuesta del backend a formato frontend
    static fromApiResponse(apiData) {
        if (!apiData.data.success) {
            throw new Error(apiData.message || 'Error en la respuesta del servidor');
        }

        return {
            ...apiData.data,
            // Transformaciones adicionales si son necesarias
        };
    }

    // Adaptar lista de archivos
    static toFileList(apiResponse) {
        if (!apiResponse.success) return [];
        return apiResponse.data.map(archivo => ({
            id: archivo._id || archivo.id,
            nombre: archivo.nombre || archivo.nombre_original,
            nombreOriginal: archivo.nombre_original || archivo.nombre,
            descripcion: archivo.description || '',
            categoria: archivo.categoria || 'general',
            tamaño: archivo.size || 0,
            formato: archivo.formato || this.getFileExtension(archivo.nombre_original),
            url: archivo.download_url || archivo.path,
            subidoPor: archivo.subidoPor || {},
            fechaSubida: archivo.created_at || archivo.fechaSubida,
            tags: archivo.tags || [],
            esPublico: archivo.esPublico !== undefined ? archivo.esPublico : true
        }));
    }

    // Obtener extensión del archivo
    static getFileExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }

    // Formatear tamaño del archivo
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Obtener icono según tipo de archivo
    static getFileIcon(formato) {
        const iconMap = {
            pdf: 'FaFilePdf',
            doc: 'FaFileWord',
            docx: 'FaFileWord',
            xls: 'FaFileExcel',
            xlsx: 'FaFileExcel',
            ppt: 'FaFilePowerpoint',
            pptx: 'FaFilePowerpoint',
            jpg: 'FaFileImage',
            jpeg: 'FaFileImage',
            png: 'FaFileImage',
            gif: 'FaFileImage',
            txt: 'FaFileAlt',
            zip: 'FaFileArchive',
            rar: 'FaFileArchive',
            mp4: 'FaFileVideo',
            mp3: 'FaFileAudio',
            default: 'FaFile'
        };

        return iconMap[formato.toLowerCase()] || iconMap.default;
    }

    // Filtrar archivos por categoría
    static filterByCategory(archivos, categoria) {
        if (!categoria || categoria === 'todos') return archivos;
        return archivos.filter(archivo => archivo.categoria === categoria);
    }

    // Ordenar archivos
    static sortArchivos(archivos, sortBy = 'fechaSubida', order = 'desc') {
        return [...archivos].sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'fechaSubida') {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }

            if (sortBy === 'tamaño') {
                aValue = parseInt(aValue);
                bValue = parseInt(bValue);
            }

            if (sortBy === 'nombre') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (order === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }
}