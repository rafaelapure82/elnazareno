// src/modules/personal/adapters/archivos.adapter.js
export class ArchivosAdaptador {
    // Tipos de archivo permitidos
    static tiposPermitidos = {
        imagen: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        pdf: ['pdf'],
        documento: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']
    };

    // Validar tipo de archivo
    static validarTipoArchivo(file, tipo) {
        const extension = file.name.split('.').pop().toLowerCase();
        return this.tiposPermitidos[tipo]?.includes(extension) || false;
    }

    // Validar tamaño de archivo (max 10MB)
    static validarTamañoArchivo(file, maxSizeMB = 10) {
        return file.size <= maxSizeMB * 1024 * 1024;
    }

    // Preparar archivos para subir
    static prepararArchivosParaSubir(archivos) {
        return archivos.map(archivo => ({
            file: archivo.file,
            tipo: archivo.tipo || 'documento',
            nombre: archivo.file.name,
            tamaño: this.formatTamaño(archivo.file.size)
        }));
    }

    // Formatear tamaño
    static formatTamaño(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Obtener icono por tipo de archivo
    static getIconByTipo(tipo) {
        const icons = {
            imagen: 'FaFileImage',
            pdf: 'FaFilePdf',
            documento: 'FaFileAlt'
        };
        return icons[tipo] || 'FaFile';
    }

    // Obtener color por tipo de archivo
    static getColorByTipo(tipo) {
        const colors = {
            imagen: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
            pdf: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
            documento: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' }
        };
        return colors[tipo] || { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };
    }

    // Filtrar archivos por tipo
    static filtrarArchivosPorTipo(archivos, tipo) {
        if (!tipo || tipo === 'todos') return archivos;
        return archivos.filter(archivo => archivo.tipo_archivo === tipo);
    }

    // Agrupar archivos por tipo
    static agruparArchivosPorTipo(archivos) {
        return archivos.reduce((grupos, archivo) => {
            const tipo = archivo.tipo_archivo || 'documento';
            if (!grupos[tipo]) {
                grupos[tipo] = [];
            }
            grupos[tipo].push(archivo);
            return grupos;
        }, {});
    }

    // Validar lista de archivos
    static validarArchivos(archivos) {
        const errors = [];

        archivos.forEach((archivo, index) => {
            if (!archivo.tipo) {
                errors.push(`Archivo ${archivo.file.name}: Tipo no especificado`);
            }

            if (!this.validarTipoArchivo(archivo.file, archivo.tipo)) {
                const extensiones = this.tiposPermitidos[archivo.tipo]?.join(', ') || '';
                errors.push(`Archivo ${archivo.file.name}: Tipo no permitido. Extensiones válidas: ${extensiones}`);
            }

            if (!this.validarTamañoArchivo(archivo.file)) {
                errors.push(`Archivo ${archivo.file.name}: Tamaño máximo 10MB`);
            }
        });

        return errors;
    }
}