const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authModel = require('./auth.model');
const { jwtSecret, jwtAccessSecret, jwrRefreshSecret, jwtAccessExpiresIn, jwtRefreshExpiresIn } = require('../../config/jwt');
const e = require('express');

class AuthServicio {

    // Registrar nuevo usuario-
    async registrarUsuario(datos) {

        if (await authModel.usernameExiste(datos.usuario)) {
            throw new Error('El nombre de usuario ya existe');
        }

        // Validar que no exista el email-
        if (await authModel.emailExiste(datos.correo)) {
            throw new Error('El email ya está registrado');
        }

        // Validaciones adicionales-
        this.validarDatosRegistro(datos);

        // Crear usuario
        return await authModel.crearUsuario(datos);
    }

    // Login de usuario-
    async login(datos) {
        const { usuario, password } = datos;

        // Buscar usuario-
        const username = await authModel.obtenerUsuarioPorCredenciales(usuario);
        if (!username) {
            throw new Error('Usuario o Correo invalidos');
        }

        // Verificar password
        const passwordValido = await bcrypt.compare(password, username.contraseña);
        if (!passwordValido) {
            throw new Error('Contraseña invalida');
        }

        // Actualizar último login-
        await authModel.actualizarUltimoLogin(username.id);

        // Generar token JWT

        const token = this.generarAccessToken(username);
        const refreshToken = this.generarRefreshToken(username);

        await authModel.guardarRefreshToken(username.id, refreshToken);

        // Retornar datos del usuario y token
        return {
            resultado: {
                id: username.id,
                usuario: username.usuario,
                email: username.correo,
                rol: username.rol
            },
            token,
            refreshToken
        };
    }

    // Obtener perfil de usuario
    async obtenerPerfil(usuarioId) {
        const usuario = await authModel.obtenerUsuarioPorId(usuarioId);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Eliminar datos sensibles
        delete usuario.password_hash;
        return usuario;
    }
    //Refrescar AccessToken
    async refreshToken(refreshToken) {

        try {
            const tokenDecodificado = this.decodificarRefreshToken(refreshToken);
            const tokenBD = await authModel.buscarRefreshTokenPorId(tokenDecodificado.userId)
            if (!tokenBD) {
                const error = new Error('Token no encontrado');
                error.status = 404;
                error.code = 'TOKEN_NOT_FOUND';
                throw error
            }

            const esValido = await bcrypt.compare(refreshToken, tokenBD.token_hash);

            if (!esValido) {
                const error = new Error('Token inválido');
                error.status = 401;
                error.code = 'INVALID_TOKEN';
                throw error
            }

            this.verificarTokenRefresh(refreshToken);

            const usuario = await authModel.obtenerUsuarioPorId(tokenDecodificado.userId);

            if (!usuario) {
                await authModel.revocarRefreshToken(tokenDecodificado.userId);
                const error = new Error('Usuario no encontrado');
                error.status = 404;
                error.code = 'USER_NOT_FOUND';
                return error
            }

            const token = this.generarAccessToken(usuario)
            return token;

        } catch (error) {
            return error;
        }
    }

    async cerrarSesion(refreshToken) {
        try {
            const tokenDecodificado = this.decodificarRefreshToken(refreshToken);
            const tokenBD = await authModel.buscarRefreshTokenPorId(tokenDecodificado.userId)
            if (!tokenBD) {
                const error = new Error('Token no encontrado');
                error.status = 404;
                error.code = 'TOKEN_NOT_FOUND';
                throw error
            }

            const esValido = await bcrypt.compare(refreshToken, tokenBD.token_hash);

            if (!esValido) {
                const error = new Error('Token inválido');
                error.status = 401;
                error.code = 'INVALID_TOKEN';
                throw error
            }

            await authModel.revocarRefreshToken(tokenDecodificado.userId);
            await authModel.eliminarRefreshToken(tokenDecodificado.userId);
        } catch (error) {
            throw error;
        }
    }

    // Validaciones de registro-
    validarDatosRegistro(datos) {
        const { usuario, correo, password, rol } = datos;

        if (usuario.length < 3) {
            throw new Error('El usuario debe tener al menos 3 caracteres');
        }

        if (!this.validarEmail(correo)) {
            throw new Error('El email no es válido');
        }

        if (password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        const rolesValidos = ['administrador', 'usuario'];
        if (rol && !rolesValidos.includes(rol)) {
            throw new Error('Rol no válido');
        }
    }

    // Validar formato de email-
    validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Verificar token JWT
    verificarToken(token) {
        try {
            return jwt.verify(token, jwtSecret);
        } catch (error) {
            throw new Error('Token inválido');
        }
    }

    verificarTokenRefresh(token) {
        try {
            return jwt.verify(token, jwrRefreshSecret);
        } catch (error) {
            error.code = error.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' :
                error.name === 'JsonWebTokenError' ? 'INVALID_TOKEN' :
                    'VERIFICATION_ERROR';

            error.status = 401;
            throw error; // ← Relanzar el error modificado
        }
    }

    generarAccessToken(username) {
        return jwt.sign(
            {
                id: username.id,
                username: username.usuario,
                rol: username.rol
            },
            jwtAccessSecret,
            { expiresIn: jwtAccessExpiresIn }
        );
    }

    generarRefreshToken(username) {
        return jwt.sign(
            { userId: username.id },
            jwrRefreshSecret,
            { expiresIn: jwtRefreshExpiresIn }
        );
    }

    decodificarRefreshToken(refreshToken) {
        let tokenDecodificado;

        try {
            tokenDecodificado = jwt.decode(refreshToken);
        } catch (error) {
            throw new Error(`Error decodificando token: ${error.message}`);
        }

        if (!tokenDecodificado) {
            throw new Error('Token JWT inválido o malformado');
        }

        if (!tokenDecodificado.userId) {
            throw new Error('Token JWT no contiene userId');
        }

        return tokenDecodificado;
    }
}

module.exports = new AuthServicio();