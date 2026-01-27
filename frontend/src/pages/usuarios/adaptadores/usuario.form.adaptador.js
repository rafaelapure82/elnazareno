export class UsuarioFormAdaptador {
    static initialValues(usuario = null) {
        if (usuario) {
            return {
                nombre: usuario.nombre || '',
                usuario: usuario.usuario || '',
                correo: usuario.correo || '',
                rol: usuario.rol || 'usuario',
                password: '',
                confirmPassword: ''
            };
        }

        return {
            nombre: '',
            usuario: '',
            correo: '',
            rol: 'usuario',
            password: '',
            confirmPassword: ''
        };
    }

    static validate(values, isEdit = false) {
        const errors = {};

        if (!values.nombre.trim()) {
            errors.nombre = 'El nombre es requerido';
        } else if (values.nombre.length < 2) {
            errors.nombre = 'El nombre debe tener al menos 2 caracteres';
        }

        if (!values.usuario.trim()) {
            errors.usuario = 'El nombre de usuario es requerido';
        } else if (values.usuario.length < 3) {
            errors.usuario = 'El usuario debe tener al menos 3 caracteres';
        }

        if (!values.correo.trim()) {
            errors.correo = 'El correo es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) {
            errors.correo = 'Correo electrónico inválido';
        }

        if (!values.rol) {
            errors.rol = 'El rol es requerido';
        }

        if (!isEdit && !values.password) {
            errors.password = 'La contraseña es requerida';
        } else if (!isEdit && values.password && values.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (!isEdit && values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        return errors;
    }
}