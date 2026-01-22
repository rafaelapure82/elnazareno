import {
    FaFileImage,
    FaFilePdf,
    FaFileAlt,
    FaFile
} from 'react-icons/fa';

export const ArchivosAdaptador = {
    // Tipos de archivo permitidos
    tiposArchivo: [
        { value: 'imagen', label: 'Imagen' },
        { value: 'pdf', label: 'PDF' },
        { value: 'documento', label: 'Documento' },
        { value: 'otros', label: 'Otros' }
    ],

    // Extensiones permitidas por tipo
    extensionesPermitidas: {
        imagen: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
        pdf: ['.pdf'],
        documento: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt'],
        otros: ['.zip', '.rar', '.7z', '.xml', '.json', '.html', '.htm']
    },

    // Tamaño máximo en bytes (10MB)
    TAMANO_MAXIMO: 10 * 1024 * 1024, // 10MB

    // Obtener extensión del archivo
    obtenerExtension(nombreArchivo) {
        const match = nombreArchivo.match(/\.[^/.]+$/);
        return match ? match[0].toLowerCase() : '';
    },

    // Determinar tipo por extensión
    determinarTipoPorExtension(extension) {
        for (const [tipo, extensiones] of Object.entries(this.extensionesPermitidas)) {
            if (extensiones.includes(extension)) {
                return tipo;
            }
        }
        return 'otros'; // Si no encuentra, retorna 'otros'
    },

    // Validar archivos
    // validarArchivos(archivos) {
    //     const errores = [];

    //     archivos.forEach((archivo, index) => {
    //         // Obtener nombre y extensión
    //         const nombre = archivo.file?.name || archivo.nombre_original || archivo.nombre_archivo || `Archivo #${index}`;
    //         const extension = this.obtenerExtension(nombre);

    //         // Validar tipo
    //         if (!archivo.tipo || archivo.tipo === '') {
    //             errores.push(`${nombre}: Tipo no especificado`);
    //         } else if (archivo.tipo === 'otros') {
    //             // Para tipo 'otros', permitir cualquier extensión
    //             // No hacer validación de extensión
    //         } else {
    //             // Validar que la extensión coincida con el tipo
    //             const tipoEsperado = this.determinarTipoPorExtension(extension);
    //             if (archivo.tipo !== tipoEsperado && tipoEsperado !== 'otros') {
    //                 errores.push(`${nombre}: Tipo no coincide con la extensión. Tipo seleccionado: ${archivo.tipo}, Extensión: ${extension}`);
    //             }
    //         }

    //         // Validar tamaño (solo para archivos nuevos)
    //         if (archivo.file) {
    //             if (archivo.file.size > this.TAMANO_MAXIMO) {
    //                 errores.push(`${nombre}: Tamaño máximo 10MB. Tamaño actual: ${this.formatTamaño(archivo.file.size)}`);
    //             }
    //         }

    //         // Validar extensión
    //         if (extension === '') {
    //             errores.push(`${nombre}: No tiene extensión`);
    //         } else if (archivo.tipo && archivo.tipo !== 'otros') {
    //             // Verificar si la extensión es permitida para el tipo seleccionado
    //             const extensionesPermitidas = this.extensionesPermitidas[archivo.tipo] || [];
    //             if (extensionesPermitidas.length > 0 && !extensionesPermitidas.includes(extension)) {
    //                 errores.push(`${nombre}: Extensión no permitida para tipo ${archivo.tipo}. Extensiones válidas: ${extensionesPermitidas.join(', ')}`);
    //             }
    //         }
    //     });

    //     return errores;
    // },

    validarArchivos(archivos) {
        const errores = [];

        archivos.forEach((archivo, index) => {
            // Omitir archivos marcados para eliminación
            if (archivo.marcadoParaEliminar) return;

            const nombre = archivo.file?.name || archivo.nombre_original || archivo.nombre_archivo || `Archivo #${index}`;
            const extension = this.obtenerExtension(nombre);

            // Para archivos existentes
            if (archivo.esExistente) {
                const tipoExistente = archivo.tipo_archivo || archivo.tipo;

                // Validar que el tipo no haya sido cambiado
                if (archivo.tipo && archivo.tipo !== tipoExistente) {
                    errores.push(`${nombre}: No se puede cambiar el tipo de archivos existentes. Tipo original: ${tipoExistente}`);
                }

                // Validar que la extensión coincida con el tipo
                const tipoPorExtension = this.determinarTipoPorExtension(extension);
                if (tipoExistente !== tipoPorExtension && tipoPorExtension !== 'otros') {
                    console.warn(`Archivo existente ${nombre}: Tipo (${tipoExistente}) no coincide con extensión (${extension})`);
                    // No agregar error para archivos existentes, solo warning
                }
            }
            // Para archivos nuevos
            else if (archivo.esNuevo || archivo.file) {
                // Validar tipo
                if (!archivo.tipo || archivo.tipo === '') {
                    errores.push(`${nombre}: Tipo no especificado`);
                } else {
                    // Validar que la extensión sea compatible
                    const extensionesPermitidas = this.extensionesPermitidas[archivo.tipo] || [];
                    if (extensionesPermitidas.length > 0 && !extensionesPermitidas.includes(extension)) {
                        errores.push(`${nombre}: Extensión ${extension} no permitida para tipo ${archivo.tipo}`);
                    }
                }

                // Validar tamaño
                if (archivo.file && archivo.file.size > this.TAMANO_MAXIMO) {
                    errores.push(`${nombre}: Tamaño máximo 10MB. Tamaño actual: ${this.formatTamaño(archivo.file.size)}`);
                }
            }
        });

        return errores;
    },

    // Formatear tamaño
    formatTamaño(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Preparar archivos para subir
    prepararArchivosParaSubir(archivos) {
        return archivos.map(archivo => {
            // Para archivos nuevos
            if (archivo.file) {
                return {
                    file: archivo.file,
                    tipo: archivo.tipo || 'otros',
                    nombre: archivo.file.name,
                    tamaño: archivo.file.size
                };
            }

            // Para archivos existentes
            return {
                id: archivo.id,
                tipo: archivo.tipo_archivo || archivo.tipo || 'otros',
                nombre: archivo.nombre_original || archivo.nombre_archivo || archivo.nombre,
                ruta_archivo: archivo.ruta_archivo,
                tamaño: archivo.tamaño || 0
            };
        });
    },

    // Obtener icono por tipo
    getIconByTipo(tipo) {
        switch (tipo) {
            case 'imagen': return FaFileImage;
            case 'pdf': return FaFilePdf;
            case 'documento': return FaFileAlt;
            default: return FaFile;
        }
    },

    // Obtener color por tipo
    // getColorByTipo(tipo) {
    //     switch (tipo) {
    //         case 'imagen': return 'bg-purple-50 text-purple-600 border-purple-200';
    //         case 'pdf': return 'bg-red-50 text-red-600 border-red-200';
    //         case 'documento': return 'bg-blue-50 text-blue-600 border-blue-200';
    //         default: return 'bg-gray-50 text-gray-600 border-gray-200';
    //     }
    // },

    getColorByTipo(tipo) {
        switch (tipo) {
            case 'imagen':
                return {
                    text: 'text-purple-600',
                    border: 'border-purple-200',
                    bg: 'bg-purple-50'
                };
            case 'pdf':
                return {
                    text: 'text-red-600',
                    border: 'border-red-200',
                    bg: 'bg-red-50'
                };
            case 'documento':
                return {
                    text: 'text-blue-600',
                    border: 'border-blue-200',
                    bg: 'bg-blue-50'
                };
            default:
                return {
                    text: 'text-gray-600',
                    border: 'border-gray-200',
                    bg: 'bg-gray-50'
                };
        }
    },

    // Agrupar archivos por tipo
    agruparArchivosPorTipo(archivos) {
        if (!archivos || !Array.isArray(archivos)) {
            return {};
        }

        const agrupados = {};

        archivos.forEach(archivo => {
            // Determinar tipo del archivo
            let tipo = 'otros'; // valor por defecto

            // Verificar si ya tiene tipo_archivo definido
            if (archivo.tipo_archivo) {
                tipo = archivo.tipo_archivo;
            }
            // O si tiene tipo
            else if (archivo.tipo) {
                tipo = archivo.tipo;
            }
            // Si no, determinar por extensión del nombre
            else if (archivo.nombre_archivo || archivo.nombre_original) {
                const nombre = archivo.nombre_archivo || archivo.nombre_original;
                const extension = this.obtenerExtension(nombre);
                tipo = this.determinarTipoPorExtension(extension);
            }

            // Inicializar array si no existe
            if (!agrupados[tipo]) {
                agrupados[tipo] = [];
            }

            // Agregar archivo al grupo correspondiente
            agrupados[tipo].push(archivo);
        });

        return agrupados;
    },
};