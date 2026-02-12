class estudiantesValidar {
    // static validarDataEstudiante(estudiante) {
    //     const errors = [];

    //     if (!estudiante.nombres || estudiante.nombres.trim().length === 0) {
    //         errors.push('El nombre del estudiante es requerido');
    //     }

    //     if (!estudiante.apellidos || estudiante.apellidos.trim().length === 0) {
    //         errors.push('Los apellidos del estudiante son requeridos');
    //     }

    //     if (!estudiante.fechaNacimiento) {
    //         errors.push('La fecha de nacimiento es requerida');
    //     }

    //     if (!estudiante.cedula && !estudiante.cedulaEscolar) {
    //         errors.push('Se requiere al menos cédula o cédula escolar');
    //     }

    //     return errors;
    // }

    // static validarDataRepresentante(representante) {
    //     const errors = [];

    //     if (!representante.nombres || representante.nombres.trim().length === 0) {
    //         errors.push('El nombre del representante es requerido');
    //     }

    //     if (!representante.cedula || representante.cedula.trim().length === 0) {
    //         errors.push('La cédula del representante es requerida');
    //     }

    //     if (!representante.email || representante.email.trim().length === 0) {
    //         errors.push('El email del representante es requerido');
    //     }

    //     return errors;
    // }

    static validarDataEstudiante(estudiante) {
        const errors = [];

        if (!estudiante.nombres || estudiante.nombres.trim().length === 0) {
            errors.push('El nombre del estudiante es requerido');
        }

        if (!estudiante.apellidos || estudiante.apellidos.trim().length === 0) {
            errors.push('Los apellidos del estudiante son requeridos');
        }

        if (!estudiante.fechaNacimiento) {
            errors.push('La fecha de nacimiento es requerida');
        }

        if (!estudiante.sexo) {
            errors.push('El sexo del estudiante es requerido');
        }

        if (!estudiante.nacionalidad) {
            errors.push('La nacionalidad del estudiante es requerida');
        }

        if (!estudiante.cedulaEscolar || estudiante.cedulaEscolar.trim().length === 0) {
            errors.push('La cédula escolar es requerida');
        }

        // Validación condicional de cédula
        if (estudiante.tieneCedula) {
            if (!estudiante.tipoCedula) {
                errors.push('El tipo de cédula es requerido cuando el estudiante tiene cédula');
            }
            if (!estudiante.cedula || estudiante.cedula.trim().length === 0) {
                errors.push('La cédula es requerida cuando el estudiante tiene cédula');
            }
        }

        return errors;
    }

    static validarDataRepresentante(representante) {
        const errors = [];

        if (!representante.nombres || representante.nombres.trim().length === 0) {
            errors.push('El nombre del representante es requerido');
        }

        if (!representante.apellidos || representante.apellidos.trim().length === 0) {
            errors.push('Los apellidos del representante son requeridos');
        }

        if (!representante.cedula || representante.cedula.trim().length === 0) {
            errors.push('La cédula del representante es requerida');
        }

        if (!representante.sexo) {
            errors.push('El sexo del representante es requerido');
        }

        if (!representante.relacion) {
            errors.push('La relación del representante es requerida');
        }

        if (!representante.telefono || representante.telefono.trim().length === 0) {
            errors.push('El teléfono del representante es requerido');
        }

        // Validar formato de teléfono (opcional)
        if (representante.telefono && !/^\d{10,11}$/.test(representante.telefono.replace(/\D/g, ''))) {
            errors.push('El teléfono debe tener 10-11 dígitos');
        }

        // Validar email si está presente
        if (representante.email && !/^\S+@\S+\.\S+$/.test(representante.email)) {
            errors.push('El email del representante no es válido');
        }

        return errors;
    }

}

module.exports = estudiantesValidar;