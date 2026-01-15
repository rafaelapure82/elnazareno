
export class EstudiantesAdaptador {
    // Adaptar estudiante para formulario
    static toFormData(estudianteData) {
        return {
            // Datos del estudiante
            nombres: estudianteData.nombres || '',
            apellidos: estudianteData.apellidos || '',
            fecha_nacimiento: estudianteData.fecha_nacimiento
                ? new Date(estudianteData.fecha_nacimiento).toISOString().split('T')[0]
                : '',
            genero: estudianteData.genero || 'Masculino',
            tipo_cedula: estudianteData.tipo_cedula || 'V',
            cedula: estudianteData.cedula || '',
            cedula_escolar: estudianteData.cedula_escolar || '',

            // Datos del representante
            representante: estudianteData.representante ? {
                nombres: estudianteData.representante.nombres || '',
                apellidos: estudianteData.representante.apellidos || '',
                relacion: estudianteData.representante.relacion || 'Padre',
                email: estudianteData.representante.email || '',
                telefono: estudianteData.representante.telefono || '',
                ocupacion: estudianteData.representante.ocupacion || '',
                tipo_cedula: estudianteData.representante.tipo_cedula || 'V',
                cedula: estudianteData.representante.cedula || ''
            } : {
                nombres: '',
                apellidos: '',
                relacion: 'Padre',
                email: '',
                telefono: '',
                ocupacion: '',
                tipo_cedula: 'V',
                cedula: ''
            }
        };
    }

    // Adaptar formulario para API
    static toApiRequest(formData) {
        const request = {
            // Datos del estudiante
            nombres: formData.nombres.trim(),
            apellidos: formData.apellidos.trim(),
            fecha_nacimiento: formData.fecha_nacimiento,
            genero: formData.genero,
            tipo_cedula: formData.tipo_cedula,
            cedula: formData.cedula.trim(),
            cedula_escolar: formData.cedula_escolar.trim(),

            // Datos del representante
            representante: {
                nombres: formData.representante.nombres.trim(),
                apellidos: formData.representante.apellidos.trim(),
                relacion: formData.representante.relacion,
                email: formData.representante.email.trim(),
                telefono: formData.representante.telefono.trim(),
                ocupacion: formData.representante.ocupacion.trim(),
                tipo_cedula: formData.representante.tipo_cedula,
                cedula: formData.representante.cedula.trim()
            }
        };

        // Limpiar campos opcionales vacíos
        if (!request.email) delete request.representante.email;
        if (!request.ocupacion) delete request.representante.ocupacion;

        return request;
    }

    // Adaptar respuesta de la API
    static fromApiResponse(apiData) {
        if (!apiData.success) {
            throw new Error(apiData.message || 'Error en la respuesta del servidor');
        }

        const estudiante = apiData.data;

        return {
            id: estudiante.id,
            nombres: estudiante.nombres,
            apellidos: estudiante.apellidos,
            nombreCompleto: `${estudiante.nombres} ${estudiante.apellidos}`,
            fecha_nacimiento: estudiante.fecha_nacimiento,
            genero: estudiante.genero,
            tipo_cedula: estudiante.tipo_cedula,
            cedula: estudiante.cedula,
            cedula_escolar: estudiante.cedula_escolar,
            representante: estudiante.representante ? {
                id: estudiante.representante.id,
                nombres: estudiante.representante.nombres,
                apellidos: estudiante.representante.apellidos,
                nombreCompleto: `${estudiante.representante.nombres} ${estudiante.representante.apellidos}`,
                relacion: estudiante.representante.relacion,
                email: estudiante.representante.email,
                telefono: estudiante.representante.telefono,
                ocupacion: estudiante.representante.ocupacion,
                tipo_cedula: estudiante.representante.tipo_cedula,
                cedula: estudiante.representante.cedula
            } : null,
            edad: this.calcularEdad(estudiante.fecha_nacimiento),
            created_at: estudiante.created_at
        };
    }

    // Adaptar lista de estudiantes
    static toEstudiantesList(apiResponse) {
        if (!apiResponse.success) return [];

        return apiResponse.data.map(estudiante => ({
            id: estudiante.id,
            nombres: estudiante.nombres,
            apellidos: estudiante.apellidos,
            nombreCompleto: `${estudiante.nombres} ${estudiante.apellidos}`,
            cedula: estudiante.cedula,
            cedula_escolar: estudiante.cedula_escolar,
            genero: estudiante.genero,
            fecha_nacimiento: estudiante.fecha_nacimiento,
            edad: this.calcularEdad(estudiante.fecha_nacimiento),
            representante: estudiante.representante ? {
                id: estudiante.representante.id,
                nombreCompleto: `${estudiante.representante.nombres} ${estudiante.representante.apellidos}`,
                telefono: estudiante.representante.telefono,
                relacion: estudiante.representante.relacion
            } : null,
            created_at: estudiante.created_at
        }));
    }

    // Calcular edad
    static calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    }

    // Formatear fecha
    static formatFecha(fecha) {
        if (!fecha) return '';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    // Validar estudiante
    static validarEstudiante(formData) {
        const errors = {};

        // Validar datos del estudiante
        if (!formData.nombres?.trim()) {
            errors.nombres = 'Los nombres son requeridos';
        }

        if (!formData.apellidos?.trim()) {
            errors.apellidos = 'Los apellidos son requeridos';
        }

        if (!formData.fecha_nacimiento) {
            errors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
        } else {
            const fechaNac = new Date(formData.fecha_nacimiento);
            const hoy = new Date();
            if (fechaNac >= hoy) {
                errors.fecha_nacimiento = 'La fecha de nacimiento debe ser anterior a hoy';
            }
        }

        if (!formData.cedula?.trim()) {
            errors.cedula = 'La cédula es requerida';
        }

        if (!formData.cedula_escolar?.trim()) {
            errors.cedula_escolar = 'La cédula escolar es requerida';
        }

        // Validar datos del representante
        if (!formData.representante?.nombres?.trim()) {
            errors['representante.nombres'] = 'Los nombres del representante son requeridos';
        }

        if (!formData.representante?.apellidos?.trim()) {
            errors['representante.apellidos'] = 'Los apellidos del representante son requeridos';
        }

        if (!formData.representante?.relacion) {
            errors['representante.relacion'] = 'La relación es requerida';
        }

        if (!formData.representante?.telefono?.trim()) {
            errors['representante.telefono'] = 'El teléfono es requerido';
        } else if (!/^\d{10,11}$/.test(formData.representante.telefono.replace(/\D/g, ''))) {
            errors['representante.telefono'] = 'Teléfono inválido';
        }

        if (!formData.representante?.cedula?.trim()) {
            errors['representante.cedula'] = 'La cédula del representante es requerida';
        }

        if (formData.representante?.email && !/^\S+@\S+\.\S+$/.test(formData.representante.email)) {
            errors['representante.email'] = 'Email inválido';
        }

        return errors;
    }

    // Filtrar estudiantes
    // static filterEstudiantes(estudiantes, filters) {
    //     let filtered = [...estudiantes];

    //     // Filtrar por búsqueda
    //     if (filters.searchQuery) {
    //         const query = filters.searchQuery.toLowerCase();
    //         filtered = filtered.filter(estudiante =>
    //             estudiante.nombreCompleto.toLowerCase().includes(query) ||
    //             estudiante.cedula.toLowerCase().includes(query) ||
    //             estudiante.cedula_escolar.toLowerCase().includes(query) ||
    //             (estudiante.representante?.nombreCompleto?.toLowerCase().includes(query))
    //         );
    //     }

    //     // Filtrar por género
    //     if (filters.genero && filters.genero !== 'todos') {
    //         filtered = filtered.filter(estudiante => estudiante.genero === filters.genero);
    //     }

    //     // Filtrar por edad
    //     if (filters.edadMin || filters.edadMax) {
    //         filtered = filtered.filter(estudiante => {
    //             const edad = estudiante.edad;
    //             return (!filters.edadMin || edad >= filters.edadMin) &&
    //                 (!filters.edadMax || edad <= filters.edadMax);
    //         });
    //     }

    //     return filtered;
    // }

    static filterEstudiantes(estudiantes, filters) {
        if (!estudiantes || !Array.isArray(estudiantes)) return [];

        return estudiantes.filter(estudiante => {
            // Filtrar por búsqueda
            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                const matchesNombre = estudiante.nombreCompleto?.toLowerCase().includes(query);
                const matchesCedula = estudiante.cedula?.includes(query);
                if (!matchesNombre && !matchesCedula) return false;
            }

            // Filtrar por género
            if (filters.genero !== 'todos' && estudiante.genero !== filters.genero) {
                return false;
            }

            // Filtrar por edad mínima
            if (filters.edadMin && estudiante.edad < parseInt(filters.edadMin)) {
                return false;
            }

            // Filtrar por edad máxima
            if (filters.edadMax && estudiante.edad > parseInt(filters.edadMax)) {
                return false;
            }

            return true;
        });
    }

    // Ordenar estudiantes
    // static sortEstudiantes(estudiantes, sortBy = 'nombreCompleto', order = 'asc') {
    //     return [...estudiantes].sort((a, b) => {
    //         let aValue = a[sortBy];
    //         let bValue = b[sortBy];

    //         if (sortBy === 'edad') {
    //             aValue = a.edad;
    //             bValue = b.edad;
    //         }

    //         if (sortBy === 'nombreCompleto') {
    //             aValue = aValue.toLowerCase();
    //             bValue = bValue.toLowerCase();
    //         }

    //         if (order === 'asc') {
    //             return aValue > bValue ? 1 : -1;
    //         } else {
    //             return aValue < bValue ? 1 : -1;
    //         }
    //     });
    // }


    static sortEstudiantes(estudiantes, sortBy = 'nombreCompleto', order = 'asc') {
        if (!estudiantes || !Array.isArray(estudiantes)) return [];

        return [...estudiantes].sort((a, b) => {
            let valueA = a[sortBy];
            let valueB = b[sortBy];

            // Manejar valores undefined/null
            if (valueA == null) valueA = '';
            if (valueB == null) valueB = '';

            // Comparar
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                const comparison = valueA.localeCompare(valueB);
                return order === 'asc' ? comparison : -comparison;
            }

            // Para números
            const comparison = valueA - valueB;
            return order === 'asc' ? comparison : -comparison;
        });
    }

}