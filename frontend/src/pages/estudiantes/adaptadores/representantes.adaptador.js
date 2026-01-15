
export class RepresentantesAdaptador {
    // Adaptar representante para formulario
    static toFormData(representanteData) {
        return {
            nombres: representanteData.nombres || '',
            apellidos: representanteData.apellidos || '',
            relacion: representanteData.relacion || 'Padre',
            email: representanteData.email || '',
            telefono: representanteData.telefono || '',
            ocupacion: representanteData.ocupacion || '',
            tipo_cedula: representanteData.tipo_cedula || 'V',
            cedula: representanteData.cedula || ''
        };
    }

    // Adaptar formulario para API
    static toApiRequest(formData) {
        return {
            nombres: formData.nombres.trim(),
            apellidos: formData.apellidos.trim(),
            relacion: formData.relacion,
            email: formData.email.trim(),
            telefono: formData.telefono.trim(),
            ocupacion: formData.ocupacion.trim(),
            tipo_cedula: formData.tipo_cedula,
            cedula: formData.cedula.trim()
        };
    }

    // Validar representante
    static validarRepresentante(formData) {
        const errors = {};

        if (!formData.nombres?.trim()) {
            errors.nombres = 'Los nombres son requeridos';
        }

        if (!formData.apellidos?.trim()) {
            errors.apellidos = 'Los apellidos son requeridos';
        }

        if (!formData.relacion) {
            errors.relacion = 'La relación es requerida';
        }

        if (!formData.telefono?.trim()) {
            errors.telefono = 'El teléfono es requerido';
        }

        if (!formData.cedula?.trim()) {
            errors.cedula = 'La cédula es requerida';
        }

        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Email inválido';
        }

        return errors;
    }
}