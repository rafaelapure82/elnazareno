const authServicio = require('./auth.servicio');

class AuthController {
    // Registrar nuevo usuario-
    async registrar(req, res) {
        try {

            const { nombre, usuario, correo, password } = req.body

            // //*Vemos si los campos no esta vacios
            if (!nombre || !usuario || !correo || !password) {
                return res.status(400).json({
                    success: false,
                    error: "Los campos no pueden estar vacios"
                })
            }

            const username = await authServicio.registrarUsuario(req.body);

            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: {
                    id: username.id,
                    nombre: username.nombre,
                    username: username.username,
                    email: username.email,
                    rol: username.rol
                }
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Login de usuario-
    async login(req, res) {
        try {

            const { usuario, password } = req.body;

            if (!usuario || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Usuario y contraseña son requeridos'
                });
            }

            const { token, resultado, refreshToken } = await authServicio.login({ usuario, password });

            res.status(200).json({
                success: true,
                message: 'Login exitoso',
                token,
                usuario: resultado,
                refreshToken
            });

        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener perfil del usuario autenticado
    async obtenerPerfil(req, res) {
        try {
            const perfil = await authService.obtenerPerfil(req.usuario.id);

            res.json({
                success: true,
                data: perfil
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Verificar token (para el frontend)
    async verificarToken(req, res) {
        try {
            res.json({
                success: true,
                data: {
                    usuario: req.usuario,
                    valido: true
                }
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    //Refrescar AccessToken
    async refreshToken(req, res) {
        const { refreshToken } = req.body;

        try {

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token es requerido'
                });
            }

            const token = await authServicio.refreshToken(refreshToken);
            res.status(200).json({
                success: true,
                token,
                tokenType: "Bearer"
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            const message = error.message || 'Error interno';

            res.status(statusCode).json({
                success: false,
                message: message,
                code: error.code || 'ERROR_DESCONOCIDO'
            });

        }
    }

    //Cerrar sesion
    async cerrarSesion(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token es requerido'
                });
            }

            await authServicio.cerrarSesion(refreshToken);

            res.status(200).json({
                success: true,
                message: 'Sesión cerrada exitosamente'
            });
        } catch (error) {

            const statusCode = error.status || 500;
            const message = error.message || 'Error interno';

            res.status(statusCode).json({
                success: false,
                message: message,
                code: error.code || 'ERROR_DESCONOCIDO'
            });


        }
    }
}

module.exports = new AuthController();