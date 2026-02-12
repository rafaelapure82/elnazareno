export const Validators = {
    required: (value) => {
        if (!value || value.toString().trim() === '') {
            return 'Este campo es requerido';
        }
        return null;
    },

    email: (value) => {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Email inválido';
        }
        return null;
    },

    phone: (value) => {
        if (value && !/^\d{10,}$/.test(value.replace(/\D/g, ''))) {
            return 'Teléfono inválido (mínimo 10 dígitos)';
        }
        return null;
    },

    cedula: (value) => {
        if (value && !/^\d{6,10}$/.test(value)) {
            return 'Cédula inválida (6-10 dígitos)';
        }
        return null;
    },

    minLength: (value, min) => {
        if (value && value.toString().length < min) {
            return `Mínimo ${min} caracteres`;
        }
        return null;
    },

    maxLength: (value, max) => {
        if (value && value.toString().length > max) {
            return `Máximo ${max} caracteres`;
        }
        return null;
    },

    date: (value) => {
        if (value) {
            const date = new Date(value);
            const today = new Date();
            if (date > today) {
                return 'La fecha no puede ser futura';
            }
        }
        return null;
    },

    fileSize: (file, maxSizeMB) => {
        if (file && file.size > maxSizeMB * 1024 * 1024) {
            return `El archivo no debe superar ${maxSizeMB}MB`;
        }
        return null;
    },

    fileType: (file, allowedTypes) => {
        if (file && !allowedTypes.includes(file.type)) {
            return `Tipo de archivo no permitido. Permitidos: ${allowedTypes.join(', ')}`;
        }
        return null;
    }
};

export const validateEstudiante = (data) => {
    const errors = {};

    // Validar datos del estudiante
    errors.nombres = Validators.required(data.nombres);
    errors.apellidos = Validators.required(data.apellidos);
    errors.cedulaEscolar = Validators.required(data.cedulaEscolar);
    errors.fechaNacimiento = Validators.required(data.fechaNacimiento) || Validators.date(data.fechaNacimiento);
    errors.sexo = Validators.required(data.sexo);
    errors.nacionalidad = Validators.required(data.nacionalidad);

    if (data.tieneCedula) {
        errors.cedula = Validators.required(data.cedula) || Validators.cedula(data.cedula);
        errors.tipoCedula = Validators.required(data.tipoCedula);
    }

    // Validar representante
    if (data.representante) {
        errors['representante.nombres'] = Validators.required(data.representante.nombres);
        errors['representante.apellidos'] = Validators.required(data.representante.apellidos);
        errors['representante.cedula'] = Validators.required(data.representante.cedula) || Validators.cedula(data.representante.cedula);
        errors['representante.relacion'] = Validators.required(data.representante.relacion);
        errors['representante.telefono'] = Validators.required(data.representante.telefono) || Validators.phone(data.representante.telefono);
        errors['representante.email'] = Validators.email(data.representante.email);
    }

    // Filtrar errores nulos
    Object.keys(errors).forEach(key => {
        if (!errors[key]) delete errors[key];
    });

    return errors;
};