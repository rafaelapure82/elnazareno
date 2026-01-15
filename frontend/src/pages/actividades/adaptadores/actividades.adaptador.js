
export const ActividadesAdaptador = {
    /**
     * Adapta los datos del formulario para enviar al backend
     */
    toBackend: (data, imagenes) => {
        const formData = new FormData();

        // Agregar campos de texto
        formData.append('titulo', data.titulo);
        formData.append('descripcion', data.descripcion);

        // Agregar imágenes si existen
        if (imagenes && imagenes.length > 0) {
            imagenes.forEach((imagen) => {
                formData.append('imagenes', imagen);
            });
        }

        return formData;
    },

    /**
     * Adapta los datos recibidos del backend
     */
    fromBackend: (data) => {
        if (!data) return null;
        return {
            id: data._id || data.id,
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagenes: data.imagenes || data.objetos,
            fechaCreacion: data.createdAt || data.fecha_creacion,
            fechaActualizacion: data.updatedAt || data.fechaActualizacion,
            creador: data.creador || data.userId || null,
        };
    },

    /**
     * Adapta los datos para editar una actividad
     */
    toBackendEdit: (data, nuevasImagenes = [], imagenesAEliminar = []) => {
        const formData = new FormData();

        // Campos de texto
        formData.append('titulo', data.titulo);
        formData.append('descripcion', data.descripcion);

        // Nuevas imágenes
        if (nuevasImagenes && nuevasImagenes.length > 0) {
            nuevasImagenes.forEach((imagen) => {
                formData.append('nuevasImagenes', imagen);
            });
        }

        // Imágenes a eliminar (como string JSON)
        if (imagenesAEliminar.length > 0) {
            formData.append('imagenesAEliminar', JSON.stringify(imagenesAEliminar));
        }

        return formData;
    },

    /**
     * Formatea las fechas para mostrar
     */
    formatFecha: (fechaString) => {
        if (!fechaString) return 'Fecha no disponible';

        try {
            const fecha = new Date(fechaString);
            return fecha.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Fecha inválida';
        }
    },

    /**
     * Valida los datos antes de enviar
     */
    validarDatos: (data) => {
        const errores = [];

        if (!data.titulo || data.titulo.trim().length === 0) {
            errores.push('El título es requerido');
        } else if (data.titulo.length > 100) {
            errores.push('El título no puede exceder 100 caracteres');
        }

        if (!data.descripcion || data.descripcion.trim().length === 0) {
            errores.push('La descripción es requerida');
        } else if (data.descripcion.length > 500) {
            errores.push('La descripción no puede exceder 500 caracteres');
        }

        return {
            valido: errores.length === 0,
            errores
        };
    }
};