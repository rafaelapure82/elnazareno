// src/modules/login/hooks/useAuthValidation.js
export const useAuthValidacion = () => {
    // const validarEmail = (email) => {
    //     if (!email) return 'El email es requerido';
    //     if (!/\S+@\S+\.\S+/.test(email)) return 'Email inválido';
    //     return '';
    // };

    const validarUsuario = (usuario) => {
        if (!usuario) return 'El usuario es requerido';
        if (usuario.length < 6) return 'Mínimo 6 caracteres';
        return '';
    }

    const validarPassword = (password) => {
        if (!password) return 'La contraseña es requerida';
        if (password.length < 6) return 'Mínimo 6 caracteres';
        return '';
    };

    const validarFormulario = (formData) => {
        const errors = {};

        const UsuarioError = validarUsuario(formData.usuario);
        if (UsuarioError) errors.usuario = UsuarioError;

        const passwordError = validarPassword(formData.password);
        if (passwordError) errors.password = passwordError;

        return errors;
    };

    return {
        validarUsuario,
        validarPassword,
        validarFormulario
    };
};